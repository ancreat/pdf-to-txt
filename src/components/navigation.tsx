"use client";

import { Tabs, Tab } from "@heroui/react";
import { usePathname } from "next/navigation";
import { MdHome, MdFileDownload, MdInfo, MdImage } from "react-icons/md";

export const navigationTabs = [
  { href: "/", icon: <MdHome />, title: "Home" },
  { href: "/result/", icon: <MdFileDownload />, title: "Result" },
  { href: "/demo/", icon: <MdImage />, title: "Demo" },
  { href: "/about/", icon: <MdInfo />, title: "About" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <div className="flex justify-center w-full">
      <Tabs selectedKey={pathname} size="lg">
        {navigationTabs.map(({ href, icon, title }) => (
          <Tab
            key={href}
            href={href}
            title={
              <div className="flex items-center gap-2">
                {icon} {title}
              </div>
            }
          />
        ))}
      </Tabs>
    </div>
  );
}
