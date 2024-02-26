import CustomButton from '@/components/CustomButton/CustomButton';
import StyledInput from '@/components/inputs/StyledInput/StyledInput';
import React, { useState, useEffect } from 'react'
import Style from "./Login.module.css";
import { login } from '@/services/auth';
import SectionHeading from '@/components/Headings/SectionHeading/SectionHeading';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState(null);


    const handleSubmit = async () => {
        if (!email || !password) {
            setError("All Fields are required");
            return;
        }
        const data = { email, password };
        const res = await login(data);
        if (res && res.token) {
            // set token, user data to cookies 
        }
        else {
            console.log(res.message);
        }
    }

    const handlePasswordVisibility = (e) => {
        setShowPass(state => !state);
    }

    return (
        <div className={Style.container}>
            <div className={`shadow-xl p-6 rounded-xl ${Style.form}`}>
                <SectionHeading
                    title='Login'
                    className={`text-4xl`}
                />
                <StyledInput
                    label='Email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    name='email'
                    size="small"
                    type='email'
                />

                <StyledInput
                    label='Password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    name='password'
                    size="small"
                    type={showPass ? 'text' : 'password'}
                    endAdornment={
                        <IconButton
                            onClick={handlePasswordVisibility}
                            size='small'
                        >
                            {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                    }
                />

                {error && <p>{error}</p>}

                <div className={`grid grid-cols-2 gap-2 items-center`}>
                    <CustomButton
                        variant='text-primary'
                        onClick={() => navigate('/register')}
                        size='small'
                        boxShadow={false}
                    >
                        Sign Up
                    </CustomButton>
                    <CustomButton
                        variant='contained'
                        color='primary'
                        onClick={handleSubmit}
                        size='small'
                    >
                        Login
                    </CustomButton>

                </div>

            </div>
        </div>
    )
}

export default Login