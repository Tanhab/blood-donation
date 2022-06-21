import React from "react";
import { Link } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";


export default function Welcome() {
  return (
    <>
      <NavigationBar />
      <div className="landing">
        <div className="bg"></div>
        <div className="container column bg-column__center">
          <h1 className="title">Make <span style={{color: "#FF0000"}}>Someone's Life </span><br/>
          by giving of yours</h1>
          <p className="subheading">
          Crimson is a digital foundation for collecting donations
          to be distributed to people in need. We build strength, stability and 
          self reliance through shelter
          </p>
          <Link
            className="me-3 btn text-white shadow book-button"
            to="/login"
            style={{color: "white"}}
          >
            {" "}
           Make a donation
          </Link>
        
        </div>
      </div>



      <div className="info-content" >
        <div className="container info-flex">
          <main className="main-content">
            <h1 className="main-title">Start Saving Lives</h1>
            <div className="section-info">
              <h5 className="section-info__para" style={{marginTop: 20, fontFamily: "sans"}}>
              The reason to donate is simple…it helps save lives. In fact, every two seconds of every day, someone needs blood. Since blood cannot be manufactured outside the body and has a limited shelf life, the supply must constantly be replenished by generous blood donors.
              Blood donors play a vital role in the healthcare of patients in your community. 37% of the population is eligible to donate blood, yet only 5% actually do. With every blood donation, you are providing strength, hope and courage to patients and their families in your local hospitals.
              Join our cause and help us save more lives. Everyone should have the right to get a blood transfusion.
             
              </h5>
            
            </div>
          </main>
          <aside className="aside-content">
            <div className="aside-card">
             Answer to your emergencies. Find Donors in your area. Get connected in a matter of minutes at
             zero cost.
            </div>
            <div className="aside-card aside-card-imp">
             Donate your blood. Your blood is precious and your donations are truly life-saving.In as little as few minutes, you can become someone's hero.
            </div>
            <div className="aside-card">
              No need to pay for anything. Crimson is absolutely free forever!
            </div>
          </aside>
        </div>
      </div>
      


      

      
      <Footer/>
    </>
  );
}
