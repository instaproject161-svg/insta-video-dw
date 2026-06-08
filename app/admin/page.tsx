"use client";

import { useState, useEffect } from "react";
import { Download, Eye, TrendingUp, Activity, Film, Image, Video, BookOpen, Tv, LayoutGrid, User, Lock, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ADMIN_PASSWORD = "reelsave2024";

const stats = [
  { label: "Total Downloads", value: "2,847,391", change: "+12.4%", icon: Download, color: "text-primary" },
  { label: "Page Views (30d)", value: "18,542,088", change: "+8.7%", icon: Eye, color: "text-blue-400" },
  { label: "Downloads Today", value: "94,231", change: "+3.1%", icon: TrendingUp, color: "text-green-400" },
  { label: "Active Sessions", value: "12,847", change: "+0.8%", icon: Activity, color: "text-amber-400" },
];

const topDownloaders = [
  { type: "Reels", icon: Film, count: 1240882, pct: 43 },
  { type: "Video", icon: Video, count: 682440, pct: 24 },
  { type: "Photo", icon: Image, count: 398632, pct: 14 },
  { type: "Story", icon: BookOpen, count: 284739, pct: 10 },
  { type: "IGTV", icon: Tv, count: 113895, pct: 4 },
  { type: "Carousel", icon: LayoutGrid, count: 85421, pct: 3 },
  { type: "Profile", icon: User, count: 56882, pct: 2 },
];

const recentActivity = [
  { action: "Video downloaded", url: "instagram.com/p/abc123", time: "2s ago", status: "success" },
  { action: "Reel downloaded", url: "instagram.com/reel/xyz789", time: "5s ago", status: "success" },
  { action: "Photo downloaded", url: "instagram.com/p/def456", time: "12s ago", status: "success" },
  { action: "Story download", url: "instagram.com/stories/…", time: "18s ago", status: "failed" },
  { action: "IGTV downloaded", url: "instagram.com/tv/ghi012", time: "24s ago", status: "success" },
  { action: "Carousel downloaded", url: "instagram.com/p/jkl345", time: "31s ago", status: "success" },
  { action: "Profile downloaded", url: "instagram.com/mno678", time: "45s ago", status: "success" },
  { action: "Reel downloaded", url: "instagram.com/reel/pqr901", time: "58s ago", status: "success" },
];

function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem("adminAuth", "true");
        onLogin();
      } else {
        setError("Invalid password");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Admin Access</h1>
          <p className="text-sm text-muted-foreground mt-1">Enter password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12"
            autoFocus
          />
          {error && <p className="text-sm text-destructive text-center">{error}</p>}
          <Button type="submit" className="w-full h-12" disabled={loading}>
            {loading ? "Verifying..." : "Access Dashboard"}
          </Button>
        </form>
      </div>
    </main>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  return (
    <main className="min-h-screen bg-background px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1 text-sm">ReelSave analytics overview — mock data</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Live
            </div>
            <Button variant="outline" size="sm" onClick={onLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="glass-card rounded-2xl p-5">
              <div className="flex items-start justify-between mb-4">
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <p className="text-2xl font-bold text-foreground mb-1">{s.value}</p>
              <p className="text-xs text-green-400 font-medium">{s.change} vs last month</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Top Downloader Types</h2>
            <div className="space-y-4">
              {topDownloaders.map((item) => (
                <div key={item.type}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <item.icon className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground font-medium">{item.type}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">{item.count.toLocaleString()}</span>
                      <span className="text-xs font-semibold text-foreground w-8 text-right">{item.pct}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-700"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${item.status === "success" ? "bg-green-400" : "bg-destructive"}`} />
                    <div className="min-w-0">
                      <p className="text-sm text-foreground font-medium">{item.action}</p>
                      <p className="text-xs text-muted-foreground truncate">{item.url}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0 ml-3">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = sessionStorage.getItem("adminAuth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <Dashboard onLogout={handleLogout} />;
}
