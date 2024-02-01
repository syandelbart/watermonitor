import Navigation from "../components/NavBar";
import Protected from "../components/Protected";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Protected>
      <Navigation />
      {children}
    </Protected>
  );
};

export default DashboardLayout;
