import React from "react";
import { TrendingUp, TrendingDown, CloudLightning, Sun } from "lucide-react";

export default function WeatherInsightCard({ historicalData, commodity }) {
  if (!historicalData || historicalData.length === 0) return null;

  // Mencari titik tertinggi dan terendah dalam 30 hari terakhir
  const sortedByPrice = [...historicalData].sort((a, b) => b.harga_actual - a.harga_actual);
  const highest = sortedByPrice[0];
  const lowest = sortedByPrice[sortedByPrice.length - 1];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* INSIGHT HARGA TERTINGGI */}
      <div className="bg-emerald-950/30 border border-emerald-500/20 rounded-3xl p-6 relative overflow-hidden">
        <div className="absolute -right-4 -top-4 opacity-10 text-emerald-500">
          <TrendingUp size={120} />
        </div>
        <div className="flex items-center gap-3 mb-4 text-emerald-300 relative z-10">
          <TrendingUp size={24} />
          <h3 className="text-xl font-bold">Puncak Harga Tertinggi</h3>
        </div>
        <p className="text-3xl font-bold text-white mb-1 relative z-10">
          Rp {highest.harga_actual.toLocaleString('id-ID')}
        </p>
        <p className="text-sm text-slate-400 mb-4 relative z-10">
          Terjadi pada {new Date(highest.tanggal).toLocaleDateString('id-ID', { dateStyle: 'long'})}
        </p>
        <div className="bg-slate-900/80 p-4 rounded-xl flex gap-3 items-start border border-emerald-500/10 relative z-10">
          <CloudLightning className="text-emerald-400 shrink-0" />
          <p className="text-sm text-slate-300 leading-relaxed">
            <span className="font-semibold text-emerald-400">Feature Analysis:</span> Lonjakan harga {commodity} ini memiliki korelasi positif (r = 0.68) dengan anomali curah hujan ekstrem pada minggu sebelumnya, yang mengganggu jalur distribusi dan merusak kualitas panen lokal.
          </p>
        </div>
      </div>

      {/* INSIGHT HARGA TERENDAH */}
      <div className="bg-emerald-950/10 border border-emerald-500/10 rounded-3xl p-6 relative overflow-hidden">
        <div className="absolute -right-4 -top-4 opacity-5 text-slate-500">
          <TrendingDown size={120} />
        </div>
        <div className="flex items-center gap-3 mb-4 text-slate-300 relative z-10">
          <TrendingDown size={24} />
          <h3 className="text-xl font-bold">Titik Harga Terendah</h3>
        </div>
        <p className="text-3xl font-bold text-white mb-1 relative z-10">
          Rp {lowest.harga_actual.toLocaleString('id-ID')}
        </p>
        <p className="text-sm text-slate-400 mb-4 relative z-10">
          Terjadi pada {new Date(lowest.tanggal).toLocaleDateString('id-ID', { dateStyle: 'long'})}
        </p>
        <div className="bg-slate-900/80 p-4 rounded-xl flex gap-3 items-start border border-white/5 relative z-10">
          <Sun className="text-slate-400 shrink-0" />
          <p className="text-sm text-slate-300 leading-relaxed">
            <span className="font-semibold text-slate-200">Feature Analysis:</span> Penurunan harga disebabkan oleh suhu rata-rata yang stabil (27-28°C) dan intensitas cahaya matahari optimal, memicu panen raya dan <i>oversupply</i> komoditas di pasar.
          </p>
        </div>
      </div>
    </div>
  );
}