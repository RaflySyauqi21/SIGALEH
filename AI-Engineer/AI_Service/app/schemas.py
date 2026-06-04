from pydantic import (
    BaseModel,
    field_validator
)

from typing import (
    List,
    Dict,
    Optional
)

class PredictionRequest(BaseModel):

    commodity: str

    city: str

    data: List[List[float]]

    @field_validator("data")
    @classmethod
    def validate_data(
        cls,
        v
    ):

        if len(v) != 14:

            raise ValueError(
                "Data harus 14 timestep"
            )

        for row in v:

            if len(row) != 13:

                raise ValueError(
                    "Setiap timestep harus 13 fitur"
                )

        return v


class AutoPredictionRequest(BaseModel):

    commodity: str

    city: str


class PredictionResponse(BaseModel):

    commodity: str

    city: str

    predicted_price: float

    status: str

class ForecastRequest(BaseModel):

    commodity: str

    city: str


class HistoricalPrediction(BaseModel):

    tanggal: str

    harga_actual: float

    harga_prediksi: float


class FuturePrediction(BaseModel):

    tanggal: str

    harga_prediksi: float


class Metrics(BaseModel):

    MAE: float

    RMSE: float

    MAPE: float

    DA: float


class ForecastResponse(BaseModel):

    komoditas: str

    wilayah: str

    historical_predictions: List[
        HistoricalPrediction
    ]

    future_predictions: List[
        FuturePrediction
    ]

    metrics: Dict

    error: Optional[str] = None