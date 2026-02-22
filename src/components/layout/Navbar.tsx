import Link from "next/link";
import {
  BarChart3,
  BookOpen,
  LayoutDashboard,
  Menu,
  Users,
  
} from "lucide-react";
import { Button } from "@/components/ui/button";
import NavbarClient from "./NavbarClient";
import { userService } from "../../../services/user.service";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";




export default async function Navbar() {
 
    const { data } = await userService.getSession();
    // const {data} = await getSession()
 
    const user = data?.user;
 
 
  const navItems = [
    { label: "Browse Tutors", href: "/tutors" },
    ...(user?.role === "STUDENT" ? [
      { label: "Dashboard", href: "/dashboard" },
      { label: "My Bookings", href: "/dashboard/bookings" },
    ] : []),
    ...(user?.role === "TUTOR" ? [
      { label: "Dashboard", href: "/tutor/dashboard", icon: "LayoutDashboard" },
      
    ] : []),
    ...(user?.role === "ADMIN" ? [
      { label: "Overview", href: "/admin", icon: "chart" },
      { label: "Users", href: "/admin/users", icon: "users" },
      { label: "Bookings", href: "/admin/bookings", icon: "BookOpen" },
      { label: "Categories", href: "/admin/categories", icon: "LayoutDashboard" },
    ] : []),
  ];

  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C6.5 6.253 2 10.753 2 16.5S6.5 26.747 12 26.747s10-4.5 10-10.247S17.5 6.253 12 6.253z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">SkillBridge</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                {item.label === "Browse Tutors" && (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                )}
                {item.label === "Dashboard" && (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 11l4-2m-9-10L9 3m11 11l2-1m-2-3l2-3"
                    />
                  </svg>
                )}
                {item.label === "My Bookings" && (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                )}
                {item.icon === "LayoutDashboard" && (
                  <LayoutDashboard className="w-5 h-5" />
                )}
                {item.icon === "BookOpen" && <BookOpen className="w-5 h-5" />}
                {item.icon === "chart" && <BarChart3 className="w-5 h-5" />}
                {item.icon === "users" && <Users className="w-5 h-5" />}
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop User Section */}
          <div className="hidden md:flex items-center gap-4">
            <NavbarClient user={user}></NavbarClient>
            

            
          </div>

          {/* Mobile Menu Button */}
          <Sheet >
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col gap-6 mt-8">
                <Link href="/" className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C6.5 6.253 2 10.753 2 16.5S6.5 26.747 12 26.747s10-4.5 10-10.247S17.5 6.253 12 6.253z"
                      />
                    </svg>
                  </div>
                  <span className="text-lg font-bold text-gray-900">
                    SkillBridge
                  </span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                      // onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="border-t flex flex-col pt-4 mt-4">
                  <NavbarClient user={user}></NavbarClient>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
