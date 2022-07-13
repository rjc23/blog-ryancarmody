import Head from "next/head";
import Header from "../components/Header/Header";
import Banner from "../components/Banner/Banner";
import BlogContent from "../components/BlogContent/BlogContent";
import Footer from "../components/Footer/Footer";

export default function Main() {
  return (
    <div>
      <Head>
        <title>Home | BLOG.ryancarmody</title>
        <meta
          name="description"
          content="A blog by Ryan Carmody, Web Developer and Computer Science Tutor"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Header />
        <Banner />
        <BlogContent />
        <Footer />
      </div>
    </div>
  );
}
