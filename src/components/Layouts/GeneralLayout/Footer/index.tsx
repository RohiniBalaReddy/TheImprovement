import Link from "next/link";
import Image from "next/image";

const services = [
  {
    image: "/images/services/construction.png",
    label: "Construction",
    href: "/services/construction",
  },
  {
    image: "/images/services/demolition.png",
    label: "Demolition",
    href: "/services/demolition",
  },
  {
    image: "/images/services/flooring.png",
    label: "Flooring",
    href: "/services/flooring",
  },

  {
    image: "/images/services/plumbing.png",
    label: "Plumbing",
    href: "/services/plumbing",
  },
  {
    image: "/images/services/hvac.png",
    label: "HVAC",
    href: "/services/hvac",
  },
  {
    image: "/images/services/roofing.png",
    label: "Roofing",
    href: "/services/roofing",
  },
  {
    image: "/images/services/painting.png",
    label: "Painting",
    href: "/services/painting",
  },
  {
    image: "/images/services/exteriors.png",
    label: "Driveway & Exterior Works",
    href: "/services/exteriors",
  },
];

const GeneralFooter = () => {
  const contactDetails = [
    "Phone : +1 (203) 610-3084",
    "Monday to Sunday ( 9:00 AM - 6:00 PM EST )",
    "Email : support@theimprovementllc.com",
    "Address : 2955 Park Ave, Bridgeport, Connecticut 06604, USA",
  ];

  const CompanyTheImprovementLinks = [
    {
      heading: "SERVICES",
      links: services.map((service) => ({
        label: service.label,
        url: service.href,
      })),
    },
    {
      heading: "COMPANY",
      links: [
        {
          label: "About us",
          url: "/about-us",
        },
        {
          label: "Blogs",
          url: "/blogs",
        },
        {
          label: "Testimonials",
          url: "/testimonials",
        },
        {
          label: "Contact Us",
          url: "/contact-us",
        },
        {
          label: "Terms & Conditions",
          url: "/terms-and-condition",
        },
        {
          label: "Privacy Policy",
          url: "/privacy-policy",
        },
      ],
    },
  ];

  const socialLinks = {
    heading: "Connect with us",
    links: [
      {
        imageLink: "/icons/social-links/linkedin.svg",
        url: "#", // replace with your real LinkedIn URL
      },
      {
        imageLink: "/icons/social-links/whatsapp.svg",
        url: "https://wa.me/12036103084",
      },
      {
        imageLink: "/icons/social-links/instagram.svg",
        url: "#", // replace with your real Instagram
      },
      {
        imageLink: "/icons/social-links/facebook.svg",
        url: "#", // replace with your real Facebook
      },
      {
        imageLink: "/icons/social-links/youtube.svg",
        url: "#", // replace with your real YouTube
      },
      {
        imageLink: "/icons/social-links/twitter.svg",
        url: "#", // replace with your real X/Twitter
      },
    ],
  };

  return (
    <>
      <div className="w-full bg-[#081221]">
        <div className="md:divide-x p-6 md:p-10 max-md:mb-7 md:divide-slate-500 grid grid-flow-row md:grid-flow-col md:auto-cols-[minmax(min-content,auto)] gap-y-3 md:gap-y-0 divide-y md:divide-y-0">
          {/* CONTACT + SOCIAL */}
          <div className="w-full flex justify-start items-start">
            <div className="flex w-fit flex-col gap-3">
              <span className="text-[#FBFBFB] leading-[22.8px] md:text-base text-[14px] font-Gordita-Bold">
                CONTACT DETAILS :
              </span>

              <div className="flex flex-col gap-2">
                {contactDetails.map((label, index) => (
                  <span
                    className="text-[#FBFBFB] leading-[19.95px] md:text-sm text-[12px] font-Gordita-Medium"
                    key={`index-${index}-contact-${label}`}
                  >
                    {label}
                  </span>
                ))}
              </div>

              {/* SOCIAL */}
              <div className="flex flex-col gap-2">
                <span className="text-[#FBFBFB] leading-[22.8px] md:text-sm text-[12px] font-Gordita-Medium">
                  {socialLinks.heading}
                </span>

                <div className="flex gap-2">
                  {socialLinks.links.map((link, index) => {
                    const platformName = link.imageLink
                      .split("/")
                      .pop()
                      ?.split(".")[0]
                      ?.replace(/-/g, " ");

                    return (
                      <Link
                        className="text-[#FBFBFB] leading-[19.95px] text-sm font-Gordita-Medium"
                        key={`index-${index}-link-${link.imageLink}`}
                        href={link.url}
                        aria-label={`Visit ${platformName}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Image
                          src={link.imageLink}
                          alt={
                            platformName
                              ? `${platformName} icon`
                              : "social icon"
                          }
                          width={20}
                          height={20}
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* SERVICES + COMPANY */}
          {CompanyTheImprovementLinks.map((section, index: number) => (
            <div
              key={`index-links-${section.heading}-${index}`}
              className="w-full flex py-5 md:py-0 justify-start md:justify-center items-start"
            >
              <div className="flex w-fit flex-col gap-3">
                <span className="text-[#FBFBFB] leading-[22.8px] md:text-base text-[14px] font-Gordita-Bold">
                  {section.heading}
                </span>

                <div className="flex flex-row flex-wrap md:flex-none md:flex-col gap-x-2 gap-y-[6px] md:gap-2">
                  {section.links.map((link, idx) => (
                    <Link
                      className="whitespace-nowrap md:whitespace-normal hover:text-[#3586FF] text-[#FBFBFB] leading-[19.95px] md:text-sm text-[12px] font-Gordita-Medium"
                      key={`index-${idx}-link-${link.label}`}
                      href={link.url}
                      aria-label={link.label}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-[90%] mx-auto border-t border-white/10 md:mt-3 mt-2"></div>

        <div className="mt-6 pb-6 text-center text-[#FFFFFF] text-[12px] md:text-sm font-Gordita-Medium">
          © {new Date().getFullYear()} All rights reserved to The Improvement
          LLC.
        </div>
      </div>
    </>
  );
};

export default GeneralFooter;
