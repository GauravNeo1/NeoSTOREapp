import React, { useEffect, useState } from 'react'
import { getAddress, cartRemove, cartAdd, descProductQty, getAddressByID, deleteAddress } from '../config/Myservice';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';

const loginUser = localStorage.getItem('LoginUser');


export default function CustAddress() {
    const [addresses, setAddresses] = useState([])
    const [Value, setValue] = useState('0')

    useEffect(() => {
        // let loginUser = localStorage.getItem('LoginUser');
        getAddress(loginUser)
            .then(res => {
                setAddresses(res.data);
            })
    }, [])

    console.log(addresses)
    const addAddress = () => {
        window.location.href = "./addaddress"

    }
    const editAddress = (value) => {
        window.location.href = `./editaddress/${value}`

    }


    const handleChange = (event) => {
        // let loginUser = localStorage.getItem('LoginUser');

        // setValue(event.target.value)
        let formData = {
            customer_id: loginUser,
            _id: event.target.value
        }
        getAddressByID(formData)
            .then(res => {
                console.log(res.data.data);

                localStorage.setItem("ShippingAddress", JSON.stringify(res.data.data));
            })
        // props.handleFilters(event.target.value)
        console.log(event.target.value)
        window.location.href = "../placeorder";


    }


    const delAddress = (value) => {
        // let loginUser = localStorage.getItem('LoginUser');

        let formData = {
            customer_id: loginUser,
            _id: value
        }
        deleteAddress(formData)
        window.location.href = "./custaddress";

    }

    return (
        // <div style={{ marginTop: "0px", marginBottom: "50px", marginLeft: "25%", textAlign: "left", backgroundColor: "white", width: "50%", borderRadius: "10px" }} >
        //     <div style={{ paddingTop: "30px", paddingBottom: "30px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 skyblue", borderRadius: "10px" }} className='px-4'>
        <div>
            <h4> ADDRESSES </h4>
            <hr />
            <Container>
                <Row> {
                    addresses && addresses.map((value, index) => {
                        return (


                            <Col key={index} className="mb-3">

                                <Card style={{ width: '16rem', marginTop: '20px', paddingTop: "10px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 skyblue" }} >


                                    <div class="form-check form-check-inline" onChange={handleChange} value={Value} >
                                        <Row>
                                            <Col xs={2} style={{ paddingTop: "5px", paddingLeft: "40px" }}>
                                                <input class="form-check-input" type="radio" name="inlineRadioOptions"
                                                    key={value._id}
                                                    value={`${value._id}`}
                                                />
                                            </Col>
                                            <Col xm={10} style={{ textAlign: "left" }}>
                                                <h6> Shipping address</h6>
                                            </Col>
                                        </Row>


                                        <Card.Body style={{ textAlign: "left" }}>
                                            <Card.Text>
                                                <p>
                                                    {value.address}<br />
                                                    {value.city}-{value.pincode} <br />
                                                    {value.state}   <br />
                                                    {value.country}
                                                </p>
                                            </Card.Text>

                                            <button className='btn' onClick={() => editAddress(value._id)}><i class="fas fa-pencil-alt"></i></button> &nbsp;
                                            <button className='btn' onClick={() => delAddress(value._id)}><i class="fas fa-trash-alt"></i></button>
                                        </Card.Body>
                                    </div>

                                </Card>
                            </Col>

                        )
                    })
                }
                </Row>
            </Container>
            <hr />
            <button className='btn btn-info btn-sm' onClick={addAddress} >Add Address</button>

        </div>
        //     </div>
        // </div>
    )
}
