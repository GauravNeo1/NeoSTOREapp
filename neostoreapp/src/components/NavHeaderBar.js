import React, { useState, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { getCartData, cartRemove, cartAdd, descProductQty, getProfileData } from '../config/Myservice';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';

import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
let signinUser = localStorage.getItem('LoginUser');


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 3,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 2px',
    },
}));



export default function NavHeaderBar() {
    const [lenCart, setLenCart] = useState(0);
    const [loginUser, setLoginUser] = useState();

    const cartCount = useSelector((state) => state.cartcount);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!localStorage.getItem("_token")) {
            let cartItems = JSON.parse(localStorage.getItem("mycart"));
            if (cartItems) {
                setLenCart(cartItems.length);
                dispatch({ type: 'CARTCOUNT', payload: cartItems.length })
            }
        }
        else {
            getCartData(signinUser)
                .then(res => {
                    setLenCart(res.data.length);
                    dispatch({ type: 'CARTCOUNT', payload: res.data.length })

                })
        }

        getProfileData(signinUser)
            .then(res => {
                if (res.data.err == 0) {

                    setLoginUser(res.data.loginuser);
                    // console.log(res.data.loginuser)
                }
                if (res.data.err == 1) {
                    console.log(res.data)
                }
            })
    }, []);


    const logOut = () => {
        localStorage.removeItem("_token");
        localStorage.removeItem("ShippingAddress");
        localStorage.removeItem("LoginUser");
        window.location.href = "./signin"

    }

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand" href="#">
                    <span style={{ fontSize: "25px", fontWeight: "bold" }}>Neo</span><span style={{ fontSize: "25px", color: "red", fontWeight: "bold" }}>STORE</span>
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active ml-5">
                            <Link class="nav-link" to="/home">Home</Link>
                        </li>
                        <li class="nav-item active ml-5">
                            <Link class="nav-link" to="/allproduct">Product</Link>
                        </li>
                        {loginUser && <li class="nav-item active ml-5">
                            <Link class="nav-link" to="/orders">Order</Link>
                        </li>}
                        <li class="nav-item active ml-5">
                            <Link class="nav-link" to="/cart">
                                <IconButton aria-label="cart">
                                    <StyledBadge badgeContent={cartCount} color="secondary">
                                        <ShoppingCartIcon style={{ color: "white", marginTop: "-7px" }} />
                                    </StyledBadge>
                                </IconButton>
                            </Link>
                            {/* <Link class="nav-link" to="/cart">Cart{lenCart}</Link> */}
                        </li>


                    </ul>
                    <form class="form-inline my-2 my-lg-0 ">
                        <ul class="navbar-nav mr-5">

                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle mr-5 " id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {loginUser ?
                                        <Avatar alt={loginUser.name} src={`Assest/Profile_Images/${loginUser.profile_image}`} sx={{ width: 40, height: 40 }} style={{ border: "3px solid white", marginTop: "-12px", marginBottom: "-35px" }} />
                                        : <Avatar style={{ border: "2px solid white", marginTop: "-12px", marginBottom: "-35px" }} />


                                    }
                                </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {!loginUser &&
                                        <> <a class="dropdown-item"> <Link class="nav-link" to="/signin" style={{ color: "black" }}>Login</Link></a>
                                            <div class="dropdown-divider"></div>
                                        </>}

                                    {loginUser &&
                                        <>
                                            <a class="dropdown-item"> <Link class="nav-link" to="/profilepage" style={{ color: "black" }}>Profile</Link>
                                            </a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" onClick={logOut}> Log Out</a>
                                        </>}
                                </div>
                            </li>
                        </ul>
                    </form>
                </div>
            </nav>
        </div>
    )
}
