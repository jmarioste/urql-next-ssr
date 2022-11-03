import "../styles/globals.css";
import type { AppProps } from "next/app";
import UrqlProvider from "../urql/URQLProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UrqlProvider pageProps={pageProps}>
      <Component {...pageProps} />
    </UrqlProvider>
  );
}

export default MyApp;
