import axios from "axios";
import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import { Container, Col, Row, Card, Spinner, Alert } from "react-bootstrap";

function App() {
  const [aral, setAral] = useState(null);
  const [jet, setJet] = useState(null);
  const [hem, setHem] = useState(null);

  const [e5, sete5] = useState(0);
  const [e10, sete10] = useState(0);
  const [diesel, setdiesel] = useState(0);

  const [tankstellen, setTankstellen] = useState([]);
  const [closedstellen, setClosedStellen] = useState([]);

  useEffect(() => {
    // const setPseudoData = async () => {
    //   const aralpseudo = {
    //     id: "aral",
    //     brand: "Aral",
    //     e5: getRandomArbitrary(),
    //     e10: getRandomArbitrary(),
    //     diesel: getRandomArbitrary(),
    //     isOpen: true,
    //   };
    //   await setAral(aralpseudo);
    //   const jetpseudo = {
    //     id: "jet",
    //     brand: "JET",
    //     e5: getRandomArbitrary(),
    //     e10: getRandomArbitrary(),
    //     diesel: getRandomArbitrary(),
    //     isOpen: true,
    //   };
    //   await setJet(jetpseudo);
    //   const hempseudo = {
    //     id: "hem",
    //     brand: "HEM",
    //     e5: getRandomArbitrary(),
    //     e10: getRandomArbitrary(),
    //     diesel: getRandomArbitrary(),
    //     isOpen: true,
    //   };
    //   await setHem(hempseudo);
    // };
    // const getRandomArbitrary = () => {
    //   return Math.random().toFixed(0) * (1.8 - 1.5) + 1.5;
    // };
    // setPseudoData();

    const fetchAral = async () => {
      const response = await axios.get(`https://creativecommons.tankerkoenig.de/json/detail.php?id=24441cab-3a2c-4e95-8640-755b70b541c8&apikey=011bc4a1-c50e-3acf-c3b6-ade3a2359d40`);
      setAral(response.data.station);
    };
    fetchAral();

    const fetchJet = async () => {
      const response = await axios.get(`https://creativecommons.tankerkoenig.de/json/detail.php?id=51d4b49c-a095-1aa0-e100-80009459e03a&apikey=011bc4a1-c50e-3acf-c3b6-ade3a2359d40`);
      setJet(response.data.station);
    };
    fetchJet();

    const fetchHem = async () => {
      const response = await axios.get(`https://creativecommons.tankerkoenig.de/json/detail.php?id=4b6ad6c8-e9c1-4c65-bd1e-aa6d6c007626&apikey=011bc4a1-c50e-3acf-c3b6-ade3a2359d40`);
      setHem(response.data.station);
    };
    fetchHem();
  }, []);

  useEffect(() => {
    if (aral && jet && hem) {
      setTimeout(() => {
        let calcArr = [{ ...aral }, { ...jet }, { ...hem }];
        let closedArr = [];
        closedArr = calcArr.filter((e) => e.isOpen === false);
        calcArr = calcArr.filter((e) => e.isOpen === true);
        if (calcArr.length > 0) {
          calcArr = calcArr.sort((a, b) => a.e5 - b.e5);
          sete5(calcArr[0].e5);
          calcArr = calcArr.sort((a, b) => a.e10 - b.e10);
          sete10(calcArr[0].e10);
          calcArr = calcArr.sort((a, b) => a.diesel - b.diesel);
          setdiesel(calcArr[0].diesel);
          calcArr = calcArr.sort((a, b) => (a.brand === b.brand ? 0 : a.brand < b.brand ? 1 : -1));
        }
        setClosedStellen([...closedArr]);
        setTankstellen([...calcArr]);
        console.log(calcArr);
      }, 1500);
    }
  }, [aral, jet, hem]);

  return (
    <Container fluid className="justify-content-center">
      <Row>
        {tankstellen.length === 0 && closedstellen.length === 0 && (
          <Col key="loading" className="justify-content-center">
            <Card style={{ width: "20rem" }} className="my-1 mx-1">
              <Card.Body>
                <Card.Title>{"Loading Data:"}</Card.Title>
                <Container>
                  <Alert variant="dark" className="justify-content-center">
                    <Row>
                      <Col className="justify-content-center">
                        <Spinner animation="border" />
                      </Col>
                    </Row>
                  </Alert>
                </Container>
              </Card.Body>
            </Card>
          </Col>
        )}
        {tankstellen[0] !== null &&
          tankstellen.map((e) => {
            return (
              <Col key={e.brand} className="justify-content-center">
                <Card style={{ width: "20rem" }} className="my-1 mx-1">
                  <Card.Body>
                    <Card.Title>{e.brand}</Card.Title>
                    <Container>
                      <Alert variant={e.e10 === e10 ? "success" : "dark"}>
                        <Row>
                          <Col>
                            <h5>e10</h5>
                          </Col>
                          <Col>
                            <h6>{e.e10}</h6>
                          </Col>
                        </Row>
                      </Alert>

                      <Alert variant={e.e5 === e5 ? "success" : "dark"}>
                        <Row>
                          <Col>
                            <h5>Super</h5>
                          </Col>
                          <Col>
                            <h6>{e.e5}</h6>
                          </Col>
                        </Row>
                      </Alert>

                      <Alert variant={e.diesel === diesel ? "success" : "dark"}>
                        <Row>
                          <Col>
                            <h5>Diesel</h5>
                          </Col>
                          <Col>
                            <h6>{e.diesel}</h6>
                          </Col>
                        </Row>
                      </Alert>
                    </Container>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        {closedstellen &&
          closedstellen.map((e) => {
            return (
              <Col key={e.brand} className="justify-content-center">
                <Card style={{ width: "20rem" }} className="my-1 mx-1">
                  <Card.Body>
                    <Card.Title>{e.brand}</Card.Title>
                    <Container>
                      <Alert variant="danger">
                        <Row>
                          <Col>
                            <h5>Closed</h5>
                          </Col>
                        </Row>
                      </Alert>
                    </Container>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
}

export default App;
