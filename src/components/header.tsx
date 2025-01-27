"use client";

import {
  BsGithub,
  BsFiletypePdf,
  BsFiletypeTxt,
  BsArrowRight,
} from "react-icons/bs";
import ThemeButtons from "@/components/theme-buttons";

export default function Header() {
  return (
    <div className="w-full max-w-sm mx-auto m-5">
      <div className="flex flex-col items-center p-1 border-3 rounded-full gap-1">
        <p className="flex gap-2 text-3xl font-bold items-center">
          Pdf to text
          <BsFiletypePdf />
          <BsArrowRight />
          <BsFiletypeTxt />
          <ThemeButtons />
        </p>
        <div className="flex items-center gap-1 text-md">
          <BsGithub />
          <p>Open source project</p>
        </div>
      </div>
    </div>
  );
}
