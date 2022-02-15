import axios from "axios";
import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import { Container, Col, Row, Card, Spinner, Alert } from "react-bootstrap";

function App() {
  const [aral, setAral] = useState(null);
  const [jet, setJet] = useState(null);
  const [hem, setHem] = useState(null);

  const [tankstellen, setTankstellen] = useState([]);

  useEffect(() => {
    // const setPseudoData = async () => {
    //   const aralpseudo = {
    //     id: "aral",
    //     brand: "Aral",
    //     e5: 1.729,
    //     e10: 1.669,
    //     diesel: 1.539,
    //   };
    //   await setAral(aralpseudo);
    //   const jetpseudo = {
    //     id: "jet",
    //     brand: "JET",
    //     e5: 1.829,
    //     e10: 1.569,
    //     diesel: 1.639,
    //   };
    //   await setJet(jetpseudo);
    //   const hempseudo = {
    //     id: "hem",
    //     brand: "HEM",
    //     e5: 1.929,
    //     e10: 1.469,
    //     diesel: 1.739,
    //   };
    //   await setHem(hempseudo);
    // };
    // await setPseudoData();

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
        let cheapestPrice = 0;

        calcArr = calcArr.sort((a, b) => a.e5 - b.e5);
        cheapestPrice = calcArr[0].e5;
        calcArr = calcArr.map((e) => {
          if (e.e5 === cheapestPrice) {
            e.isCheapest_e5 = true;
          }
          return e;
        });

        calcArr = calcArr.sort((a, b) => a.e10 - b.e10);
        cheapestPrice = calcArr[0].e10;
        calcArr = calcArr.map((e) => {
          if (e.e10 === cheapestPrice) {
            e.isCheapest_e10 = true;
          }
          return e;
        });

        calcArr = calcArr.sort((a, b) => a.diesel - b.diesel);
        cheapestPrice = calcArr[0].diesel;
        calcArr = calcArr.map((e) => {
          if (e.diesel === cheapestPrice) {
            e.isCheapest_diesel = true;
          }
          return e;
        });

        calcArr = calcArr.sort((a, b) => a.brand + b.brand);

        console.log("calcArr:", calcArr);
        setTankstellen([...calcArr]);
      }, 1500);
    }
  }, [aral, jet, hem]);

  return (
    <Container fluid className="justify-content-center">
      {tankstellen.length === 0 && (
        <Row id="loading" className="justify-content-center">
          <Card style={{ width: "20rem", height: "10rem" }} className="my-1 mx-1">
            <Card.Body>
              <Card.Title>Loading Data: </Card.Title>
              <Spinner animation="border" className="justify-content-center" />
            </Card.Body>
          </Card>
        </Row>
      )}
      {tankstellen[0] !== null &&
        tankstellen.map((e, i) => {
          return (
            <Row key={e.brand} className="justify-content-center">
              <Card style={{ width: "20rem" }} className="my-1 mx-1">
                <Card.Body>
                  <Card.Title>{e.brand}</Card.Title>

                  <Alert variant={e.isCheapest_e10 ? "success" : "dark"}>
                    <Row>
                      <Col>
                        <h5>e10</h5>
                      </Col>
                      <Col>
                        <h6>{e.e10}</h6>
                      </Col>
                    </Row>
                  </Alert>

                  <Alert variant={e.isCheapest_e5 ? "success" : "dark"}>
                    <Row>
                      <Col>
                        <h5>Super</h5>
                      </Col>
                      <Col>
                        <h6>{e.e5}</h6>
                      </Col>
                    </Row>
                  </Alert>

                  <Alert variant={e.isCheapest_diesel ? "success" : "dark"}>
                    <Row>
                      <Col>
                        <h5>Diesel</h5>
                      </Col>
                      <Col>
                        <h6>{e.diesel}</h6>
                      </Col>
                    </Row>
                  </Alert>
                </Card.Body>
              </Card>
            </Row>
          );
        })}
    </Container>
  );
}

export default App;
