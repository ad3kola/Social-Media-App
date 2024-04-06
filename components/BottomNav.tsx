"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BottomNavLinks } from "@/lib/data";

function BottomNav() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <section className="w-full bg-dark md:hidden absolute bottom-0 left-0 right-0 z-20">
      <div className="bg-dark w-full flex items-center justify-between py-1.5 px-6">
        {BottomNavLinks.map(({ title, Icon, path }) => {
            const URLPath = path
          return (
            <Link key={title} href={`${URLPath}`}>
              <div className={` ${pathname == URLPath && 'bg-indigo-700 p-2 rounded-md'} flex flex-col items-center justify-evenly text-gray-100 space-y-1`}>
                <Icon className="h-6 w-6" />
                <p className="hidden sm:block font-medium tracking-wide text-[11px]">
                  {title.split(" ")[0]}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default BottomNav;
