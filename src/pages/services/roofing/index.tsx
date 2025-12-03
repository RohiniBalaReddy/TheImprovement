import React from "react";
import withGeneralLayout from "@/components/Layouts/GeneralLayout";
import PlumbingComponent from "@/components/Products/components/SubServices/PlumbingComponent";
import SEO from "@/components/SEO";
import RoofingComponent from "@/components/Products/components/SubServices/RoofingComponent";

const Roofing = () => {
  return (
    <div>
      <SEO
        title="Professional Roofing Services | Roof Installation, Repair & Maintenance | OneCasa"
        description="Get expert roofing services including installation, repair, waterproofing, and maintenance for residential and commercial properties. Durable, weather-resistant, and long-lasting roofing solutions by certified professionals."
        keywords="Roofing services, Roof installation, Roof repair, Roofing contractors, Waterproofing, Roof maintenance, Commercial roofing, Residential roofing, Roof leakage repair, Terrace waterproofing"
        imageUrl="https://www.theimprovementllc.in/images/logobb.png"
      />

      <RoofingComponent />
    </div>
  );
};

export default withGeneralLayout(Roofing);
