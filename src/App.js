import axios from "axios";
import "./App.css";
import React from "react";
import { useState, useEffect } from "react";

import { Container, Col, Row, Card, Spinner } from "react-bootstrap";

function App() {
  const [aral, setAral] = useState(null);
  const [jet, setJet] = useState(null);
  const [hem, setHem] = useState(null);

  useEffect(() => {
    const fetchAral = async () => {
      const response = await axios.get(`https://creativecommons.tankerkoenig.de/json/detail.php?id=24441cab-3a2c-4e95-8640-755b70b541c8&apikey=011bc4a1-c50e-3acf-c3b6-ade3a2359d40`);
      setAral(response.data);
      console.log(response.data);
    };
    fetchAral();

    const fetchJet = async () => {
      const response = await axios.get(`https://creativecommons.tankerkoenig.de/json/detail.php?id=51d4b49c-a095-1aa0-e100-80009459e03a&apikey=011bc4a1-c50e-3acf-c3b6-ade3a2359d40`);
      setJet(response.data);
      console.log(response.data);
    };
    fetchJet();
    const fetchHem = async () => {
      const response = await axios.get(`https://creativecommons.tankerkoenig.de/json/detail.php?id=4b6ad6c8-e9c1-4c65-bd1e-aa6d6c007626&apikey=011bc4a1-c50e-3acf-c3b6-ade3a2359d40`);
      setHem(response.data);
      console.log(response.data);
    };
    fetchHem();
  }, []);

  return (
    <Container fluid>
      <Row className="justify-content-center">
        {!aral && (
          <Card id="loadingAral" style={{ width: "20rem", height: "10rem" }} className="my-1 mx-1">
            <Card.Body>
              <Card.Title>ARAL Loading...</Card.Title>
              <Spinner className="my-5" animation="border" />
            </Card.Body>
          </Card>
        )}
        {aral && (
          <Card id="aral" style={{ width: "20rem", height: "10rem" }} className="my-1 mx-1">
            <Card.Body>
              <Card.Title>{aral.station.brand}</Card.Title>
              <Row>
                <Col>
                  <h5>E10</h5>
                </Col>
                <Col>
                  <h6>{aral.station.e10}</h6>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5>SUPER</h5>
                </Col>
                <Col>
                  <h6>{aral.station.e5}</h6>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5>Diesel</h5>
                </Col>
                <Col>
                  <h6>{aral.station.diesel}</h6>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )}
      </Row>
      <Row className="justify-content-center">
        {!jet && (
          <Card id="loadingjet" style={{ width: "20rem", height: "10rem" }} className="my-1 mx-1">
            <Card.Body>
              <Card.Title>JET Loading...</Card.Title>
              <Spinner className="my-5" animation="border" />
            </Card.Body>
          </Card>
        )}
        {jet && (
          <Card id="aral" style={{ width: "20rem", height: "10rem" }} className="my-1 mx-1">
            <Card.Body>
              <Card.Title>{jet.station.brand}</Card.Title>
              <Row>
                <Col>
                  <h5>E10</h5>
                </Col>
                <Col>
                  <h6>{jet.station.e10}</h6>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5>SUPER</h5>
                </Col>
                <Col>
                  <h6>{jet.station.e5}</h6>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5>Diesel</h5>
                </Col>
                <Col>
                  <h6>{jet.station.diesel}</h6>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )}
      </Row>
      <Row className="justify-content-center">
        {!hem && (
          <Card id="loadinghem" style={{ width: "20rem", height: "10rem" }} className="my-1 mx-1">
            <Card.Body>
              <Card.Title>HEM Loading...</Card.Title>
              <Spinner className="my-5" animation="border" />
            </Card.Body>
          </Card>
        )}
        {hem && (
          <Card id="hem" style={{ width: "20rem", height: "10rem" }} className="my-1 mx-1">
            <Card.Body>
              <Card.Title>{hem.station.brand}</Card.Title>
              <Row>
                <Col>
                  <h5>E10</h5>
                </Col>
                <Col>
                  <h6>{hem.station.e10}</h6>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5>SUPER</h5>
                </Col>
                <Col>
                  <h6>{hem.station.e5}</h6>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5>Diesel</h5>
                </Col>
                <Col>
                  <h6>{hem.station.diesel}</h6>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )}
      </Row>
    </Container>
  );
}

export default App;
