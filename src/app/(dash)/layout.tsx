import Dashboardnavbar from "@/components/common/dash/dashnav/dashboardnavbar";
import ProtectedRoute from "@/components/providers/ProtectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="bg-background">
        <Dashboardnavbar />
        <main className="px-6 py-3">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
