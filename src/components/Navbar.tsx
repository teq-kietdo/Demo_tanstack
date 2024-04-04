import { FC } from "react";
import { INavbarItem } from "../constants/navbar";
import { Link } from "@tanstack/react-router";
import { getLocalStorageToken } from "../utils/common";

interface Props {
  list: INavbarItem[];
}

export const Navbar: FC<Props> = ({ list }) => {
  const avatar = getLocalStorageToken()?.avatar || "";

  return (
    <nav className="bg-[rgb(23_15_35)] border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            <span className="sr-only">Open user menu</span>
            {avatar && (
              <img
                className="w-8 h-8 rounded-full"
                src={avatar}
                alt="user photo"
              />
            )}
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {list.map((item) => (
              <li key={item.href}>
                <Link
                  search={false}
                  params={false}
                  to={item.href}
                  className="text-white block py-2 px-3 [&.active]:text-purple-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-purple-400 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
