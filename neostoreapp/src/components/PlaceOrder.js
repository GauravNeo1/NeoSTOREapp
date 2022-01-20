import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { getCartData, cartRemove, cartAdd, descProductQty, addOrder, getProfileData } from '../config/Myservice';



export default function PlaceOrder() {
    const [shippingAddress, setShippingAddress] = useState([]);
    const [cartData, setCartData] = useState();
    const [orderitem, setOrderitem] = useState([]);

    const [total, setTotal] = useState(0);
    const [GST, setGST] = useState(0);
    const [mainTotal, setMainTotal] = useState(0);

    const [user, setUser] = useState();

    useEffect(() => {
        let sum = 0;
        let loginUser = localStorage.getItem('LoginUser');

        getProfileData(loginUser)
            .then(res => {
                if (res.data.err == 0) {
                    setUser(res.data.loginuser);
                    console.log(res.data.loginuser.first_name)
                }
                if (res.data.err == 1) {
                    console.log(res.data)
                }
            })

        let data = localStorage.getItem('ShippingAddress')
        data = JSON.parse(data);
        setShippingAddress(data)
        // let loginUser = localStorage.getItem('LoginUser');

        getCartData(loginUser)
            .then(res => {
                setCartData(res.data);
                console.log(res.data[0].name)
                res.data.map((item) => {
                    sum = sum + (item.qty * item.price);
                })
                console.log(sum);
                setTotal(sum);
                setGST(Math.round(sum / 100 * 5));
                setMainTotal(sum + Math.round(sum / 100 * 5));

            })
    }, [])


    const placeOrder = () => {
        let totalamount = total + (total * (5 / 100));

        const orderItems = cartData.map((key) => ({
            product: key._id,
            quantity: key.qty,
            total_productcost: 324343

        }));

        let loginUser = localStorage.getItem('LoginUser');


        let orderData = {
            customer_id: loginUser,
            delivery_address: shippingAddress._id,
            orderItems,
            totalamount,
            paymentBy: "Paypal",
            isDeliverd: "false"
        }
        addOrder(orderData)
        console.log(orderData)
        let formData = {
            customer_id: "sdsfdsa",
            deliver_address: "esdfds",
            totalcartamount: 435325
        }
        window.location.href = "./orderplaced"

    }



    console.log(shippingAddress)


    return (
        <div>
            <Row>
                <Col style={{ textAlign: 'left' }}>

                

                    <div style={{ marginTop: "5px", marginBottom: "5px", marginLeft: "2%", marginRight: "60%", textAlign: "center", width: "100%", backgroundColor: "#FFF5EE", borderRadius: "10px", opacity: "0.9" }}>
                        <div style={{ paddingTop: "7px", paddingLeft: "-40px", paddingBottom: "40px", padding: "30px", paddingRight: "90px" }} >

                            <div style={{ textAlign: "left" }} >
                                <h5>Personal Details</h5>
                                {user && <p>{user.first_name} {user.last_name}. <br />
                                    {user.email} <br /></p>}
                            </div>
                            <hr />
                            <Row>
                                <Col style={{ textAlign: "left" }}>
                                    <h5>Shiiping Address</h5>
                                    {shippingAddress && <p>
                                        {shippingAddress.address} <br />
                                        {shippingAddress.country} <br />
                                        {shippingAddress.state} <br />
                                        {shippingAddress.city} - {shippingAddress.pincode}

                                    </p>}
                                </Col>
                                <Col style={{ textAlign: "left" }}>


                                    <tr>
                                        <td><h6>Payment Method : &nbsp;  </h6></td>
                                        <td><h5>Paypal</h5></td>
                                    </tr>
                                    <tr>
                                        <td><h6>Total Amount :  &nbsp; </h6></td>
                                        <td><h4>&#8377;{mainTotal}</h4></td>
                                    </tr>

                                </Col>
                            </Row>
                            <hr />


                            <h5>Order Items</h5>
                            <table class="table">
                                <tbody >

                                    {cartData &&
                                        cartData.map((item, index) => {
                                            return (
                                                <tr>
                                                    <td>

                                                        <img src={item.img} width="35px" height="35px" />
                                                    </td>
                                                    <td className='col-5'>

                                                        {item.name}


                                                    </td>
                                                    <td>
                                                        {item.qty} * &#8377;{item.price} = &#8377;{item.price * item.qty}
                                                    </td>


                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>



                </Col>
                <Col xs={3}>
                    <div style={{ marginTop: "10px", marginBottom: "50px", marginLeft: "5%", textAlign: "left", backgroundColor: "white", width: "90%", borderRadius: "10px" }} >
                        <div style={{ paddingTop: "30px", paddingBottom: "30px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 skyblue", borderRadius: "10px" }} className='px-4'>
                            <h4>Review Order</h4> <br />
                            <h6>
                                <Row>
                                    <Col >
                                        <h6>Subtotal</h6>
                                    </Col>
                                    <Col >
                                        <h5>&#8377;{total}</h5>
                                    </Col>
                                </Row>
                            </h6>
                            <hr />
                            <Row>
                                <Col >
                                    <h6>Shipping</h6>
                                </Col>
                                <Col >
                                    <h5>&#8377;0</h5>
                                </Col>
                            </Row>
                            <hr />
                            <h6> <Row>
                                <Col >
                                    <h6>GST(5%)</h6>
                                </Col>
                                <Col >
                                    <h5>&#8377;{GST}</h5>
                                </Col>
                            </Row></h6>
                            <hr />
                            <Row>
                                <Col >
                                    <h6>Order Total</h6>
                                </Col>
                                <Col >
                                    <h5>&#8377;{mainTotal}</h5>
                                </Col>
                            </Row>
                            <hr />
                            <button className='btn btn-primary col-12' onClick={placeOrder}>Place Order</button>
                        </div>
                    </div>
                </Col>

            </Row>
        </div>
    )
}
