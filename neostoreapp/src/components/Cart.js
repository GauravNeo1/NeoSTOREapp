import React, { useState, useEffect } from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import { getCartData, cartRemove, cartAdd, descProductQty } from '../config/Myservice';
import { Outlet, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'


const _token = localStorage.getItem("_token");
const loginUser = localStorage.getItem('LoginUser');


export default function Cart() {
    const dispatch = useDispatch();

    const [cartData, setCartData] = useState();
    const [cart, setCart] = useState();

    const [total, setTotal] = useState(0);
    const [GST, setGST] = useState(0);
    const [mainTotal, setMainTotal] = useState(0);
    useEffect(() => {
        // let loginUser = localStorage.getItem('LoginUser');



        if (!localStorage.getItem("_token")) {
            if (localStorage.getItem("mycart") != undefined) {
                let cartDetails = JSON.parse(localStorage.getItem('mycart'))
                console.log("cart", cartDetails);

                setCartData(cartDetails)
                let sum = 0;
                cartDetails.forEach(ele => {
                    sum += ele.price * ele.qty
                })
                console.log(sum)
                setTotal(sum);
                setGST(Math.round(sum / 100 * 5));
                setMainTotal(sum + Math.round(sum / 100 * 5));
            }
        }

        else if (localStorage.getItem("_token") && !localStorage.getItem("mycart")) {

            let sum = 0;
            getCartData(loginUser)
                .then(res => {
                    setCartData(res.data);
                    console.log(res.data)
                    res.data.map((item) => {
                        sum = sum + (item.qty * item.price);
                    })
                    console.log(sum);
                    setTotal(sum);
                    setGST(Math.round(sum / 100 * 5));
                    setMainTotal(sum + Math.round(sum / 100 * 5));
                })
        }

        else if (localStorage.getItem("_token") && localStorage.getItem("mycart")) {
            let cartDetails = JSON.parse(localStorage.getItem('mycart'))
            localStorage.removeItem("mycart");
            getCartData(loginUser)
                .then(res => {
                    setCart(res.data);
                    // res.data.map((item) => {
                    //     cartDetails.forEach(ele => {
                    //         if (item._id === ele._id) {
                    //             console.log("same data");

                    //         }
                    //         else {

                    //             let data = {
                    //                 customer_id: loginUser,
                    //                 product_id: ele._id,
                    //                 price: ele.price
                    //             }
                    //             cartAdd(data)

                    //         }
                    //     })

                    // })
                    let flag = 0;
                    cartDetails.forEach(ele => {
                        flag = 0;
                        res.data.map((item) => {
                            if (ele._id !== item._id) {
                                flag = 1;
                            }
                            else {
                                console.log("same data");

                            }
                        })
                        if (flag == 1) {
                            let data = {
                                customer_id: loginUser,
                                product_id: ele._id,
                                price: ele.price
                            }
                            cartAdd(data)
                        }
                    })


                })

            let sum = 0;
            getCartData(loginUser)
                .then(res => {
                    setCartData(res.data);
                    console.log(res.data)
                    dispatch({ type: 'CARTCOUNT', payload: res.data.length })

                    res.data.map((item) => {
                        sum = sum + (item.qty * item.price);
                    })
                    console.log(sum);
                    setTotal(sum);
                    setGST(Math.round(sum / 100 * 5));
                    setMainTotal(sum + Math.round(sum / 100 * 5));
                })
        }
    }, [])




    const descQty = (e, item) => {
        // let loginUser = localStorage.getItem('LoginUser');
        // e.preventDefault();
        let payload = {
            img: item.product_image,
            name: item.product_name,
            price: item.product_cost,
            _id: item._id,
            qty: 1,
        };
        let id = item._id;
        if (!localStorage.getItem("_token")) {
            const exist = cartData.find((item) => item._id === id);
            if (exist.qty === 1) {
                // setCart(cart.filter((item) => item._id !== product._id));
            } else {

                let carData = cartData.map((item) =>
                    item._id === id
                        ? { ...exist, qty: exist.qty - 1 }
                        : item
                )
                setCartData(carData)
                localStorage.setItem("mycart", JSON.stringify(carData));
               

            }
        }
        else {
            let data = {

                customer_id: loginUser,
                product_id: item._id,
                price: item.price
            }

            descProductQty(data)
         

        }




    }


    const incQty = (e, item) => {
        // e.preventDefault();
        let payload = {
            img: item.product_image,
            name: item.product_name,
            price: item.product_cost,
            _id: item._id,
            qty: 1,
        };
        let id = item._id;
        if (!localStorage.getItem("_token")) {
            const exist = cartData.find((item) => item._id === id);
            if (exist) {

                let carData = cartData.map((item) =>
                    item._id === id
                        ? { ...exist, qty: exist.qty + 1 }
                        : item
                )
                setCartData(carData)

                localStorage.setItem("mycart", JSON.stringify(carData));
            } else {
                setCartData([...cartData, { ...payload, qty: 1 }]);
            }
        }
        else {
            // let loginUser = localStorage.getItem('LoginUser');
            let data = {
                customer_id: loginUser,
                product_id: item._id,
                price: item.price
            }

            cartAdd(data)
        }

    };

    const removeProduct = (index, item) => {
        if (!localStorage.getItem("_token")) {
            let lstore = JSON.parse(localStorage.getItem("mycart"));
            lstore.splice(index, 1);
            console.log(lstore);
            let setStore = JSON.stringify(lstore);
            localStorage.setItem("mycart", setStore);
            setCartData(lstore);
            dispatch({ type: 'SUB' })
        }
        else {
            // let loginUser = localStorage.getItem('LoginUser');
            let data = {
                customer_id: loginUser,
                product_id: item._id,
            }
            cartRemove(data)
            dispatch({ type: 'SUB' })
        }

    }

    // const proceedToBuy=()=>{
    //     if(!localStorage.getItem("_token")){

    //         window.location.href = "/signin"

    //     }
    //     else{
    //         window.location.href = "./profilepage/custaddress"
    //     }
    // }


    return (
        <div style={{ backgroundColor: "#FFFFF0" }}>
            <div className='px-3' style={{ paddingTop: "30px" }}>

                <Form>
                    <Row>
                        <Col style={{ textAlign: "right" }} xs={8} >
                            <table class="table" style={{ textAlign: "center" }} >
                                <thead class="thead-light">
                                    <tr>
                                        <th scope="col">Product</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Total</th>
                                        <th scope="col">Action</th>

                                    </tr>
                                </thead>
                                <tbody >

                                    {cartData &&
                                        cartData.map((item, index) => {
                                            return (
                                                <tr>
                                                    <td>
                                                        <Row>
                                                            <Col xs={3}>
                                                                <img src={item.img} width="47px" height="47px" />
                                                            </Col>
                                                            <Col xs={8}>
                                                                {item.name} <br />
                                                                {/* supplier name <br /> */}
                                                                {/* Status: <b>In Stock</b> */}
                                                            </Col>
                                                        </Row>

                                                    </td>
                                                    <td >
                                                        <button className='btn ' onClick={(e) => descQty(e, item)}><i class="fas fa-minus-circle"></i></button>
                                                        {item.qty}
                                                        <button className='btn' onClick={(e) => incQty(e, item)}><i class="fa fa-plus-circle" aria-hidden="true"></i></button>

                                                    </td>
                                                    <td>
                                                        &#8377;{item.price}
                                                    </td>
                                                    <td>
                                                        &#8377;{item.price * item.qty}
                                                    </td>
                                                    <td>
                                                        <button className='btn ' onClick={() => removeProduct(index, item)}><i class="fas fa-trash-alt"></i></button>


                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>

                        </Col>

                        <Col xm={4}>
                            <div style={{ marginTop: "0px", marginBottom: "50px", marginLeft: "5%", textAlign: "left", backgroundColor: "white", width: "90%", borderRadius: "10px" }} >
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
                                    <h6> <Row>
                                        <Col >
                                            <h6>GST(5%)</h6>
                                        </Col>
                                        <Col >
                                            {/* <h5>{ total * (5 / 100)}</h5> */}
                                            <h5>&#8377;{GST}</h5>

                                        </Col>
                                    </Row></h6>
                                    <hr />
                                    <Row>
                                        <Col >
                                            <h6>Order Total</h6>
                                        </Col>
                                        <Col >
                                            {/* <h5>{ total  + (total * (5 / 100))}</h5> */}
                                            <h5>&#8377;{mainTotal}</h5>

                                        </Col>
                                    </Row>
                                    <hr />
                                    {_token ?
                                        <Link class="nav-link" to="/profilepage/custaddress">   <button className='btn btn-primary col-12' >Proceed To Buy</button></Link>
                                        : <Link class="nav-link" to="/signin">   <button className='btn btn-primary col-12' >Proceed To Buy</button></Link>

                                    }
                                    {/* <Link class="nav-link" to="/profilepage/custaddress">   <button className='btn btn-primary col-12' >Proceed To Buy</button></Link> */}

                                    {/* <button className='btn btn-primary col-12' onClick={proceedToBuy}>Proceed To Buy</button> */}
                                </div>
                            </div>
                        </Col>

                    </Row>
                </Form>
            </div>
        </div>
    )
}
