import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { Button, Skeleton, Switch } from "@heroui/react";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button isIconOnly>
        <Skeleton className="rounded-full w-3 h-3" />
      </Button>
    );
  }

  return (
    <Switch
      defaultSelected={resolvedTheme == "light"}
      endContent={<MdDarkMode />}
      size="lg"
      startContent={<MdLightMode />}
      onValueChange={() =>
        setTheme(resolvedTheme == "light" ? "dark" : "light")
      }
      color="default"
      data-testid="theme-switch"
    />
  );
};

export default ThemeSwitch;
