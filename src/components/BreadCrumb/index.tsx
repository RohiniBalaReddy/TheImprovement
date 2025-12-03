import Head from "next/head";

const Breadcrumbs = ({ url }: any) => (
    <Head>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        {
                            "@type": "ListItem",
                            "position": 1,
                            "name": "Home",
                            "item": "https://www.theimprovementllc.in/"
                        },
                        {
                            "@type": "ListItem",
                            "position": 2,
                            "name": "Properties",
                            "item": `https://www.theimprovementllc.in/${url}`
                        }
                    ]
                })
            }}
        />
    </Head>
);

export default Breadcrumbs;
