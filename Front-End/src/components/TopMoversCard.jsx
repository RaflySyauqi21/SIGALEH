import { TrendingUp, TrendingDown } from "lucide-react";

export default function TopMoversCard({ type, data }) {
  const isIncrease = type === "increase";
  const colorClass = isIncrease ? "text-emerald-400" : "text-rose-400";
  const bgClass = isIncrease ? "bg-emerald-500/10 border-emerald-500/20" : "bg-rose-500/10 border-rose-500/20";
  const Icon = isIncrease ? TrendingUp : TrendingDown;

  if (!data) return null; // Atau tampilkan skeleton

  return (
    <div className={`p-6 rounded-3xl border flex items-center justify-between ${bgClass}`}>
      <div>
        <p className="text-slate-400 text-sm mb-1">
          {isIncrease ? "Lonjakan Harga Tertinggi (Hari Ini)" : "Penurunan Harga Tertinggi (Hari Ini)"}
        </p>
        <h3 className="text-2xl font-bold text-white">{data.komoditas}</h3>
        <p className="text-slate-300 text-sm mt-1">{data.wilayah}</p>
      </div>
      
      <div className="text-right">
        <div className={`flex items-center gap-2 justify-end ${colorClass}`}>
          <Icon size={24} />
          <span className="text-2xl font-bold">{data.persentase}%</span>
        </div>
        <p className="text-slate-400 text-sm mt-1">
          Rp {Number(data.harga_sekarang).toLocaleString('id-ID')}
        </p>
      </div>
    </div>
  );
}