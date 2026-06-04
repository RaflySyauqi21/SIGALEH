import React from "react";
import { CloudRain, ThermometerSun, Wind } from "lucide-react";

export default function WeatherOverview({ city }) {
  return (
    <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 mb-8">
      <h3 className="text-lg font-bold text-slate-200 mb-4">Kondisi Cuaca Terkini - {city}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-950/50 p-4 rounded-2xl flex items-center gap-4">
          <div className="bg-orange-500/20 p-3 rounded-xl text-orange-400"><ThermometerSun size={24} /></div>
          <div>
            <p className="text-sm text-slate-400">Suhu Rata-rata</p>
            <p className="text-2xl font-bold text-white">27.5°C</p>
          </div>
        </div>
        <div className="bg-slate-950/50 p-4 rounded-2xl flex items-center gap-4">
          <div className="bg-blue-500/20 p-3 rounded-xl text-blue-400"><CloudRain size={24} /></div>
          <div>
            <p className="text-sm text-slate-400">Curah Hujan (30H)</p>
            <p className="text-2xl font-bold text-white">142 mm</p>
          </div>
        </div>
        <div className="bg-slate-950/50 p-4 rounded-2xl flex items-center gap-4">
          <div className="bg-emerald-500/20 p-3 rounded-xl text-emerald-400"><Wind size={24} /></div>
          <div>
            <p className="text-sm text-slate-400">Kecepatan Angin</p>
            <p className="text-2xl font-bold text-white">12 km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
}