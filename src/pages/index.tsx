
import withGeneralLayout from "@/components/Layouts/GeneralLayout";
import SEO from "@/components/SEO";

import WelcomeModal from "@/components/welcomeModal";
import apiClient from "@/utils/apiClient";
import BuildHome from "@/components/Products/components/BuildHome";

function Home({ initialBlogs }: { initialBlogs: any[] }) {
  return (
    <div className="">
      <WelcomeModal />

      <SEO
        title="Construction, Demolition, Flooring, Electrical, Plumbing, HVAC, Roofing, Painting & Exterior Services | heImprovement"
        description="Get professional home improvement services including construction, demolition, flooring, electrical, plumbing, HVAC, roofing, painting, and driveway & exterior works. Quality service you can trust."
        keywords="Construction Services, Demolition Services, Flooring Services, Electrical Repairs, Plumbing Services, HVAC Services, Roofing Solutions, Painting Contractors, Exterior Works, Home Improvement"
        imageUrl="https://www.heImprovement.in/images/logobb.png"
      />

      <BuildHome initialBlogs={initialBlogs} />
    </div>
  );
}

export async function getStaticProps() {
  try {
    const res = await apiClient.get(apiClient.URLS.blogs, {});
    const blogs = res.body || [];
    return {
      props: {
        initialBlogs: blogs,
      },
      revalidate: 800,
    };
  } catch (error) {
    console.error("Error fetching blogs for homepage:", error);
    return {
      props: {
        initialBlogs: [],
      },
      revalidate: 600,
    };
  }
}

export default withGeneralLayout(Home);
