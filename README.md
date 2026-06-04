# **SiGALEH Frontend**

Frontend aplikasi **SiGALEH (Sistem Informasi Harga dan Analisis Pangan)** yang digunakan untuk visualisasi data harga pangan, analisis tren, dan monitoring komoditas secara interaktif.

Frontend ini terhubung dengan backend API SiGALEH untuk menampilkan:

* Dashboard harga pangan  
* Grafik tren komoditas  
* Statistik wilayah  
* Prediksi harga berbasis AI  
* Monitoring perubahan harga harian

---

# **Tech Stack**

* **React.js**  
* **Vite**  
* **Tailwind CSS**  
* **Axios**  
* **React Router DOM**  
* **Chart.js / Recharts**  
* **REST API Integration**

---

# **Installation**

## **1\. Clone Repository**

git clone https://github.com/kenangbanyu/Sigaleh\_frontend.git  
cd Sigaleh\_frontend

---

## **2\. Install Dependencies**

npm install  
---

## **3\. Jalankan Development Server**

npm run dev

Aplikasi akan berjalan di:

http://localhost:5173

---

# **Features**

## **Dashboard Monitoring**

Menampilkan:

* Harga pangan terkini  
* Statistik perubahan harga  
* Tren mingguan dan bulanan  
* Rata-rata harga komoditas

---

## **Visualisasi Data**

Menggunakan chart interaktif untuk:

* Analisis tren harga  
* Perbandingan antar wilayah  
* Monitoring historis harga pangan

---

## **AI Prediction**

Frontend mendukung integrasi prediksi AI dari backend:

* Forecast harga  
* Analisis tren  
* Prediksi perubahan harga komoditas

---

## **Filtering Data**

Filter berdasarkan:

* Komoditas  
* Wilayah  
* Rentang tanggal

---

# **API Integration**

Frontend menggunakan REST API dari backend SiGALEH.

Contoh endpoint:

GET /dashboard  
GET /prediction

---

# **UI/UX**

Menggunakan:

* Responsive Design  
* Interactive Charts  
* Clean Dashboard Layout  
* Mobile Friendly Interface

---

# **Deployment**

Build production:

npm run build

Hasil build akan berada pada folder:

dist/

Frontend dapat dideploy menggunakan:

* Vercel  
* Netlify  
* Firebase Hosting  
* VPS/Nginx

---

# **SiGALEH Backend**

Backend API untuk aplikasi **SiGALEH (Sistem Informasi Harga dan Analisis Pangan)** yang digunakan untuk pengolahan, analisis, dan penyajian data harga komoditas pangan.

Backend ini menyediakan endpoint REST API untuk:

* Pengambilan data harga pangan  
* Analisis tren harga  
* Dashboard statistik  
* Prediksi berbasis AI/ML  
* Integrasi database  
* Manajemen data komoditas dan wilayah

---

## **Tech Stack**

* **Node.js**  
* **Express.js**  
* **PostgreSQL/Supabase**  
* **Python FastAPI** (AI/Prediction Service)  
* **JWT Authentication**  
* **REST API**

---

# **Installation**

## **1\. Clone Repository**

git clone https://github.com/kenangbanyu/Sigaleh\_backend.git

cd Sigaleh\_backend

---

## **2\. Install Dependencies**

npm install

---

## **3\. Setup Environment Variables**

Buat file `.env`:

DATABASE\_URL=databaseURL

DATABASE\_PASSWORD=password

JWT\_SECRET=secret

JWT\_EXPIRES\_IN=duration

UPSTASH\_REDIS\_REST\_URL=cacheURL

UPSTASH\_REDIS\_REST\_TOKEN=token

ML\_SERVICE\_URL=MLserviceURL

---

## **4\. Jalankan Server**

Mode development:

npm run start:dev

Mode production:

npm run start:prod

Server akan berjalan di:

http://localhost:3000

---

# **Database**

Project ini menggunakan **PostgreSQL di dalam Supabase** sebagai database utama.

Pastikan:

* Project Supabase sudah berjalan  
* Database sudah dibuat  
* Environment database sudah sesuai

---

# **API Endpoints**

### **GET `/dashboard`**

Mengambil data dashboard utama untuk komoditas dan wilayah tertentu.

### **Query Parameters**

| Parameter | Type | Required | Description |
| ----- | ----- | ----- | ----- |
| komoditas | string | ✅ | Nama komoditas |
| wilayah | string | ✅ | Nama wilayah |

---

### **Example Request**

GET /dashboard?komoditas=Beras\&wilayah=Padang

---

### **Response**

