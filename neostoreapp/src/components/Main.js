import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import FooterBar from './FooterBar'
import NavHeaderBar from './NavHeaderBar'
import { getCartData } from '../config/Myservice';

export default function Main() {

    useEffect(() => {

        getCartData("61d27a7ee515b85d36d0ebfb")
            .then(res => {
                console.log(res.data);


            })
    }, [])

    return (
        <div >

            <NavHeaderBar />
            <Outlet />
            <FooterBar />

        </div>
    )
}
