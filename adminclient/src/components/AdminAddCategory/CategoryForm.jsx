import React from "react";
import axios from 'axios'

export default function CategoryForm() {
  return (
    <div className="container">
        <h1 className='text-center'>ADD NEW CATEGORY</h1>
      <form role="form">
        <div className="card-body">
          <div className="form-group">
            <label for="exampleInputEmail1">Category Name</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Category Name"
            />
          </div>
          <div class="form-group">
            <label>Select</label>
            <select class="form-control">
              <option>Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Any</option>
            </select>
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Code Name</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter code name"
            />
          </div>
        </div>

        <div className="card-footer">
          <button type="submit" className="btn btn-primary btn-block">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
