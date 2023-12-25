import React,{useState} from 'react'
import {  useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
  import axios from 'axios';
  import { ToastContainer, toast } from 'react-toastify';
const Login = () => {
  
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

    const handelChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const handelClick =  (event) => {
    event.preventDefault();
//alert('hello')
    // password rx
    var passwordFormat = "^(.{0,7}|[^0-9]*|[^a-z]*|[a-z0-9]*)$"
    // email
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    setEmailError("")
    setPasswordError("")
  
  
        if (!input.email) {
            setEmailError("Email is required")
        } else if (!input.email.match(mailformat)) {
            setEmailError("Please enter your valid email")
        }else 
          if (!input.password) {
            setPasswordError("Password is required")
           
        } else if (input.password.length < 6) {
            setPasswordError("Password must be longer than 6 characters")
            
        } else if (input.password.match(passwordFormat)) {
            setPasswordError("Password must be one character")   
        }else{
       
                setLoading(true)
                const options = {
                    headers: {
                        "content-type": "application/json; charset=utf-8",
                        'Access-Control-Allow-Origin': '*'
                    }
                }
                const data = JSON.stringify({
                    email: input.email,
                    password: input.password,
                  
                });

                 axios.post('/users/authenticate', data,options).then(res => {
                     
                    
                 if (res.data.result!="false",res.data.token!="error" ) {
                    console.log("res",res.data.data.role);  
                    // localStorage.setItem('data', JSON.stringify(data.email, data.username));
                    // console.log(localStorage);
                    const data=res.data.data;
                   localStorage.setItem("token", res.data.token);
                   localStorage.setItem("user_arr",JSON.stringify(res.data.data));
                   localStorage.setItem("email",res.data.data.email);
                      localStorage.setItem("phone",res.data.data.phone);
                     //  localStorage.setItem("otp",res.data.data.otp);
                      localStorage.setItem("password",res.data.data.password);
                     
                        setLoading(false)
                        toast.success(res.data.msg);
                         setTimeout(() => {
                             navigate("/", { replace: true });
                         }, 500)
                         return true
                     } else {
                        setLoading(false)
                     toast.error(res.data.msg);
                     return true
                    }
                   
                }).catch(err => {
                    setLoading(false)
                    toast.error("Something went wrong");
                    var errorRes = JSON.parse(err.response.request.response.setItem)
                    if ( input.phone && input.email) {
                        // if (errorRes.email) {
                        //     setUseEmail("This email address is already used")
                        // } else {
                        //     setUseEmail("")
                        // }
                        // if (errorRes.username) {
                        //     setUseName(errorRes.username[0])
                        //     document.getElementById("unicName").style.fontSize = "9px"
                        // } else {
                        //     setUseName("")
                        //     document.getElementById("unicName").style.fontSize = "11px"
                        // }
             
                        // setAboutError("")
            
                    }
          

                })
            }
          
};

  return (

    <>


<section className="log-in-section background-image-2 section-b-space">
        <div className="container-fluid-lg w-100">
          <div className="row">
            <div className="col-xxl-6 col-xl-5 col-lg-6 d-lg-block d-none ms-auto">
              <div className="image-contain">
                <img src="../assets/images/inner-page/log-in.png" className="img-fluid" alt="" />
              </div>
            </div>
            <div className="col-xxl-4 col-xl-5 col-lg-6 col-sm-8 mx-auto">
              <div className="log-in-box">
                <div className="log-in-title">
                  <h3>Welcome To Fastkart</h3>
                  <h4>Log In Your Account</h4>
                </div>
                <div className="input-box">
                  <form className="row g-4" onSubmit={handelClick} >
                  <div className="col-12">
                      <div className="form-floating theme-form-floating">
                        <input type="email" className="form-control" id="form-register-email"  onChange={handelChange} data-constraints="@email @Required" name="email" value={input.email} placeholder="Email Address" />
                        <label htmlFor="email">Email Address</label>
                        <span className="form-validation" style={{ color: "red" }} >{emailError}</span>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating theme-form-floating">
                        <input type="password" className="form-control"  onChange={handelChange} data-constraints="@Required" value={input.password} name="password" id="form-login-password" placeholder="Password" />
                        <label htmlFor="password">Password</label>
                        <br/><span className="form-validation" style={{ color: "red" }} >{passwordError}</span>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="forgot-box">
                        <div className="form-check ps-0 m-0 remember-box">
                          <input className="checkbox_animated check-box" type="checkbox" id="flexCheckDefault" />
                          <label className="form-check-label" htmlFor="flexCheckDefault">Remember me</label>
                        </div>
                        <a href="/forgot" className="forgot-password">Forgot Password?</a>
                      </div>
                    </div>
                    <div className="col-12">
                      <button className="btn btn-animation w-100 justify-content-center" type="submit">Log
                        In</button>
                    </div>
                  </form>
                </div>
                <div className="other-log-in">
                  <h6>or</h6>
                </div>
                <div className="log-in-button">
                  <ul>
                    <li>
                      <a href="https://www.google.com/" className="btn google-button w-100">
                        <img src="../assets/images/inner-page/google.png" className="blur-up lazyloaded" alt="" /> Log In with Google
                      </a>
                    </li>
                    <li>
                      <a href="https://www.facebook.com/" className="btn google-button w-100">
                        <img src="../assets/images/inner-page/facebook.png" className="blur-up lazyloaded" alt="" /> Log In with Facebook
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="other-log-in">
                  <h6 />
                </div>
                <div className="sign-up-box">
                  <h4>Don't have an account?</h4>
                  <a href="/registed">Sign Up</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login
