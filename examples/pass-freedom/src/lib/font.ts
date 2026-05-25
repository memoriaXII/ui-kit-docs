import { NextFont } from "next/dist/compiled/@next/font";
import { Poppins } from "next/font/google";

const enFont = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fonts: Record<string, NextFont> = {
  en: enFont,
};

export default fonts;
