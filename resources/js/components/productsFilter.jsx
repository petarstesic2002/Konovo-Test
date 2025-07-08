import React from "react";
import ProductPagination from "./productPagination.jsx";

function ProductsFilter({setSearch, setCategory}) {
    return (
        <>
            <form className="col-md-3">
                <div className="form-group mb-3">
                    <input id="name" name="name" className="form-control" type="text" placeholder="Search by name..."
                           onChange={e => setSearch(e.target.value)}/>
                </div>
                <div className="form-group">
                    <input id="category" name="category" className="form-control" placeholder="Search by category..."
                           onChange={e => setCategory(e.target.value)}/>
                </div>
            </form>
        </>
    );
}

export default ProductsFilter;
