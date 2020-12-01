import { GraphQLClient } from "graphql-request";

// const NO_CORS = "https://cors-anywhere.herokuapp.com/";
// export const ENDPOINT = `${NO_CORS}http://shop-roles.asmer.fs.a-level.com.ua`;
export const ENDPOINT = 'http://shop-roles.asmer.fs.a-level.com.ua';

export const ENDPOINT_GRAPHQL = `${ENDPOINT}/graphql`;

export const client = new GraphQLClient(ENDPOINT_GRAPHQL);

const token = localStorage.getItem("token");
if (token !== null) {
  console.log("token", token);
  client.setHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
}

export default client;
