import React from "react";
import { TrendingUp, TrendingDown, CloudRain, Sun } from "lucide-react";

export default function MarketMoversCard({ type, data, weatherInsight }) {
  const isIncrease = type === "increase";
  const colorClass = isIncrease ? "text-rose-400" : "text-emerald-400";
  const bgClass = isIncrease ? "bg-rose-500/10 border-rose-500/20" : "bg-emerald-500/10 border-emerald-500/20";
  const Icon = isIncrease ? TrendingUp : TrendingDown;
  const WeatherIcon = isIncrease ? CloudRain : Sun;

  return (
    <div className={`rounded-3xl border p-6 flex flex-col h-full ${bgClass}`}>
      <div className="flex items-center gap-3 mb-6">
        <Icon size={28} className={colorClass} />
        <h3 className="text-xl font-bold text-white">
          {isIncrease ? "Top 3 Lonjakan Harga" : "Top 3 Penurunan Harga"}
        </h3>
      </div>

      {/* List Komoditas */}
      <div className="space-y-4 mb-6 flex-1">
        {data.map((item, index) => (
          <div key={index} className="flex justify-between items-center bg-slate-950/40 p-3 rounded-xl border border-white/5">
            <div>
              <p className="font-semibold text-slate-200">{item.komoditas}</p>
              <p className="text-sm text-slate-400">Rp {item.harga.toLocaleString('id-ID')}</p>
            </div>
            <div className={`font-bold ${colorClass} bg-slate-900 px-3 py-1 rounded-lg`}>
              {isIncrease ? "+" : ""}{item.perubahan_pct}%
            </div>
          </div>
        ))}
      </div>

      {/* Alasan Cuaca (Weather Reasoning) */}
      <div className="bg-slate-950/60 p-4 rounded-xl border border-white/10 mt-auto">
        <div className="flex gap-3 items-start">
          <WeatherIcon className={`${colorClass} shrink-0 mt-1`} size={20} />
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Weather Insight</p>
            <p className="text-sm text-slate-300 leading-relaxed">
              {weatherInsight}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}