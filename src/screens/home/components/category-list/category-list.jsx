import React from "react";
import Category from "./category";

const CategoryList = ({ categories, isSubCategory }) => {

  return (
    <div className="row">
      {categories.map((category) => (
        <Category
          {...category}
          key={category._id}
          isSubCategory={isSubCategory}
        />
      ))}
    </div>
  );
};

CategoryList.defaultProps = {
  isSubCategory: false
};

export default CategoryList;
