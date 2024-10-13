import { Link } from "react-router-dom";
import "../css/login.css";

export default function Register() {
  return (
    <div className="container">
      <div className="w-100 position-fixed start-50 top-50 translate-middle my-2">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <div className="text-center">
                  <img src="favicon.ico" alt="" className="logo py-1" />
                  <div className="fs-6 fw-bold py-2">
                    Create account in Kurakani
                  </div>
                  <div className="py-3">
                    <form>
                      <div class="input-group my-2">
                        <div class="input-group-prepend">
                          <div class="input-group-text">@</div>
                        </div>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Username"
                        />
                      </div>
                      <div class="input-group my-2">
                        <div class="input-group-prepend">
                          <div class="input-group-text h-100">
                            <span className="fa fa-key text-muted"></span>
                          </div>
                        </div>
                        <input
                          type="password"
                          class="form-control"
                          placeholder="password"
                        />
                      </div>
                      <div class="input-group my-2">
                        <div class="input-group-prepend">
                          <div class="input-group-text h-100">
                            <span className="fa fa-lock text-muted"></span>
                          </div>
                        </div>
                        <input
                          type="password"
                          class="form-control"
                          placeholder="Confirm password"
                        />
                      </div>
                      <div class="input-group my-2">
                        <div class="input-group-prepend">
                          <div class="input-group-text h-100">
                            <i className="fa fa-envelope text-muted"></i>
                          </div>
                        </div>
                        <input
                          type="email"
                          class="form-control"
                          placeholder="Email address"
                        />
                      </div>
                      <div className="d-grip">
                        <button className="btn btn-dark w-100 mt-3">
                          <i className="fa-regular fa-user"></i> Create Account
                        </button>
                      </div>
                      <div className="my-2">
                        <div className="d-flex justify-content-between">
                          <div className="small">
                            Already have an account?{" "}
                            <Link to="/login">Login here</Link>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
