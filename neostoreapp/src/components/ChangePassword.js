import React, { useState, useEffect } from 'react'
import { changePassworold, getProfileData } from '../config/Myservice';
import { Row, Col } from 'react-bootstrap'

const regForPass = RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);

const loginUser = localStorage.getItem('LoginUser');


export default function ChangePassword() {

    const [dbResponse, setDBResponse] = useState('');

    // const [Email,setEmail]=useState("sanjna@gmail.com")
    const [oldpass, setOldpass] = useState(" ");
    const [newpass, setNewpass] = useState(" ");
    const [confirmpass, setConfirmpass] = useState(" ");

    const [errNewpass, setErrNewpass] = useState(" ");
    const [errConfirmpass, setErrConfirmpass] = useState(" ");



    const [user, setUser] = useState([]);

    useEffect(() => {
        // let loginUser = localStorage.getItem('LoginUser');

        getProfileData(loginUser)
            .then(res => {
                if (res.data.err == 0) {
                    setUser(res.data.loginuser);
                    console.log(res.data.loginuser.email)
                }
                if (res.data.err == 1) {
                    console.log(res.data)
                }
            })
    }, [])

    const handler = (event) => {
        const { name, value } = event.target;
        switch (name) {

            case 'oldpass':
                setOldpass(value);
                break;

            case 'newpass':
                setErrNewpass('');
                setNewpass(value);
                break;

            case 'confirmpass':
                setErrConfirmpass('');
                setConfirmpass(value);
                break;


        }
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (oldpass == " " || newpass == " " || confirmpass == " ") {
            alert("Please fill all the feild");
        }

        else if (!regForPass.test(newpass)) {
            setErrNewpass("Enter proper password");
        }
        else if (newpass !== confirmpass) {
            setErrConfirmpass("Passwod & confirm password not match");
        }

        else {
            let formData = {
                email: user.email,
                oldpass: oldpass,
                newpass: newpass,
                confirmpass: confirmpass
            }
            changePassworold(formData)
                .then(res => {
                    if (res.data.err == 0) {
                        setDBResponse(res.data.msg);
                        console.log("chnage successfully");
                        setDBResponse(res.data.msg);

                        document.getElementById('oldpass').value = '';
                        document.getElementById('newpass').value = '';
                        document.getElementById('confirmpass').value = '';
                    }
                    if (res.data.err == 1) {
                        console.log(res.data)
                        setDBResponse(res.data.msg);



                    }
                    if (res.data.err == 2) {
                        console.log(res.data)
                        setDBResponse(res.data.msg);



                    }
                })


        }
    }



    const closedResponse = (e) => {
        e.preventDefault();
        setDBResponse('');
    }

    return (
        // <div style={{ marginTop: "0px", marginBottom: "50px", marginLeft: "30%", textAlign: "left", backgroundColor: "white", width: "40%", borderRadius: "10px" }} >
        // <div style={{ paddingTop: "30px", paddingBottom: "30px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 skyblue", borderRadius: "10px" }} className='px-5'>
        <div style={{ marginLeft: "30px" }}>
            <form className="col-md-12 cen" onSubmit={handleFormSubmit}>
                <h4>CHANGE PASSWORD</h4>
                <br />

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
                    <label class="col-sm-3 col-form-label">Old Password</label>
                    <div class="col-sm-7">
                        <input placeholder="old password" type="password" onChange={handler} class="form-control" name="oldpass" id="oldpass" />

                    </div>
                </div>


                <div class="form-group row">
                    <label class="col-sm-3 col-form-label">New Password</label>
                    <div class="col-sm-7">
                        <input placeholder="new password" type="password" onChange={handler} class="form-control" name="newpass" id="newpass" />
                        {errNewpass && <div style={{ color: "red" }}>{errNewpass}</div>}
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-3 col-form-label">Confirm Password</label>
                    <div class="col-sm-7">
                        <input placeholder="confirm password" type="password" onChange={handler} class="form-control" name="confirmpass" id="confirmpass" />
                        {errConfirmpass && <div style={{ color: "red" }}>{errConfirmpass}</div>}
                    </div>
                </div>
                <hr />
                <button type="submit" class="btn btn-primary">Submit</button>

            </form>

        </div>

        // </div>
        // </div> 
    )
}
