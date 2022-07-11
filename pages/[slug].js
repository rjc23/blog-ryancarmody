import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import { serialize } from "next-mdx-remote/serialize";
import hljs from "highlight.js";
import "highlight.js/styles/devibeans.css"; // import your preferred style
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GET_ALL_SLUGS, GET_INDIVIDUAL_POST } from "./../graphql/queries";
import Author from "../components/Author/Author";

const client = new ApolloClient({
  uri: "https://damp-ridge-83493.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

function Post({ heading, content, date, minsToRead }) {
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
  });

  const updateCodeSyntaxHighlighting = () => {
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightBlock(block);
    });
  };

  return (
    <div>
      <Header />
      <article className="post">
        <Author name="Ryan Carmody" date={date} minsToRead={minsToRead} />
        <h1>{heading}</h1>
        <MDXRemote {...content} />
      </article>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: GET_INDIVIDUAL_POST,
    variables: { slugUrl: params.slug },
  });

  const attrs = data.blogPosts.data[0].attributes;
  const content = await serialize(data.blogPosts.data[0].attributes.content);

  return {
    props: {
      heading: attrs.heading,
      content: content,
      date: attrs.createdAt,
      minsToRead: attrs.minsToRead,
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
