import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import axios from "axios";
import { serialize } from "next-mdx-remote/serialize";
import hljs from "highlight.js";
import "highlight.js/styles/devibeans.css"; // import your preferred style
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

function Post({ heading, content }) {
  const components = {
    img: (props) => (
      // height and width are part of the props, so they get automatically passed here with {...props}
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
      <article>
        <h1>{heading}</h1>
        <MDXRemote {...content} components={components} />
      </article>
    </div>
  );
}

export async function getServerSideProps() {
  const client = new ApolloClient({
    uri: "https://damp-ridge-83493.herokuapp.com/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query {
        blogPosts(filters: { urlSlug: { eq: "my-first-blog-post" } }) {
          data {
            attributes {
              Heading
              Content
            }
          }
        }
      }
    `,
  });

  const content = await serialize(data.blogPosts.data[0].attributes.Content);

  return {
    props: {
      heading: data.blogPosts.data[0].attributes.Heading,
      content: content,
    },
  };
}

export default Post;
