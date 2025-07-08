import React from "react";

function ProductPagination({page, setPage, lastPage, loading}){
    const handlePrevious = () => {
        if(page > 1){
            setPage(page-1);
        }
    }
    const handleNext = () => {
        if(page < lastPage){
            setPage(page+1);
        }
    }
    const goToFirst = () => {
        setPage(1);
    }
    const goToLast = () => {
        setPage(lastPage);
    }
    return(
        <>
            <div className="d-flex justify-content-center align-items-center gap-3 my-3">

                <button
                    className="btn btn-outline-primary"
                    onClick={goToFirst}
                    disabled={page === 1 || loading}
                    title="First Page"
                >
                    &laquo;
                </button>

                <button
                    className="btn btn-outline-primary"
                    onClick={handlePrevious}
                    disabled={page <= 1 || loading}
                >
                    &larr; Previous
                </button>

                <span>
                    Page <strong>{page}</strong> of <strong>{lastPage}</strong>
                </span>

                <button
                    className="btn btn-outline-primary"
                    onClick={handleNext}
                    disabled={page >= lastPage || loading}
                >
                    Next &rarr;
                </button>

                {/* Last */}
                <button
                    className="btn btn-outline-primary"
                    onClick={goToLast}
                    disabled={page === lastPage || loading}
                    title="Last Page"
                >
                    &raquo;
                </button>
            </div>
        </>
    )
}

export default ProductPagination;
