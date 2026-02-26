import React from 'react';
import { Compass, User, Bell } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  onNavigateHome: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onNavigateHome }) => {
  return (
    <div className="min-h-screen flex flex-col relative bg-[#F8FAFC]">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-indigo-100 opacity-50 blur-3xl animate-float" />
        <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-pink-100 opacity-40 blur-3xl animate-float-delayed" />
        <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] rounded-full bg-blue-50 opacity-50 blur-3xl" />
      </div>

      <nav className="relative z-50 pt-6 px-6 pb-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div 
              className="flex items-center gap-3 cursor-pointer" 
              onClick={onNavigateHome}
            >
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-200">
                <Compass size={28} className="text-white" />
              </div>
              <span className="text-2xl font-extrabold text-slate-800 tracking-tight">
                Voyage Vault
              </span>
            </div>
            
            <div className="flex items-center gap-4">
               <button className="p-2.5 bg-white rounded-full shadow-sm text-slate-400 hover:text-indigo-600 transition-colors relative">
                 <Bell size={20} />
                 <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-400 rounded-full border border-white"></span>
               </button>
               <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-[2px] cursor-pointer">
                  <img 
                    src="https://picsum.photos/seed/user123/200/200" 
                    alt="User" 
                    className="rounded-full w-full h-full border-2 border-white object-cover" 
                  />
               </div>
            </div>
        </div>
      </nav>

      <main className="flex-grow relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
};