"use client";
import { getAuth, signOut } from "firebase/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { firebaseApp } from "../../config/firebase";
import useAuthentication from "../../hooks/use_authentication";

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
    path: "/dashboard/sensor",
    name: "Sensor",
  },
];

const auth = getAuth();

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuthentication();

  useEffect(() => {
    // Check if Firebase app is initialized
    if (!firebaseApp) {
      // Firebase app is not initialized, handle the initialization
      import("../../config/firebase").then((module) => {
        // Now firebaseApp is available for use
        const { firebaseApp } = module;
        // Perform your client-side operations with firebaseApp
      });
    }
    if (user && pathname == "/") {
      router.push("/home");
    }
  }, [user, pathname, router]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        router.push("/", { scroll: false });
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className="w-full h-20 bg-emerald-800 sticky top-0">
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
          <ul
            className={` ${
              user === null ? "hidden" : "md:flex gap-x-6 text-white"
            }`}
          >
            <li>
              <button
                className="m-3 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border bg-white border-green-800 hover:border-transparent rounded"
                title="Sign out"
                onClick={() => handleLogout()}
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
