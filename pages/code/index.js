import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GET_LATEST_POSTS } from "../../graphql/queries";
import Link from "next/link";
import Head from "next/head";

const client = new ApolloClient({
  uri: "https://damp-ridge-83493.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

function index({ posts }) {
  return (
    <div className="code">
      <Head>
        <title>Code | BLOG.ryancarmody</title>
        <meta
          name="description"
          content="Here you can find articles about everything web dev. I like to write 'how to's' about specific topics e.g. Angular 2+, Next.js, Heroku etc, as well as broader topics about the life of a web developer."
        />
      </Head>
      <Header />
      <div className="stack gap48">
        <div className="stack gap8 items-start">
          <h1>Code</h1>
          <p>
            Here you can find articles about everything web dev. I like to write
            &apos;how to&apos;s&apos; about specific topics e.g. Angular 2+,
            Next.js, Heroku etc, as well as broader topics about the life of a
            web developer.
          </p>
        </div>
        <div className="stack gap16">
          <h2>Latest articles</h2>
          <div className="stack gap24">
            {posts.map((val, i) => {
              const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
              };
              const createdAt = new Date(
                val.attributes.createdAt
              ).toLocaleDateString([], options);
              return (
                <Link key={i} href={val.attributes.urlSlug}>
                  <a className="stack gap4">
                    <h3>{val.attributes.heading}</h3>
                    <span className="text-sm text-green-600 dark:text-green-300">
                      {val.attributes.minsToRead} mins - {createdAt}
                    </span>
                    <p className="text-gray-600 dark:text-gray-400">
                      {val.attributes.description}
                    </p>
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_LATEST_POSTS,
    variables: { type: "code" },
  });

  return {
    props: {
      posts: data.blogPosts.data,
    },
  };
}

export default index;
