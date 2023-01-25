import { useState, useEffect } from "react";
import { CircularProgress, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import LoginIcon from '@mui/icons-material/Login';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login, reset } from "../../features/auth/authSlice";
import { Box } from "@mui/system";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const { email, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            navigate('/')
        }

        if (!user) {
            navigate('/login')
        }

        dispatch(reset())

    }, [dispatch, isError, isSuccess, message, navigate, user])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        // Validate all fields
        if (!email || !password) {
            toast.error("Veuillez remplir tous les champs !");
        }

        const userData = {
            email, password
        }

        dispatch(login(userData))
    }

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <div className='login'>
            <div className="card">
                {/* Left */}
                <div className="left">

                    <h1>Hello World</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, magni dicta? Quisquam omnis illum asperiores fugiat voluptates repellat assumenda ex. Sit et error qui beatae vel amet, voluptatibus alias voluptas.
                    </p>
                    <span>Don't you have an account ?</span>

                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                </div>

                {/* Right */}
                <div className="right">
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center" }}>
                        <h1>Login</h1>
                        <LoginIcon className="icon" />
                    </div>

                    <form onSubmit={onSubmit}>
                        <TextField
                            id="outlined-basic"
                            label="Email"
                            color="common"
                            variant="outlined"
                            className="input"
                            type="email"
                            onChange={onChange}
                            value={email}
                            name="email"
                        />
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            color="success"
                            type="password"
                            autoComplete="current-password"
                            className="input"
                            onChange={onChange}
                            value={password}
                            name="password"
                        />
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;