"use client";

import { BsFiletypePdf, BsFiletypeTxt, BsArrowRight } from "react-icons/bs";
import ThemeButtons from "@/components/theme-buttons";
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import { useState } from "react";
import Navigation from "@/components/navigation";
import { navigationTabs } from "@/components/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent justify="start">
        <NavbarMenuToggle
          className="sm:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
        <NavbarBrand>
          <div className="flex items-center gap-1">
            <BsFiletypePdf className="h-10 w-10" />
            <BsArrowRight className="h-10 w-10" />
            <BsFiletypeTxt className="h-10 w-10" />
          </div>
        </NavbarBrand>
      </NavbarContent>

      <div className="hidden sm:block">
        <Navigation />
      </div>

      <NavbarContent justify="end">
        <ThemeButtons />
      </NavbarContent>

      <NavbarMenu>
        {navigationTabs.map((item) => (
          <NavbarMenuItem key={item.href}>
            <Link
              href={item.href}
              className="flex items-center gap-2"
              onPress={() => setIsMenuOpen(false)}
            >
              {item.icon} {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
