import "../styles/globals.css";

import { NextIntlProvider } from "next-intl";

function MyApp({ Component, pageProps }) {
  return (
    <NextIntlProvider messages={pageProps.title}>
      <Component {...pageProps} />
    </NextIntlProvider>
  );
}

export default MyApp;
