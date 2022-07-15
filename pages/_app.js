import "../styles/globals.css";
import "../styles/index.scss";
// import "@code-hike/mdx/dist/index.css";
import "../styles/prism.css";
import { useRouter } from "next/router";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <div className="blog__container">
        <Component {...pageProps} key={router.route} />
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
