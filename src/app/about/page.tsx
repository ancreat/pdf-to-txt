import { BsGithub } from "react-icons/bs";

export default function About() {
  return (
    <main className="flex flex-col gap-5 items-center p-3">
      <h1 className="flex items-center gap-2 text-2xl font-bold">
        About
        <p className="font-bold border-2 rounded-2xl p-1">Pdf to text</p>
      </h1>

      <div className="flex items-center gap-2">
        <BsGithub />
        <p>Open source project</p>
      </div>
    </main>
  );
}
