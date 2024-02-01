"use client";
import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";
import { LogoutButton } from "@/app/components/login/logout-btn";
import { useUser } from "@auth0/nextjs-auth0/client";

const routes = [
  {
    path: "/dashboard/home",
    name: "Home",
  },
  {
    path: "/dashboard/measurement",
    name: "Measurement",
  },
  {
    path: "/dashboard/measurement/list",
    name: "Measurement List",
  },
  {
    path: "/dashboard/sensor",
    name: "Sensor",
  },
  {
    path: "/dashboard/sensor/list",
    name: "Sensor List",
  },
];

const Navbar = () => {
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  
  return (
    <div className="w-full h-20 bg-emerald-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full">
          <ul className="hidden md:flex gap-x-6 text-white">
            {routes.map((route) => (
              <li key={route.path}>
                <Link
                  className={`link ${
                    pathname === route.path
                      ? "underline hover:text-green-400"
                      : "hover:text-green-400"
                  }`}
                  href={route.path}
                >
                  <p>{route.name}</p>
                </Link>
              </li>
            ))}
          </ul>
          <form>
          <LogoutButton />
        </form>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
