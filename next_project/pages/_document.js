import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
        <link
          href="https://cdn.jsdelivr.net/npm/pretendard/dist/web/static/pretendard.css"
          rel="stylesheet"
        />
        <link rel="icon" href="/boodle.png" type="image/png" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
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
