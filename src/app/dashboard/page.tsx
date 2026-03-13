'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Target, 
  ArrowUpRight, 
  ArrowDownRight,
  Plus,
  RefreshCw,
  Calendar,
  LogOut,
  Bell,
  Sparkles,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { KPICard } from '@/components/dashboard/KPICard';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import { CampaignTable } from '@/components/dashboard/CampaignTable';
import { AIPanel } from '@/components/dashboard/AIPanel';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [dateRange, setDateRange] = useState('Last 7 Days');

  return (
    <div className="flex h-screen bg-[#050505] text-white selection:bg-purple-500/30">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-black/40 backdrop-blur-xl flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <BarChart3 className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight">AdCommand</span>
          </div>

          <nav className="space-y-1">
            {['Overview', 'Campaigns', 'Audiences', 'Creatives', 'Settings'].map((item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all group",
                  activeTab === item 
                    ? "bg-white/10 text-white" 
                    : "text-white/50 hover:text-white hover:bg-white/5"
                )}
              >
                {item === 'Overview' && <BarChart3 className="w-4 h-4" />}
                {item === 'Campaigns' && <Target className="w-4 h-4" />}
                {item === 'Audiences' && <Users className="w-4 h-4" />}
                {item === 'Creatives' && <TrendingUp className="w-4 h-4" />}
                {item === 'Settings' && <Plus className="w-4 h-4" />}
                {item}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/5 group cursor-pointer hover:bg-white/10 transition-all">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500" />
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">Carlos Hidalgo</p>
              <p className="text-xs text-white/40 truncate">Admin</p>
            </div>
            <LogOut className="w-4 h-4 text-white/20 group-hover:text-white/60" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-white/5 bg-black/20 backdrop-blur-md flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold">{activeTab}</h1>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2 text-sm text-white/50 bg-white/5 px-3 py-1.5 rounded-full border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
              <Calendar className="w-3.5 h-3.5" />
              <span>{dateRange}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-purple-500 transition-colors" />
              <Input 
                placeholder="Search campaigns..." 
                className="w-64 pl-10 bg-white/5 border-white/5 focus-visible:ring-purple-500/50 focus-visible:border-purple-500/50 transition-all"
              />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-white/60" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full border-2 border-[#050505]" />
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white border-0 shadow-lg shadow-purple-500/20">
              <Plus className="w-4 h-4 mr-2" />
              Sync Now
            </Button>
          </div>
        </header>

        <ScrollArea className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <KPICard title="Total Spend" value="$14,205" trend={12.5} />
              <KPICard title="ROAS" value="3.85x" trend={8.2} />
              <KPICard title="CTR" value="2.14%" trend={-2.4} />
              <KPICard title="Conversions" value="1,240" trend={15.1} />
            </div>

            {/* Performance Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <PerformanceChart data={[]} />
              </div>
              <div className="h-full">
                <div className="h-full p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col justify-between group overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                    <Sparkles className="w-32 h-32" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Campaign Distribution</h3>
                    <p className="text-sm text-white/50">Budget allocation across objectives</p>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-4xl font-bold bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">85%</p>
                      <p className="text-xs text-purple-400 mt-1 uppercase tracking-widest font-semibold">Efficiency Rate</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full border-white/10 hover:bg-white/10">View Detailed Report</Button>
                </div>
              </div>
            </div>

            {/* Campaigns Table */}
            <div className="rounded-2xl bg-white/5 border border-white/5 overflow-hidden">
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Active Campaigns</h2>
                  <p className="text-sm text-white/50">Manage and monitor live performance</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-white/50">Filters</Button>
                  <Button variant="ghost" size="sm" className="text-white/50">Export</Button>
                </div>
              </div>
              <CampaignTable />
            </div>
          </div>
        </ScrollArea>
      </main>

      {/* AI Panel */}
      <AIPanel />
    </div>
  );
}
