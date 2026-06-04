import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const API_URL = "https://sigaleh-backend.vercel.app/dashboard";

export default function useDashboard(commodity, city, mode, startDate, endDate) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = useCallback(async () => {
    if (!commodity || !city) return;

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(API_URL, {
        params: {
          komoditas: commodity,
          wilayah: city,
          mode: mode,
          start_date: startDate || undefined,
          end_date: endDate || undefined,
        },
      });

      setData(response.data);
    } catch (err) {
      console.error("❌ Dashboard Error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Gagal mengambil data dashboard"
      );
    } finally {
      setLoading(false);
    }
  }, [commodity, city, mode, startDate, endDate]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return { data, loading, error, refetch: fetchDashboard };
}