import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine, Cell } from "recharts";

export default function ResidualChart({ data }) {
  // Hitung error = Prediksi - Aktual
  const residualData = data.map(item => ({
    tanggal: new Date(item.tanggal).toLocaleDateString("id-ID", { day: "2-digit", month: "short" }),
    error: item.harga_prediksi - item.harga_actual
  }));

  return (
    <div className="bg-[#0b1220] border border-white/10 p-6 rounded-3xl mt-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">DISTRIBUSI ERROR MODEL (RESIDUAL)</h2>
        <p className="text-slate-400 text-sm mt-1">Selisih Harga Prediksi vs Harga Aktual (30 Hari Terakhir)</p>
      </div>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={residualData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid stroke="#1e293b" vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="tanggal" stroke="#64748b" tick={{ fontSize: 12 }} />
            <YAxis stroke="#64748b" tick={{ fontSize: 12 }} tickFormatter={(val) => `${val / 1000}k`} />
            <Tooltip 
              cursor={{ fill: '#1e293b', opacity: 0.4 }}
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
              labelStyle={{ color: '#f8fafc' }}
              itemStyle={{ color: '#f8fafc' }}
              formatter={(value) => [`Rp ${value.toLocaleString('id-ID')}`, "Selisih"]}
            />
            <ReferenceLine y={0} stroke="#94a3b8" />
            <Bar dataKey="error" radius={[4, 4, 4, 4]}>
              {residualData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.error > 0 ? '#10b981' : '#059669'} opacity={0.8} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}