import React, { useRef, useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { getPosts, socialLogin } from '../config/Myservice';
import { addPost } from '../config/Myservice';
import { Row, Col, Form, Table } from 'react-bootstrap'
import SocialLogin from './SocialLogin';
import '../csscomponents/FontChnage.css'



const regForName = RegExp(/^([A-Za-z]{3,15})$/);
const regForEmail = RegExp(/^([a-zA-Z0-9\.-])+@([a-zA-Z0-9-]+).([a-z]{2,25})$/);
const regForPass = RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);

function Registerstore() {
    const [dbResponse, setDBResponse] = useState('');

    const [postdata, setPostdata] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        getPosts()
            .then(res => {
                // console.log(res.data);
                setPostdata(res.data);

            })
    }, [])


    const [selected, setSelected] = useState(" ");
    const genderInput = useRef(null);

    const [Fname, setFname] = useState(" ");
    const [Lname, setLname] = useState(" ");
    const [Dob, setDob] = useState(" ");
    const [Email, setEmail] = useState(" ");
    const [Pass, setPass] = useState(" ");
    const [Conpass, setConPass] = useState(" ");

    const [errorFname, setErrorFname] = useState(" ");
    const [errorLname, setErrorLname] = useState(" ");
    const [errorDob, setErrorDob] = useState(" ");
    const [errorEmail, setErrorEmail] = useState(" ");
    const [errorPass, setErrorPass] = useState(" ");
    const [errorConpass, setErrorConPass] = useState(" ");

    const handlergender = (e) => {
        setSelected(e.target.id);
    }

    const handler = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'fname':
                setErrorFname('');
                setFname(value);
                break;
            case 'lname':
                setErrorLname('');
                setLname(value);
                break;
            case 'dob':
                // setErrorDob('');
                setDob(value);
                break;
            case 'email':
                setErrorEmail('');
                setEmail(value);
                break;

            case 'pass':
                setErrorPass('');
                setPass(value);
                break;

            case 'cpass':
                setErrorConPass('');
                setConPass(value);
                break;


        }
    }


    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (Fname == " " || Lname == " " || Dob == " " || Email == " " || Pass == " " || Conpass == " " || selected == " ") {
            alert("Please fill all the feild");
        }

        else if (!regForName.test(Fname)) {
            setErrorFname("First_name should be more than 2 character");
        }
        else if (!regForName.test(Lname)) {
            setErrorLname("last_name should be more than 2 character");
        }
        // else if (!regForName.test(Dob)) {
        //     setErrorDob("User_name should be more than 6 character");
        // }
        else if (!regForEmail.test(Email)) {
            setErrorEmail("Enter valid Email ID");
        }
        else if (!regForPass.test(Pass)) {
            setErrorPass("Enter proper password");
        }
        else if (Pass !== Conpass) {
            setErrorConPass("Passwod & confirm password not match");
        }

        else {

            addPost({
                fname: Fname,
                lname: Lname,
                dob: Dob,
                email: Email,
                gender: selected,
                password: Pass
            })
                .then(res => {
                    if (res.data.err == 0) {
                        console.log(res.data.msg)
                        // window.location.href = "./signin";
                        window.location.href = "./signin"


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

            setFname("");
            setLname("");
            setDob("");
            setEmail("");
            setSelected("");
            setPass("");
            setConPass("");

            document.getElementById('fname').value = '';
            document.getElementById('lname').value = '';
            document.getElementById('dob').value = '';
            document.getElementById('email').value = '';
            document.getElementById('pass').value = '';
            document.getElementById('cpass').value = '';


        }
    }

    const closedResponse = (e) => {
        e.preventDefault();
        setDBResponse('');
    }

    return (
<div >
        <div style={{ marginTop: "30px", marginBottom: "50px", marginLeft: "25%", textAlign: "center", backgroundColor: "#E0FFFF" , width: "50%", borderRadius: "10px", opacity: "0.9" }}>
            <div style={{ paddingTop: "10px", paddingBottom: "10px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 25px 0 skyblue", borderRadius: "10px" }}>

                <form className="col-md-12 cen" onSubmit={handleFormSubmit} method="post" action='http://localhost:8899/api/posts/addpost'>
                    <h4> SIGN UP </h4>
                   
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
                        <label class="col-sm-3 col-form-label">Firstname</label>
                        <div class="col-sm-9">
                            <input type="text" placeholder="first Name" onChange={handler} class="form-control" name="fname" id="fname" />
                            {errorFname && <div style={{ color: "red" }}>{errorFname}</div>}
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Lastname</label>
                        <div class="col-sm-9">
                            <input type="text" placeholder="last Name" onChange={handler} class="form-control" name="lname" id="lname" />
                            {errorLname && <div style={{ color: "red" }}>{errorLname}</div>}
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Date of birth</label>
                        <div class="col-sm-9">
                            <input type="date" placeholder="User Name" onChange={handler} class="form-control" name="dob" id="dob" />
                            {errorDob && <div style={{ color: "red" }}>{errorDob}</div>}
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">EmailID</label>
                        <div class="col-sm-9">
                            <input placeholder="Email" type="text" onChange={handler} class="form-control" name="email" id="email" />
                            {errorEmail && <div style={{ color: "red" }}>{errorEmail}</div>}
                        </div>
                    </div>
                    <div class="form-group row">

                        <label class="col-sm-3 col-form-label">Gender</label>
                        <div class="col-sm-4">

                            <input type="radio" value="male" id="male" name="gender" ref={genderInput} onClick={handlergender} /> <label>Male</label>
                            &nbsp;&nbsp;&nbsp;
                            <input type="radio" value="Female" id="female" name="gender" ref={genderInput} onClick={handlergender} /> <label>Female</label>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Password</label>
                        <div class="col-sm-9">
                            <input placeholder="Password" type="password" onChange={handler} class="form-control" name="pass" id="pass" />
                            {errorPass && <div style={{ color: "red" }}>{errorPass}</div>}
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Confirm Password</label>
                        <div class="col-sm-9">
                            <input placeholder="Password" type="password" onChange={handler} class="form-control" name="cpass" id="cpass" />
                            {errorConpass && <div style={{ color: "red" }}>{errorConpass}</div>}
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Sign Up</button>
                    <div>
                        {/* <a href="./signin">already have an account?Login</a> */}
                        <Link to="/signin">already hav an account? Log In</Link>
                    </div>
                </form>
                <hr />
                <SocialLogin />
                <Row>
                    <Col>
                        <SocialLogin />
                    </Col>

                </Row>

            </div>

        </div>

        </div>
    )
}


export default Registerstore
