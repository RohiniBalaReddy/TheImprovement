import DashboardView from "@/components/DashboardView";
import withUserLayout from "@/components/Layouts/UserLayout";
import React from "react";
import SEO from '@/components/SEO';


const Admin = () => {
  return (
    <div>
      <SEO
        title="Admin Dashboard | OneCasa"
        description="Manage and monitor your real estate business efficiently with the OneCasa Admin Dashboard. Track listings, user activity, and analytics seamlessly."
        keywords="Admin Dashboard, Real Estate Management, OneCasa Admin, Property Management, User Analytics, Business Dashboard, Listings Control"
        imageUrl="https://www.theimprovementllc.in/images/logobb.png"
      />
      <DashboardView />
    </div>
  );
};

export default withUserLayout(Admin);
