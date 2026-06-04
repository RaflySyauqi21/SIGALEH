import requests
import numpy as np

from datetime import datetime

BASE_URL = "https://sigaleh-backend.vercel.app"


def fetch_commodities(
    wilayah,
    komoditas,
    start,
    end
):

    url = f"{BASE_URL}/commodities"

    params = {
        "wilayah": wilayah,
        "komoditas": komoditas,
        "start": start,
        "end": end
    }

    res = requests.get(
        url,
        params=params
    )

    if res.status_code != 200:
        raise ValueError(
            "Gagal fetch data komoditas"
        )

    data = res.json()

    for item in data:
        item["Harga"] = float(
            item["Harga"]
        )

    return data


def fetch_weather(
    wilayah,
    start,
    end
):

    url = f"{BASE_URL}/weather"

    params = {
        "wilayah": wilayah,
        "start": start,
        "end": end
    }

    res = requests.get(
        url,
        params=params
    )

    if res.status_code != 200:
        raise ValueError(
            "Gagal fetch data cuaca"
        )

    return res.json()


def merge_data(
    commodities,
    weather
):

    com_dict = {
        item["Tanggal"][:10]: item
        for item in commodities
    }

    wea_dict = {
        item["Tanggal"][:10]: item
        for item in weather
    }

    merged = []

    for date in sorted(com_dict.keys()):

        if date not in wea_dict:
            continue

        merged.append({
            "tanggal": date,
            "harga": float(
                com_dict[date]["Harga"]
            ),
            "suhu": float(
                wea_dict[date]["Suhu_Rata2_C"]
            ),
            "hujan": float(
                wea_dict[date]["Curah_Hujan_mm"]
            )
        })

    return merged


def build_model_input(
    merged_data,
    commodity_encoded,
    city_encoded,
    window_size=14
):

    if len(merged_data) < 28:

        raise ValueError(
            "Minimal butuh 28 hari data"
        )

    rows = []

    for idx in range(14, len(merged_data)):

        current = merged_data[idx]

        harga = current["harga"]

        harga_kemarin = (
            merged_data[idx - 1]["harga"]
        )

        harga_minggu_lalu = (
            merged_data[idx - 7]["harga"]
        )

        lag_14 = (
            merged_data[idx - 14]["harga"]
        )

        rolling_prices = [

            item["harga"]

            for item in
            merged_data[idx - 6:idx + 1]

        ]

        rolling_mean_7 = np.mean(
            rolling_prices
        )

        rolling_std_7 = np.std(
            rolling_prices
        )

        if harga_kemarin == 0:

            price_change = 0

        else:

            price_change = (
                harga -
                harga_kemarin
            ) / harga_kemarin

        tanggal = datetime.strptime(
            current["tanggal"],
            "%Y-%m-%d"
        )

        row = [

            harga,

            current["suhu"],

            current["hujan"],

            harga_kemarin,

            harga_minggu_lalu,

            lag_14,

            rolling_mean_7,

            rolling_std_7,

            price_change,

            commodity_encoded,

            city_encoded,

            tanggal.month,

            tanggal.weekday()

        ]

        rows.append(row)

    if len(rows) < window_size:

        raise ValueError(
            "Data hasil feature engineering tidak cukup"
        )

    rows = rows[-window_size:]

    return np.array(
        rows,
        dtype=float
    )