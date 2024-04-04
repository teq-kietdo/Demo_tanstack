import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { NavbarItem } from "../constants/navbar";
import { QueryClient } from "@tanstack/react-query";
import { Navbar } from "../components/Navbar";

export const auth: Auth = {
  status: "loggedOut",
  username: undefined,
  login: (username: string) => {
    auth.status = "loggedIn";
    auth.username = username;
  },
  logout: () => {
    auth.status = "loggedOut";
    auth.username = undefined;
  },
};

export type Auth = {
  login: (username: string) => void;
  logout: () => void;
  status: "loggedOut" | "loggedIn";
  username?: string;
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: () => (
      <div className="bg-[rgb(23_15_35)] min-h-screen">
        <Navbar list={NavbarItem} />
        <Outlet />
      </div>
    ),
  }
);
