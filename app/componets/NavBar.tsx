"use client";
import React from "react";
import Link from "next/link";
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation'
import  useAuthentication  from '../../hooks/use_authentication';
import { usePathname } from 'next/navigation'
import {Label} from 'reactstrap';
const auth = getAuth();

const Navbar = () => {
    const router = useRouter()
    const pathname = usePathname()
    const { user } = useAuthentication();

    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            router.push('/', { scroll: false })
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        });
    }
    
  return (
    <>
      <div className="w-full h-20 bg-emerald-800 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <ul className="hidden md:flex gap-x-6 text-white">
              <li>
                <Link className={`link ${pathname === '/home' ? 'underline hover:text-green-400' : 'hover:text-green-400'}`} href="/home">
                  <p>Water Monitors</p>
                </Link>
              </li>
              <li>
                <Link className={`link ${pathname === '/measurement' ? 'underline hover:text-green-400' : 'hover:text-green-400'}`} href="/measurement">
                  <p>Measurement</p>
                </Link>
              </li>
              <li>
                <Link className={`link ${pathname === '/sensor' ? 'underline hover:text-green-400' : 'hover:text-green-400'}`} href="/sensor">
                  <p>Sensor</p>
                </Link>
              </li>
            </ul>
            <ul className="hidden md:flex gap-x-6 text-white">
                <li>
                    <Label className="m-3">{user?.email}!</Label>
                </li>
                <li>
                    <button className="m-3 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border bg-white border-green-800 hover:border-transparent rounded"
                        title="Sign out"  onClick={() => handleLogout()} >
                        Sign Out
                    </button>
                </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;