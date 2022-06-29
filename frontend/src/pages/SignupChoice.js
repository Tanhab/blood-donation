import NavigationBar from "../components/NavigationBar";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; 


export default function SignupChoice() {
    const navigate =useNavigate()

    function userSignup(){
        navigate('/signup')
    }

    function adminSignup(){
        navigate('/admin-signup')
    }
  return (
    <>
      <NavigationBar />

      <div style={{ padding: 100 }}>
        <div className="row">
          <div className="col-md-3"></div>

          <div className="col-md-3">
            <Card onClick={userSignup} className="shadow p-5">
              <img className="card-img-top" width="150px" src="man.png" />
              <h3  style={{textAlign: 'center'}}>Signup as User</h3>
            </Card>
          </div>

          <div className="col-md-3">
          <Card onClick={adminSignup} className="shadow p-5">
              <img className="card-img-top" width="150px" src="admin.png" />
              <h3 style={{textAlign: 'center'}}>Signup as Admin</h3>
            </Card>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </>
  );
}
