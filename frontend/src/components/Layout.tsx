import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, MessageSquare, Map as MapIcon, Navigation, ShieldAlert, X, Phone, Activity } from 'lucide-react';
import { useState } from 'react';

export default function Layout() {
  const location = useLocation();
  const [showEmergency, setShowEmergency] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/chat', label: 'Ask AI', icon: MessageSquare },
    { path: '/map', label: 'Stadium Map', icon: MapIcon },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-600 dark:text-blue-400">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              S
            </div>
            StadiumGPT
          </Link>
          
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                    isActive 
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-medium' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button 
            onClick={() => setShowEmergency(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors shadow-sm shadow-red-500/20"
          >
            <ShieldAlert size={18} />
            <span className="hidden sm:inline">Emergency</span>
          </button>
        </div>
      </header>

      {/* Emergency Modal */}
      {showEmergency && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md shadow-2xl border border-red-100 dark:border-red-900/30 overflow-hidden">
            <div className="bg-red-500 p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2 font-bold text-lg">
                <ShieldAlert size={24} />
                Emergency Assistance
              </div>
              <button 
                onClick={() => setShowEmergency(false)}
                className="p-1 hover:bg-white/20 rounded-md transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Activity size={18} className="text-red-500" />
                  Nearest Medical Rooms
                </h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 ml-6 list-disc">
                  <li>Med-1: Near Gate A, Level 1</li>
                  <li>Med-2: Near Gate C, Level 2</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Navigation size={18} className="text-red-500" />
                  Emergency Exits
                </h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 ml-6 list-disc">
                  <li>North-West Corner</li>
                  <li>South-East Corner</li>
                </ul>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                <a 
                  href="tel:+1800STADIUM"
                  className="flex items-center justify-center gap-2 w-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold py-3 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                >
                  <Phone size={20} />
                  Call Security (+1-800-STADIUM)
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 w-full z-40 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pb-safe">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                  isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                <Icon size={20} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
