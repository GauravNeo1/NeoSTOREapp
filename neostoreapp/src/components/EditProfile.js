import React, { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom';

import { getProfileData, updateProfileData } from '../config/Myservice';

const regForName = RegExp(/^([A-Za-z]{3,15})$/);
const regForEmail = RegExp(/^([a-zA-Z0-9\.-])+@([a-zA-Z0-9-]+).([a-z]{2,25})$/);

export default function EditProfile() {
    // const params = useParams();
    // console.log(params.id)
    const [loginUser, setLoginUser] = useState([]);

    const [errorFname, setErrorFname] = useState(" ");
    const [errorLname, setErrorLname] = useState(" ");
    const [errorDob, setErrorDob] = useState(" ");
    const [errorEmail, setErrorEmail] = useState(" ");



    useEffect(() => {

        let loginUser = localStorage.getItem('LoginUser');
        getProfileData(loginUser)
            .then(res => {
                if (res.data.err == 0) {
                    setLoginUser(res.data.loginuser);
                    console.log(res.data.loginuser.dob)
                }
                if (res.data.err == 1) {
                    console.log(res.data)
                }
            })
    }, [])



    const handler = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'fname':
                setErrorFname('');
                break;
            case 'lname':
                setErrorLname('');
                break;
            case 'dob':
                setErrorDob('');
                break;
            case 'email':
                setErrorEmail('');
                break;
        }
    }


    // useEffect(() => {
    //     getProfileData("m@gmail.com")
    //         .then(res => {
    //             if (res.data.err == 0) {

    //                 setLoginUser(res.data.loginuser);
    //                 // console.log(res.data.loginuser)
    //             }
    //             if (res.data.err == 1) {
    //                 console.log(res.data)
    //             }
    //         })
    // }, [])


    const handleFormSubmit = (e) => {
        e.preventDefault();

        let year = Number((document.getElementById("dob").value).substr(0, 4));
        let today = new Date();
        let age = today.getFullYear() - year;

        if (document.getElementById("fname").value === '' || document.getElementById("lname").value === '' || document.getElementById("dob").value === "" || document.getElementById("email").value === "") {
            alert("Please fill all the feild");
        }

        else if (!regForName.test(document.getElementById("fname").value)) {
            setErrorFname("First_name should be more than 2 character");
        }
        else if (!regForName.test(document.getElementById("fname").value)) {
            setErrorLname("last_name should be more than 2 character");
        }
        else if (age < 18) {
            setErrorDob("age should be 18 and more than 18");
        }
        else if (!regForEmail.test(document.getElementById("email").value)) {
            setErrorEmail("Enter valid Email ID");
        }

        else {

            let formData = {
                new_email: document.getElementById("email").value,
                old_email: loginUser.email,
                fname: document.getElementById("fname").value,
                lname: document.getElementById("lname").value,
                dob: document.getElementById("dob").value,
                gender: loginUser.gender,
                objectid: loginUser._id
            }

            updateProfileData(formData)
                .then(res => {
                    if (res.data.err == 0) {
                        console.log(res.data.msg)
                    }
                    if (res.data.err == 1) {
                        console.log(res.data.msg)
                    }
                    if (res.data.err == 2) {
                        console.log(res.data.msg)
                    }
                })
            window.location.href = `../profile`;
        }
    }


    return (
        <div style={{ marginLeft: "30px" }}>
            {loginUser &&
                <div >
                    <form className="col-md-12 cen" onSubmit={handleFormSubmit}>
                        <h4>EDIT PROFILE </h4>
                        <br />

                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Firstname</label>
                            <div class="col-sm-7">
                                <input type="text" placeholder="first Name" defaultValue={loginUser.first_name} onChange={handler} class="form-control" name="fname" id="fname" />
                                {errorFname && <div style={{ color: "red" }}>{errorFname}</div>}
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Lastname</label>
                            <div class="col-sm-7">
                                <input type="text" placeholder="last Name" defaultValue={loginUser.last_name} onChange={handler} class="form-control" name="lname" id="lname" />
                                {errorLname && <div style={{ color: "red" }}>{errorLname}</div>}
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Date of birth</label>
                            <div class="col-sm-7">
                                <input type="date" placeholder="date of birth" defaultValue={loginUser.dob} onChange={handler} class="form-control" name="dob" id="dob" />
                                {errorDob && <div style={{ color: "red" }}>{errorDob}</div>}
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">EmailID</label>
                            <div class="col-sm-7">
                                <input placeholder="Email" type="text" defaultValue={loginUser.email} class="form-control" onChange={handler} name="email" id="email" />
                                {errorEmail && <div style={{ color: "red" }}>{errorEmail}</div>}
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Gender</label>
                            <div class="col-sm-7">
                                <input placeholder="gender" type="text" disabled defaultValue={loginUser.gender} class="form-control" name="email" id="email" />
                            </div>
                        </div>
                        <br />
                        <hr />
                        <button type="submit" class="btn btn-primary">Update</button>
                    </form>


                </div>}
        </div>
    )
}
