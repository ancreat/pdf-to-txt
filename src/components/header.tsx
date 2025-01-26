import {
  BsGithub,
  BsFiletypePdf,
  BsFiletypeTxt,
  BsArrowRight,
} from "react-icons/bs";
import ThemeButtons from "@/components/theme-buttons";

export default function Header() {
  return (
    <div className="flex flex-col justify-center items-center w-full m-2 p-3 border-3 rounded-full">
      <p className="text-3xl font-bold m-2">Pdf to text</p>
      <p className="flex gap-2 text-5xl">
        <BsFiletypePdf />
        <BsArrowRight />
        <BsFiletypeTxt />
      </p>
      <div className="flex items-center m-2 gap-1">
        <BsGithub />
        <p>Open source project</p>
      </div>
      <ThemeButtons />
    </div>
  );
}
