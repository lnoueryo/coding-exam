import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import Default from "../../components/layouts/Default"

export default function App({ Component, pageProps }: AppProps) {
  const [layoutState, setLayout] = useState("");
  switch (layoutState) {
    default: {
      return (
        <Default>
          <Component {...pageProps}  layoutState={setLayout} />
        </Default>
      );
    }
  }
}
