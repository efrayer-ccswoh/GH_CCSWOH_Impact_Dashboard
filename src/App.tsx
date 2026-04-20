/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Users, 
  Utensils, 
  Heart, 
  Globe, 
  Phone, 
  MapPin, 
  ChevronRight, 
  TrendingUp, 
  Calendar,
  ExternalLink,
  Mail,
  Home,
  Menu,
  X,
  Search,
  Bell
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell
} from "recharts";
import { motion, AnimatePresence } from "motion/react";

// Mock data for the dashboard
const IMPACT_STATS = [
  { 
    id: "served", 
    label: "Individuals Served", 
    value: "10,245", 
    change: "+12%", 
    icon: Users,
    color: "bg-blue-600"
  },
  { 
    id: "food", 
    label: "Lbs of Food Distributed", 
    value: "1,120,400", 
    change: "+8.5%", 
    icon: Utensils,
    color: "bg-green-600"
  },
  { 
    id: "volunteers", 
    label: "Active Volunteers", 
    value: "542", 
    change: "+5%", 
    icon: Heart,
    color: "bg-orange-500"
  },
  { 
    id: "refugees", 
    label: "Refugees Resettled", 
    value: "385", 
    change: "+22%", 
    icon: Globe,
    color: "bg-indigo-600"
  },
];

const MONTHLY_DATA = [
  { name: "Jan", served: 850, meals: 92000 },
  { name: "Feb", served: 920, meals: 88000 },
  { name: "Mar", served: 1100, meals: 95000 },
  { name: "Apr", served: 980, meals: 91000 },
  { name: "May", served: 1050, meals: 102000 },
  { name: "Jun", served: 1200, meals: 110000 },
];

const PROGRAM_DATA = [
  { name: "Food Pantry", value: 35, color: "#008244" },
  { name: "Refugee Services", value: 25, color: "#004797" },
  { name: "Mental Health", value: 20, color: "#FFC20E" },
  { name: "Senior Services", value: 15, color: "#F97316" },
  { name: "Family Support", value: 5, color: "#8B5CF6" },
];

const COUNTIES = [
  "Adams", "Brown", "Butler", "Champaign", "Clark", "Clermont", 
  "Clinton", "Hamilton", "Highland", "Logan", "Warren"
];

