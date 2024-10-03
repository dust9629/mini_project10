import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://cdn.jsdelivr.net/npm/pretendard/dist/web/static/pretendard.css"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script src="https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js"></script>
      </body>
    </Html>
  );
}
