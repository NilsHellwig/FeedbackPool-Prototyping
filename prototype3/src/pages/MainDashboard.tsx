import { DashboardNav } from "../components/DashboardNav";
import { Header } from "../components/Header";

export const MainDashboard = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-grow bg-gray-100 p-8">
        <DashboardNav />
      </main>
    </div>
  );
};