{  
  "komoditas": "Beras",  
  "wilayah": "Padang",

  "metrics": {  
    "harga\_terakhir": 14500,  
    "delta\_harian\_pct": 1.25,  
    "delta\_mingguan\_pct": 3.41,  
    "rata\_rata\_30\_hari": 14250,  
    "rata\_rata\_ytd": 13980  
  },

  "evaluation": {  
    "mae": 120.45,  
    "rmse": 180.32,  
    "mape": 4.21,  
    "da": 72.15  
  },

  "evaluation\_interpretation": {  
    "mape\_status": "Sangat Baik",  
    "mape\_color": "\#10b981",  
    "da\_status": "Baik",  
    "interpretation": "Model LSTM akurat dengan MAPE 4.21% dan cocok untuk early warning distribusi."  
  },

  "early\_warning": {  
    "status": "WASPADA",  
    "baseline": 14000,  
    "threshold\_waspada": 15400,  
    "threshold\_kritis": 16800,  
    "signals": \[  
      {  
        "hari\_ke": 1,  
        "tanggal": "2026-06-05T00:00:00.000Z",  
        "harga\_prediksi": 15550,  
        "baseline": 14000,  
        "pct\_change": 11.07,  
        "level": "WASPADA"  
      }  
    \]  
  },

  "lead\_time\_analysis": {  
    "hari\_ke": 3,  
    "category": "CUKUP",  
    "assessment": "Sinyal cukup — masih ada waktu koordinasi distribusi."  
  },

  "charts": {  
    "historical": \[  
      {  
        "tanggal": "2026-05-01T00:00:00.000Z",  
        "harga\_actual": 14200,  
        "harga\_prediksi": 14150  
      }  
    \],

    "future": \[  
      {  
        "tanggal": "2026-06-05T00:00:00.000Z",  
        "harga\_prediksi": 15550  
      }  
    \]  
  },

  "moving\_average": {  
    "ma7": \[  
      {  
        "tanggal": "2026-05-01T00:00:00.000Z",  
        "value": 14120  
      }  
    \],

    "ma30": \[  
      {  
        "tanggal": "2026-05-01T00:00:00.000Z",  
        "value": 13980  
      }  
    \]  
  },

  "analytics": {  
    "residuals": \[  
      {  
        "tanggal": "2026-05-01T00:00:00.000Z",  
        "actual": 14200,  
        "predicted": 14150,  
        "residual": 50  
      }  
    \],

    "errors": \[  
      \-50,  
      30,  
      10  
    \],

    "scatter": \[  
      {  
        "actual": 14200,  
        "predicted": 14150  
      }  
    \],

    "monthly\_breakdown": \[  
      {  
        "bulan": "2026-05",  
        "mae": 120.4,  
        "mape": 4.2,  
        "n": 31,  
        "harga\_rata2": 14100  
      }  
    \]  
  },

  "distribution": {  
    "min": 13200,  
    "max": 14800,  
    "avg": 14050  
  },

  "all\_commodities": \[  
    {  
      "komoditas": "Bawang Merah",  
      "harga": 40000,  
      "harga\_sebelumnya": 39500,  
      "perubahan\_pct": 1.27,  
      "tanggal": "2026-06-04T00:00:00.000Z"  
    },  
    {  
      "komoditas": "Beras Medium",  
      "harga": 14500,  
      "harga\_sebelumnya": 14300,  
      "perubahan\_pct": 1.4,  
      "tanggal": "2026-06-04T00:00:00.000Z"  
    }  
  \]  
}

---

## **Harga Komoditas**

## **GET `/predictions`**

Mengambil data prediksi harga komoditas berdasarkan filter wilayah, komoditas, dan rentang tanggal.

---

## **Query Parameters**

| Parameter | Type | Required | Description |
| ----- | ----- | ----- | ----- |
| wilayah | string | ❌ | Filter berdasarkan wilayah |
| komoditas | string | ❌ | Filter berdasarkan komoditas |
| start | string (date) | ❌ | Tanggal awal |
| end | string (date) | ❌ | Tanggal akhir |

---

## **Example Request**

GET /predictions?wilayah=Padang\&komoditas=Beras\&start=2026-01-01\&end=2026-06-01

---

## **Response**

\[  
  {  
    "ID\_Prediksi": 1,  
    "Komoditas": "Beras",  
    "Wilayah": "Padang",  
    "Tanggal": "2026-05-01T00:00:00.000Z",  
    "Harga\_Aktual": 14200,  
    "Harga\_Prediksi": 14150,  
    "created\_at": "2026-06-01T10:00:00.000Z"  
  },  
  {  
    "ID\_Prediksi": 2,  
    "Komoditas": "Beras",  
    "Wilayah": "Padang",  
    "Tanggal": "2026-05-02T00:00:00.000Z",  
    "Harga\_Aktual": 14350,  
    "Harga\_Prediksi": 14400,  
    "created\_at": "2026-06-01T10:00:00.000Z"  
  },  
  {  
    "ID\_Prediksi": 3,  
    "Komoditas": "Beras",  
    "Wilayah": "Padang",  
    "Tanggal": "2026-06-05T00:00:00.000Z",  
    "Harga\_Aktual": null,  
    "Harga\_Prediksi": 14600,  
    "created\_at": "2026-06-01T10:00:00.000Z"  
  }  
\]

