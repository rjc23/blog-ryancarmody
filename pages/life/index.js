import React from "react";
import Header from "../../components/Header/Header";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GET_LATEST_POSTS } from "../../graphql/queries";
import Link from "next/link";

const client = new ApolloClient({
  uri: "https://damp-ridge-83493.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

function index({ posts }) {
  return (
    <div className="life">
      <Header />
      <div className="stack gap48">
        <div className="stack gap8 items-start">
          <h1>Life</h1>
          <p>
            Everything related to whats going on in my life. This might include
            articles about the sports I play, my hobbies, holidays I take, jobs
            I apply for etc.
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
    </div>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_LATEST_POSTS,
    variables: { type: "life" },
  });

  return {
    props: {
      posts: data.blogPosts.data,
    },
  };
}

export default index;
