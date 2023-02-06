import React from "react";

const date = new Date()
const currentYear = date.getFullYear()

function Footer() {
    return (
        <p>Copyright {currentYear}</p>
    )
}

export default Footer