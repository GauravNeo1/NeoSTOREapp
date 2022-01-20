import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { Row, Col, Form, Table } from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom';



const mapStyles = {
    width: '90%',
    height: '100%'
};

export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,  // Hides or shows the InfoWindow
        activeMarker: {},          // Shows the active marker upon click
        selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
    };
    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };
    render() {
        return (
            <div>
                <Row>
                    <Col xm={11}>
                        <div style={{ margin: "10px", height: "610px" }}>
                            <Map
                                google={this.props.google}
                                zoom={14}
                                style={mapStyles}
                                initialCenter={
                                    {
                                        lat: 18.5204,
                                        lng: 73.8567
                                    }
                                }
                            >
                                <Marker
                                    onClick={this.onMarkerClick}
                                    name={'Kenyatta International Convention Centre'}
                                />
                                <InfoWindow
                                    marker={this.state.activeMarker}
                                    visible={this.state.showingInfoWindow}
                                    onClose={this.onClose}
                                >
                                    <div>
                                        <h4>{this.state.selectedPlace.name}</h4>
                                    </div>
                                </InfoWindow>
                            </Map>

                        </div>
                    </Col>
                    <Col xs={1} >
                        <br />
                        <Link class="nav-link" to="/home" style={{ color: "white" }}>
                            <button type="button" class="btn-close large" aria-label="Close"></button>
                        </Link>

                    </Col>
                </Row>



            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCxI437gTAs-VR6zLzqMXhX3MCV808sQUo'
})(MapContainer);