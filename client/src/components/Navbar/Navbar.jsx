import React , {useEffect} from "react";
import { useSelector , useDispatch} from 'react-redux';
import { Link , useNavigate} from "react-router-dom";
import logo from "../../assets/logo.png";
import search from '../../assets/search-solid.svg';
import Avatar from "../Avatar/Avatar";
import './Navbar.css';
import { setCurrentUser } from "../../actions/currentUser";
import decode from 'jwt-decode';

const Navbar = () =>{
    var User = useSelector((state) => (state.currentUserReducer));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () =>{
        dispatch({type : 'LOGOUT'});
        navigate('/')
        dispatch(setCurrentUser(null))
    }

    useEffect(() => {
        const token = User?.token;
        if(token){
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()){
                handleLogout();
            }
        }
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
    },[User?.token , dispatch]);

    return(
        <nav className="main-nav">
            <div className="navbar">
                <Link to = "/" className =  "nav-items nav-logo">
                    <img 
                        src = {logo} alt = "logo"
                    />
                </Link>
                <Link to = "/" className = "nav-items nav-btn" >About</Link>
                <Link to = "/" className = "nav-items nav-btn">Products</Link>
                <Link to = "/" className = "nav-items nav-btn">For Teams</Link>

                <form>
                    <input
                        type = 'text'
                        placeholder="Search"
                    />
                    <img src = {search} alt = "Search" width = "18" className="search-icon"
                    />
                </form>

                {User === null ? 
                <Link to = '/Auth' className="nav-items nav-links">Login</Link> : 
                <> 
                    <Avatar
                        backgroundColor= '#009dff'
                        px = "10px" py = "7px" borderRadius= "50%" color = "white" 
                    >
                        <Link to = {`/Users/${User?.message?._id}`} style = {{color : "white" ,textDecoration: "none"}}>
                        {User?.message?.name.charAt(0).toUpperCase()}</Link></Avatar>
                    <button className="nav-items nav-links" onClick={handleLogout}>Log out</button>
                </>
                }
            </div>
        </nav>
    )
}

export default Navbar;