import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { INavItems } from "@/utils/interfaces";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import Button from "@/common/Button";
import { Popover, Portal, Transition } from "@headlessui/react";
import { IoChevronDown, IoClose, IoHeart } from "react-icons/io5";
import { usePopper } from "react-popper";
import { RxHamburgerMenu } from "react-icons/rx";
import Drawer from "@/common/Drawer";
import Avatar from "@/components/Avatar";
import { IoCartOutline } from "react-icons/io5";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { CheckCircle2 } from "lucide-react";
import { fetchHomePageCity } from "@/utils/locationDetails/datafetchingFunctions";

import { useAuthModal } from "@/common/auth/AuthProvider";
import { Disclosure } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { PROTECTED_PREFIXES } from "@/middleware";

type MobileMenuProps = {
  items: INavItems[];
  onNavigate: (href: string) => void;
  onClose: () => void;
  isAuthed: boolean;
  openAuth: (opts?: {
    callbackUrl?: string;
    defaultMethod?: "email" | "phone";
  }) => void;
  city?: string;
};

const NavDropDown = ({ item, subLink }: any) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const popperElRef = useRef<any>(null);
  const popoverButtonRef = useRef<any>(null);
  const [referenceElement, setReferenceElement] = useState<any>(null);
  const [popperElement, setPopperElement] = useState<any>(null);
  const session = useSession();
  const router = useRouter();
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [city, setCity] = useState("Hyderabad");
  const [error, setError] = useState("");
  useEffect(() => {
    const handleUserInteraction = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });

            try {
              const response = await fetchHomePageCity(
                latitude + "",
                longitude + ""
              );
              if (!response.city) {
                setError("Error in reverse geocoding");
                return;
              }

              let fetchedCity = response.city.toLowerCase();

              if (
                ![
                  "hyderabad",
                  "bengaluru",
                  "chennai",
                  "mumbai",
                  "pune",
                ].includes(fetchedCity)
              ) {
                return;
              }

              localStorage.setItem("city", fetchedCity);
              setCity(fetchedCity);
            } catch (err) {
              console.log("Error in reverse geocoding");
              setError("Error in reverse geocoding");
            }
          },
          (err) => {
            setError("Failed to retrieve location: " + err.message);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }

      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("scroll", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("scroll", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("scroll", handleUserInteraction);
    };
  }, []);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-start",
    modifiers: [
      {
        name: "flip",
        options: {
          fallbackPlacements: ["bottom", "bottom", "auto"],
        },
      },
      {
        name: "preventOverflow",
        options: {
          rootBoundary: "document",
          padding: 4,
        },
      },
    ],
    strategy: "absolute",
  });
  useEffect(() => {
    const updateSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleMouseToogle = () => {
    if (popoverButtonRef.current) {
      popoverButtonRef.current.click();
    }
  };

  const [hoveredPropertyType, setHoveredPropertyType] = useState<string>("Buy");

  return (
    <Popover
      className="relative"
      {...(isDesktop && {
        onMouseEnter: handleMouseToogle,
        onMouseLeave: handleMouseToogle,
      })}
    >
      {({ open }) => (
        <>
          <div
            className={clsx(
              "relative group xl:px-[20px] xl:py-[4px] lg:px-[5px] lg:py-[4px] flex items-center gap-1 whitespace-nowrap transition-colors duration-300 hover:bg-white hover:bg-opacity-20 rounded-[6px] focus:rounded-[20px] focus:outline-none",
              {
                "text-white border-b-4 border-transparent hover:border-[#3586FF]":
                  !item.isActive && !subLink,
                "text-[#3586FF] border-b-4 border-[#3586FF]":
                  item.isActive && !subLink,
                "bg-white bg-opacity-20": open && !subLink,
              }
            )}
            ref={setReferenceElement}
          >
            {item.link ? (
              <Link
                href={item.link}
                className="whitespace-nowrap font-Gordita-Medium md:text-[14px] text-[12px]"
              >
                {item.name}
              </Link>
            ) : (
              <span className="whitespace-nowrap cursor-pointer  md:text-[14px]">
                {item.name}
              </span>
            )}
            <Popover.Button
              as="button"
              ref={popoverButtonRef}
              aria-label="Expand Menu"
              className={" border-none focus:outline-none"}
            >
              <IoChevronDown
                className={clsx("transition-transform duration-200", {
                  "ml-1 text-white text-base cursor-pointer":
                    !item.isActive && !subLink,
                  "text-[#3586FF]": item.isActive && !subLink,
                  "rotate-180": open,
                })}
              />
            </Popover.Button>
          </div>

          <div className="block ">
            {referenceElement && (
              <Portal>
                <div
                  ref={popperElRef}
                  style={styles.popper}
                  className="absolute top-[20px] pr-[20px] z-[999999] md:mt-[0px] md:pl-[0px] pl-[30px] md:px-0 px-1"
                  {...attributes.popper}
                >
                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                    beforeEnter={() => setPopperElement(popperElRef.current)}
                    afterLeave={() => setPopperElement(null)}
                  >
                    {popperElement && (
                      <>
                        {/* DESKTOP PANEL */}
                        <Popover.Panel className="bg-white z-[99999] text-black font-Gordita-Medium shadow-lg w-full max-w-[900px] rounded-md p-3 md:block hidden">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-3">
                            {/* LEFT SIDE MENU */}
                            <div className="flex flex-col gap-2 bg-gray-100 p-4 rounded-[10px]">
                              {item.subLink.map((linkItem: any, i: number) => (
                                <Link key={i} href={linkItem.link}>
                                  <div
                                    className={`text-sm cursor-pointer transition-colors duration-200 ease-in-out ${
                                      hoveredPropertyType === linkItem.name
                                        ? "text-[#3586FF]"
                                        : "text-black"
                                    } hover:text-[#3586FF]`}
                                  >
                                    {linkItem.name}
                                  </div>
                                </Link>
                              ))}

                              <div className="md:text-[12px] text-[10px] mt-4 text-gray-500">
                                Contact us: <br />
                                <strong className="text-black">
                                  +1 (203) 610-3084 &nbsp; (9AM - 6PM EST)
                                </strong>
                              </div>
                            </div>

                            {/* MIDDLE INFO SECTION */}
                            <div className="text-gray-700 leading-6 py-3 px-4 flex flex-col justify-between">
                              <div>
                                <p className="font-Gordita-Bold mb-2 md:text-[16px] text-[12px]">
                                  Why choose our services?
                                </p>
                                <ul className="list-disc ml-5 space-y-1 text-gray-500 md:text-[12px] text-[10px]">
                                  <li>Verified professionals</li>
                                  <li>Transparent pricing</li>
                                  <li>End-to-end support</li>
                                </ul>
                              </div>

                              <div>
                                <h1 className="font-Gordita-Regular md:text-[10px] text-[8px]">
                                  Email us at{" "}
                                  <span className="font-Gordita-Medium">
                                    info@theimprovementllc.com
                                  </span>{" "}
                                  or Contact us:
                                  <strong className="text-black">
                                    {" "}
                                    +1 (203) 610-3084 &nbsp; (9AM - 6PM EST)
                                  </strong>
                                </h1>
                              </div>
                            </div>

                            <div className="bg-white p-3 flex items-center justify-center">
                              <div className="flex flex-col items-center gap-3 bg-[#f3f9ff] rounded-[10px] px-5 py-8">
                                <div className="flex items-center gap-2">
                                  <div className="relative w-[30px] h-[30px]">
                                    <Image
                                      src="/home/insightsicon.png"
                                      alt="insights"
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <h1 className="font-Gordita-Bold md:text-[16px] text-[12px]">
                                    Our Insights
                                  </h1>
                                </div>

                                <div className="flex flex-col items-start md:gap-2 gap-1">
                                  <h1>
                                    <Link
                                      href="/services/construction"
                                      className="font-Gordita-Medium md:text-[12px] text-[10px] flex items-center gap-1"
                                    >
                                      <CheckCircle2 className="w-4 h-4 text-[#5297FF] mt-0.5" />
                                      Construction Services
                                    </Link>
                                  </h1>
                                  <h1>
                                    <Link
                                      href="/services/painting/paint-cost-calculator"
                                      className="font-Gordita-Medium md:text-[12px] text-[10px] flex items-center gap-1"
                                    >
                                      <CheckCircle2 className="w-4 h-4 text-[#5297FF] mt-0.5" />
                                     Paint cost estimator
                                    </Link>
                                  </h1>
                                  <h1>
                                    <Link
                                      href="/services/painting"
                                      className="font-Gordita-Medium md:text-[12px] text-[10px] flex items-center gap-1"
                                    >
                                      <CheckCircle2 className="w-4 h-4 text-[#5297FF] mt-0.5" />
                                      Painting Services
                                    </Link>
                                  </h1>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Popover.Panel>

                        {/* MOBILE PANEL */}
                        <Popover.Panel className="bg-white z-[99999] text-black font-Gordita-Medium shadow-lg min-w-[180px] rounded-md py-3 md:hidden block">
                          {item.subLink && (
                            <WebNavigationMenu
                              items={item.subLink}
                              subLink={true}
                            />
                          )}
                        </Popover.Panel>
                      </>
                    )}
                  </Transition>
                </div>
              </Portal>
            )}
          </div>
        </>
      )}
    </Popover>
  );
};

interface INavigationMenuProps {
  items: Array<INavItems>;
  subLink: boolean;
}

const WebNavigationMenu = ({ items, subLink }: INavigationMenuProps) => {
  return (
    <>
      {items.map((item, index) => (
        <div key={`${index}-${item.name}-link`}>
          <>
            {item.link && !item.subLink ? (
              <Link
                href={item.link}
                onClick={() => {
                  item.onClick &&
                    typeof onclick === "function" &&
                    item.onClick();
                }}
              >
                <div
                  className={clsx("md:text-[14px] text-[12px]", {
                    "xl:px-[24px] xl:py-[8px] lg:px-[15px] lg:py-[4px] font-Gordita-Medium whitespace-nowrap hover:bg-white hover:bg-opacity-20 hover:rounded-md":
                      !subLink,
                    "xl:px-[24px] xl:py-[8px] lg:px-[15px] lg:py-[4px]  px-[18px] py-[8px] hover:bg-black hover:bg-opacity-10 hover:rounded-md":
                      subLink,
                    "text-white border-transparent": !item.isActive && !subLink,
                    "text-[#3586FF] border-b-4 border-[#3586FF] ":
                      item.isActive && !subLink,
                  })}
                >
                  {item.name}
                </div>
              </Link>
            ) : (
              <>
                {item.subLink && item.subLink.length > 0 && (
                  <NavDropDown item={item} subLink={subLink} />
                )}
              </>
            )}
          </>
        </div>
      ))}
    </>
  );
};

export interface User {
  id: number;
  username?: string;
  fullName?: string;
  email: string;
  phone?: string;
  token?: string;
  roles: {
    id: string;
    roleName: string;
  };
}

export interface ShowItems {
  isVisibleItems: Boolean;
}
const Navbar = ({ isVisibleItems }: ShowItems) => {
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>();
  const [token, setToken] = useState<string | null>();
  const { items: wishListItems } = useWishlistStore((state) => state);
  const { openAuth } = useAuthModal();

  const session = useSession();
  const { items } = useCartStore((state: any) => state);

  const toggleMobileSideBar = (flag: boolean) => {
    setMobileSidebarOpen(flag);
  };
  useEffect(() => {
    if (session.status === "authenticated") {
      const userData = session.data?.user as User | null;
      const userToken = session?.data?.token || localStorage.getItem("token");
      setUser(userData);
      setToken(userToken);
      if (userToken) {
        localStorage.setItem("token", userToken);
      }
    }
  }, [session?.status]);

  const logo_place_holder = {
    imageUrl: "/images/newlogo.png",
    link: "/",
  };

  const [city, setCity] = useState("Hyderabad");

  useEffect(() => {
    const storedCity = localStorage.getItem("city");
    setCity(storedCity as any);
  }, []);

  const navMenuItems: INavItems[] = [
    {
      name: "Home",
      link: "/",
      isActive: router.pathname === "/",
      onClick: () => {
        if (mobileSidebarOpen) {
          toggleMobileSideBar(false);
        }
      },
    },
    {
      name: "Services",
      link: "/services/custom-builder",
      subLink: [
        {
          name: "Construction",
          link: "/services/construction",
          isActive: router.pathname === "/services/construction",
        },
        {
          name: "Demolition",
          link: "/services/demolition",
          isActive: router.pathname === "/services/demolition",
        },
        {
          name: "Flooring",
          link: "/services/flooring",
          isActive: router.pathname === "/services/flooring",
        },
        // {
        //   name: "Electrical",
        //   link: "/services/electrical",
        //   isActive: router.pathname === "/services/electrical",
        // },
        {
          name: "Plumbing",
          link: "/services/plumbing",
          isActive: router.pathname === "/services/plumbing",
        },
        {
          name: "HVAC",
          link: "/services/hvac",
          isActive: router.pathname === "/services/hvac",
        },
        {
          name: "Roofing",
          link: "/services/roofing",
          isActive: router.pathname === "/services/roofing",
        },
        {
          name: "Painting",
          link: "/services/painting",
          isActive: router.pathname === "/services/painting",
        },
        {
          name: "Driveway & Exterior Works",
          link: "/services/exteriors",
          isActive: router.pathname === "/services/exteriors",
        },
      ],
      isActive: router.pathname.includes("/services"),
    },

    {
      name: "Blogs",
      link: "/blogs",
      isActive: router.pathname === "/blogs",
      onClick: () => {
        if (mobileSidebarOpen) {
          toggleMobileSideBar(false);
        }
      },
    },
    {
      name: "About us",
      link: "/about-us",
      isActive: router.pathname === "/about-us",
      onClick: () => {
        if (mobileSidebarOpen) {
          toggleMobileSideBar(false);
        }
      },
    },
    {
      name: "Contact Us",
      link: "/contact-us",
      isActive: router.pathname === "/contact-us",
      onClick: () => {
        if (mobileSidebarOpen) {
          toggleMobileSideBar(false);
        }
      },
    },
  ];

  const RenderNav = () => (
    <div className="lg:pt-[0px] pt-[55px] flex lg:h-full gap-8 lg:gap-[6px] flex-col lg:flex-row lg:items-center">
      {isVisibleItems ? (
        <WebNavigationMenu items={navMenuItems} subLink={false} />
      ) : (
        ""
      )}
    </div>
  );

  return (
    <>
      <div className="min-h-[50px] sticky z-[999] flex w-full items-center inset-x-0 top-0 bg-[#081221] py-[4px] ">
        <div className="hidden lg:flex w-full h-full items-center justify-between xl:px-10 lg:px-5">
          <Link
            className="relative min-w-[187px] min-h-[40px] ml-[10px]"
            href={logo_place_holder.link}
          >
            <div className="flex flex-row">
              <div className=" relative  md:h-[50px] md:w-[50px] ">
                <Image
                  src={logo_place_holder.imageUrl}
                  alt={`source_image`}
                  className="absolute object-contain"
                  fill
                />
              </div>
              <div className="xl:ml-2 flex flex-col items-center gap-1 justify-center">
                <p className="font-Gordita-Bold xl:text-[20px] lg:text-[20px] text-[#5297FF]">
                  THE
                  <span className="text-[#FFFFFF]"> IMPROVEMENT</span>
                </p>

                {/* Choose any one below */}
                <p className="text-[10px] text-center mt-[-10px] text-white">
                  Building Better. Every Day.
                </p>
              </div>
            </div>
          </Link>
          <div>
            <RenderNav />
          </div>
          {
            <div className="flex items-center xl:gap-5 lg:gap-3">
              {!user || !token ? (
                <Button
                  onClick={() =>
                    openAuth({
                      callbackUrl: `${window.location.pathname}${window.location.search}`,
                      defaultMethod: "phone",
                    })
                  }
                  className="py-[4px] px-[18px] md:text-[14px] bg-[#5297FF] font-Gordita-Medium text-white rounded"
                >
                  Login
                </Button>
              ) : (
                <div className="cursor-pointer">
                  <Avatar />
                </div>
              )}
            </div>
          }
        </div>
        {/* for mobile view */}

        <div className="flex lg:hidden w-full items-center justify-between px-3 py-2">
          <Link
            href={logo_place_holder.link}
            className="flex items-center gap-2"
          >
            <div className="relative h-[40px] w-[40px]">
              <Image
                src={logo_place_holder.imageUrl}
                alt="OneCasa"
                fill
                className="object-contain"
              />
            </div>
            <div className="leading-tight">
              <p className="font-Gordita-Bold text-[16px] text-[#5297FF]">
                THE<span className="text-white">IMPROVEMENT</span>
              </p>
              <p className="text-[9px] text-white/80 -mt-1">
                {" "}
                Building Better. Every Day.
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            {/* wishlist + cart kept tight and aligned */}

            <RxHamburgerMenu
              className="text-white h-6 w-6"
              onClick={() => toggleMobileSideBar(true)}
              aria-label="Open menu"
            />
          </div>
        </div>
      </div>

      {mobileSidebarOpen && (
        <Drawer
          open={mobileSidebarOpen}
          handleDrawerToggle={toggleMobileSideBar}
          panelCls="bg-[#081221] w-[66%] sm:w-[60%]  lg:hidden "
          overLayCls="bg-black/40 "
          closeOnOutsideClick
          className="z-[999999]"
          openVariant="right"
          hideHeader
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-4 py-3">
              <Link
                href="/"
                onClick={() => toggleMobileSideBar(false)}
                className="flex items-center gap-2"
              >
                <div className="relative h-8 w-8">
                  <Image
                    src={logo_place_holder.imageUrl}
                    alt="OneCasa"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="font-Gordita-Bold text-[16px] text-white">
                    <span className="text-[#5297FF]">THE</span>IMPROVEMENT
                  </p>
                  <p className="text-[9px] text-white/80 -mt-1">
                    {" "}
                    Building Better. Every Day.
                  </p>
                </div>
              </Link>
              <button
                className="rounded-md bg-white/10 px-2 py-1 text-sm text-white"
                onClick={() => toggleMobileSideBar(false)}
              >
                <IoClose className="h-4 w-4" />
              </button>
            </div>

            <MobileMenu
              items={navMenuItems}
              onNavigate={(href) => router.push(href)}
              onClose={() => toggleMobileSideBar(false)}
              isAuthed={!!(user && token)}
              openAuth={openAuth}
              city={city}
            />
          </div>
        </Drawer>
      )}
    </>
  );
};

export default Navbar;

export const isProtectedRoute = (href: string) =>
  PROTECTED_PREFIXES.some((p) => href === p || href.startsWith(p + "/"));

const MobileMenu = ({
  items,
  onNavigate,
  onClose,
  isAuthed,
  openAuth,
  city = "hyderabad",
}: MobileMenuProps) => {
  const handleLoginBtnClick = () => {
    openAuth({
      callbackUrl: `${window.location.pathname}${window.location.search}`,
      defaultMethod: "phone",
    });
    onClose();
  };
  const rowCls =
    "flex items-center relative justify-between px-4 py-2 rounded-lg text-[14px] font-Gordita-Medium text-white/90 hover:bg-white/10";
  const subRowCls =
    "px-2 py-1 rounded-md text-[13px] text-black font-Gordita-Medium hover:bg-white/10";

  const toStr = (v: unknown, fallback = ""): string =>
    typeof v === "string" ? v : v != null ? String(v) : fallback;

  const normalizedCity = toStr(city || "hyderabad").toLowerCase();

  const go = (href: string) => {
    if (isProtectedRoute(href) && !isAuthed) {
      openAuth({
        callbackUrl: href,
        defaultMethod: "phone",
      });
      return;
    }
    onNavigate(href);
    onClose();
  };

  const LinkRow = ({ name, link }: { name: string; link: string }) => (
    <button
      className={rowCls}
      onClick={() => go(link)}
      aria-current={
        typeof window !== "undefined" && window.location.pathname === link
          ? "page"
          : undefined
      }
    >
      <span>{name}</span>
    </button>
  );

  return (
    <div className="flex h-full flex-col gap-2 p-4 text-white ">
      <div className="mt-2 mb-1 h-px w-full bg-white/10" />

      {items.length > 0 &&
        items.map((raw, idx) => {
          const it = {
            name: toStr(raw.name),
            link: toStr(raw.link),
            subLink: Array.isArray(raw.subLink) ? raw.subLink : undefined,
          };

          if (!it.subLink?.length) {
            return <LinkRow key={idx} name={it.name} link={it.link || "/"} />;
          }

          const isProperties = it.name === "Properties";

          return (
            <Disclosure as="div" key={idx} className="w-full relative">
              {({ open }) => (
                <div className="w-full">
                  <Disclosure.Button
                    className={`w-full ${rowCls} !justify-between
             border border-white/10 rounded-[12px]
            hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30
            transition-colors`}
                    aria-expanded={open}
                  >
                    <span className="text-[14px]">{it.name}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                        open ? "rotate-180" : "rotate-0"
                      }`}
                      aria-hidden="true"
                    />
                  </Disclosure.Button>

                  <Disclosure.Panel
                    static={false}
                    className="mt-2 px-2 absolute top-10  left-0 w-full"
                  >
                    <div className="rounded-[4px] bg-white text-black border border-white/10   px-2 py-2 shadow-inner">
                      <div className="flex flex-col gap-1">
                        {it.subLink &&
                          it.subLink.map((s, i) => {
                            const sName = toStr(s.name);
                            const sLink = toStr(s.link, "/");

                            let finalLink = sLink;
                            if (isProperties) {
                              const m = sLink.match(
                                /^\/properties\/(buy|rent|flatshare|plot)(?:\/[^/?#]*)?(.*)$/i
                              );
                              if (m) {
                                const type = m[1].toLowerCase();
                                const rest = m[2] || "";
                                finalLink = `/properties/${type}/${normalizedCity}${rest}`;
                              }
                            }

                            return (
                              <Button
                                key={i}
                                onClick={() => go(finalLink)}
                                className={`max-w-[240px] text-black text-center border-b-[1px]  ${subRowCls}
                                  rounded-[6px] transition-colors
                                  hover:bg-white/10 active:bg-white/15`}
                              >
                                {sName}
                              </Button>
                            );
                          })}
                      </div>
                    </div>
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          );
        })}

      <div className="mt-auto space-y-3 pb-3">
        {!isAuthed ? (
          <Button
            onClick={handleLoginBtnClick}
            className="w-full max-w-[150px] rounded-lg bg-[#5297FF] px-4 py-2 text-[14px] font-Gordita-Medium text-white"
          >
            Login
          </Button>
        ) : (
          <Button
            onClick={() => go("/user/profile")}
            className="w-full max-w-[150px] rounded-lg bg-white/10 px-4 py-2 text-[14px] font-Gordita-Medium text-white"
          >
            My Account
          </Button>
        )}
      </div>
    </div>
  );
};
