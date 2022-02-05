import axios from "axios";
import "./App.css";
import { useState, useEffect } from "react";

import { Container, Col, Row, Card, Spinner } from "react-bootstrap";

function App() {
  const [aral, setAral] = useState(null);
  const [jet, setJet] = useState(null);
  const [hem, setHem] = useState(null);

  useEffect(() => {
    const fetchAral = async () => {
      const response = await axios.get(`https://creativecommons.tankerkoenig.de/json/detail.php?id=24441cab-3a2c-4e95-8640-755b70b541c8&apikey=${process.env.TANKEN_APIKEY}`);
      setAral(response);
    };
    fetchAral();
  }, []);

  useEffect(() => {
    const fetchJet = async () => {
      const response = await axios.get(`https://creativecommons.tankerkoenig.de/json/detail.php?id=51d4b49c-a095-1aa0-e100-80009459e03a8&apikey=${process.env.TANKEN_APIKEY}`);
      setAral(response);
    };
    fetchJet();
  }, []);

  useEffect(() => {
    const fetchHem = async () => {
      const response = await axios.get(`https://creativecommons.tankerkoenig.de/json/detail.php?id=4b6ad6c8-e9c1-4c65-bd1e-aa6d6c007626&apikey=${process.env.TANKEN_APIKEY}`);
      setAral(response);
    };
    fetchHem();
  }, []);

  return (
    <Container fluid>
      <Row className="justify-content-center">
        {!aral && (
          <Card id="loadingAral" style={{ width: "20rem", height: "14rem" }} className="my-1 mx-1">
            <Card.Body>
              <Card.Title>ARAL Loading...</Card.Title>
              <Spinner className="my-5" animation="border" />
            </Card.Body>
          </Card>
        )}
        {aral && (
          <Card id="aral" style={{ width: "20rem", height: "14rem" }} className="my-1 mx-1">
            <Card.Body>
              <Card.Title>Tankstellen Name</Card.Title>
              <Row>
                <Col>
                  <h5>e10</h5>
                </Col>
                <Col>
                  <h6>Preis</h6>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5>e10</h5>
                </Col>
                <Col>
                  <h6>Preis</h6>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5>e10</h5>
                </Col>
                <Col>
                  <h6>Preis</h6>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5>e10</h5>
                </Col>
                <Col>
                  <h6>Preis</h6>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )}
        {!jet && (
          <Card id="loadingjet" style={{ width: "20rem", height: "14rem" }} className="my-1 mx-1">
            <Card.Body>
              <Card.Title>JET Loading...</Card.Title>
              <Spinner className="my-5" animation="border" />
            </Card.Body>
          </Card>
        )}
        {!hem && (
          <Card id="loadinghem" style={{ width: "20rem", height: "14rem" }} className="my-1 mx-1">
            <Card.Body>
              <Card.Title>HEM Loading...</Card.Title>
              <Spinner className="my-5" animation="border" />
            </Card.Body>
          </Card>
        )}
      </Row>
    </Container>
  );
}

export default App;
