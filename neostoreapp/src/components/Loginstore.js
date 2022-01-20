import React, { useState, useEffect } from 'react';
import { login } from '../config/Myservice';
import { Link, Navigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap'
import '../csscomponents/FontChnage.css'




const regForEmail = RegExp(/^([a-zA-Z0-9\.-])+@([a-zA-Z0-9-]+).([a-z]{2,25})$/);


function Loginstore() {

    const [dbResponse, setDBResponse] = useState('');


    const [postdata, setPostdata] = useState([]);
    const [data, setData] = useState([]);


    const [Email_login, setEmail_login] = useState(" ");
    const [Password_login, setPass_login] = useState(" ");
    const [flag, setFlag] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();

        // alert("logged in successfully");

        if (Email_login === " " || !Password_login === " ") {
            alert("Enter crendtial first")
        }
        else {

            let profile = {
                email: Email_login,
                password: Password_login,
            }
            login(profile)
                .then(res => {
                    if (res.data.err == 0) {

                        setFlag(true);
                        localStorage.setItem("_token", res.data.token);
                        alert("logged in successfully");

                        let loginUser = localStorage.setItem("LoginUser", res.data.data);
                        window.location.href = "./home";

                    }
                    if (res.data.err == 1) {
                        console.log(res.data)
                        setDBResponse(res.data.msg);
                    }
                    if (res.data.err == 2) {
                        console.log(res.data)
                        setDBResponse(res.data.msg);
                    }
                    if (res.data.err == 3) {
                        console.log(res.data)
                        setDBResponse(res.data.msg);
                    }
                })
        }

    }

    const forgotpassword = () => {
        window.location.href = "./recoverpassword"
    }

    const closedResponse = (e) => {
        e.preventDefault();
        setDBResponse('');
    }

    return (

        <div style={{ marginTop: "80px", marginBottom: "70px", marginLeft: "30%", textAlign: "center", backgroundColor: "#E0FFFF", width: "40%", borderRadius: "10px", opacity: "0.9" }}>
            <div style={{ paddingTop: "10px", paddingBottom: "10px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 skyblue", borderRadius: "10px" }}>


                <form className="col-md-12 cen" onSubmit={handleLogin}>
                    <h4> SIGN IN </h4>

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

                 


                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">EmailID</label>
                        <div class="col-sm-9">
                            <input placeholder="Email/Username" type="text" onChange={(e) => setEmail_login(e.target.value)} id="email" class="form-control" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Password</label>
                        <div class="col-sm-9">
                            <input placeholder="Password" type="Password" onChange={(e) => setPass_login(e.target.value)} class="form-control" />
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">LogIn</button>
                </form>
                <br />
                <h6 onClick={forgotpassword}>Forgotton password</h6>

                <div>
                    <Link to="/signup">New User ? SignUp</Link>
                </div>

            </div>
        </div>


    )
}


export default Loginstore
