"use client";

import { useState } from "react";
import { Switch } from "@heroui/react";
import VideoPlayer from "@/components/video-player";

export default function Demo() {
  const [isMobileSelected, setIsMobileSelected] = useState(true);

  return (
    <main className="flex flex-col gap-5 items-center p-3">
      <div className="flex items-center justify-between w-full max-w-md">
        <div className="flex items-center gap-2 text-3xl font-bold">
          Demo
          <p className="font-bold border-2 rounded-2xl p-1">Pdf to text</p>
        </div>
        <Switch
          isSelected={isMobileSelected}
          onValueChange={setIsMobileSelected}
          color="default"
        >
          Mobile
        </Switch>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: isMobileSelected == true ? "500px" : "800px",
          maxHeight: "500px",
        }}
      >
        {isMobileSelected == true ? (
          <VideoPlayer
            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/videos/demo_mobile_video.mp4`}
          />
        ) : (
          <VideoPlayer
            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/videos/demo_desktop_video.mp4`}
          />
        )}
      </div>
    </main>
  );
}
