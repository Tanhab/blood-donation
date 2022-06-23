import NavigationBar from "../components/NavigationBar";
import { useNavigate } from "react-router-dom";

export default function Settings() {

    const navigate = useNavigate();

    function regMed() {
      navigate("/medical-centre-reg");
    }
    function regAmb() {
      navigate("/amb-reg");
    }
    function regDrv() {
      navigate("/driver-reg");
    }
    function regOrg() {
      navigate("/org-reg");
    }
    return (
        <>
        <NavigationBar/>

        <div className="container">
<div className="row justify-content-center">
    <div className="col-12 col-lg-10 col-xl-8 mx-auto">
        <h2 className="h3 mb-4 page-title">Settings</h2>
        <div className="my-4">
           
            <h5 className="mb-0 mt-5">Admin Panel Settings</h5>
            <p>Control And Maintain all affairs</p>
            <hr className="my-4" />
            <strong className="mb-0">Register</strong>
            <p>Adding organizations, staffs and more</p>
            <div className="list-group mb-5 shadow">
                <div onClick={regMed} className="list-group-item">
                    <div className="row align-items-center">
                        <div className="col">
                            <strong className="mb-0">Register Medical Centre</strong>
                        </div>
                     
                    </div>
                </div>
                <div onClick={regAmb} className="list-group-item">
                    <div className="row align-items-center">
                        <div className="col">
                            <strong className="mb-0">Register Ambulance</strong>
                        </div>
                    </div>
                </div>
                <div onClick={regDrv} className="list-group-item">
                    <div className="row align-items-center">
                        <div className="col">
                            <strong className="mb-0">Register Driver</strong>
                        </div>
                    </div>
                </div>
                <div onClick={regOrg} className="list-group-item">
                    <div className="row align-items-center">
                        <div className="col">
                            <strong className="mb-0">Register Organization</strong>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="my-4" />
            <strong className="mb-0">Unregister</strong>
            <p>Deleting organizations, staffs and more</p>
            <div className="list-group mb-5 shadow">
                <div className="list-group-item">
                    <div className="row align-items-center">
                        <div className="col">
                            <strong className="mb-0">Unregister Medical Centre</strong>
                        </div>
                     
                    </div>
                </div>
                <div className="list-group-item">
                    <div className="row align-items-center">
                        <div className="col">
                            <strong className="mb-0">Unregister Ambulance</strong>
                        </div>
                    </div>
                </div>
                <div className="list-group-item">
                    <div className="row align-items-center">
                        <div className="col">
                            <strong className="mb-0">Unregister Driver</strong>
                        </div>
                    </div>
                </div>
                <div className="list-group-item">
                    <div className="row align-items-center">
                        <div className="col">
                            <strong className="mb-0">Unregister Organization</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

</div>
        </>
    )
}