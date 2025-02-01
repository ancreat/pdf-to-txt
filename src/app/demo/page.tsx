"use client";

import { useRef } from "react";
import { useTheme } from "next-themes";

import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Inline from "yet-another-react-lightbox/plugins/inline";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import { SlideshowRef } from "yet-another-react-lightbox";

import lightImage1 from "@/assets/images/demo_light_theme_1.png";
import lightImage2 from "@/assets/images/demo_light_theme_2.png";
import lightImage3 from "@/assets/images/demo_light_theme_3.png";
import darkImage1 from "@/assets/images/demo_dark_theme_1.png";
import darkImage2 from "@/assets/images/demo_dark_theme_2.png";
import darkImage3 from "@/assets/images/demo_dark_theme_3.png";

export default function Demo() {
  const { resolvedTheme } = useTheme();
  const slideshowRef = useRef<SlideshowRef | null>(null);

  const lightImages = [lightImage1, lightImage2, lightImage3].map((image) => ({
    src: image.src,
  }));
  const darkImages = [darkImage1, darkImage2, darkImage3].map((image) => ({
    src: image.src,
  }));

  return (
    <main className="flex flex-col gap-5 items-center p-3">
      <div className="flex items-center gap-2 text-3xl font-bold">
        Demo
        <p className="font-bold border-2 rounded-2xl p-1">Pdf to text</p>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          maxHeight: "600px",
          aspectRatio: "4/3",
        }}
      >
        <Lightbox
          slides={resolvedTheme === "light" ? lightImages : darkImages}
          plugins={[Fullscreen, Inline, Counter, Slideshow]}
          slideshow={{ autoplay: false, delay: 3000, ref: slideshowRef }}
          counter={{ container: { style: { top: 0, bottom: "unset" } } }}
          on={{
            click: () => {
              if (slideshowRef.current) {
                (slideshowRef.current.playing
                  ? slideshowRef.current.pause
                  : slideshowRef.current.play)?.();
              }
            },
          }}
        />
      </div>
    </main>
  );
}
