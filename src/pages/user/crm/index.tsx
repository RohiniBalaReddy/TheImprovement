import withUserLayout from "@/components/Layouts/UserLayout";
import TestimonialsView from "@/components/TestimonialsView";
import React from "react";
import SEO from '@/components/SEO';
import CrmView from "@/components/CrmView";


const CRM = () => {
  return (
    <div className="flex w-full min-h-full">
      <SEO
        title="Customer Testimonials | OneCasa"
        description="Read authentic customer testimonials about OneCasa's real estate services. See how our clients rate us and share their experiences."
        keywords="Customer Reviews, OneCasa Testimonials, Real Estate Feedback, Homeowner Experiences, Client Stories, Property Reviews, OneCasa Ratings"
        imageUrl="https://www.theimprovementllc.in/images/theimprovementllc-logo.png"
      />
      <CrmView />
    </div>
  );
};

export default withUserLayout(CRM);
