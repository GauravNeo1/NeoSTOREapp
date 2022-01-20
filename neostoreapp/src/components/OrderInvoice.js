import React, { useState, useEffect } from 'react'
import { getOrders, cartRemove, cartAdd, descProductQty, addOrder, getOrderByID } from '../config/Myservice';
import { Row, Col, Form, Table } from 'react-bootstrap'
import { useParams } from "react-router-dom"

import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'


export default function OrderInvoice() {
    const [invoiceData, setInvoiceData] = useState();
    const params = useParams()


    useEffect(() => {
        let loginUser = localStorage.getItem('LoginUser');

        let formData = {
            customer_id: loginUser,
            _id: params.id
        }
        getOrderByID(formData)
            .then(res => {
                setInvoiceData(res.data);
                console.log(res.data)
            })
    }, [])


    const printDocument = () => {
        const input = document.getElementById('contend');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                // pdf.output('dataurlnewwindow');
                pdf.save("download.pdf");
                const filedata = pdf.output("blob");
                // let formData = new FormData();
                // formData.append("file", filedata, "samplefile");
                // sendEmail(formData).then((res)=>{
                //     console.log(res)
                // })
            });
    }


    return (
        <div >
            {invoiceData &&
                invoiceData.map((item, index) => {
                    return (

                        <div style={{ marginTop: "30px", marginBottom: "50px", marginLeft: "15%", textAlign: "center", backgroundColor: "white", width: "70%", opacity: "0.9" }}>
                            <div style={{ paddingTop: "40px", paddingBottom: "40px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 skyblue" }} className='container'>
                                <div id="contend">


                                    <div style={{ marginTop: "5px", marginBottom: "5px", marginLeft: "0%", marginRight: "60%", textAlign: "center", width: "100%", borderRadius: "10px", opacity: "0.9" }}>
                                        <div style={{ paddingTop: "40px", paddingLeft: "-40px", paddingBottom: "40px", padding: "40px", paddingRight: "90px" }} >

                                            <Row>
                                                <Col style={{ textAlign: "left" }}>  <h5 >Order ID : {item._id} </h5>
                                                </Col>
                                                <Col style={{ textAlign: "right" }}>   <h6 >{item.createdAt} </h6>
                                                </Col>
                                            </Row>
                                            <hr />
                                            <div style={{ textAlign: "left" }} >
                                                <h6>Personal Details</h6>
                                                <p>{item.customer_id.first_name} {item.customer_id.last_name}. <br />
                                                    {item.customer_id.email} <br /></p>
                                            </div>
                                            <hr />

                                            <Row>
                                                <Col style={{ textAlign: "left" }}>
                                                    <h6>Shiiping Address</h6>
                                                    <p>
                                                        {item.delivery_address.address} <br />
                                                        {item.delivery_address.country} <br />
                                                        {item.delivery_address.state} <br />
                                                        {item.delivery_address.city} - {item.delivery_address.pincode}

                                                    </p>
                                                </Col>
                                                <Col style={{ textAlign: "left" }}>
                                                    <h6>Order Details</h6>
                                                    <p>
                                                        <h6>isDeliverd : {item.isDeliverd} </h6>
                                                        <h6>PaymentBy : {item.paymentBy} </h6>
                                                        <br />
                                                        <Row>
                                                            <Col className='col-4'> <h6>Total Amount :</h6>
                                                            </Col>
                                                            <Col > <h5>&#8377; {item.totalamount} </h5>
                                                            </Col>
                                                        </Row>

                                                    </p>
                                                </Col>
                                            </Row>



                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Product_name</th>
                                                        <th scope="col">Quantity</th>
                                                        <th scope="col">Price</th>
                                                        <th scope="col">Total(qty * price)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {item.orderItems.map((p) =>
                                                        <tr>
                                                            <th >
                                                                <img src={p.product.product_image} width="65px" height="65px" style={{ borderRadius: "15px" }} />
                                                            </th>
                                                            <td className='col-5'>{p.product.product_name}</td>
                                                            <td>{p.quantity}</td>

                                                            <td>{p.product.product_cost}</td>
                                                            <td>{p.total_productcost}</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>




                                            <hr />

                                        </div>


                                    </div>
                                </div>
                                <button className='btn btn-primary btn-sm' onClick={printDocument} >Download Invoice </button>

                            </div>

                        </div>

                    )
                })
            }

        </div>
    )
}