---

## **Evaluasi Model AI**

## **GET `/evaluations`**

Mengambil data evaluasi performa model AI berdasarkan wilayah dan komoditas.

---

## **Query Parameters**

| Parameter | Type | Required | Description |
| :---- | :---- | :---- | :---- |
| wilayah | string | ❌ | Filter berdasarkan wilayah |
| komoditas | string | ❌ | Filter berdasarkan komoditas |

---

## **Example Request**

GET /evaluations?wilayah=Padang\&komoditas=Beras

---

## **Response**

\[  
  {  
    "ID\_Evaluasi": 12,  
    "Komoditas": "Beras",  
    "Wilayah": "Padang",

    "MAE": 120.45,  
    "RMSE": 180.32,  
    "MAPE": 4.21,  
    "DA": 72.15,

    "created\_at": "2026-06-01T10:00:00.000Z"  
  },  
  {  
    "ID\_Evaluasi": 11,  
    "Komoditas": "Beras",  
    "Wilayah": "Padang",

    "MAE": 130.11,  
    "RMSE": 190.02,  
    "MAPE": 5.14,  
    "DA": 69.82,

    "created\_at": "2026-05-01T10:00:00.000Z"  
  }  
\]

---

# **AI Integration**

Backend mendukung integrasi dengan model AI menggunakan **FastAPI** untuk:

* Prediksi harga  
* Analisis tren  
* Forecasting komoditas pangan

Komunikasi antar service dapat menggunakan HTTP Request

---

# **Authentication**

Autentikasi menggunakan JWT.

Contoh header:

Authorization: Bearer your\_token

---

# **CORS**

Project sudah mendukung konfigurasi CORS agar API dapat diakses dari frontend berbeda origin.

Contoh:

app.use(cors())

---

# **SiGALEH AI Service**

AI Service untuk aplikasi **SiGALEH (Sistem Informasi Harga dan Analisis Pangan)** yang menyediakan endpoint API untuk inference dan prediksi harga komoditas pangan menggunakan model AI berbasis LSTM.

Service ini berfungsi sebagai komponen Machine Learning yang menerima data dari backend, melakukan proses inferensi menggunakan model yang telah dilatih, kemudian mengembalikan hasil prediksi harga komoditas untuk mendukung sistem peringatan dini lonjakan harga pangan.

Service ini bertindak sebagai penghubung antara:

* AI Model  
* Backend API  
* Frontend Dashboard

Link Model AI LSTM SIGALEH: https://drive.google.com/drive/folders/1wS-6wDPIAgJlyMMYFDdpZ2JIC6MNdqO9?usp=sharing

---

# **Tech Stack**

* **Python**  
* **FastAPI**  
* **TensorFlow / Keras**  
* **Uvicorn**  
* **Pandas**  
* **NumPy**  
* **Scikit-Learn**  
* **Joblib**

---

# **Installation**

## **1\. Clone Repository**

git clone https://github.com/RaflySyauqi21/Sigaleh\_AI\_Service.git

cd Sigaleh\_AI\_Service

---

## **2\. Install Dependencies**

pip install \-r requirements.txt

---

# **3\. Running the Service**

Menjalankan FastAPI server:

uvicorn app.main:app \--reload

Service akan berjalan di:

http://127.0.0.1:8000

---

# **API Endpoints**

## **Root Endpoint**

### **GET `/`**

Health check endpoint.

### **Response**

{

  "message": "SiGALEH AI Service Running"

}

---

## **Forecast Endpoint** 

### **POST `/forecast`** 

Digunakan untuk menghasilkan prediksi harga komoditas berdasarkan data yang dikirimkan oleh backend. 

### **Request Body**

{

  "commodity": "Cabai Merah",

  "city": "Padang"

}

---

### **Response**

{

  "komoditas": "Cabai Merah",

  "wilayah": "Padang",

  "historical\_predictions": \[

    {

      "tanggal": "2020-05-05",

      "harga\_actual": 20000,

      "harga\_prediksi": 20225.48

    }

  \],

  "future\_predictions": \[

    {

      "tanggal": "2026-04-09",

      "harga\_prediksi": 37796.89

    }

  \],

  "metrics": {

    "MAE": 2068.01,

    "RMSE": 3908.49,

    "MAPE": 4.66,

    "DA": 40.75

  },

  "error": null

}

