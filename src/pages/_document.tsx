import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="dark">
      <Head />
      <body className="bg-white text-black dark:bg-[#020202] dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
