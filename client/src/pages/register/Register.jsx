import { useState, useEffect } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { register, reset } from "../../features/auth/authSlice";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Register = () => {
    // Hide and Show Password
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const { name, email, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isError, isLoading, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    // Password Icon-show-hide 
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        if (isError) {
            toast.error(message);
            console.log(message)
        }

        if (isSuccess || user) {
            navigate('/login')
        }

        dispatch(reset())

    }, [dispatch, isError, isSuccess, message, navigate, user]);

    const onChange = (e) => {

        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    // console.log(formData)

    // ON SUBMIT
    const onSubmit = (e) => {
        e.preventDefault();

        // Validate all fields
        if (!name || !email || !password) {
            toast.error("Veuillez remplir tous les champs !");
        }

        // Validate name
        if (!name || name.length < 2) {
            toast.error("Le Nom doit comporter au moins 2 caractères")
            return
        }

        // Validate email
        if (!email) {
            toast.error(message)
            return
        }

        // Validate password
        if (!password || password.length < 6) {
            toast.error("Le mot de passe doit comporter au moins 6 caractères")
            return
        }

        const userData = {
            name, email, password
        }

        dispatch(register(userData))
    }

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <div className='register'>
            <div className="card">
                {/* Left */}
                <div className="left">
                    <h1>Degouga Social</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, magni dicta? Quisquam omnis illum asperiores fugiat voluptates repellat assumenda ex. Sit et error qui beatae vel amet, voluptatibus alias voluptas.
                    </p>
                    <span>Do you have an account ?</span>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>

                {/* Right */}
                <div className="right">
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center" }}>
                        <h1>Register</h1>
                        <AccountCircleRoundedIcon className="icon" />
                    </div>

                    <form onSubmit={onSubmit}>
                        <TextField
                            id="outlined-basic"
                            label="Name"
                            color="common"
                            variant="outlined"
                            className="input"
                            type="text"
                            onChange={onChange}
                            value={name}
                            name="name"
                        />

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

                        <FormControl
                            variant="outlined"
                            className="input"
                            color="common"
                        >
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end" >
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                onChange={onChange}
                                value={password}
                                name="password"
                            />
                        </FormControl>

                        <button className="btn-register" type="submit">Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;