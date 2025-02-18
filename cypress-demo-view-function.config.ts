import { defineConfig } from "cypress";

function createViewConfig(
  width: number,
  height: number,
  mode: "desktop" | "mobile",
) {
  return defineConfig({
    trashAssetsBeforeRuns: false,
    video: true,
    videoCompression: true,
    videosFolder: "public/videos",
    viewportWidth: width,
    viewportHeight: height,
    animationDistanceThreshold: 5,
    e2e: {
      baseUrl: "http://localhost:3000",
      setupNodeEvents(on, config) {
        on("before:browser:launch", (browser, launchOptions) => {
          if (browser.name === "electron" && browser.isHeadless) {
            launchOptions.preferences.width = width;
            launchOptions.preferences.height = height;
          }
          return launchOptions;
        });
      },
    },
    env: {
      mode: mode,
    },
  });
}

export default createViewConfig;
