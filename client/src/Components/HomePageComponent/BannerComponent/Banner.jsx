import React from 'react';
import { Link } from 'react-router-dom';

export default function Banner() {
    return (
        <div className="banner-agile">
            <div className="container">
                <h2>WELCOME TO</h2>
                <h3>FASHION <span>CLUB</span></h3>
                <p>STAY HOME AND SHOP ONLINE</p>
                <Link to="/">Read More</Link>
            </div>
        </div>
    )
}
