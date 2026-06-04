from pathlib import Path
import tensorflow as tf
import joblib

BASE_DIR = Path(__file__).resolve().parent.parent

MODEL_DIR = BASE_DIR / "model"

model = tf.keras.models.load_model(
    MODEL_DIR / "model_lstm.keras"
)

scaler = joblib.load(
    MODEL_DIR / "scaler.save"
)

commodity_encoder = joblib.load(
    MODEL_DIR / "commodity_encoder.save"
)

city_encoder = joblib.load(
    MODEL_DIR / "city_encoder.save"
)