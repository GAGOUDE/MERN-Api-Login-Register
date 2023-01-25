import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import './home.scss';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { reset } from '../../features/auth/authSlice';
import Header from '../../components/Header/Header';

function Home() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isError, isLoading, message } = useSelector((state) => state.auth);

    useEffect(() => {

        if (isError) {
            console.log(message)
        }

        if (!user) {
            navigate('/register')
        }

        return () => {
            dispatch(reset());
        }
    }, [dispatch, isError, message, navigate, user])

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <div className='home'>
            <Header />

            <div className='wrapper'>
                <img src="https://images.pexels.com/photos/5439381/pexels-photo-5439381.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1" alt="image" />
            </div>
        </div>
    );
}

export default Home;
