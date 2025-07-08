import React from "react";

function Footer(){
    return (
        <>
            <div className="container bg-light">
                <footer className="py-3 my-4">
                    <p className="text-center text-body-secondary">
                        © {new Date().getFullYear()} Petar Stešić
                    </p>
                </footer>
            </div>
        </>
    )
}

export default Footer;
