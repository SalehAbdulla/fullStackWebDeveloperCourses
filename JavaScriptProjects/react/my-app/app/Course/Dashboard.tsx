import { Profile, Sidebar } from "./Components";
import { User } from "./index";

interface DashboardProps {
}

export default function Dashboard({}: DashboardProps) {
  return (
    <div>
      <Sidebar />
      <Profile  />
    </div>
  );
}
