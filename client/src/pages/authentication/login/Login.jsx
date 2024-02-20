import CustomButton from '@/components/CustomButton/CustomButton';
import StyledInput from '@/components/inputs/StyledInput/StyledInput';
import React, { useState, useEffect } from 'react'
import Style from "./Login.module.css";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(null);


    const handleSubmit = () => {
        if (!email || !password) {
            setError("All Fields are required");
            return;
        }

        // process authentication here 
    }

    return (
        <div className={Style.container}>
            <div className={Style.form}>
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
                    type='password'
                />

                {error && <p>{error}</p>}

                <CustomButton
                    variant='contained'
                    color='primary'
                    onClick={handleSubmit}

                >
                    Login
                </CustomButton>

            </div>
        </div>
    )
}

export default Login