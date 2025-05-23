"use client";

import Sidebar from '@/components/ui/Sidebar';
import Topbar from '@/components/ui/Topbar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans">
      <Topbar />
      <div className="flex-1 overflow-auto">
        <Sidebar />
        <div className="relative flex-1 overflow-auto p-6 md:pl-[111px]"> {/* MODIFIED: Added position: relative */}
          {children}
        </div>
      </div>
    </div>
  );
}