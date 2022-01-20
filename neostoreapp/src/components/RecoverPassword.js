import React, { useState } from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import TextField from '@mui/material/TextField';
import { changePasswordOtp, emailSendOtp } from '../config/Myservice';


export default function RecoverPassword() {

    const [dbResponse, setDBResponse] = useState('');


    const [flagemail, setFlagEmail] = useState(true);
    const [flagotp, setFlagOtp] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [Cpassword, setCpassword] = useState();

    const emailOTP = () => {
        let emailData = {
            email: document.getElementById("email").value
        }
        emailSendOtp(emailData)
            .then(res => {
                if (res.data.err == 0) {
                    setEmail(document.getElementById("email").value);
                    setFlagOtp(true);
                    setFlagEmail(false);
                    console.log(res.data.msg)
                    setDBResponse('');
                }
                if (res.data.err == 1) {
                    console.log(res.data.msg)
                    setDBResponse(res.data.msg);
                }
                if (res.data.err == 2) {
                    console.log(res.data.msg)
                    setDBResponse(res.data.msg);
                }
            })
    }

    const changePassword = () => {


        let passwordData = {
            otpcode: document.getElementById("otp").value,
            email: email,
            password: document.getElementById("pass").value
        }
        console.log(passwordData)
        changePasswordOtp(passwordData)
            .then(res => {
                if (res.data.err == 0) {
                    console.log(res.data.msg)
                    window.location.href = "./signin";

                }
                if (res.data.err == 1) {
                    console.log(res.data.msg)
                    setDBResponse(res.data.msg);
                }
                if (res.data.err == 2) {
                    console.log(res.data.msg)
                    setDBResponse(res.data.msg);
                }
                if (res.data.err == 3) {
                    console.log(res.data.msg)
                    setDBResponse(res.data.msg);
                }
            })



    }

    const closedResponse = (e) => {
        e.preventDefault();
        setDBResponse('');
    }

    return (
        <div>

            <div style={{ marginTop: "70px", marginBottom: "70px", marginLeft: "30%", textAlign: "left", backgroundColor: "#E0FFFF", width: "40%", borderRadius: "10px" }} >
                <div style={{ paddingTop: "30px", paddingBottom: "30px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 skyblue", borderRadius: "10px" }} className='px-5'>
                    {flagemail &&
                        <div>
                            <h4>RECOVER PASSWORD</h4>
                            <hr />
                            {dbResponse && <div className='col-sm-12 '>
                                <div style={{ height: "40px", width: "100%", backgroundColor: "#20B2AA", color: "white", textAlign: "center", padding: "10px" }}>

                                    <Row>
                                        <Col><h6>{dbResponse}</h6></Col>
                                        <Col xs={2}><button type="button" class="btn-close " aria-label="Close" onClick={closedResponse} />
                                        </Col>
                                    </Row>
                                </div>
                            </div>}
                            <br />
                            <TextField fullWidth label="Email" type="text" id="email" size="small" />  <br /> <br />

                            <button className='btn btn-primary' onClick={emailOTP}>Submit</button>
                        </div>
                    }

                    {flagotp && <div>
                        <h4>CHANGE PASSWORD</h4>
                        <hr />
                        {dbResponse && <div className='col-sm-12 '>
                            <div style={{ height: "40px", width: "100%", backgroundColor: "#20B2AA", color: "white", textAlign: "center", padding: "10px" }}>

                                <Row>
                                    <Col><h6>{dbResponse}</h6></Col>
                                    <Col xs={2}><button type="button" class="btn-close " aria-label="Close" onClick={closedResponse} />
                                    </Col>
                                </Row>
                            </div>
                        </div>}
                        <br />
                        <TextField fullWidth label="Verification Code" type="text" id="otp" size="small" />  <br /> <br />

                        <TextField fullWidth label=" New Password" type="password" id="pass" size="small" />  <br /> <br />
                        <TextField fullWidth label="Confirm Password" type="cpass" id="fullWidth" size="small" /> <br /> <br />
                        <button className='btn btn-primary' onClick={changePassword}>Submit</button>
                    </div>
                    }
                </div>
            </div>

        </div>

    )
}
