"use client";
import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";
import { signOut } from '@/auth';

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
          <button onClick=
            {async () => {
              await signOut();}
            }
         className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <div className="hidden md:block" >Sign Out</div>
          </button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
