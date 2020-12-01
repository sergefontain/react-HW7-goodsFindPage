import React from "react";
import { gql } from "graphql-request";
import CategoryList from "./screens/home/components/category-list";
import useQuery from "./shared/hooks/use-query";
import { useSelector } from "react-redux";
const query = gql`
  query {
    CategoryFind(query: "[{}]") {
      name
      _id
      subCategories {
        name
        _id
        image {
          url
        }
      }
      image {
        url
      }
      goods {
        name
        _id
        price
      }
    }
  }
`;

const SideBar = () => {
  const { data } = useQuery({
    query,
    initialState: { CategoryFind: [] }
  });

  const isAuth = useSelector((state) => state.auth.isLoggedIn);

  if (isAuth === false) return null;

  return (
    <aside className="col-sm-12 col-md-3">
      <CategoryList categories={data.CategoryFind} />
    </aside>
  );
};

export default SideBar;
