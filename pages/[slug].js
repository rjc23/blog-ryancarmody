import React, { useEffect, useState, componentDidMount } from "react";
import Header from "../components/Header/Header";
import { serialize } from "next-mdx-remote/serialize";
import hljs from "highlight.js";
import "highlight.js/styles/devibeans.css"; // import your preferred style
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GET_ALL_SLUGS, GET_INDIVIDUAL_POST } from "./../graphql/queries";
import Author from "../components/Author/Author";
import rehypeSlug from "rehype-slug";
import Contents from "../components/Contents/Contents";
import Head from "next/head";
import Footer from "../components/Footer/Footer";

const client = new ApolloClient({
  uri: process.env.CMS_HOST,
  cache: new InMemoryCache(),
});

function Post({
  heading,
  content,
  date,
  minsToRead,
  heroImage,
  description,
  tags,
  socialImage,
}) {
  const [contents, setUserContents] = useState([]);
  const [showContent, setShowContent] = useState(false);
  // const [url, setUrl] = useState("");

  useEffect(() => {
    // updateCodeSyntaxHighlighting();
    // updateCaptions();
    // updateCodeSnippets();
    // updateATags();
  }, []);

  useEffect(() => {
    const h3Tags = document.querySelectorAll("h3, h4");
    if (h3Tags.length > 0) {
      setUserContents(h3Tags);
      setShowContent(true);
    }
    // setUrl(window.location.href);
  }, []);

  // const updateCodeSyntaxHighlighting = () => {
  //   document.querySelectorAll("pre code").forEach((block) => {
  //     hljs.highlightElement(block);
  //   });
  // };

  // const updateCaptions = () => {
  //   document.querySelectorAll("p.caption").forEach((block) => {
  //     block.classList.add("text-gray-600", "dark:text-gray-400");
  //   });
  // };

  // const updateCodeSnippets = () => {
  //   document.querySelectorAll("code").forEach((block) => {
  //     if (!block.classList.contains("hljs")) {
  //       block.classList.add("inline-code");
  //     }
  //   });
  // };

  // const updateATags = () => {
  //   document.querySelectorAll("a").forEach((block) => {
  //     if (block.classList.length === 0) {
  //       block.setAttribute("target", "_blank");
  //     }
  //   });
  // };

  return (
    <div>
      <Head>
        <title>{heading} | BLOG.ryancarmody</title>
        <meta name="description" content={description}></meta>
        <meta name="author" content="Ryan Carmody"></meta>
        <meta name="keywords" content={tags}></meta>
        <meta
          content="width=device-width, initial-scale=1"
          name="viewport"
        ></meta>
        <meta property="og:title" content={heading} />
        {/* <meta property="og:url" content={url} /> */}
        {/* <meta property="og:image" content={socialImage} /> */}
        <meta property="og:type" content="article" />
      </Head>
      <Header />
      <article className="post">
        <Author name="Ryan Carmody" date={date} minsToRead={minsToRead} />
        <h1>{heading}</h1>
        {heroImage !== "" && (
          <div className="hero-image">
            <Image
              src={heroImage}
              alt="Hero image"
              layout="fill"
              className="image"
              loading="lazy"
            />
          </div>
        )}
        {showContent && <Contents h2Elements={contents} />}
        <div className="content">
          <MDXRemote {...content} />
        </div>
      </article>
      <Footer />
    </div>
  );
}

export async function getStaticProps({ params }) {
  const options = {
    mdxOptions: {
      rehypePlugins: [rehypeSlug],
    },
  };

  const { data } = await client.query({
    query: GET_INDIVIDUAL_POST,
    variables: { slugUrl: params.slug },
  });

  const attrs = data.blogPosts.data[0].attributes;
  const content = await serialize(
    data.blogPosts.data[0].attributes.content,
    options
  );

  return {
    props: {
      heading: attrs.heading,
      content: content,
      date: attrs.createdAt,
      description: attrs.description,
      tags: attrs.tags,
      minsToRead: attrs.minsToRead,
      heroImage: attrs.heroImage?.data
        ? attrs.heroImage.data.attributes.url
        : "",
      socialImage: attrs.socialImage?.data
        ? attrs.socialImage.data.attributes.url
        : "",
    },
  };
}

export async function getStaticPaths() {
  const { data } = await client.query({ query: GET_ALL_SLUGS });

  const paths = data.blogPosts.data.map((post) => {
    return { params: { slug: post.attributes.urlSlug } };
  });

  return {
    paths,
    fallback: false,
  };
}

export default Post;
