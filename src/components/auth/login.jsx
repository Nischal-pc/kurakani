import { Link } from "react-router-dom";
import "../css/login.css";
import { loginSchema } from "./validation";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { z } from "zod";

export default function Login() {
  const { loginUser, auth } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      loginSchema.parse(formData);
      setErrors({});
      loginUser(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        if (error instanceof z.ZodError) {
          const fieldErrors = {};
          error.errors.forEach(({ path, message }) => {
            fieldErrors[path[0]] = message; // map field names to error messages
          });
          setErrors(fieldErrors);
        }
      }
    }
  };

  return (
    <div className="container">
      <div className="w-100 position-fixed start-50 top-50 translate-middle my-2">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <div className="text-center">
                  <img src="favicon.ico" alt="" className="logo py-1" />
                  <div className="fs-6 fw-bold py-2">Kurakani Login</div>
                  <div className="py-3">
                    <form onSubmit={handleSubmit}>
                      {auth.errors.length > 1 &&
                        auth.errors.map((error, idx) => (
                          <div className="text-danger" key={idx}>
                            {error}
                          </div>
                        ))}
                      <div className="input-group my-2">
                        <div className="input-group-prepend">
                          <div className="input-group-text">@</div>
                        </div>
                        <input
                          type="text"
                          className={
                            "form-control " + (errors.email && "is-invalid")
                          }
                          placeholder="Username"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData((data) => ({
                              ...data,
                              email: e.target.value,
                            }))
                          }
                        />
                        <div className="invalid-feedback small">
                          {errors.email}
                        </div>
                      </div>
                      <div className="input-group my-2">
                        <div className="input-group-prepend">
                          <div className="input-group-text h-100">
                            <span className="fa fa-lock text-muted"></span>
                          </div>
                        </div>
                        <input
                          type="password"
                          className={
                            "form-control " + (errors.password && "is-invalid")
                          }
                          placeholder="password"
                          value={formData.password}
                          onChange={(e) =>
                            setFormData((data) => ({
                              ...data,
                              password: e.target.value,
                            }))
                          }
                        />
                        <div className="invalid-feedback small">
                          {errors.password}
                        </div>
                      </div>
                      <div className="d-grip">
                        <button className="btn btn-dark w-100 mt-3">
                          <i className="fa fa-sign-in"></i> Login
                        </button>
                      </div>
                      <div className="my-2">
                        <div className="d-flex justify-content-between">
                          <div className="small">
                            <Link to="/forget-password">Forget password</Link>
                          </div>
                          <div className="small">
                            <Link to="/register">Register here</Link>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <hr className="w-50" />
                        <div className="px-2">OR</div>
                        <hr className="w-50" />
                      </div>
                      <div className="d-grip gap-2">
                        <button className="btn btn-outline-dark w-100 my-2">
                          <i className="fa-brands fa-google me-2"></i> SignIn
                          with Google
                        </button>
                        <button className="btn btn-outline-dark w-100 my-2">
                          <i className="fa-brands fa-github me-2"></i> SignIn
                          with GitHub
                        </button>
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
