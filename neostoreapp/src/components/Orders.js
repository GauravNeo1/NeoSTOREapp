import React, { useState, useEffect } from 'react'
import { getOrders, cartRemove, cartAdd, descProductQty, addOrder, getOrderByID } from '../config/Myservice';
import { Row, Col, Form, Table } from 'react-bootstrap'



export default function Orders() {
    const [ordersData, setOrdersData] = useState();
    useEffect(() => {
        let loginUser = localStorage.getItem('LoginUser');

        getOrders(loginUser)
            .then(res => {
                setOrdersData(res.data);
                console.log(res.data)
            })
    }, [])

    const viewInvoice = (value) => {

        window.location.href = `./orderinvoice/${value}`
    }


    return (
        <div>
            {ordersData &&
                ordersData.map((item, index) => {
                    return (

                        <div style={{ marginTop: "30px", marginBottom: "50px", marginLeft: "3%", textAlign: "left", backgroundColor: "white", width: "94%", opacity: "0.9" }}>
                            <div style={{ paddingTop: "5px", paddingBottom: "5px", paddingLeft: "20px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 skyblue" }}>

                                {/* <Row>
                                <Col >
                                

                                </Col>
                                <Col>

                                </Col>
                              
                            </Row> */}
                                <h5>Order ID : {item._id} </h5>
                                <h6>Total Amount : &#8377;{item.totalamount} </h6>

                                <hr />
                                {item.orderItems.map((p) =>


                                    <td>
                                        &nbsp;  &nbsp;
                                        <img src={p.product.product_image} width="95px" height="95px" style={{ borderRadius: "15px" }} />
                                        &nbsp;  &nbsp;
                                    </td>


                                )}
                                <hr />
                                <button className='btn btn-primary btn-sm' onClick={() => viewInvoice(item._id)}>View Invoice Detail</button>

                            </div>
                        </div>

                    )
                })
            }

        </div>
    )
}
