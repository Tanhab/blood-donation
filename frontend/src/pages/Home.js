import React from "react";
import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import NavigationBar from "../components/NavigationBar";
import { useNavigate, Link } from "react-router-dom";
import { Carousel, Card } from "react-bootstrap";
import { isExpired, decodeToken } from "react-jwt";

export default function Home() {
  const myDecodedToken = decodeToken(localStorage.getItem('token'));
  console.log(myDecodedToken.is_admin)
  const admin = myDecodedToken.is_admin ===1 ? '/settings': ''
  const navigate = useNavigate();
  return (
    <>
      <NavigationBar />
      <div
        style={{ display: "flex", height: "100vh", overflow: "scroll initial"}}
      >
        <Navigation
          // you can use your own router's api to get pathname
          activeItemId="/"
          onSelect={({ itemId }) => {
            // maybe push to the route
          navigate(itemId)
          }}
          items={[
            {
              title: "Dashboard",
              itemId: "/home",
              // you can use your own custom Icon component as well
              // icon is optional
              elemBefore: () => (
                <i className="fa fa-dashboard" aria-hidden="true"></i>
              ),
            },
            {
              title: "Profile",
              itemId: "",
              elemBefore: () => <i className="fa fa-user" aria-hidden="true"></i>,
              subNav: [
                {
                  title: "User info",
                  itemId: "/profile",
                },
                {
                  title: "Medical History",
                  itemId: "/medical-history",
                },
              ],
             
            },
            {
              title: "Donations",
              itemId: "/donations",
              elemBefore: () => <i className="fa fa-bed" aria-hidden="true"></i>,
              subNav: [
                {
                  title: "Donor",
                  itemId: "",
                },
                {
                  title: "Recipient",
                  itemId: "",
                },
              ],
            },
            {
              title: "Medical Centre",
              itemId: "/medicalcentre",
              // you can use your own custom Icon component as well
              // icon is optional
              elemBefore: () => (
                <i className="fa fa-hospital-o" aria-hidden="true"></i>
              ),
            },
            {
              title: "Notifications",
              itemId: "/notification",
              // you can use your own custom Icon component as well
              // icon is optional
              elemBefore: () => (
                <i className="fa fa-bell" aria-hidden="true"></i>
              ),
            },
            {
              title: "Map",
              itemId: "/map",
              // you can use your own custom Icon component as well
              // icon is optional
              elemBefore: () => <i className="fa fa-map" aria-hidden="true"></i>,
            },
            {
              title: "Ambulances",
              itemId: "/ambulance",
              // you can use your own custom Icon component as well
              // icon is optional
              elemBefore: () => (
                <i className="fa fa-ambulance" aria-hidden="true"></i>
              ),
            },
            {
              title: "Driver",
              itemId: "/driver",
              // you can use your own custom Icon component as well
              // icon is optional
              elemBefore: () => <i className="fa fa-car" aria-hidden="true"></i>,
            },
            {
              title: "Other Organizations",
              itemId: "/org",
              // you can use your own custom Icon component as well
              // icon is optional
              elemBefore: () => (
                <i className="fa fa-building" aria-hidden="true"></i>
              ),
            },
            {
              title: "Admin Panel",
              itemId: admin,
              // you can use your own custom Icon component as well
              // icon is optional
              elemBefore: () => <i className="fa fa-gear" aria-hidden="true"></i>,
            },
          ]}
        />

        <div className="container mt-5" style={{ textAlign: "center" }}>
          <div className="container">
            {admin==='/settings' && <h2>WELCOME TO ADMINISTRATION</h2>}
            <Carousel style={{marginTop: 20}}>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://dcist.com/wp-content/uploads/sites/3/2020/03/blooddonation.jpeg"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>Blood Donation</h3>
                  <p>A single pint of blood can save 3 lives</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://cdn.pixabay.com/photo/2020/04/17/08/09/blood-5053760__340.jpg"
                  alt="Second slide"
                />

                <Carousel.Caption>
                  <h3>Blood Collection</h3>
                  <p>One does not have to be a doctor to save lives</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://www.nhlbi.nih.gov/sites/default/files/styles/16x9_crop/public/2021-05/blood-donations-image-for-posting.jpg?itok=MBdfNQNx"
                  alt="Third slide"
                />

                <Carousel.Caption>
                  <h3>Blood Testing</h3>
                  <p>Safe blood for all</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
          <p style={{ marginTop: 50, color: "gray" }}>Help Us</p>
          <h1 style={{ fontFamily: "cursive" }}>
            We Believe that We can <span style={{ color: "red" }}> Save </span>{" "}
            More <span style={{ color: "red" }}> Lives </span> with you
          </h1>
          {admin==='' &&
          <>
          <Link
            className="me-3 btn text-white shadow book-button"
            to="/donation-req"
            style={{color: "white"}}
          >
            {" "}
          Register to be a donor
          </Link>

          <Link
            className="me-3 btn text-white shadow book-button"
            to="/blood-req"
            style={{color: "white"}}
          >
            {" "}
        Request for blood
          </Link>
          </>
}

          <div className="row" >
            <div className="col-md-6 col-xl-4 mb-4">
              <Card
                style={{
                  width: "18rem",
                  marginTop: 50,
                  backgroundColor: "#ADD8E6",
                }}
              >
                <Card.Body>
                  <Card.Title style={{ color: "blue" }}>Requested</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    People in need of blood
                  </Card.Subtitle>
                  <Card.Text style={{ color: "blue" }}>
                    Total
                    <h1>20</h1>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>

            <div className="col-md-6 col-xl-4 mb-4">
              <Card
                style={{
                  width: "18rem",
                  marginTop: 50,
                  backgroundColor: "#ffcccb",
                }}
              >
                <Card.Body>
                  <Card.Title style={{ color: "red" }}>Received</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Saved people by transfusion
                  </Card.Subtitle>
                  <Card.Text style={{ color: "red" }}>
                    Total
                    <h1>35</h1>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>

            <div className="col-md-6 col-xl-4 mb-4">
              <Card
                style={{
                  width: "18rem",
                  marginTop: 50,
                  backgroundColor: "#90ee90",
                }}
              >
                <Card.Body>
                  <Card.Title style={{ color: "green" }}>In stock</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Ready to save life
                  </Card.Subtitle>
                  <Card.Text style={{ color: "green" }}>
                    Total
                    <h1>120</h1>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
