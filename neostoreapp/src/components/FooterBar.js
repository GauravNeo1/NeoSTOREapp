import React, { useState } from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'

import Pdf from '../Assest/weatherapp.pdf';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

export default function FooterBar() {
    const [email, setEmail] = useState(" ");

    const subscribe = () => {
        if (email === " ") {
            alert("please enter yout valid email")
        }
        else {
            setEmail(" ");
            window.location.href = "./thankyou"


        }
    }
    return (
        <div>


            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content" style={{ height: "580px" }}>
                        <div class="modal-header">
                            <h5 class="modal-title text-danger" id="exampleModalLabel">PDF</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <iframe
                                src={Pdf}
                                frameBorder="0"
                                scrolling="auto"
                                height="100%"
                                width="100%"
                            />

                        </div>
                        {/* <div class="modal-footer">
                                <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Close</button>
                            </div> */}
                    </div>
                </div>
            </div>
            <Form className="bg-dark text-white px-5 pt-4" style={{ fontSize: "small" }}>
                <Row>
                    <Col>
                        <h6>About Company</h6> <br />
                        NeoSoft technologies is here at your quick and easy service for shopping. <br />
                        Contact Information <br />
                        Email: contact@neosoftetch.com <br />
                        Phone: +91 0000000000 <br />
                        MUMBAI, INDIA

                    </Col>
                    <Col>
                        <h6>Information</h6>  <br />
                        <span data-bs-toggle="modal" data-bs-target="#exampleModal"> Terms and Condition</span>  <br />
                        Gaurntee and Return Policy <br />
                        Contact Us <br />
                        Privacy Policy
                        <Link class="nav-link" to="/mapcontainer" style={{ color: "white" }}>Locate Us</Link>
                    </Col>
                    <Col>
                        <h6> Newsletter</h6> <br />
                        Signup to get excluisve offer from our favorite brands and to be well up in the news <br /> <br />
                        <input type="email" placeholder='enter your  valid email...' className='form-control' onChange={(e) => setEmail(e.target.value)} /> <br />
                        <button class="btn bg-light btn-sm" onClick={subscribe}>Subscribe</button>
                    </Col>
                </Row>
                <br />
                Copyright 2021 NeoSOFT Technologies All right reserved | Desined by Gaurav Patil
            </Form>
        </div>
    )
}
