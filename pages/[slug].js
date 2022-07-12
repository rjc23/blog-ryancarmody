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

const client = new ApolloClient({
  uri: "https://damp-ridge-83493.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

function Post({ heading, content, date, minsToRead, heroImage }) {
  const [contents, setUserContents] = useState([]);

  const components = {
    img: (props) => (
      // eslint-disable-next-line jsx-a11y/alt-text
      <Image
        {...props}
        layout="responsive"
        loading="lazy"
        width={100}
        height={100}
      />
    ),
  };

  useEffect(() => {
    updateCodeSyntaxHighlighting();
    updateCaptions();
  });

  useEffect(() => {
    const h3Tags = document.querySelectorAll("h3");
    console.log(h3Tags);
    setUserContents(h3Tags);
  }, []);

  const updateCodeSyntaxHighlighting = () => {
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightBlock(block);
    });
  };

  const updateCaptions = () => {
    document.querySelectorAll("p.caption").forEach((block) => {
      block.classList.add("text-gray-600", "dark:text-gray-400");
    });
  };

  return (
    <div>
      <Header />
      <article className="post">
        <Author name="Ryan Carmody" date={date} minsToRead={minsToRead} />
        <h1>{heading}</h1>
        <Image src={heroImage} width={300} height={300} />
        <Contents h2Elements={contents} />
        <div className="content">
          <MDXRemote {...content} />
        </div>
      </article>
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
      minsToRead: attrs.minsToRead,
      heroImage: attrs.heroImage.data.attributes.url,
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
