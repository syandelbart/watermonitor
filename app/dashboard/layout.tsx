import Protected from "../componets/Protected";
import Navigation from "../componets/NavBar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <Protected>
    <Navigation />
    {children}
    </Protected>;
};

export default DashboardLayout;
