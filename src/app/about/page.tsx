"use client";

import { BsGithub } from "react-icons/bs";
import { Card, Link } from "@heroui/react";

export default function About() {
  return (
    <main className="flex flex-col gap-5 items-center p-3">
      <div className="flex items-center gap-2 text-3xl font-bold">
        About
        <p className="font-bold border-2 rounded-2xl p-1">Pdf to text</p>
      </div>

      <div className="flex items-center gap-2">
        <BsGithub />
        <Link isExternal href="https://github.com/ancreat/pdf-to-txt" size="lg">
          Open source project
        </Link>
      </div>

      <div className="flex gap-5 flex-col sm:flex-row">
        <Card className="p-6">
          <div className="text-2xl font-bold text-center mb-3">
            ✨ Key Features
          </div>
          <ul className="list-disc list-inside text-lg flex flex-col gap-3">
            <li>📄 Single/Batch PDF text extraction</li>
            <li>📋 Copy extracted text to clipboard</li>
            <li>💾 Download text as `.txt` files</li>
            <li>📊 Process history tracking</li>
            <li>🌓 Light/Dark theme support</li>
            <li>📱 Responsive design</li>
            <li>📈 Real-time progress tracking</li>
          </ul>
        </Card>

        <Card className="p-6">
          <div className="text-2xl font-bold text-center mb-3">Tech Stack</div>
          <ul className="list-disc list-inside text-lg flex flex-col gap-3">
            <li>React.js</li>
            <li>Next.js</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
            <li>Zustand for state management</li>
            <li>HeroUI for UI components</li>
            <li>Vitest for component testing</li>
            <li>Cypress for end-to-end testing</li>
          </ul>
        </Card>
      </div>
    </main>
  );
}
