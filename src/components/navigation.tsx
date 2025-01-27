"use client";

import { Tabs, Tab } from "@heroui/react";
import { usePathname } from "next/navigation";
import { MdFileDownload, MdHome } from "react-icons/md";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <div className="flex justify-center w-full">
      <Tabs selectedKey={pathname} size="lg">
        <Tab
          key="/"
          href="/"
          title={
            <div className="flex items-center gap-2">
              <MdHome /> Home
            </div>
          }
        />
        <Tab
          key="/result/"
          href="/result/"
          title={
            <div className="flex items-center gap-2">
              <MdFileDownload /> Result
            </div>
          }
        />
      </Tabs>
    </div>
  );
}
