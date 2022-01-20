import React, { useState, useEffect } from 'react'
import { getAddressByID, editAddress } from '../config/Myservice';
import { useParams } from "react-router-dom"

const loginUser = localStorage.getItem('LoginUser');

const regForCity = RegExp(/^([A-Za-z]{3,15})$/);
const regForPIN = RegExp(/^[0-9]{6}$/);
export default function EditAddress() {
    const params = useParams();
    const [address, setAddress] = useState();



    const [add, setAdd] = useState(" ");


    useEffect(() => {
        // let loginUser = localStorage.getItem('LoginUser');

        let formData = {
            customer_id: loginUser,
            _id: params.id
        }
        getAddressByID(formData)
            .then(res => {
                setAddress(res.data.data);
            })
    }, [])


    console.log(params.id)
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (add === " ") {
            alert("plz change the address")
        }
        else {
            // let loginUser = localStorage.getItem('LoginUser');

            console.log(add)
            let formData = {
                customer_id: loginUser,
                id: params.id,
                address: add,
                isdeliveryaddress: "false"
            }
            editAddress(formData)
                .then(res => {
                    console.log(res.data);
                })
        }
        window.location.href = "../custaddress"
    }

    const cancle = () => {
        window.location.href = "../custaddress"

    }

    return (
        // <div style={{ marginTop: "0px", marginBottom: "50px", marginLeft: "25%", textAlign: "left", backgroundColor: "white", width: "50%", borderRadius: "10px" }} >
        //     <div style={{ paddingTop: "30px", paddingBottom: "30px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 skyblue", borderRadius: "10px" }} className='px-4'>
        <div style={{ marginLeft: "30px" }}>

            <h4>EDIT ADDRESS</h4>
            <br />
            {address &&
                <form >
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Address</label>
                        <div class="col-sm-7">
                            <input placeholder="address" type="text" name="address" id="address" defaultValue={address.address} onChange={(e) => setAdd(e.target.value)} class="form-control" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Postal Code</label>
                        <div class="col-sm-7">
                            <input placeholder="Postal Code" type="text" name="pin" id="pin" defaultValue={address.pincode} disabled class="form-control" />

                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Country</label>
                        <div class="col-sm-7">
                            <input placeholder="Country" type="text" name="country" id="country" defaultValue={address.country} disabled class="form-control" />

                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">State</label>
                        <div class="col-sm-7">
                            <input placeholder="State" type="text" name="state" id="state" defaultValue={address.state} disabled class="form-control" />

                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">City</label>
                        <div class="col-sm-7">
                            <input placeholder="City" type="text" name="city" id="city" defaultValue={address.city} disabled class="form-control" />

                        </div>
                    </div>

                    <hr />
                    <button className='btn btn-info btn-sm' onClick={handleFormSubmit}>Save</button>
                    &nbsp;

                </form>
            }
            <br />
            <button className='btn btn-info btn-sm' onClick={cancle}>Cancle</button>

        </div>

        // </div>
        // </div>
    )
}
