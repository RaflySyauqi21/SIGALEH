import React from "react";

export default function DataTable({ data, defaultKomoditas, defaultWilayah }) {
  if (!data || data.length === 0) {
    return (
      <p className="text-slate-400 text-sm mt-4">
        Tidak ada data untuk rentang ini.
      </p>
    );
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#0f172a" }}>
            <th style={th}>Tanggal</th>
            <th style={th}>Komoditas</th>
            <th style={th}>Wilayah</th>
            <th style={th}>Harga Aktual</th>
            <th style={th}>Harga Prediksi</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={index} style={{ borderBottom: "1px solid #1e293b" }}>
              <td style={td}>
                {new Date(item.Tanggal || item.tanggal).toLocaleDateString(
                  "id-ID"
                )}
              </td>
              <td style={td}>
                {item.Komoditas || item.komoditas || defaultKomoditas || "-"}
              </td>
              <td style={td}>
                {item.Wilayah || item.wilayah || defaultWilayah || "-"}
              </td>
              <td style={td}>
                {item.Harga_Aktual || item.harga_actual
                  ? `Rp ${Number(
                      item.Harga_Aktual || item.harga_actual
                    ).toLocaleString("id-ID")}`
                  : "-"}
              </td>
              <td style={td}>
                {item.Harga_Prediksi || item.harga_prediksi
                  ? `Rp ${Number(
                      item.Harga_Prediksi || item.harga_prediksi
                    ).toLocaleString("id-ID")}`
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th = {
  textAlign: "left",
  padding: "12px",
  fontSize: "14px",
  fontWeight: "600",
  color: "#94a3b8",
};

const td = {
  padding: "10px 12px",
  fontSize: "14px",
  color: "#f1f5f9",
};