const StatCard: React.FC<{ stat: any, index: number }> = ({ stat, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white p-4 border border-slate-200 rounded-lg shadow-sm"
      id={`stat-card-${stat.id}`}
    >
      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
        {stat.label}
      </div>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold metric-font text-slate-800">
          {stat.value}
        </span>
        <span className="text-[10px] text-green-600 font-bold mb-1">
          {stat.change}
        </span>
      </div>
      <div className="mt-3 w-full bg-slate-100 h-1 rounded-full overflow-hidden">
        <div 
          className={`h-full ${stat.id === 'food' ? 'bg-cc-green' : 'bg-cc-blue'} w-[70%]`} 
        />
      </div>
    </motion.div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-gray-100 overflow-hidden font-sans relative">
      {/* Overlay for mobile sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Side Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-[70] w-64 bg-slate-900 flex flex-col text-slate-300 shrink-0 border-r border-slate-800 transition-transform duration-300 ease-in-out md:static md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-cc-blue rounded-md flex items-center justify-center text-white">
              <Heart size={20} fill="currentColor" />
            </div>
            <div>
              <span className="font-bold text-white tracking-tight text-sm block">CCSWOH</span>
              <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest leading-none">Southwestern Ohio</span>
            </div>
          </div>
          <button 
            className="md:hidden text-slate-400 hover:text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2 ml-2">Metrics</div>
          <button 
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${activeTab === 'overview' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 hover:text-white'}`}
            onClick={() => {
              setActiveTab('overview');
              setIsSidebarOpen(false);
            }}
          >
            <TrendingUp size={16} /> Overview
          </button>
          
          <div className="mt-6 text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2 ml-2">Programs</div>
          {["Food & Nutrition", "Su Casa & Refugees", "Senior Services"].map((program, i) => (
             <a key={i} href="#" className="flex items-center gap-3 px-3 py-2 hover:bg-slate-800 hover:text-white transition-colors rounded-md text-sm">
                {i === 0 ? <Utensils size={16} /> : i === 1 ? <Globe size={16} /> : <Home size={16} />}
                {program}
             </a>
          ))}

          <div className="mt-6 text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2 ml-2">Reporting</div>
          <a href="#" className="flex items-center gap-3 px-3 py-2 hover:bg-slate-800 hover:text-white transition-colors rounded-md text-sm">
            <Calendar size={16} /> 2024 Impact
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 hover:bg-slate-800 hover:text-white transition-colors rounded-md text-sm">
             Historical Trends
          </a>
        </nav>

        <div className="p-4 border-t border-slate-800 text-xs flex items-center gap-3 mt-auto">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-white uppercase">
            User
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-white font-medium truncate">Dashboard Admin</span>
            <span className="text-slate-500 truncate">efrayer@ccswoh.org</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Compact Header */}
        <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 shrink-0 relative z-50">
          <div className="flex items-center gap-3">
            <button 
              className="md:hidden p-1.5 -ml-1 text-slate-600 hover:bg-slate-100 rounded-md"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <h1 className="text-sm font-bold flex items-center gap-2">
              <span className="hidden sm:inline">Impact Dashboard</span>
              <span className="sm:hidden">Dashboard</span>
              <span className="px-1.5 py-0.5 bg-green-100 text-cc-green text-[9px] rounded uppercase font-black tracking-tighter shrink-0">Live</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4 font-mono text-[10px]">
            <div className="hidden lg:flex items-center gap-2 font-bold text-slate-400 uppercase tracking-widest">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Data Sync Active
            </div>
            <div className="hidden lg:block h-4 w-px bg-slate-200" />
            <span className="hidden md:inline text-slate-400">2024.04.20_14:22:05</span>
            
            <div className="flex items-center gap-1 md:gap-3">
              <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 transition-all">
                <Search size={16} />
              </button>
              <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 transition-all relative">
                <Bell size={16} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
              </button>
              <button className="bg-cc-yellow text-slate-900 px-3 md:px-4 py-1.5 rounded text-[10px] md:text-[11px] font-black uppercase tracking-wider hover:bg-yellow-400 transition-colors shadow-sm active:scale-95 duration-75">
                Donate
              </button>
            </div>
          </div>
        </header>

        {/* Scrollable Dashboard Body */}
        <div className="flex-1 p-4 md:p-6 space-y-6 overflow-y-auto bg-gray-50/50">
          
          {/* Top Grid: Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
             {IMPACT_STATS.map((stat, i) => (
              <StatCard key={stat.id} stat={stat} index={i} />
            ))}
          </div>

          {/* Chart Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Service Trends Chart */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Service Trends</h3>
                  <div className="text-base md:text-lg font-bold text-slate-800">Monthly Reach</div>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cc-blue" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Individuals</span>
                  </div>
                </div>
              </div>
              <div className="p-4 md:p-6 h-[250px] md:h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MONTHLY_DATA}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 9, fill: "#94a3b8", fontWeight: 600 }} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 9, fill: "#94a3b8", fontWeight: 600 }} 
                    />
                    <Tooltip 
                      cursor={{ fill: '#f8fafc' }}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '10px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="served" fill="#004797" radius={[2, 2, 0, 0]} barSize={window.innerWidth < 768 ? 24 : 32} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Impact Distribution */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Program Mix</h3>
                <div className="text-base md:text-lg font-bold text-slate-800">Resource Allocation</div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="h-[200px] w-full relative mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={PROGRAM_DATA}
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {PROGRAM_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                      <span className="text-xl font-bold metric-font text-slate-800">100</span>
                      <p className="text-[8px] uppercase font-bold text-slate-400 tracking-tighter">% Mix</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2.5 mt-auto">
                  {PROGRAM_DATA.map((program) => (
                    <div key={program.name} className="flex items-center justify-between text-[11px] font-medium">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: program.color }} />
                        <span className="text-slate-500">{program.name}</span>
                      </div>
                      <span className="font-bold metric-font">{program.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sub-Sections Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
            
            {/* Regional Focus Table */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-800">Regional Coverage</h3>
                <span className="text-[10px] text-slate-400">11 Counties total</span>
              </div>
              <div className="overflow-x-auto scrollbar-hide">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-[10px] uppercase text-slate-500 font-bold border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-2">County</th>
                      <th className="px-6 py-2">Programs</th>
                      <th className="px-6 py-2 text-right">Reach</th>
                    </tr>
                  </thead>
                  <tbody className="text-[11px] divide-y divide-slate-100">
                    {COUNTIES.slice(0, 6).map((county, i) => (
                      <tr key={county} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-3 font-semibold text-slate-700">{county}</td>
                        <td className="px-6 py-3">
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 bg-cc-blue rounded-full" title="Blue Program" />
                            <div className="w-1.5 h-1.5 bg-cc-green rounded-full" title="Green Program" />
                            {i % 2 === 0 && <div className="w-1.5 h-1.5 bg-cc-yellow rounded-full" title="Yellow Program" />}
                          </div>
                        </td>
                        <td className="px-6 py-3 text-right metric-font text-slate-400 font-mono">#0{i+1}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 mt-auto">
                <button className="text-[10px] font-bold text-cc-blue uppercase tracking-widest hover:underline transition-all">View 11-county heatmap</button>
              </div>
            </div>

            {/* Program Health & Events */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white shadow-lg">
                 <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Impact Health</div>
                 <div className="flex flex-wrap gap-6 md:gap-8">
                   <div className="flex-1 min-w-[100px]">
                      <div className="text-[9px] text-slate-400 uppercase font-black mb-1">Volunteers</div>
                      <div className="text-xl md:text-2xl font-bold metric-font text-cc-yellow">98.4%</div>
                   </div>
                   <div className="flex-1 min-w-[100px]">
                      <div className="text-[9px] text-slate-400 uppercase font-black mb-1">Pantry</div>
                      <div className="text-xl md:text-2xl font-bold metric-font text-cc-green whitespace-nowrap">Optimal</div>
                   </div>
                 </div>
                 <div className="mt-6">
                    <button className="w-full py-2.5 bg-slate-800 text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-slate-700 transition-colors border border-slate-700 shadow-sm">
                      Sync Data
                    </button>
                 </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Events</h3>
                  <Calendar size={14} className="text-slate-300" />
                </div>
                <div className="space-y-4">
                   {[
                    { name: "Spring Food Drive", date: "May 15", color: "bg-cc-green" },
                    { name: "Volunteer Orientation", date: "June 2", color: "bg-cc-blue" },
                    { name: "Su Casa Awards", date: "Sept 12", color: "bg-cc-yellow" }
                  ].map(event => (
                    <div key={event.name} className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 -mx-2 px-2 py-1.5 rounded transition-all">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${event.color}`} />
                        <span className="text-[11px] font-bold text-slate-700 truncate">{event.name}</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 metric-font shrink-0">{event.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}


