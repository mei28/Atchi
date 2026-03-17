import {
  defineConfig,
  minimal2023Preset,
} from "@vite-pwa/assets-generator/config";

export default defineConfig({
  headLinkOptions: {
    preset: "2023",
  },
  preset: {
    ...minimal2023Preset,
    maskable: {
      sizes: [512],
      resizeOptions: { background: "#0D1B2A" },
    },
    apple: {
      sizes: [180],
      resizeOptions: { background: "#0D1B2A" },
    },
  },
  images: ["public/favicon.svg"],
});
