"use client";

import { Tabs, Tab } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdHome, MdFileDownload, MdInfo, MdImage } from "react-icons/md";

export const navigationTabs = {
  home: {
    href: "/",
    icon: <MdHome />,
    title: "Home",
    "data-testid": "navigation-home",
  },
  result: {
    href: "/result",
    icon: <MdFileDownload />,
    title: "Result",
    "data-testid": "navigation-result",
  },
  demo: {
    href: "/demo",
    icon: <MdImage />,
    title: "Demo",
    "data-testid": "navigation-demo",
  },
  about: {
    href: "/about",
    icon: <MdInfo />,
    title: "About",
    "data-testid": "navigation-about",
  },
};

export default function Navigation() {
  const pathname = usePathname();

  return (
    <div className="flex justify-center w-full">
      <Tabs selectedKey={pathname} size="lg">
        {Object.values(navigationTabs).map(
          ({ href, icon, title, "data-testid": dataTestId }) => (
            <Tab
              as={Link}
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
