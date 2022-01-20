import React, { useState } from 'react'
import { addAddress } from '../config/Myservice';


const regForCity = RegExp(/^([A-Za-z]{3,15})$/);
const regForPIN = RegExp(/^[0-9]{6}$/);
export default function AddAddress() {
    const [add, setAdd] = useState(" ");
    const [pin, setPin] = useState(" ");
    const [city, setCity] = useState(" ");
    const [state, setState] = useState(" ");
    const [country, setCountry] = useState(" ");




    const [pinerr, setPinerr] = useState(" ");
    const [cityerr, setCityerr] = useState(" ");
    const [stateerr, setStateerr] = useState(" ");
    const [countryerr, setCountryerr] = useState(" ");

    const handler = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'address':
                setAdd(value);
                break;
            case 'pin':
                setPinerr('');
                setPin(value);
                break;
            case 'country':
                setCountryerr('');
                setCountry(value);
                break;
            case 'state':
                setStateerr('');
                setState(value);
                break;

            case 'city':
                setCityerr('');
                setCity(value);
                break;
        }
    }


    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (add == " " || pin == " " || country == " " || state == " " || city == " ") {
            alert("Please fill all the feild");
        }

        else if (!regForPIN.test(pin)) {
            setPinerr("Pin must be 6 digit");
        }
        else if (!regForCity.test(country)) {
            setCountryerr("Country name should be greater than 3 letter");
        }
        else if (!regForCity.test(state)) {
            setStateerr("State name should be greater than 3 letter");
        }
        else if (!regForCity.test(city)) {
            setCityerr("City name should be greater than 3 letter");
        }


        else {
            let loginUser = localStorage.getItem('LoginUser');

            let formData = {
                customer_id: loginUser,
                address: add,
                pin: pin,
                country: country,
                state: state,
                city: city,
                isdeliveryadd: "false"
            }

            addAddress(formData);


            setAdd("");
            setPin("");
            setCountry("");
            setState("");
            setCity("");


            document.getElementById('address').value = '';
            document.getElementById('pin').value = '';
            document.getElementById('country').value = '';
            document.getElementById('state').value = '';
            document.getElementById('city').value = '';

            window.location.href = "./custaddress";


        }
    }


    const cancle = () => {
        window.location.href = "./custaddress"
    }


    return (
        // <div style={{ marginTop: "0px", marginBottom: "50px", marginLeft: "25%", textAlign: "left", backgroundColor: "white", width: "50%", borderRadius: "10px" }} >
        //     <div style={{ paddingTop: "30px", paddingBottom: "30px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 skyblue", borderRadius: "10px" }} className='px-4'>

<div>
    <div>
                <h4>ADD ADDRESS</h4>
                <hr />
                <form onSubmit={handleFormSubmit}>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Address</label>
                        <div class="col-sm-7">
                            <input placeholder="address" type="text" name="address" id="address" onChange={handler} class="form-control" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Postal Code</label>
                        <div class="col-sm-7">
                            <input placeholder="Postal Code" type="text" name="pin" id="pin" onChange={handler} class="form-control" />
                            {pinerr && <div style={{ color: "red" }}>{pinerr}</div>}
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Country</label>
                        <div class="col-sm-7">
                            <input placeholder="Country" type="text" name="country" id="country" onChange={handler} class="form-control" />
                            {countryerr && <div style={{ color: "red" }}>{countryerr}</div>}
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">State</label>
                        <div class="col-sm-7">
                            <input placeholder="State" type="text" name="state" id="state" onChange={handler} class="form-control" />
                            {stateerr && <div style={{ color: "red" }}>{stateerr}</div>}
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">City</label>
                        <div class="col-sm-7">
                            <input placeholder="City" type="text" name="city" id="city" onChange={handler} class="form-control" />
                            {cityerr && <div style={{ color: "red" }}>{cityerr}</div>}
                        </div>
                    </div>

                    <hr />
                    <button className='btn btn-info btn-sm' type="submit">Save</button>
                    &nbsp;

                </form>
                <br />
                <button className='btn btn-info btn-sm' onClick={cancle}>Cancle</button>
            </div>

        </div>
    )
}
