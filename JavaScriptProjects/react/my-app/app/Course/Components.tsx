import { useContext } from "react";
import { DashboardContext } from "./context";

interface SidebarProps {}

export function Sidebar({}: SidebarProps) {
    // This is a consumer
  const user = useContext(DashboardContext);

  return (
    <div>
      <div>{user.name}</div>
      <div>Subscription Status: {user.isSubscribed}</div>
    </div>
  );
}

interface ProfileProps {}

export function Profile({}: ProfileProps) {
  return <div>{user.name}</div>;
}
