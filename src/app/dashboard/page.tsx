"use client";

import { useState } from 'react';
import { KPICard } from '@/components/dashboard/KPICard';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import { CampaignTable } from '@/components/dashboard/CampaignTable';
import { AIPanel } from '@/components/dashboard/AIPanel';
import { 
  LayoutDashboard, 
  BarChart3, 
  Megaphone, 
  Cpu, 
  Settings, 
  Search,
  Plus,
  RefreshCw,
  Calendar,
  LogOut,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('Overview');

  const mockKpiData = [
    { title: "Total Spend", value: "$12,450.00", change: 12.5, label: "vs last period", status: "good" as const },
    { title: "Impressions", value: "842.5K", change: -2.3, label: "vs last period", status: "warning" as const },
    { title: "Clicks", value: "12,840", change: 8.7, label: "vs last period", status: "good" as const },
    { title: "CTR", value: "1.52%", change: 4.1, label: "vs last period", status: "good" as const },
    { title: "Conversions", value: "482", change: 15.2, label: "vs last period", status: "good" as const },
    { title: "ROAS", value: "3.2x", change: -1.5, label: "vs last period", status: "critical" as const },
  ];

  const mockChartData = [
    { date: 'Mon', value: 400 },
    { date: 'Tue', value: 300 },
    { date: 'Wed', value: 600 },
    { date: 'Thu', value: 800 },
    { date: 'Fri', value: 500 },
    { date: 'Sat', value: 900 },
    { date: 'Sun', value: 700 },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-72 border-r border-slate-900 bg-slate-950/80 backdrop-blur-xl p-8 flex flex-col">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center">
            <Cpu className="text-white h-6 w-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">ADCONTROL</span>
        </div>
        
        <nav className="flex-1 space-y-1">
          <NavItem 
            icon={<LayoutDashboard size={20} />} 
            label="Overview" 
            active={activeTab === 'Overview'} 
            onClick={() => setActiveTab('Overview')} 
          />
          <NavItem 
            icon={<Megaphone size={20} />} 
            label="Campaigns" 
            active={activeTab === 'Campaigns'} 
            onClick={() => setActiveTab('Campaigns')} 
          />
          <NavItem 
            icon={<Cpu size={20} />} 
            label="AI Insights" 
            active={activeTab === 'AI Insights'} 
            onClick={() => setActiveTab('AI Insights')} 
          />
          <NavItem 
            icon={<BarChart3 size={20} />} 
            label="Reporting" 
            active={activeTab === 'Reporting'} 
            onClick={() => setActiveTab('Reporting')} 
          />
          <div className="pt-8 mb-2 px-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest">Settings</div>
          <NavItem icon={<Settings size={20} />} label="Workspace" />
          <NavItem icon={<Plus size={20} />} label="New Connection" />
        </nav>

        <div className="pt-6 mt-auto border-t border-slate-900">
          <div className="flex items-center gap-3 px-2 mb-6">
            <div className="h-10 w-10 rounded-full bg-slate-800 border border-slate-700" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate text-ellipsis overflow-hidden">Alex Media</p>
              <p className="text-[10px] text-slate-500 font-medium">Administrator</p>
            </div>
            <LogOut size={16} className="text-slate-600 hover:text-red-400 cursor-pointer" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        <ScrollArea className="flex-1">
          <main className="p-10 max-w-7xl mx-auto">
            <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
              <div>
                <motion.h1 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl font-black text-white tracking-tight mb-2"
                >
                  Dashboard
                </motion.h1>
                <p className="text-slate-400 font-medium">Manage and command your Meta Ads engine.</p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                  <Input 
                    placeholder="Search campaigns..." 
                    className="pl-10 w-64 bg-slate-900/50 border-slate-800 focus:border-blue-500/50 transition-all rounded-xl"
                  />
                </div>
                <Button variant="outline" size="icon" className="bg-slate-900 border-slate-800 rounded-xl relative">
                  <Bell size={20} />
                  <span className="absolute top-2 right-2 h-2 w-2 bg-blue-500 rounded-full border-2 border-slate-950" />
                </Button>
                <div className="h-8 w-px bg-slate-900 mx-2" />
                <Button variant="outline" className="bg-slate-900 border-slate-800 rounded-xl gap-2 font-semibold">
                  <Calendar size={18} />
                  {dateRange}
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 font-bold shadow-lg shadow-blue-500/20">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Sync
                </Button>
              </div>
            </header>

            {/* KPI Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-12"
            >
              {mockKpiData.map((kpi, i) => (
                <KPICard key={i} {...kpi} />
              ))}
            </motion.div>

            {/* Data Viz Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-2"
              >
                <PerformanceChart data={mockChartData} />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-500/20"
              >
                <Cpu className="absolute -right-8 -bottom-8 h-48 w-48 text-white/10 rotate-12" />
                <div className="relative z-10">
                  <div className="h-10 w-10 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center mb-6">
                    <Sparkles size={20} />
                  </div>
                  <h3 className="text-2xl font-black mb-4 leading-tight">Instant Action Required</h3>
                  <p className="text-blue-100 text-sm mb-8 leading-relaxed font-medium">
                    Our AI has detected 3 scaling opportunities in your "Summer Launch" campaign. You could increase ROI by up to 22%.
                  </p>
                  <Button className="w-full bg-white text-blue-600 font-bold hover:bg-white/90 rounded-xl py-6">
                    Launch AI Audit
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Campaign Table Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white tracking-tight">Active Campaigns</h2>
                <Button variant="link" className="text-blue-400 font-bold">View all 14 campaigns →</Button>
              </div>
              <CampaignTable />
            </div>
          </main>
        </ScrollArea>

        {/* Right Sidebar - AI Panel */}
        <aside className="w-96 hidden xl:block">
          <AIPanel />
        </aside>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
        active 
          ? "bg-blue-600/10 text-blue-500 shadow-sm border border-blue-500/10" 
          : "text-slate-500 hover:bg-slate-900/50 hover:text-slate-200"
      )}
    >
      <span className={cn(
        "transition-transform duration-200 group-hover:scale-110",
        active ? "text-blue-500" : "text-slate-500 group-hover:text-slate-300"
      )}>
        {icon}
      </span>
      <span className="font-bold text-sm tracking-tight">{label}</span>
      {active && <motion.div layoutId="nav-active" className="ml-auto h-2 w-2 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />}
    </button>
  );
}
