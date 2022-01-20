import React, { useState, useEffect } from 'react'
import { getProducts, cartAdd } from '../config/Myservice';
import ReactPaginate from "react-paginate";
import Colorradio from './Colorradio';
import CategoryFilter from './CategoryFilter';
import SearchFilter from './SearchFilter';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import '../csscomponents/FontChnage.css'


// import { StarIcon  } from '@mui/icons-material';



export default function Allproducts() {
    const dispatch = useDispatch();

    const [colorFlag, setColorFlag] = useState(false);
    const [catFlag, setCatFlag] = useState(false);
    const [allFlag, setallFlag] = useState(true);

    const [order, setOrder] = useState();
    const [sortby, setSortby] = useState();

    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(3);
    const [Filters, setFilters] = useState({
        category_id: [],
        color_id: []
    })
    const [SearchTerms, setSearchTerms] = useState("")

    const [productData, setProductData] = useState([]);
    useEffect(() => {
        let variable = {
            // skip: Skip,
            // limit: Limit,
        }
        getProducts(variable)
            .then(res => {
                setProductData(res.data);
                // console.log(res.data)
            })
    }, [])

    const productDetail = (id) => {
        alert(id)
        window.location.href = `./productdetails/${id}`;
    }




    const handlePageClick = (data) => {
        let pagination = {
            page: data.selected + 1,
            size: 6,
            filter: Filters
        }
        getProducts(pagination)
            .then(res => {
                setProductData(res.data);

            })

    };


    const showFilteredResults = (filters) => {
        let variable = {
            // skip: Skip,
            // limit: Limit,
            filters: filters
        }
        getProducts(variable)
            .then(res => {
                setProductData(res.data);

            })
    }

    const handleFilters = (filters, category) => {
        console.log(filters)
        const newFilters = { ...Filters }
        newFilters[category] = filters
        console.log(newFilters)
        // if(category==="category_id"){

        // }
        showFilteredResults(newFilters)
        setFilters(newFilters)
    }


    const updateSearchTerms = (newSearchTerm) => {
        console.log(newSearchTerm)
        let variable = {
            // skip: Skip,
            // limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }
        setSkip(0)
        setSearchTerms(newSearchTerm)

        getProducts(variable)
            .then(res => {
                setProductData(res.data);

            })
    }

    console.log(productData)


    // const addtocart = (item) => {
    //     let loginUser = localStorage.getItem('LoginUser');
    //     let data = {
    //         customer_id: loginUser,
    //         product_id: item._id,
    //         price: item.product_cost
    //     }
    //     cartAdd(data)
    //     // alert(item._id)
    // }


    const addtocart = (item) => {
        if (!localStorage.getItem('_token')) {
            let payload = {
                img: item.product_image,
                name: item.product_name,
                price: item.product_cost,
                _id: item._id,
                qty: 1,
            };
            if (localStorage.getItem("mycart") !== null) {
                let arr = JSON.parse(localStorage.getItem("mycart"));
                let idArrays = [];
                arr.forEach((data) => {
                    idArrays.push(data._id);
                });

                if (idArrays.includes(item._id)) {
                    alert("Product Already Added");
                } else {
                    arr.push(payload);
                    localStorage.setItem("mycart", JSON.stringify(arr));
                    dispatch({ type: 'ADD' })
                    alert("Product Added to Cart");
                }
            } else {
                let arr = [];
                arr.push(payload);
                localStorage.setItem("mycart", JSON.stringify(arr));
                dispatch({ type: 'ADD' })

                alert("Product Added to Cart");
            }
        }
        else {
            let loginUser = localStorage.getItem('LoginUser');
            let data = {
                customer_id: loginUser,
                product_id: item._id,
                price: item.product_cost
            }
            cartAdd(data)
            dispatch({ type: 'ADD' })

            // alert(item._id)
        }

    }

    const eventTrigger = (value) => {
        if (value === "color") {
            colorFlag === "true" ? setColorFlag(false) : setColorFlag(true)
        }
        else {
            catFlag === "true" ? setCatFlag(false) : setCatFlag(true)
        }
    }

    const rating = () => {
        let variable = {
            sortBy: "product_rating",
            order: "desc",
            filters: Filters
        }
        getProducts(variable)
            .then(res => {
                setProductData(res.data);

            })
    }

    const priceUp = () => {
        let variable = {
            sortBy: "product_cost",
            order: "desc",
            // filters: Filters
        }
        getProducts(variable)
            .then(res => {
                setProductData(res.data);

            })
    }

    const priceDown = () => {
        let variable = {
            sortBy: "product_cost",
            order: "asc",
            // filters: Filters
        }
        getProducts(variable)
            .then(res => {
                setProductData(res.data);

            })
    }

    const allProduct = () => {
        setColorFlag(false);
        setCatFlag(false);
        getProducts()
            .then(res => {
                setProductData(res.data);
                // console.log(res.data)
            })
    }

    return (
        <div style={{ backgroundColor: "#FFFFF0" }}>
            <Row>

                <Col xs={12} xl={3}>
                    {/* <div style={{ marginTop: "10px", marginBottom: "10px", marginLeft: "0%", textAlign: "center", backgroundColor: "white", width: "90%", borderRadius: "10px" }} >
                        <div style={{ paddingTop: "10px", paddingBottom: "10px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 skyblue", borderRadius: "10px" }} className='px-5'>

                            <table className='table '>
                                <tbody>
                                    <tr>Search Product here</tr>
                                    <tr><SearchFilter refreshFunction={updateSearchTerms} /></tr>
                                    <br />
                                    <tr>Color Filter</tr>
                                    <tr> <Colorradio handleFilters={filters => handleFilters(filters, "color_id")} /></tr>
                                    <br />
                                    <tr>Category Filter</tr>
                                    <tr>  <CategoryFilter handleFilters={filters => handleFilters(filters, "category_id")} /></tr>
                                </tbody>
                            </table>
                            <br />
                            <br />

                        </div>
                    </div> */}
                    <div style={{ paddingTop: "15px" }}>
                        <button className='btn btn-light  col-10' onClick={allProduct}><h6>ALL PRODUCT</h6></button> <br /> <br />
                        <button className='btn btn-light  col-10' onClick={() => eventTrigger("cat")} ><h6>CATEGORY FILTER</h6></button> <br /> <br />
                        {catFlag && <CategoryFilter handleFilters={filters => handleFilters(filters, "category_id")} />}
                        <button className='btn btn-light  col-10' onClick={() => eventTrigger("color")}><h6>COLOR FILTER</h6></button> <br /> <br />
                        {colorFlag && <Colorradio handleFilters={filters => handleFilters(filters, "color_id")} />}

                    </div>
                </Col>

                <Col>

                    <Container>
                        <Row>
                            <div style={{ padding: "15px" }}>
                                <Row>

                                    <Col>  <SearchFilter refreshFunction={updateSearchTerms} /></Col>
                                    <Col xs={1}> <i class="fas fa-star" onClick={rating}></i>
                                    </Col>
                                    <Col xs={1}>&#8377;<i class="fas fa-arrow-up" onClick={priceUp}></i></Col>
                                    <Col xs={1}>&#8377;<i class="fas fa-arrow-down" onClick={priceDown}></i></Col>
                                </Row>


                            </div>
                        </Row>
                        <Row>
                            {
                                productData.map((item, index) => {
                                    return (
                                        <Col key={index} className="mb-3">
                                            <Card style={{ width: '16rem', marginTop: '20px', backgroundColor:"#E0FFFF" ,boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 15px 0 skyblue"}} >
                                                <Card.Img variant="top" src={item.product_image} height="200px" width="170px" />
                                                <Card.Body style={{ textAlign: "left" }}>
                                                    <Card.Title>{item.product_name}</Card.Title>
                                                    <Card.Title style={{ fontSize: "small" }}>by {item.product_producer}</Card.Title>
                                                    <Card.Title style={{ color: "red", fontSize: "large", fontWeight: "bold" }}>&#8377;{item.product_cost}</Card.Title>
                                                    <Row>
                                                        <Col xs={8}>
                                                            <Button variant="success btn btn-sm col-12" onClick={() => addtocart(item)}>Add to cart</Button>
                                                        </Col>
                                                        <Col>
                                                            <Button variant="info btn btn-sm col-12" onClick={() => productDetail(item._id)}>View</Button>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Container>


                </Col>
            </Row>
            

            <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                pageCount={10}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />


        </div>
    )
}
