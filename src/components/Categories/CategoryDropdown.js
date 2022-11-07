import React, { useEffect } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { fetchCatagoriesAction } from "../../redux/slices/category/categorySlice";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const CategoryDropdown = (props) => {
  //dispatch action
  console.log(props, "props");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCatagoriesAction());
  }, [dispatch]);

  //select categories

  const category = useSelector((state) => state?.category);


  const { categoryList, loading, appErr, serverErr } = category;
 
  const allCategories = categoryList?.map((category) => {
    return {
      label: category?.title,
      value: category?._id,
    };
  });
  console.log(category);
  //handle change
  const handleChange = (value) => {
    console.log(value, "value");
    props.onChange("category", value);
  };
  //handleblur

  const handleBlur = () => {
    props.onBlur("category", true);
  };
  return (
    <div style={{ margin: "1rem 0" }}>
      {loading ? (
        <h3 className="text-base text-green-600">
          {" "}
          Product categorylist is loading. Please wait.....
        </h3>
      ) : (
        <>
        <Select
        
          onChange={handleChange}
          onBlur={handleBlur}
          id="category"
          options={allCategories}
          value={props?.value?.label}
         
        /> 
        

        </>
      )}
      {/* Display */}
      {props?.error && (
        <div style={{ color: "red", marginTop: ".5rem" }}>{props?.error}</div>
      )}
    </div>
  );
};

export default CategoryDropdown;
