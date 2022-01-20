import React, { useState, useEffect } from 'react'
import { getProductBy, userRating } from '../config/Myservice';

import { useParams } from "react-router-dom"

import { Row, Col, Form, Table } from 'react-bootstrap'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// import Rating from './Rating';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import ReactImageMagnify from 'react-image-magnify';
import { FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon, TelegramShareButton, TelegramIcon, EmailShareButton, EmailIcon, PinterestShareButton, PinterestIcon } from "react-share";


export default function ProductDetails() {
    const [value, setValue] = React.useState('1');
    const [image, setImage] = useState();

    const [rate, setRate] = useState();
    const [userProductRating, setUserProductRating] = useState();
    const [flag, setFlag] = useState(false);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const params = useParams()
    const [productData, setProductData] = useState([]);
    useEffect(() => {
        let rate = 0;
        let count = 0;
        getProductBy(params.id)
            .then(res => {
                console.log("productdeatiils", res.data)
                console.log(res.data[0].product_image)
                setImage(res.data[0].product_image)
                setProductData(res.data)
                console.log(res.data)

                res.data[0].product_rating.forEach(ele =>
                    rate = rate + ele.rating ,
                )
                res.data[0].product_rating.forEach(ele =>
                    count = count + 1
                )

                setRate(Math.round(rate / count))


            })
    }, [])

    console.log("rate", rate)

    const rateProduct = (e) => {
        e.preventDefault();
        setFlag(true);
    }

    const submitRating = (e) => {
        e.preventDefault();
        let data = {
            _id: params.id,
            rating: userProductRating
        }
        userRating(data)
        setFlag(false);
    }

    return (
        <div style={{ backgroundColor: "#FFFFF0" }}>
            <div className='container' >
                <div>
                    {productData &&
                        productData.map((item, index) => {
                            // setImage(item.product_image)
                            return (
                                <div>
                                    <br />
                                    <Form>
                                        <Row>
                                            <Col style={{ textAlign: "center" }}>
                                                <div style={{ width: "480px", height: "330" }} >
                                                    <ReactImageMagnify {...{
                                                        smallImage: {
                                                            alt: image,
                                                            isFluidWidth: true,
                                                            src: image,


                                                        },
                                                        largeImage: {
                                                            src: image,
                                                            width: 1200,
                                                            height: 1800
                                                        },
                                                        isHintEnabled: true,
                                                        shouldHideHintAfterFirstActivation: false
                                                    }} />
                                                </div>


                                                {/* <img src={image} alt="Paris" width="450" height="350" /> */}


                                            </Col>


                                            <Col >

                                                <div style={{ width: "90%", paddingLeft: "20px", textAlign: "left" }}>
                                                    <h3>{item.product_name}</h3>



                                                    <Stack spacing={1}>
                                                        {rate &&
                                                            <Rating name="read-only" value={rate} readOnly />

                                                        }

                                                    </Stack>

                                                    <hr />
                                                    <h6>Price: &nbsp; <b> &#8377;{item.product_cost}</b></h6>
                                                    <h6>Color: &nbsp; <i class="fas fa-square-full" style={{ color: `${item.color_id.color_code}` }}></i></h6>
                                                    <br />
                                                    <Row>
                                                        <Col>
                                                            <img src={item.product_image} alt="Paris" width="80" height="80" onClick={() => setImage(item.product_image)} />

                                                        </Col>
                                                        <Col>
                                                            <img src={item.product_subimages[0].subimage} alt="Paris" width="80" height="80" onClick={() => setImage(item.product_subimages[0].subimage)} />

                                                        </Col>

                                                        <Col>
                                                            <img src={item.product_subimages[1].subimage} alt="Paris" width="80" height="80" onClick={() => setImage(item.product_subimages[1].subimage)} />
                                                        </Col>

                                                        <Col>
                                                            <img src={item.product_subimages[2].subimage} alt="Paris" width="80" height="80" onClick={() => setImage(item.product_subimages[2].subimage)} />

                                                        </Col>

                                                    </Row>
                                                    <div>
                                                        <br />
                                                        <h5>Share <i class="fas fa-share"></i></h5>
                                                        <FacebookShareButton
                                                            url={"http://www.Neostore.com"}
                                                            quote={"NeoStore - A one stop solution for styling"}
                                                            hashtag="#NeoStore"
                                                            className="socialMediaButton"
                                                        >
                                                            <FacebookIcon size={46} round={true} />
                                                        </FacebookShareButton> &nbsp;
                                                        <WhatsappShareButton
                                                            url={"http://www.Neostore.com"}
                                                            quote={"NeoStore - A one stop solution for styling"}
                                                            hashtag="#NeoStore"
                                                            className="socialMediaButton"
                                                        >
                                                            <WhatsappIcon size={46} round={true} />
                                                        </WhatsappShareButton> &nbsp;
                                                        <TelegramShareButton
                                                            url={"http://www.Neostore.com"}
                                                            quote={"NeoStore - A one stop solution for styling"}
                                                            hashtag="#NeoStore"
                                                            className="socialMediaButton"
                                                        >
                                                            <TelegramIcon size={46} round={true} />
                                                        </TelegramShareButton> &nbsp;
                                                        <PinterestShareButton
                                                            url={"http://www.Neostore.com"}
                                                            quote={"NeoStore - A one stop solution for styling"}
                                                            hashtag="#NeoStore"
                                                            className="socialMediaButton"
                                                        >
                                                            <PinterestIcon size={46} round={true} />
                                                        </PinterestShareButton> &nbsp;
                                                        <EmailShareButton
                                                            url={"http://www.Neostore.com"}
                                                            quote={"NeoStore - A one stop solution for styling"}
                                                            hashtag="#NeoStore"
                                                            className="socialMediaButton"
                                                        >
                                                            <EmailIcon size={46} round={true} />
                                                        </EmailShareButton>

                                                    </div>
                                                    <br />
                                                    <div>
                                                        <button className='btn btn-success btn-sm'>ADD TO CART</button>  &nbsp;
                                                        <button className='btn btn-warning btn-sm' onClick={rateProduct}>RATE PRODUCT</button>

                                                    </div>
                                                    {flag && <div>
                                                        <br />
                                                        Tell others what you think
                                                        <Stack spacing={3}>

                                                            <Rating
                                                                name="simple-controlled"
                                                                onChange={(event, newValue) => {
                                                                    setUserProductRating(newValue);
                                                                }}
                                                            />
                                                        </Stack>
                                                        <button className='btn btn-primary btn-sm' onClick={submitRating}>Submit</button>


                                                    </div>}


                                                </div>

                                            </Col>

                                        </Row>
                                    </Form>
                                    <br />
                                    <Box sx={{ width: '100%', typography: 'body1' }} className='px-5'>
                                        <TabContext value={value}>
                                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                                    <Tab label="Description" value="1" />
                                                    <Tab label="Features" value="2" />

                                                </TabList>
                                            </Box>
                                            <TabPanel value="1" style={{ textAlign: "left" }}>
                                                {item.product_desc}

                                            </TabPanel>

                                            <TabPanel value="2">
                                                <Table striped bordered hover>
                                                    <tbody>
                                                        <tr>
                                                            <th>Parameter</th>
                                                            <th>Data</th>
                                                        </tr>
                                                        <tr>
                                                            <td>Product Material</td>
                                                            <td>{item.product_material}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Product Dimension</td>
                                                            <td>{item.product_dimension}</td>
                                                        </tr>

                                                        <tr>
                                                            <td>Product Producer</td>
                                                            <td>{item.product_producer}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Product Stock</td>
                                                            <td> {item.product_stock}</td>
                                                        </tr>

                                                    </tbody>
                                                </Table>

                                            </TabPanel>


                                        </TabContext>
                                    </Box>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    )
}

