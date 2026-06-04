import requests
from fastapi import FastAPI
from datetime import datetime, timedelta

BASE_URL = "https://sigaleh-backend.vercel.app"

from app.schemas import (
    PredictionRequest,
    PredictionResponse,
    AutoPredictionRequest,
    ForecastRequest,
    ForecastResponse
)

from app.model_loader import (
    model,
    scaler,
    commodity_encoder,
    city_encoder
)

from app.inference import predict_price

from app.data_pipeline import (
    fetch_commodities,
    fetch_weather,
    merge_data,
    build_model_input
)

from app.forecast_engine import (
    prepare_features,
    generate_historical_predictions,
    calculate_metrics,
    generate_future_predictions
)

app = FastAPI()


@app.get("/")
def home():

    return {
        "message": "SiGALEH AI Service Running"
    }


@app.get("/health")
def health():

    return {
        "status": "OK",
        "service": "AI Forecast Service",
        "model_loaded": model is not None
    }


@app.post("/predict", response_model=PredictionResponse)
def predict(request: PredictionRequest):

    try:

        predicted_price = predict_price(
            model,
            scaler,
            request.data
        )

    except Exception as e:

        return {
            "commodity": request.commodity,
            "city": request.city,
            "predicted_price": 0,
            "status": f"Error: {str(e)}"
        }

    last_price = request.data[-1][0]

    if predicted_price > last_price * 1.1:
        status = "Tinggi"

    elif predicted_price > last_price * 1.05:
        status = "Waspada"

    else:
        status = "Normal"

    return {
        "commodity": request.commodity,
        "city": request.city,
        "predicted_price": predicted_price,
        "status": status
    }


@app.post("/predict-auto", response_model=PredictionResponse)
def predict_auto(request: AutoPredictionRequest):

    try:

        end_date = datetime.today()

        for days in [30, 60, 90]:

            start_date = end_date - timedelta(days=days)

            commodities = fetch_commodities(
                request.city,
                request.commodity,
                start_date.strftime("%Y-%m-%d"),
                end_date.strftime("%Y-%m-%d")
            )

            weather = fetch_weather(
                request.city,
                start_date.strftime("%Y-%m-%d"),
                end_date.strftime("%Y-%m-%d")
            )

            merged = merge_data(commodities, weather)

            if len(merged) >= 28:
                break

        if len(merged) < 28:
            raise ValueError("Data tetap kurang meskipun range diperluas")

        try:

            commodity_encoded = commodity_encoder.transform(
                [request.commodity]
            )[0]

        except:
            raise ValueError("Komoditas tidak dikenal model")

        try:

            city_encoded = city_encoder.transform(
                [request.city]
            )[0]

        except:
            raise ValueError("Wilayah tidak dikenal model")

        model_input = build_model_input(
            merged,
            commodity_encoded,
            city_encoded
        )

        predicted_price = predict_price(
            model,
            scaler,
            model_input.tolist()
        )

    except Exception as e:

        return {
            "commodity": request.commodity,
            "city": request.city,
            "predicted_price": 0,
            "status": f"Error: {str(e)}"
        }

    last_price = merged[-1]["harga"]

    if predicted_price > last_price * 1.1:
        status = "Tinggi"

    elif predicted_price > last_price * 1.05:
        status = "Waspada"

    else:
        status = "Normal"

    return {
        "commodity": request.commodity,
        "city": request.city,
        "predicted_price": round(predicted_price, 2),
        "status": status
    }

@app.post("/forecast",response_model=ForecastResponse)
def forecast(request: ForecastRequest):

    try:

        if (
            request.commodity
            not in commodity_encoder.classes_
        ):

            raise ValueError(
                "Komoditas tidak dikenal model"
            )

        if (
            request.city
            not in city_encoder.classes_
        ):

            raise ValueError(
                "Wilayah tidak dikenal model"
            )

        commodity_encoded = (
            commodity_encoder.transform(
                [request.commodity]
            )[0]
        )

        city_encoded = (
            city_encoder.transform(
                [request.city]
            )[0]
        )

        response = requests.get(
            f"{BASE_URL}/dataset",
            params={
                "komoditas": request.commodity,
                "wilayah": request.city
            }
        )

        if response.status_code != 200:

            raise ValueError(
                "Gagal mengambil dataset dari backend"
            )

        dataset = response.json()

        if not dataset:

            raise ValueError(
                "Dataset kosong dari backend"
            )

        df = prepare_features(
            dataset,
            commodity_encoded,
            city_encoded
        )

        if len(df) < 28:

            raise ValueError(
                f"Data setelah feature engineering hanya {len(df)} baris. Minimal 28."
            )

        (
            historical_predictions,
            actual_prices,
            predicted_prices
        ) = generate_historical_predictions(
            df,
            model,
            scaler
        )

        metrics = calculate_metrics(
            actual_prices,
            predicted_prices
        )

        future_predictions = (
            generate_future_predictions(
                df,
                model,
                scaler
            )
        )

        return {

            "komoditas":
                request.commodity,

            "wilayah":
                request.city,

            "historical_predictions":
                historical_predictions,

            "future_predictions":
                future_predictions,

            "metrics":
                metrics,

            "error":
                None
        }

    except Exception as e:

        return {

            "komoditas":
                request.commodity,

            "wilayah":
                request.city,

            "historical_predictions":
                [],

            "future_predictions":
                [],

            "metrics":
                {},

            "error":
                str(e)
        }