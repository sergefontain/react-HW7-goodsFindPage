import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "graphql-request";
import useQuery from "./../../shared/hooks/use-query";
import Spinner from "./../../shared/components/spinner";

const query = gql`
  query getCategory($query: String) {
    CategoryFindOne(query: $query) {
      name
      parent {
        name
      }
      goods {
        _id
        price
        name
      }
    }
  }
`;

const CategoryScreen = () => {
  const { id } = useParams();
  const { data, status } = useQuery({
    initialState: { CategoryFindOne: { goods: [] } },
    query,
    variables: {
      query: JSON.stringify([
        {
          _id: id
        }
      ])
    }
  });

  const {
    CategoryFindOne: { goods, parent }
  } = data;

  const title = parent === null ? "Category" : `Sub category`;

  return (
    <div>
      <h1>
        {title} Screen: {id}
      </h1>
      {status === "pending" ? <Spinner /> : null}
      <ul>
        {goods === null ? (
          <h2>There is no data</h2>
        ) : (
          goods.map((good) => (
            <li key={good._id}>
              <span>{good.name}</span>
              <span>{good.price}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CategoryScreen;
