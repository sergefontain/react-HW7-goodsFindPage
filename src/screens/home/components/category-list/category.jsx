import React from "react";
import CategoryList from "./category-list";
import { Link } from "react-router-dom";

const Category = ({ name, image, subCategories, isSubCategory, _id, goods }) => {

  return (
    <div className={`col-sm-12`}>
      <div className={`${isSubCategory === false ? "border" : ""}`}>
        <Link
          to={`/${isSubCategory ? "subcategory" : "category"}/${_id}`}
          className={isSubCategory ? "" : "font-weight-bolder"}
        >
          {name} {goods? goods.length : 0}
        </Link>
        {isSubCategory === false && image !== null ? (
          <img src={image} alt={name} />
        ) : null}

        <CategoryList
          categories={subCategories === null ? [] : subCategories}
          isSubCategory={subCategories !== null}
        />
      </div>
    </div>
  );
};

Category.defaultProps = {
  subCategories: [],
  isSubCategory: false
};

export default Category;
