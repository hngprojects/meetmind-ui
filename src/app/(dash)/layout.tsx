// app/(dashboard)/layout.tsx

import Dashboardnavbar from "@/components/common/dash/dashnav/dashboardnavbar";
import ProtectedRoute from "@/components/providers/ProtectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Dashboardnavbar />
        <main className="container mx-auto px-6 py-8 max-w-[1300px]">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
