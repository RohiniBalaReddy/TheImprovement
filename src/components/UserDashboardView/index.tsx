import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import apiClient from "@/utils/apiClient";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { IoCartOutline, IoHeart, IoStar, IoEye } from "react-icons/io5";
import {
  FiBox,
  FiHome,
  FiUser,
  FiArrowRight,
  FiMapPin,
  FiDollarSign,
  FiTrendingUp,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import { CiLocationOn } from "react-icons/ci";

import { BiRupee } from "react-icons/bi";
import { MdOutlineApartment } from "react-icons/md";
import Link from "next/link";
import { generateSlug } from "@/utils/helpers";
import Button from "@/common/Button";

export default function UserDashBoardView() {
  const session = useSession();
  const [order, setOrders] = useState<any>();
  const [user, setUser] = useState<any>();

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      setUser(session?.data?.user);
    }
  }, [session?.status]);

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName) return "U";
    const firstInitial = firstName[0] || "";
    const lastInitial = lastName?.[0] || "";
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };

  const { items } = useCartStore((state: any) => state);
  const { items: wishListItems } = useWishlistStore((state) => state);

  // Stats cards data
  const stats = [
    {
      title: "Cart Items",
      value: items.length,
      icon: <IoCartOutline className="text-[#5297FF]" size={20} />,
      color: "bg-[#5297ff]",
      href: "/cart",
    },
    {
      title: "Wishlist",
      value: wishListItems.length,
      icon: <IoHeart className="text-pink-500" size={20} />,
      color: "bg-pink-500",
      href: "/user/wishlist",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-Gordita-Bold text-gray-900 mb-2">
          Dashboard
        </h1>
        <p className="text-gray-500 label-text">
          Welcome back, {user?.firstName}! Here's your personalized overview.
        </p>
      </div>

      {/* Welcome Banner */}
      <div className="bg-[#5297ff] rounded-xl p-6 md:p-8 text-white mb-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-Gordita-Bold mb-2">
              Welcome back, {user?.firstName}! 👋
            </h2>
            <p className="text-blue-100 label-text max-w-2xl">
              We're glad to have you back. Here's a quick look at your dashboard
              today.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button
              variant="outline"
              className="px-2 py-1 bg-white/30 rounded-md hover:bg-white/20 font-Gordita-Medium border-white text-white"
              onClick={() => router.push("/user/profile")}
            >
              View Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* User Profile Card */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 md:p-6 p-3">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              {user?.profile ? (
                <div className="md:w-16 md:h-16 w-12 h-12 rounded-full overflow-hidden border-2 border-blue-100">
                  <Image
                    src={user.profile}
                    alt={user.firstName || "User"}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="md:w-16 md:h-16 w-12 h-12 rounded-full bg-gradient-to-br from-[#5297ff] to-[#5297ff] flex items-center justify-center">
                  <span className="text-white font-Gordita-Bold md:text-lg text-[14px] ">
                    {getInitials(user?.firstName, user?.lastName)}
                  </span>
                </div>
              )}
            </div>
            <div>
              <h3 className="md:text-lg text-[14px] font-Gordita-Bold text-gray-900">
                {user?.firstName} {user?.lastName}
              </h3>
              <p className="text-gray-500 text-sm">{user?.email}</p>
              <p className="text-[#5297FF] text-xs font-Gordita-Medium mt-1">
                Member since{" "}
                {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <Link key={index} href={stat.href}>
                <div className="bg-gray-50 rounded-lg md:p-4 p-2 hover:bg-blue-50 transition-colors duration-200 cursor-pointer border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`md:p-2 p-1.5 rounded-lg ${stat.color} bg-opacity-10`}
                    >
                      {stat.icon}
                    </div>
                    <span className="text-2xl font-Gordita-Bold text-gray-900">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 font-Gordita-Medium">
                    {stat.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
