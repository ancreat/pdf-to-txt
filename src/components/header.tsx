"use client";

import { BsFiletypePdf, BsFiletypeTxt, BsArrowRight } from "react-icons/bs";
import ThemeSwitch from "@/components/theme-switch";
import {
  Button,
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
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="md"
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle
          className="sm:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          data-testid={isMenuOpen ? "navbar-menu-close" : "navbar-menu-open"}
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
        <ThemeSwitch />
      </NavbarContent>

      <NavbarMenu>
        {Object.values(navigationTabs).map((item) => (
          <NavbarMenuItem key={item.href}>
            <Button
              as={Link}
              href={item.href}
              className="flex items-center gap-1 text-xl my-1 p-5"
              onPress={() => setIsMenuOpen(false)}
              data-testid={`${item["data-testid"]}-button`}
            >
              {item.icon} {item.title}
            </Button>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
