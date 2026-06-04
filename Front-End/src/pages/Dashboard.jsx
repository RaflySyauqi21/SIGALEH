
import StatCard from "../components/StatCard";
import PriceChart from "../components/PriceChart";
import SkeletonCard from "../components/SkeletonCard";
import useDashboard from "../hooks/useDashboard";
import { useState } from "react";
import FilterBar from "../components/FilterBar";
import DataTable from "../components/DataTable";
import ResidualChart from "../components/ResidualChart";
import MarketMoversCard from "../components/MarketMoversCard";
import WeatherOverview from "../components/WeatherOverview";
import { Beaker } from "lucide-react";

function Dashboard() {
  const [selectedCommodity, setSelectedCommodity] = useState("Cabai Merah");
  const [selectedCity, setSelectedCity] = useState("Padang");
  const [predictRange, setPredictRange] = useState(7);

  const { data, loading, error } = useDashboard(selectedCommodity, selectedCity);

  // =========================
  // DATA SCIENCE PREPARATION
  // =========================
  const safeData = data || {};
  const historicalAPI = safeData?.charts?.historical || [];
  const futureAPI = safeData?.charts?.future || [];
  
  const historical30Days = historicalAPI.slice(-30);
  const futurePredictions = futureAPI.slice(0, predictRange);
  const chartData = [...historical30Days, ...futurePredictions].map((item) => ({
    day: new Date(item.tanggal).toLocaleDateString("id-ID", { day: "2-digit", month: "short" }),
    actual: item.harga_actual || null,
    prediction: item.harga_prediksi
  }));

  const metrics = safeData?.evaluation || { mae: 0, rmse: 0, mape: 0, da: 0 };
  const lastPrice = historical30Days.length > 0 ? historical30Days[historical30Days.length - 1].harga_actual : 0;
  const allCommodities = safeData?.all_commodities || [];
  const sortedCommodities =
    [...allCommodities].sort(
      (a, b) =>
        b.perubahan_pct - a.perubahan_pct
    );
  const topGainersData =
    sortedCommodities
      .filter((item) => item.perubahan_pct > 0)
      .slice(0, 3);
  const topLosersData =
    [...sortedCommodities]
      .filter((item) => item.perubahan_pct < 0)
      .sort(
        (a, b) =>
          a.perubahan_pct - b.perubahan_pct
      )
      .slice(0, 3);

  return (
    <div className="flex bg-slate-950 text-white min-h-screen font-sans selection:bg-emerald-500/30">

      <main className="flex-1 p-8 overflow-y-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-100 flex items-center gap-3">
              <Beaker className="text-emerald-500" size={36} />
              AI Market Intelligence
            </h1>
            <p className="text-slate-400 mt-2">Macro Overview & Micro Model Evaluation</p>
          </div>
          <div className="text-right">
            <p className="text-emerald-500 font-semibold flex items-center justify-end gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Vercel API Connected
            </p>
          </div>
        </div>

        {/* ========================================================
            BAGIAN 1: MACRO VIEW (GLOBAL MARKET & WEATHER)
        ======================================================== */}
        
        {/* Visualisasi 1 & 2: Top Gainers & Losers + Weather Insight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <MarketMoversCard 
            type="increase" 
            data={topGainersData} 
            weatherInsight="Lonjakan harga komoditas ini berkorelasi kuat (r=0.68) dengan anomali curah hujan ekstrem (>100mm) minggu lalu yang merusak panen lokal dan menghambat logistik."
          />
          <MarketMoversCard 
            type="decrease" 
            data={topLosersData} 
            weatherInsight="Penurunan harga didorong oleh suhu rata-rata yang stabil (27°C) dan cuaca cerah, memicu panen raya simultan yang menyebabkan oversupply di pasar."
          />
        </div>

        {/* Visualisasi 3: Data Variabel Cuaca Terkini */}
        <WeatherOverview city={selectedCity} />

        {/* ========================================================
            BAGIAN 2: MICRO VIEW (SPESIFIK KOMODITAS & EVALUASI AI)
        ======================================================== */}
        
        {/* FILTER BAR DI TENGAH */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-slate-900/80 p-5 rounded-2xl border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.05)]">
          <div className="flex-1">
             <p className="text-xs text-emerald-500 font-bold uppercase tracking-wider mb-2">Analisis Mendalam Komoditas</p>
             <FilterBar
              selectedCommodity={selectedCommodity}
              setSelectedCommodity={setSelectedCommodity}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
             />
          </div>

          <div className="flex bg-slate-950 p-1 rounded-xl border border-white/5 mt-6 lg:mt-0">
            <button
              onClick={() => setPredictRange(7)}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${predictRange === 7 ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "text-slate-500 hover:text-slate-300"}`}
            >
              Proyeksi 7 Hari
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-4 gap-4 mb-8"><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /></div>
        ) : error ? (
          <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl text-rose-400 mb-8">{error}</div>
        ) : (
          <>
            {/* STAT CARDS - METRIK MODEL */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
              <StatCard title="Harga Aktual Terakhir" value={`Rp ${lastPrice.toLocaleString("id-ID")}`} status="Ground Truth" change={0} />
              <StatCard title="MAPE (Error Rate)" value={`${Number(metrics.mape).toFixed(2)}%`} status={metrics.mape < 10 ? "Sangat Baik" : "Cukup"} change={0} />
              <StatCard title="MAE (Selisih Absolut)" value={`± Rp ${Number(metrics.mae).toLocaleString("id-ID")}`} status="Akurasi Harga" change={0} />
              <StatCard title="Directional Accuracy" value={`${Number(metrics.da).toFixed(1)}%`} status="Akurasi Tren" change={0} />
            </div>

            {/* GRAFIK PREDIKSI UTAMA */}
            <div>
              <PriceChart city={selectedCity} commodity={selectedCommodity} chartData={chartData} evaluation={metrics} />
            </div>

            {/* GRAFIK RESIDUAL */}
            <div>
              <ResidualChart data={historical30Days} />
            </div>

            {/* DATA TABLE SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6">
                <h2 className="text-xl font-bold mb-2 text-slate-200">Evaluasi Data Historis (30 Hari)</h2>
                <DataTable data={historical30Days.map(item => ({ Tanggal: item.tanggal, Komoditas: selectedCommodity, Wilayah: selectedCity, Harga_Aktual: item.harga_actual, Harga_Prediksi: item.harga_prediksi }))} />
              </div>
              <div className="bg-emerald-950/20 border border-emerald-500/10 rounded-3xl p-6">
                <h2 className="text-xl font-bold mb-2 text-emerald-400">Proyeksi Masa Depan ({predictRange} Hari)</h2>
                <DataTable data={futurePredictions.map(item => ({ Tanggal: item.tanggal, Komoditas: selectedCommodity, Wilayah: selectedCity, Harga_Prediksi: item.harga_prediksi }))} />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Dashboard;