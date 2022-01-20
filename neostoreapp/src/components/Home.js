import React, { useState, useEffect } from 'react'
import '../csscomponents/Home.css'
import { Card, Row, Col, Form, Table, Collapse } from 'react-bootstrap'
import { getCategories } from '../config/Myservice';
import '../csscomponents/FontChnage.css'



export default function Home() {
    const [categories, setCategories] = useState([])
    useEffect(() => {

        getCategories()
            .then(res => {
                setCategories(res.data);
            })
    }, [])

    return (
        <div >

            <div class="parallax1"></div>

            <div style={{ height: "400px", fontSize: "36px" }}>
                <div className='container' style={{ padding: "20px" }}>
                    <Row>
                        <Col style={{ textAlign: "left", paddingRight: "50px" }}>
                            <h2> SHOP NOW</h2>
                            <br />

                            <h4>Apple M1 chip for next-level performance

                                TrueDepth camera system featuring Ultra Wide camera with Center Stage
                                12MP Wide camera, 10MP Ultra Wide camera, and LiDAR Scanner for immersive AR
                                5G for superfast downloads and high-quality streaming
                                Stay connected with ultrafast Wi-Fi 6
                            </h4>                    </Col>
                        <Col>

                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Events/getsale_Apay/T2_Media_Unrec_Revised_3.jpg" alt="Paris" width="400" height="350" />

                        </Col>

                    </Row>
                </div>

            </div>
            <div class="parallax2"></div>

            <div style={{ height: "400px", fontSize: "36px" }}>
                <div className='container' style={{ padding: "20px" }}>
                    <Row>

                        <Col>

                            <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Events/getsale_Apay/T2_Media_Unrec_Revised_3.jpg" alt="Paris" width="400" height="350" />

                        </Col>
                        <Col style={{ textAlign: "left", paddingLeft: "50px" }}>
                            <h2> SHOP NOW</h2>
                            <br />
                            <h4>Apple M1 chip for next-level performance
                                Brilliant 12.9-inch Liquid Retina XDR display with ProMotion, True Tone, and P3 wide color
                                12MP Wide camera, 10MP Ultra Wide camera, and LiDAR Scanner for immersive AR
                                5G for superfast downloads and high-quality streaming
                                
                            </h4>
                        </Col>

                    </Row>
                </div>
            </div>
            <div class="parallax3" ></div>
            <div style={{ height: "700px", fontSize: "36px", backgroundColor: "#FFFFF0" }}>
                <div className='container' style={{ padding: "50px", paddingBottom: "80px" }}>

                    <h2 style={{ textAlign: "left" }}>PRODUCT AVAILABLE ON WEBISTE</h2>
                    <Row>
                        {
                            categories && categories.map((value, index) => {
                                return (
                                    <Col key={index} className="mb-3">
                                        <Card style={{ width: '16rem', marginTop: '20px', backgroundColor: "#E0FFFF", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 skyblue" }} >
                                            <Card.Img variant="top" src={value.category_image} height="200px" width="170px" />
                                            <Card.Body style={{ textAlign: "left" }}>
                                                <Card.Title>{value.category_name}</Card.Title>

                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </div>
            </div>



        </div>
    )
}
