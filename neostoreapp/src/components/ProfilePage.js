import React from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import { Outlet, Link } from 'react-router-dom';
import ProfileImage from './ProfileImage';


export default function ProfilePage() {
    return (
        <div style={{ backgroundColor: "#FFFFF0" }}>
            <Row>
                <Col xl={3} xs={12} >
                    <div style={{ marginTop: "10px", marginBottom: "10px", marginLeft: "8%", textAlign: "center", backgroundColor: "#E0FFFF", width: "88%", borderRadius: "10px" }} >
                        <div style={{ paddingTop: "30px", paddingBottom: "30px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 skyblue", borderRadius: "10px" }} className='px-5'>
                            <ProfileImage />

                            <table className='table '>
                                <tbody>
                                    <br />
                                    <tr><Link class="nav-link" to="/profilepage/orders"><i class="fas fa-bars"></i> Order</Link></tr>
                                    <br />
                                    <tr><Link class="nav-link" to="/profilepage/profile"><i class="far fa-id-badge"></i> Profile</Link></tr>
                                    <br />
                                    <tr><Link class="nav-link" to="/profilepage/custaddress"><i class="fas fa-address-card"></i> Address</Link></tr>
                                    <br />
                                    <tr><Link class="nav-link" to="/profilepage/changepassword"> <i class="fas fa-exchange-alt"></i> Change Password</Link></tr>
                                </tbody>
                            </table>


                        </div>
                    </div>
                </Col>
                <Col xl={9} xs={12}>
                    <div style={{ marginTop: "10px", marginBottom: "10px", marginLeft: "5px", marginRight: "5px", textAlign: "center", backgroundColor: "white", width: "97%", borderRadius: "10px" }} >
                        <div style={{ paddingTop: "30px", paddingBottom: "30px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 skyblue", borderRadius: "10px" }} className='px-5'>
                            <Outlet />
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
