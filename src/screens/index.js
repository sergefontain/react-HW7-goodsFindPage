import React from "react";
import HomeScreen from "./home";
import CategoryScreen from "./category";
import CategorySearch from "./category-search";
import GoodsSearch from "./goods-search"
import Login from "./login";

const NotFound = () => <div> Oops, not found</div>;

const routes = [
  {
    path: "/login",
    exact: true,
    component: Login,
    isProtected: false
  },
  {
    path: "/",
    exact: true,
    component: HomeScreen,
    isProtected: true,
    redirectTo: "/login"
  },
  {
    path: "/category/search",
    exact: true,
    component: CategorySearch,
    isProtected: true
  },
  {
    path: "/category/goods",
    exact: true,
    component: GoodsSearch,
    isProtected: true
  },
  {
    path: "/category/:id",
    exact: true,
    component: CategoryScreen,
    isProtected: true
  },
  {
    path: "/subcategory/:id",
    exact: true,
    component: CategoryScreen,
    isProtected: true
  },

  {
    children: NotFound,
    isProtected: false
  }
];

export default routes;
