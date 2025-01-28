import AdminLayout from "@/components/UI/layout/admin/AdminLayout";
import React from "react";
import Dashboard from "@/components/admin/dashboard/Dashboard";
const DashboardPage = () => {
  return (
    <AdminLayout>
      <Dashboard />
    </AdminLayout>
  );
};

export default DashboardPage;
