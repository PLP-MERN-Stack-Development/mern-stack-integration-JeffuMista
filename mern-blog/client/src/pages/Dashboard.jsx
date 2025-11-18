import { DashboardProvider } from "../context/DashboardContext";
import DashboardContent from "./DashboardContent";

export default function Dashboard() {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-gray-50">
        <DashboardContent />
      </div>
    </DashboardProvider>
  );
}
