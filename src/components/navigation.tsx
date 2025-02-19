"use client";

import { Tabs, Tab } from "@heroui/react";
import { usePathname } from "next/navigation";
import { MdHome, MdFileDownload, MdInfo, MdImage } from "react-icons/md";

export const navigationTabs = [
  {
    href: "/",
    icon: <MdHome />,
    title: "Home",
    "data-testid": "navigation-home",
  },
  {
    href: "/result",
    icon: <MdFileDownload />,
    title: "Result",
    "data-testid": "navigation-result",
  },
  {
    href: "/demo",
    icon: <MdImage />,
    title: "Demo",
    "data-testid": "navigation-demo",
  },
  {
    href: "/about",
    icon: <MdInfo />,
    title: "About",
    "data-testid": "navigation-about",
  },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <div className="flex justify-center w-full">
      <Tabs selectedKey={pathname} size="lg">
        {navigationTabs.map(
          ({ href, icon, title, "data-testid": dataTestId }) => (
            <Tab
              key={href}
              href={href}
              data-testid={`${dataTestId}-tab`}
              title={
                <div className="flex items-center gap-2">
                  {icon} {title}
                </div>
              }
            />
          ),
        )}
      </Tabs>
    </div>
  );
}