Struktur request dan response dapat berubah mengikuti implementasi backend terbaru. 

---

# **Model Overview** 

Model yang digunakan adalah **Long Short-Term Memory (LSTM)** yang dirancang untuk melakukan forecasting harga komoditas pangan berdasarkan data historis.

Tahapan utama:

1. Data preprocessing  
2. Feature scaling menggunakan MinMaxScaler  
3. Sequence generation  
4. Training model LSTM  
5. Forecasting harga komoditas  
6. Inverse scaling hasil prediksi

Contoh load model:

from tensorflow.keras.models import load\_model

model \= load\_model('model\_lstm.keras')

---

# **Workflow**

1. Backend mengirim request ke endpoint AI Service.  
2. AI Service melakukan preprocessing data input.  
3. Model LSTM melakukan proses inferensi.  
4. Hasil prediksi dikonversi kembali ke skala harga asli.  
5. Response dikirim kembali ke backend.  
6. Frontend menampilkan hasil prediksi kepada pengguna.

---

# **Deployment** 

AI Service telah dideploy menggunakan Railway.

Base URL:

https://sigaleh.up.railway.app

Endpoint Forecast:

https://sigaleh.up.railway.app/forecast

---

# **Features**

* REST API berbasis FastAPI  
* Forecasting harga komoditas pangan  
* Integrasi dengan Backend Service  
* JSON-based API Response  
* Railway Deployment  
* Lightweight Inference Service  
* Scalable Architecture

---

# **API Documentation** 

Setelah service berjalan, dokumentasi API dapat diakses melalui:

Swagger UI:

http://127.0.0.1:8000/docs

Untuk deployment:

https://sigaleh.up.railway.app/docs

---

# **SiGALEH Data Preprocessing**

Repository preprocessing data untuk aplikasi **SiGALEH (Sistem Informasi Harga dan Analisis Pangan)** yang digunakan untuk membersihkan, mentransformasi, dan menyiapkan dataset harga pangan sebelum digunakan pada proses analisis dan pelatihan model AI.

Project ini berfokus pada:

* Data cleaning  
* Data normalization  
* Time-series preprocessing  
* Feature engineering  
* Dataset preparation untuk model LSTM

---

# **Tech Stack**

* **Python**  
* **Pandas**  
* **NumPy**  
* **Scikit-Learn**  
* **Matplotlib**  
* **Jupyter Notebook**

Library preprocessing data seperti Pandas dan Scikit-Learn umum digunakan untuk pipeline machine learning dan time-series forecasting.

---

# **Installation**

## **1\. Clone Repository**

git clone https://github.com/ZuperGilz/Sigaleh.git  
cd Sigaleh

---

# **Dataset**

Dataset yang digunakan mencakup:

* Harga komoditas pangan  
* Data historis harga  
* Data wilayah/kota  
* Tanggal transaksi  
* Statistik pasar pangan

Contoh kolom dataset:

| Column | Description |
| ----- | ----- |
| tanggal | Tanggal data harga |
| komoditas | Nama komoditas |
| wilayah | Nama wilayah |
| harga | Harga komoditas |
| satuan | Satuan harga |

---

# **Preprocessing Pipeline**

Tahapan preprocessing data:

## **1\. Data Cleaning**

* Menghapus duplicate data  
* Menangani missing values  
* Memperbaiki format data  
* Filtering invalid records

---

## **2\. Data Transformation**

* Konversi tipe data  
* Formatting tanggal  
* Resampling time-series  
* Encoding categorical data

---

## **3\. Feature Engineering**

* Moving average  
* Daily price change  
* Weekly trend  
* Rolling statistics  
* Lag features

Feature engineering penting dalam forecasting time-series untuk membantu model mengenali pola historis.

---

## **4\. Normalization**

* MinMax Scaling  
* Standardization  
* Sequence preparation untuk LSTM

---

# **Running Preprocessing**

Menjalankan preprocessing pipeline:

python preprocessing/main.py

Atau menggunakan notebook:

jupyter notebook

---

# **Data Visualization**

Repository mendukung visualisasi:

* Tren harga komoditas  
* Distribusi data  
* Missing value analysis  
* Time-series plotting

Contoh library:

* Matplotlib  
* Seaborn  
* Plotly

---

# **Output**

Hasil preprocessing akan disimpan pada folder:

data/processed/

Format output:

* CSV  
* Excel  
* Parquet

---

# **Integration**

Dataset hasil preprocessing digunakan oleh:

* AI Model LSTM  
* AI Service FastAPI  
* Backend API SiGALEH  
* Dashboard frontend

---

# **Validation**

Validasi preprocessing mencakup:

* Null checking  
* Data consistency  
* Outlier detection  
* Sequence validation

---

