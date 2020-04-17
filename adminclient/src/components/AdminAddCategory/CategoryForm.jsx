import React, { useState } from "react";
import swal from "sweetalert";
export default function CategoryForm({ addCategory }) {
  const [category, setCategory] = useState({});

  const onChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(category);
    addCategory(category);
  };
  return (
    <div className="container">
      <h1 className="text-center">ADD NEW CATEGORY</h1>
      <form role="form" onSubmit={handleSubmit}>
        <div className="card-body">
          <div className="form-group">
            <label for="exampleInputEmail1">Category Name</label>
            <input
              type="text"
              name="categoryName"
              className="form-control"
              placeholder="Enter Category Name"
              onChange={onChange}
            />
          </div>
          <div class="form-group">
            <label>Select</label>
            <select class="form-control" onChange={onChange} name="genderType">
              <option>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Any">Any</option>
            </select>
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Code Name</label>
            <input
              type="text"
              name="code"
              className="form-control"
              placeholder="Enter code name"
              onChange={onChange}
            />
          </div>
        </div>

        <div className="card-footer">
          <button
            type="submit"
            className="btn btn-primary btn-block"
            onClick={() =>
              swal({
                title: "THANK YOU",
                text: "NEW CATEGORY ADDED SUCESSFULLY",
                icon: "success",
                button: "CONTINUE",
              })
            }
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
