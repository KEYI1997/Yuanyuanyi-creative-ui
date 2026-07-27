"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

interface PageView {
  id: string;
  ip: string;
  page: string;
  referrer: string;
  referrer_domain: string;
  user_agent: string;
  created_at: string;
}

interface IpCount {
  ip: string;
  count: number;
}

type TimeRange = "year" | "month" | "day";

export default function AnalyticsPage() {
  const [views, setViews] = useState<PageView[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<TimeRange>("year");
  const [visitorLimit, setVisitorLimit] = useState(10);
  const [ipLimit, setIpLimit] = useState(10);

  const fetchData = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("page_views")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) {
        setViews(data);
      }
    } catch (e) {
      console.error("Failed to fetch page views:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // === 計算統計數據 ===
  const totalViews = views.length;

  const getSourceCount = (keyword: string) => {
    return views.filter(
      (v) => v.referrer_domain?.toLowerCase().includes(keyword.toLowerCase())
    ).length;
  };

  const googleCount = getSourceCount("google");
  const facebookCount = getSourceCount("facebook");
  const lineCount = getSourceCount("line");
  const instagramCount = getSourceCount("instagram");

  // 最近 5 分鐘內的活躍訪客
  const now = new Date();
  const fiveMinAgo = new Date(now.getTime() - 5 * 60 * 1000);
  const activeUsers = new Set(
    views.filter((v) => new Date(v.created_at) > fiveMinAgo).map((v) => v.ip)
  ).size;

  // === 圖表數據 ===
  const getChartData = () => {
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    if (timeRange === "year") {
      const months = Array.from({ length: 12 }, (_, i) => ({
        label: `${String(i + 1).padStart(2, "0")}月`,
        count: 0,
      }));
      views.forEach((v) => {
        const d = new Date(v.created_at);
        if (d.getFullYear() === currentYear) {
          months[d.getMonth()].count++;
        }
      });
      return months;
    }

    if (timeRange === "month") {
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      const days = Array.from({ length: daysInMonth }, (_, i) => ({
        label: `${i + 1}`,
        count: 0,
      }));
      views.forEach((v) => {
        const d = new Date(v.created_at);
        if (d.getFullYear() === currentYear && d.getMonth() === currentMonth) {
          days[d.getDate() - 1].count++;
        }
      });
      return days;
    }

    // day: 當天每小時
    const hours = Array.from({ length: 24 }, (_, i) => ({
      label: `${String(i).padStart(2, "0")}:00`,
      count: 0,
    }));
    const today = now.toDateString();
    views.forEach((v) => {
      const d = new Date(v.created_at);
      if (d.toDateString() === today) {
        hours[d.getHours()].count++;
      }
    });
    return hours;
  };

  const chartData = getChartData();
  const maxCount = Math.max(...chartData.map((d) => d.count), 1);
  const yearTotal = views.filter(
    (v) => new Date(v.created_at).getFullYear() === now.getFullYear()
  ).length;

  // === IP 點擊次數 ===
  const getIpCounts = (): IpCount[] => {
    const map: Record<string, number> = {};
    views.forEach((v) => {
      map[v.ip] = (map[v.ip] || 0) + 1;
    });
    return Object.entries(map)
      .map(([ip, count]) => ({ ip, count }))
      .sort((a, b) => b.count - a.count);
  };

  const ipCounts = getIpCounts();

  // === 時間格式化 ===
  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d
      .toLocaleString("zh-TW", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
      .replace(/\//g, "-");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-cta" />
      </div>
    );
  }

  return (
    <div>
      <p className="text-xs font-bold tracking-[.14em] text-cta">ANALYTICS</p>
      <h1 className="mt-2 text-3xl sm:text-4xl">網站數據總覽</h1>
      <p className="mt-3 text-sm text-muted">即時追蹤網站流量、來源分佈與訪客行為。</p>

      {/* 統計卡片 */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="總瀏覽人次" value={totalViews} color="text-primary" />
        <StatCard label="來自 Google" value={googleCount} color="text-blue-600" />
        <StatCard label="來自 Facebook" value={facebookCount} color="text-indigo-600" />
        <StatCard label="來自 LINE" value={lineCount} color="text-green-600" />
      </div>

      {/* 活躍使用者 + 圖表 */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-4">
        {/* 活躍使用者卡片 */}
        <div className="flex flex-col items-center justify-center border border-border bg-gradient-to-br from-emerald-50 to-white p-6">
          <p className="text-sm font-medium text-muted">目前</p>
          <p className="text-sm text-muted">網站上有</p>
          <p className="my-3 text-5xl font-bold text-cta">{activeUsers}</p>
          <p className="text-sm text-muted">位活躍使用者</p>
        </div>

        {/* 流量圖表 */}
        <div className="border border-border bg-white p-6 lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold">
              {timeRange === "year" &&
                `${now.getFullYear()}年瀏覽人數：${yearTotal.toLocaleString()}人`}
              {timeRange === "month" &&
                `${now.getFullYear()}年${now.getMonth() + 1}月瀏覽人數：${chartData
                  .reduce((s, d) => s + d.count, 0)
                  .toLocaleString()}人`}
              {timeRange === "day" &&
                `今日瀏覽人數：${chartData
                  .reduce((s, d) => s + d.count, 0)
                  .toLocaleString()}人`}
            </h3>
            <div className="flex overflow-hidden border border-border">
              {(["year", "month", "day"] as TimeRange[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeRange(t)}
                  className={`cursor-pointer px-3 py-1 text-sm transition ${
                    timeRange === t
                      ? "bg-cta text-white"
                      : "bg-white text-muted hover:bg-gray-100"
                  }`}
                >
                  {t === "year" ? "年" : t === "month" ? "月" : "日"}
                </button>
              ))}
            </div>
          </div>

          {/* SVG 面積圖 */}
          <div className="w-full overflow-x-auto">
            <svg
              viewBox={`0 0 ${Math.max(chartData.length * 50, 600)} 250`}
              className="h-48 w-full md:h-56"
              preserveAspectRatio="xMinYMid meet"
            >
              {/* Y軸刻度線 */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                const y = 220 - ratio * 200;
                const val = Math.round(maxCount * ratio);
                return (
                  <g key={ratio}>
                    <line
                      x1="40"
                      y1={y}
                      x2={chartData.length * 50}
                      y2={y}
                      stroke="#e5e7eb"
                      strokeWidth="0.5"
                    />
                    <text
                      x="35"
                      y={y + 4}
                      textAnchor="end"
                      fontSize="10"
                      fill="#6b7280"
                    >
                      {val}
                    </text>
                  </g>
                );
              })}
              {/* 面積 */}
              <path
                d={`M 50 220 ${chartData
                  .map(
                    (d, i) =>
                      `L ${
                        50 +
                        i *
                          ((chartData.length * 50 - 60) /
                            (chartData.length - 1 || 1))
                      } ${220 - (d.count / maxCount) * 200}`
                  )
                  .join(" ")} L ${
                  50 +
                  (chartData.length - 1) *
                    ((chartData.length * 50 - 60) / (chartData.length - 1 || 1))
                } 220 Z`}
                fill="rgba(22, 163, 74, 0.12)"
              />
              {/* 線 */}
              <polyline
                points={chartData
                  .map(
                    (d, i) =>
                      `${
                        50 +
                        i *
                          ((chartData.length * 50 - 60) /
                            (chartData.length - 1 || 1))
                      },${220 - (d.count / maxCount) * 200}`
                  )
                  .join(" ")}
                fill="none"
                stroke="#16a34a"
                strokeWidth="2"
              />
              {/* X軸標籤 */}
              {chartData.map((d, i) => {
                const x =
                  50 +
                  i *
                    ((chartData.length * 50 - 60) / (chartData.length - 1 || 1));
                const showLabel =
                  timeRange === "year" ||
                  timeRange === "day" ||
                  i % 5 === 0;
                return showLabel ? (
                  <text
                    key={i}
                    x={x}
                    y={238}
                    textAnchor="middle"
                    fontSize="9"
                    fill="#6b7280"
                  >
                    {d.label}
                  </text>
                ) : null;
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* 訪客列表 + IP 點擊次數 */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 訪客列表 */}
        <div className="overflow-hidden border border-border bg-white">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <h3 className="font-semibold">訪客</h3>
            <button
              onClick={() => setVisitorLimit((prev) => prev + 20)}
              className="cursor-pointer bg-cta px-3 py-1 text-xs text-white transition hover:bg-cta-hover"
            >
              看更多
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-dark text-white">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">進入時間</th>
                  <th className="px-3 py-2 text-left font-medium">IP</th>
                  <th className="px-3 py-2 text-left font-medium">進入頁面</th>
                  <th className="px-3 py-2 text-left font-medium">來源網域</th>
                </tr>
              </thead>
              <tbody>
                {views.slice(0, visitorLimit).map((v, i) => (
                  <tr
                    key={v.id}
                    className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="whitespace-nowrap px-3 py-2 text-xs">
                      {formatTime(v.created_at)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2">{v.ip}</td>
                    <td className="whitespace-nowrap px-3 py-2">
                      {v.page || "/"}
                    </td>
                    <td className="px-3 py-2">
                      {v.referrer_domain ? (
                        <span className="rounded bg-gray-200 px-2 py-0.5 text-xs text-gray-700">
                          {v.referrer_domain}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">直接</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* IP 點擊次數 */}
        <div className="overflow-hidden border border-border bg-white">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <h3 className="font-semibold">IP 點擊次數</h3>
            <button
              onClick={() => setIpLimit((prev) => prev + 20)}
              className="cursor-pointer bg-cta px-3 py-1 text-xs text-white transition hover:bg-cta-hover"
            >
              看更多
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-dark text-white">
                <tr>
                  <th className="px-3 py-2 text-center font-medium">IP</th>
                  <th className="px-3 py-2 text-center font-medium">點擊數</th>
                </tr>
              </thead>
              <tbody>
                {ipCounts.slice(0, ipLimit).map((item, i) => (
                  <tr
                    key={item.ip}
                    className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-3 py-2 text-center">
                      <span className="text-cta">{item.ip}</span>
                    </td>
                    <td className="px-3 py-2 text-center">{item.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="border border-border bg-white p-5 transition hover:border-cta">
      <p className="mb-1 text-sm text-muted">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value.toLocaleString()}</p>
    </div>
  );
}
