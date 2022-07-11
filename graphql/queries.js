import { gql } from "@apollo/client";

const GET_ALL_SLUGS = gql`
  query {
    blogPosts {
      data {
        attributes {
          urlSlug
        }
      }
    }
  }
`;

const GET_INDIVIDUAL_POST = gql`
  query ($slugUrl: String!) {
    blogPosts(filters: { urlSlug: { eq: $slugUrl } }) {
      data {
        attributes {
          heading
          content
          createdAt
        }
      }
    }
  }
`;

const GET_LATEST_POSTS = gql`
  query {
    blogPosts {
      data {
        attributes {
          heading
        }
      }
    }
  }
`;

export { GET_ALL_SLUGS, GET_INDIVIDUAL_POST, GET_LATEST_POSTS };
