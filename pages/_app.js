import "../styles/globals.css";
import "../styles/index.scss";
import "@code-hike/mdx/dist/index.css";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <div className="blog__container">
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
