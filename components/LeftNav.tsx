"use client";

import { BottomNavLinks } from "@/lib/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {ArrowLeftEndOnRectangleIcon} from '@heroicons/react/24/outline'

function LeftNav() {
  const pathname = usePathname();
  return (
    <section className="col-span-3 lg:col-span-2 hidden md:flex max-h-full">
      <div className="bg-dark w-full flex flex-col justify-between p-4 pb-20 px-6">
        <div className="w-full flex flex-col space-y-4">
          {BottomNavLinks.map(({ title, Icon, path }) => {
            const URLPath = path;
            return (
              <Link key={title} href={`${URLPath}`}>
                <div
                  className={`flex space-x-4 p-4 rounded-md items-center justify-start text-gray-100 ${
                    pathname == URLPath ? "bg-indigo-700" :
                   "hover:bg-gray-100  hover:text-dark"}`}
                >
                  <Icon className="h-6 w-6 flex-shrink-0" />
                  <p className="hidden xl:block font-medium tracking-wide text-base">
                    {title}
                  </p>

                  <p className="hidden sm:block xl:hidden font-medium tracking-wide text-base">
                    {title.split(" ")[0]}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>{" "}
        <button className="flex space-x-4 p-4 rounded-md items-center justify-start hover:bg-gray-100 hover:text-dark text-gray-100">
          <ArrowLeftEndOnRectangleIcon className="h-6 w-6 flex-shrink-0" />
          <p className="font-medium tracking-wide text-base">
            Logout
          </p>
        </button>
      </div>
    </section>
  );
}

export default LeftNav;
