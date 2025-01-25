import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MdLightMode, MdDarkMode, MdComputer } from "react-icons/md";
import { Button, Skeleton } from "@heroui/react";

const LightOrDarkModeButton = () => {
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

const ThemeButtons = () => {
  const { setTheme } = useTheme();
  return (
    <div className="flex items-center m-2 gap-5">
      <Button isIconOnly onPress={() => setTheme("system")}>
        <MdComputer />
      </Button>
      <LightOrDarkModeButton />
    </div>
  );
};

export default ThemeButtons;
