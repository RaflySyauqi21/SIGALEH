import pandas as pd
import numpy as np
from datetime import timedelta

def prepare_features(
    dataset,
    commodity_encoded,
    city_encoded
):

    df = pd.DataFrame(dataset)

    numeric_cols = [

        "Harga",
        "Bulan",
        "Tahun",
        "Hari_Dalam_Minggu",
        "Musim_Hujan",

        "Suhu_Rata2_C",
        "Curah_Hujan_mm",

        "Radiasi_Matahari_MJm2",
        "Kecepatan_Angin_Max_kmh",

        "Hujan_Lag30",
        "Hujan_Lag60",

        "Suhu_Lag30",
        "Suhu_Lag60",

        "Rata_Hujan_30Hari",
        "Rata_Suhu_30Hari",

        "Harga_Kemarin",
        "Harga_Minggu_Lalu"

    ]

    for col in numeric_cols:

        if col in df.columns:

            df[col] = pd.to_numeric(
                df[col],
                errors="coerce"
            )

    df["Tanggal"] = pd.to_datetime(
        df["Tanggal"]
    )

    df = df.sort_values(
        "Tanggal"
    ).reset_index(drop=True)


    df["Lag_14"] = df["Harga"].shift(14)

    df["Rolling_Mean_7"] = (
        df["Harga"]
        .rolling(7)
        .mean()
    )

    df["Rolling_Std_7"] = (
        df["Harga"]
        .rolling(7)
        .std()
    )

    df["Price_Change"] = (
        df["Harga"]
        .pct_change()
    )

    df["commodity_encoded"] = (
        commodity_encoded
    )

    df["city_encoded"] = (
        city_encoded
    )

    df["Hari"] = (
        df["Tanggal"]
        .dt.dayofweek
    )

    df = df.dropna().reset_index(drop=True)

    return df

FEATURE_COLUMNS = [
    "Harga",
    "Suhu_Rata2_C",
    "Curah_Hujan_mm",
    "Harga_Kemarin",
    "Harga_Minggu_Lalu",
    "Lag_14",
    "Rolling_Mean_7",
    "Rolling_Std_7",
    "Price_Change",
    "commodity_encoded",
    "city_encoded",
    "Bulan",
    "Hari"
]

def inverse_price(
    scaler,
    values
):

    harga_min = scaler.data_min_[0]
    harga_max = scaler.data_max_[0]

    return (
        np.array(values)
        * (harga_max - harga_min)
    ) + harga_min

def generate_historical_predictions(
    df,
    model,
    scaler,
    window_size=14
):

    X = df[FEATURE_COLUMNS].values

    if len(df) < window_size:
        raise ValueError(
        f"Minimal {window_size} data historis"
    )

    X_scaled = scaler.transform(X)

    historical_predictions = []

    actual_scaled = []

    pred_scaled = []

    for i in range(window_size, len(X_scaled)):

        sequence = X_scaled[
            i-window_size:i
        ]

        sequence = np.expand_dims(
            sequence,
            axis=0
        )

        pred = model.predict(
            sequence,
            verbose=0
        )[0][0]

        pred_scaled.append(pred)

        actual_scaled.append(
            X_scaled[i, 0]
        )

    actual_prices = inverse_price(
        scaler,
        actual_scaled
    )

    predicted_prices = inverse_price(
        scaler,
        pred_scaled
    )

    dates = df["Tanggal"].iloc[
        window_size:
    ].tolist()

    for date, actual, pred in zip(
        dates,
        actual_prices,
        predicted_prices
    ):

        historical_predictions.append({
            "tanggal": date.strftime("%Y-%m-%d"),
            "harga_actual": round(
                float(actual), 2
            ),
            "harga_prediksi": round(
                float(pred), 2
            )
        })

    return (
        historical_predictions,
        actual_prices,
        predicted_prices
    )

def calculate_metrics(
    actual_prices,
    predicted_prices
):

    actual_prices = np.array(actual_prices)
    predicted_prices = np.array(predicted_prices)

    mae = np.mean(
        np.abs(
            actual_prices - predicted_prices
        )
    )

    rmse = np.sqrt(
        np.mean(
            (actual_prices - predicted_prices) ** 2
        )
    )

    mape = np.mean(
        np.abs(
            (
                actual_prices
                - predicted_prices
            )
            /
            (actual_prices + 1e-8)
        )
    ) * 100

    direction_actual = np.sign(
        np.diff(actual_prices)
    )

    direction_pred = np.sign(
        np.diff(predicted_prices)
    )

    da = (
        np.mean(
            direction_actual
            == direction_pred
        )
        * 100
    )

    return {
        "MAE": round(float(mae), 2),
        "RMSE": round(float(rmse), 2),
        "MAPE": round(float(mape), 2),
        "DA": round(float(da), 2)
    }

def generate_future_predictions(
    df,
    model,
    scaler,
    forecast_days=7,
    window_size=14
):

    X = df[FEATURE_COLUMNS].values

    if len(df) < window_size:
        raise ValueError(
        f"Minimal {window_size} data historis"
    )

    X_scaled = scaler.transform(X)

    sequence = X_scaled[
        -window_size:
    ].copy()

    future_predictions = []

    last_date = df[
        "Tanggal"
    ].max()

    for step in range(
        1,
        forecast_days + 1
    ):

        pred_scaled = model.predict(
            np.expand_dims(
                sequence,
                axis=0
            ),
            verbose=0
        )[0][0]

        pred_price = inverse_price(
            scaler,
            [pred_scaled]
        )[0]

        forecast_date = (
            last_date
            + timedelta(days=step)
        )

        future_predictions.append({
            "tanggal": forecast_date.strftime(
                "%Y-%m-%d"
            ),
            "harga_prediksi": round(
                float(pred_price),
                2
            )
        })

        new_row = sequence[-1].copy()

        new_row[0] = pred_scaled

        sequence = np.vstack([
            sequence[1:],
            new_row
        ])

    return future_predictions