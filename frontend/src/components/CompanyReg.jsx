// export default ComRegister;
import { useEffect, useState } from 'react';
import '../css/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import company_icon from '../assets/companyicon.jpg'
// import "../css/WelcomePage.css"; 
import log from '../assets/orangelogo.png'
// import "../css/WelcomePage.css";
import { useSelector, useDispatch } from 'react-redux';

import { setLoading, setUser } from '../redux/authSlice';
import axios from 'axios';
import { toast } from 'sonner';

function CompanyReg() {
    const [registerData, setRegisterData] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: 'recruiter',
    });
    const [isActive, setIsActive] = useState(false);
    
    const { user } = useSelector(store => store.auth);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toggleForm = () => setIsActive(!isActive);

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData((prevData) => ({ ...prevData, [name]: value }));
    };
    
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
    
            // Ensure 'role' defaults to 'student' if not provided
            const dataToSubmit = { ...registerData, role: registerData.role || "recruiter" };
    
            // API call to register the user
            const res = await axios.post("http://localhost:3000/api/Compregister", dataToSubmit, {
                headers: { 'Content-Type': 'application/json' },
            });
    
            // Handle success response
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                // navigate('');
                alert("Registration successful")
                toast.success(res.data.message || "Registration successful");
            } else {
                toast.error(res.data.message || "Registration failed");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            dispatch(setLoading(false));
        }
    };
    
   
    
    



    useEffect(() => {
        if (user) {
            navigate('/recruiter');
        }
    }, [user, navigate]);
   
    
    



    return (
        <>
        {/* <header className="navbar">
        <div className="logo">
          <img src="/path/to/logo.png" alt="EcoCollect Logo" />
          <span>JOB PORTAL</span>
        </div>
        <nav className="nav-links">
          
          <Link to={'/'}><a href="#home">Home</a></Link>
          
          
          <Link to={'/'}><a href="#price-sheet">About us</a></Link>
         
         
          <Link to={'/login'}> <a href="#about-us">Join</a></Link>
        </nav>
        
      </header> */}
      {/* Navbar */}
      <header className="navbar">
          <div className="logo">
            <img src={log} alt="JobSphere Logo"
              style={{ width: 90, height: 90 }} />
            <span style={{ fontWeight: 600, fontSize: 25 }}>JobSphere</span>
          </div>
          <nav className="nav-links">

            <Link to={'/'}><a href="#home">Home</a></Link>


            <Link to={'/aboutus'}><a href="#price-sheet">About us</a></Link>


            <Link to={'/login'}> <a href="#about-us">Join</a></Link>
          </nav>

        </header>
        <div className={`container ${isActive ? 'active' : ''}`} id="container">
            {/* Sign-up form */}
            <div className="form-container sign-up">
                <form onSubmit={handleRegisterSubmit}>
                    <h1>Create Account</h1>
                
                    <button type="submit">Sign Up</button>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>

            {/* Sign-in form */}
            <div className="form-container sign-in">
            <form onSubmit={handleRegisterSubmit}>
    <h1>Create Account</h1>
    <input
        type="text"
        placeholder="Full Name"
        name="fullname"
        value={registerData.fullname}
        onChange={handleRegisterChange}
    />
    <input
        type="email"
        placeholder="Email"
        name="email"
        value={registerData.email}
        onChange={handleRegisterChange}
    />
    <input
        type="text"
        placeholder="Phone Number"
        name="phoneNumber"
        value={registerData.phoneNumber}
        onChange={handleRegisterChange}
    />
    <input
        type="password"
        placeholder="Password"
        name="password"
        value={registerData.password}
        onChange={handleRegisterChange}
    />
    <button type="submit">Sign Up</button>
    {error && <p className="error-message">{error}</p>}
</form>
            </div>

            {/* Toggle panels */}
   <div className="toggle-container">
                <div className="toggle">
                   
                    <div className="toggle-panel toggle-right">
                      
                    <img src={company_icon} alt="Instagram" style={{ width: '240px', height: '240px' }} />

                    </div>
                    
                </div>
             

                    
            </div>
        </div>
        </>
    );
}



export default CompanyReg;