import React from "react";
import Header from "../../components/Header/Header";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GET_LATEST_POSTS } from "../../graphql/queries";

const client = new ApolloClient({
  uri: "https://damp-ridge-83493.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

function index() {
  return (
    <>
      <Header />
      <div className="stack gap48">
        <div className="stack gap24">
          <h1>Code</h1>
          <p>
            Here you can find articles about everything web dev. &apos;I like to
            write how to&apos;s&apos; about specific topics e.g. Angular 2+,
            Next.js, Heroku etc, as well as broader topics about the life of a
            web developer.
          </p>
        </div>
        <h2>Latest articles</h2>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_LATEST_POSTS,
  });

  const attrs = data.blogPosts.data[0].attributes;

  return {
    props: {
      heading: attrs.Heading,
      content: content,
      date: attrs.createdAt,
    },
  };
}

export default index;
