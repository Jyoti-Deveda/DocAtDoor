import CustomButton from '@/components/CustomButton/CustomButton'
import { logout } from '@/services/Operations/auth';
import Cookies from 'js-cookie';
import React from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const LogoutButton = ({ ...rest }) => {

  const navigate = useNavigate();

  return (
    <CustomButton
      onClick={() => logout(navigate)}
      variant='contained'
      color='primary'
      {...rest}
    >
      Logout
    </CustomButton>
  )
}
