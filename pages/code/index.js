import React from "react";
import Header from "../../components/Header/Header";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GET_LATEST_POSTS } from "../../graphql/queries";
import { data } from "autoprefixer";
import Link from "next/link";

const client = new ApolloClient({
  uri: "https://damp-ridge-83493.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

function index({ posts }) {
  console.log(posts);
  return (
    <>
      <Header />
      <div className="stack gap48">
        <div className="stack gap8">
          <h1>Code</h1>
          <p>
            Here you can find articles about everything web dev. &apos;I like to
            write how to&apos;s&apos; about specific topics e.g. Angular 2+,
            Next.js, Heroku etc, as well as broader topics about the life of a
            web developer.
          </p>
        </div>
        <div className="stack gap16">
          <h2>Latest articles</h2>
          <div className="stack gap24">
            {posts.map((val, i) => {
              return (
                <Link key={i} href={val.attributes.urlSlug}>
                  <a className="stack gap4">
                    <h3>{val.attributes.heading}</h3>
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
    </>
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
