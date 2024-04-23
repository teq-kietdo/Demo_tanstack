export interface INavbarItem {
  href: string;
  title: string;
}

export const NavbarItem: INavbarItem[] = [
  { href: "/", title: "Home" },
  { href: "/television", title: "Television" },
  { href: "/profile", title: "Profile" },
  { href: "/table", title: "Table" },
  { href: "/login", title: "Login" },
];
