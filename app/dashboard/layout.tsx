import Protected from "../componets/Protected";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <Protected>{children}</Protected>;
};

export default DashboardLayout;
