import React, { useState } from 'react'
import { roles } from '@/lib/constant'
import StyledInput from '@/components/inputs/StyledInput/StyledInput'
import CustomButton from '@/components/CustomButton/CustomButton'
import { register } from '@/services/auth'
import { useNavigate } from 'react-router-dom'

const RegistrationForm = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("")

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmpass: "",
        role: "",
    })
    const handleChange = (e) => {
        const { name, value } = e.target;

        setData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    // handle registration 
    const handleClick = async (e) => {
        e.preventDefault();

        const res = await register(data);

        if (res && res.user) {
            console.log("Registration successfull");
            navigate('/login');
            setError("");
        }
        else {
            setError(res.message);
            console.log(res.message);
        }

    }

    return (
        <div className={`flex w-full sm:w-[50%] bg-sky-50 flex-col gap-8 bg-white rounded p-6`}>

            <div className={`grid grid-cols-2 items-center gap-6`}>
                <StyledInput
                    onChange={handleChange}
                    value={data.firstName}
                    name='firstName'
                    size={"small"}
                    label='First Name'
                    type='text'
                />
                <StyledInput
                    onChange={handleChange}
                    value={data.lastName}
                    name='lastName'
                    size={"small"}
                    label='Last Name'
                    type='text'
                />
            </div>

            <div className={`grid grid-cols-2 items-center gap-6`}>
                <StyledInput
                    onChange={handleChange}
                    value={data.email}
                    name='email'
                    size={'small'}
                    label='Email'
                    type='email'
                />
                <StyledInput
                    select
                    onChange={handleChange}
                    value={data.role}
                    options={roles}
                    label='Select Role'
                    name='role'
                    size={"small"}
                />
            </div>
            <StyledInput
                onChange={handleChange}
                value={data.password}
                name='password'
                size={'small'}
                label='Password'
                type='password'
            />
            <StyledInput
                onChange={handleChange}
                value={data.confirmpass}
                name='confirmpass'
                size={'small'}
                label='Confirm Password'
                type='password'
            />

            {error &&
                <div className={`text-red-600 text-xs`}>
                    {error}
                </div>
            }

            <div>
                <CustomButton
                    variant='contained'
                    color='primary'
                    rounded
                    onClick={handleClick}
                    disabled={!data.firstName || !data.email || !data.lastName || !data.confirmpass || !data.password || !data.role}
                >
                    Register
                </CustomButton>
            </div>


        </div>
    )
}

export default RegistrationForm