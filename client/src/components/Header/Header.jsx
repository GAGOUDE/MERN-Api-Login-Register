import React, { useContext } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
import './header.scss';
import { DarkModeContext } from '../../context/darkModContext';
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";

const Header = () => {
    const { toggle, darkMode } = useContext(DarkModeContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const onLogOut = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/login')
    }

    return (
        <header className='header'>
            <div className="logo">
                <Link to='/'>
                    <h4>Welcome {user && user.name} </h4>
                </Link>
            </div>

            <button className='btn' onClick={onLogOut}>
                <FaSignOutAlt className='icon-logout' /> Logout
            </button>

            {/* Icon Dark Mode */}
            {darkMode ? (
                <WbSunnyOutlinedIcon className="icon-mode" onClick={toggle} />
            ) : (
                <DarkModeOutlinedIcon className="icon-mode" onClick={toggle} />
            )}

        </header>
    )
}

export default Header;