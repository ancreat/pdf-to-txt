import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { Button, Skeleton } from "@heroui/react";

const ThemeButtons = () => {
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
    <>
      {resolvedTheme == "light" ? (
        <Button isIconOnly onPress={() => setTheme("dark")}>
          <MdDarkMode />
        </Button>
      ) : (
        <Button isIconOnly onPress={() => setTheme("light")}>
          <MdLightMode />
        </Button>
      )}
    </>
  );
};

export default ThemeButtons;
