import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Table } from 'react-bootstrap'
import TextField from '@mui/material/TextField';
import { getProfileData, login } from '../config/Myservice';




export default function Profile() {


    const [loginUser, setLoginUser] = useState([]);

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

    const editEvent = () => {

        window.location.href = `/profilepage/profile/editprofile`;
    }



    return (
        // <div style={{ marginTop: "0px", marginBottom: "50px", marginLeft: "25%", textAlign: "left", backgroundColor: "white", width: "50%", borderRadius: "10px" }} >
        //     <div style={{ paddingTop: "30px", paddingBottom: "30px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 skyblue", borderRadius: "10px" }} className='px-4'>
        <div>

            <div>
                <h4>PROFILE</h4> <br />

                <Table striped bordered hover>
                    <tbody>
                        <tr>
                            <th>Parameter</th>
                            <th>Data</th>
                        </tr>
                        <tr>
                            <td>First Name</td>
                            <td>{loginUser.first_name}</td>
                        </tr>
                        <tr>
                            <td>Last Name</td>
                            <td>{loginUser.last_name}</td>
                        </tr>
                        <tr>
                            <td>Gender</td>
                            <td>{loginUser.gender}</td>
                        </tr>
                        <tr>
                            <td>Date of Birth</td>
                            <td>{loginUser.dob}</td>
                        </tr>
                        <tr>
                            <td>Email ID</td>
                            <td>{loginUser.email}</td>
                        </tr>

                    </tbody>
                </Table>
                <hr />
                <button className='btn btn-primary' onClick={editEvent}>Edit</button>

            </div>

        </div>
    )
}
