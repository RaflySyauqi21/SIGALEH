import React from "react";
import { TrendingUp, TrendingDown, CloudRain, Sun } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from "recharts";

export default function MarketMoversChart({ type, data, weatherInsight }) {
  const isIncrease = type === "increase";
  const colorClass = isIncrease ? "text-rose-400" : "text-emerald-400";
  const bgClass = isIncrease ? "bg-rose-500/10 border-rose-500/20" : "bg-emerald-500/10 border-emerald-500/20";
  const barColor = isIncrease ? "#fb7185" : "#34d399"; // Rose-400 & Emerald-400
  const Icon = isIncrease ? TrendingUp : TrendingDown;
  const WeatherIcon = isIncrease ? CloudRain : Sun;

  // Format data untuk label di dalam grafik
  const chartData = data.map(item => ({
    ...item,
    // Gunakan nilai absolut agar bar chart tetap merender ke kanan, tapi labelnya tetap minus
    displayValue: Math.abs(item.perubahan),
    label: `${isIncrease ? '+' : ''}${item.perubahan}%`
  }));

  return (
    <div className={`rounded-3xl border p-6 flex flex-col h-full ${bgClass}`}>
      <div className="flex items-center gap-3 mb-4">
        <Icon size={28} className={colorClass} />
        <h3 className="text-xl font-bold text-white">
          {isIncrease ? "Top 3 Lonjakan Harga" : "Top 3 Penurunan Harga"}
        </h3>
      </div>

      {/* GRAFIK HORIZONTAL BAR */}
      <div className="w-full h-[160px] mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 30, left: -20, bottom: 0 }}>
            <XAxis type="number" hide />
            <YAxis 
              dataKey="komoditas" 
              type="category" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#e2e8f0", fontSize: 13, fontWeight: 600 }} 
              width={110}
            />
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
              formatter={(val, name, props) => [`Rp ${props.payload.harga.toLocaleString('id-ID')}`, `Harga Terakhir`]}
            />
            <Bar dataKey="displayValue" radius={[0, 6, 6, 0]} barSize={24}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={barColor} opacity={0.8} />
              ))}
              <LabelList 
                dataKey="label" 
                position="right" 
                fill={barColor} 
                fontSize={13} 
                fontWeight="bold"
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ALASAN CUACA */}
      <div className="bg-slate-950/60 p-4 rounded-xl border border-white/10 mt-auto">
        <div className="flex gap-3 items-start">
          <WeatherIcon className={`${colorClass} shrink-0 mt-1`} size={20} />
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Weather Feature Insight</p>
            <p className="text-sm text-slate-300 leading-relaxed">
              {weatherInsight}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}