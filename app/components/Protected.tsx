"use client";

import { useRouter } from "next/navigation";

const Protected = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default Protected;
