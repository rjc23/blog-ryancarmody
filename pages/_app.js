import "../styles/globals.css";
import "../styles/index.scss";
import "@code-hike/mdx/dist/index.css";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  // useEffect(() => {
  //   document.body.classList.add("bg-white");
  //   document.body.classList.add("dark:bg-black");
  // });

  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <div className="blog__container">
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
