import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#F6F3ED",
        oceanBrown: "#7A5C4A",
        textDark: "#1F1F1F",
        textMuted: "#666666"
      },
      fontFamily: {
        sans: [
          '"Roboto"',
          '"Microsoft JhengHei"',
          '"Microsoft JhengHei UI"',
          '"Noto Sans TC"',
          '"Segoe UI"',
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif"
        ],
        serif: [
          '"Poppins"',
          '"Microsoft JhengHei"',
          '"Microsoft JhengHei UI"',
          '"Noto Sans TC"',
          '"Segoe UI"',
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif"
        ]
      },
      backgroundImage: {
        "ocean-lines":
          "radial-gradient(circle at 0 0, rgba(122,92,74,0.12) 0, transparent 55%), radial-gradient(circle at 100% 100%, rgba(122,92,74,0.12) 0, transparent 55%)"
      }
    }
  },
  plugins: []
};

export default config;
