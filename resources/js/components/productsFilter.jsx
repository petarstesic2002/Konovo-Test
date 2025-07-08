import React from "react";
import ProductPagination from "./productPagination.jsx";

function ProductsFilter({setSearch, setCategory}) {
    return (
        <>
            <form className="col-md-3">
                <div className="form-group mb-3">
                    <input id="name" name="name" className="form-control" type="text" placeholder="Pretraži po nazivu..."
                           onChange={e => setSearch(e.target.value)}/>
                </div>
                <div className="form-group">
                    <input id="category" name="category" className="form-control" placeholder="Pretraži po kategoriji..."
                           onChange={e => setCategory(e.target.value)}/>
                </div>
            </form>
        </>
    );
}

export default ProductsFilter;
