import React from 'react'
import { Link, Navigate } from 'react-router-dom';


export default function OrderPlaced() {



    return (
        <div style={{ backgroundColor: "#FFFFF0" }}>
            <div style={{ marginTop: "00px", padding: "130px", textAlign: "left" }}>
                <h2>YOUR ORDER PLACED SUCCESSFULLY!!</h2>
                <Link class="nav-link" to="/allproduct"> <button className='btn btn-primary'><h6>GO AND ORDER SOMEMORE</h6></button>
                </Link>

            </div>
        </div>
    )
}
