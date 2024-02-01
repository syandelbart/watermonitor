"use client";

import { useRouter } from "next/navigation";

import { auth } from "@/config/firebase";

const Protected = ({ children }: { children: React.ReactNode }) => {
  const user = auth.currentUser;
  console.log(user);
  const router = useRouter();

  if (!user) {
    router.push("/login");
    return null;
  }

  return <div>{children}</div>;
};

export default Protected;
