import { GetStaticPaths, GetStaticProps } from "next";
import withGeneralLayout from "@/components/Layouts/GeneralLayout";
import apiClient from "@/utils/apiClient";
import BlogDetails from "@/components/Products/components/BlogsDetails";

const BlogDetailPage = ({ blog }: { blog: any }) => {
  if (!blog) {
    return <p className="text-center text-red-500">Blog not found.</p>;
  }

  return <BlogDetails blog={blog} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await apiClient.get(apiClient.URLS.blogs, {});
    const blogs = res.body || [];

    const paths = blogs.map((blog: any) => ({
      params: { id: blog.id.toString() },
    }));

    return {
      paths,
      fallback: "blocking",
    };
  } catch (e) {
    console.error("Error generating paths", e);
    return { paths: [], fallback: "blocking" };
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  try {
    const res = await apiClient.get(`${apiClient.URLS.blogs}/${id}`, {});
    return {
      props: {
        blog: res.body || null,
      },
      revalidate: 600,
    };
  } catch (e) {
    console.error("Blog fetch failed", e);
    return {
      props: {
        blog: null,
      },
      revalidate: 600,
    };
  }
};

export default withGeneralLayout(BlogDetailPage);
