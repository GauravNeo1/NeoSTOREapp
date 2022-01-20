import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Frontpage() {
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light ">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <a class="navbar-brand" href="#">INVOICE App</a>

                <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">

                    </ul>
                    <form class="form-inline my-3 my-lg-0">
                        <ul class="navbar-nav mr-3 mt-2 mt-lg-0">
                            <li class="nav-item active mr-3">
                                <Link class="nav-link" to="/allproduct">Allproduct</Link>
                            </li>
                            <li class="nav-item active mr-3">
                                <Link class="nav-link" to="/thankyou">Thanku</Link>
                            </li>
                            <li class="nav-item active mr-3">
                                <Link class="nav-link" to="/signup">Sign Up </Link>
                            </li>
                            <li class="nav-item active mr-3">
                                <Link class="nav-link" to="openpdf">openpdf </Link>
                            </li>
                            <li class="nav-item mr-3">
                                <Link class="nav-link" to="/signin">Login</Link>
                            </li>
                            <li class="nav-item active mr-3">
                                <Link class="nav-link" to="/profile">Profile </Link>
                            </li>
                            <li class="nav-item active mr-3">
                                <Link class="nav-link" to="/profileimage">Profile Image </Link>
                            </li>
                            <li class="nav-item active mr-3">
                                <Link class="nav-link" to="/editprofile">editProfile </Link>
                            </li>
                            <li class="nav-item mr-3">
                                <Link class="nav-link" to="/custaddress">Customer_Address</Link>
                            </li>
                            <li class="nav-item mr-3">
                                <Link class="nav-link" to="/changepassword">ChangePassword</Link>
                            </li>


                        </ul>
                    </form>
                </div>
            </nav>

            <div>
                <Outlet />
            </div>
        </div>
    )
}
