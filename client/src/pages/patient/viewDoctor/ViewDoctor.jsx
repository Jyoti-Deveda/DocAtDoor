import React, { useEffect, useState } from 'react';
import logo from '../../../assets/Logo/logo.png';
import ReactStars from 'react-rating-stars-component'
import { FaStar } from 'react-icons/fa';
import StatusChips from '@/components/Common/StatusChips/StatusChips';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SettingsFormContainer from '@/components/Common/settingsFormContainer/SettingsFormContainer';
import { Divider } from '@mui/material';
import BookAppointment from './BookAppointment/BookAppointment';
import { getDoctorDetails } from '@/services/Operations/doctor/getDoctorDetails';
import { useParams } from 'react-router-dom';

const ViewDoctor = () => {

    const { id } = useParams();

    const [doctorDetails, setDoctorDetails] = useState(null);




    return (
        <div className={`flex flex-col gap-4`}>

            <SettingsFormContainer>

                <div className={`flex gap-6`}>
                    <div className={`flex justify-center items-center`}>
                        <img
                            src={logo}
                            className={`w-48 h-48 rounded-xl border border-gray-300`}
                            alt=""
                        />
                    </div>
                    <div className={`flex flex-col gap-1`}>
                        <p className={`text-md sm:text-3xl text-gray-600 font-semibold`}>
                            Dr. Akshay Mundra
                        </p>
                        <p className={`text-sm sm:text-lg text-gray-500`}>
                            M.Y. Hospital Indore
                        </p>
                        <p className={`text-sm sm:text-lg text-gray-500`}>
                            3+ Years of Experiance
                        </p>
                        <div className={`flex gap-1 items-center`}>
                            <ReactStars
                                count={5}
                                value={5}
                                size={25}
                                activeColor="#ffd700"
                                edit={false}
                                emptyIcon={<FaStar />}
                                fullIcon={<FaStar />}
                            />
                            <p className={`text-sm text-gray-500`}>
                                ( 7 )
                            </p>
                        </div>
                        {/* status chip  */}
                        <StatusChips
                            rounded
                            status='Verified'
                            color='success'
                            startIcon={<VerifiedUserIcon fontSize='small' />}
                            noMargin
                        />
                    </div>
                </div>

                <Divider />

                {/* bio  */}
                <div className={`flex flex-col gap-1`}>
                    <p className={`text-md sm:text-lg text-gray-600 font-semibold`}>
                        Bio
                    </p>
                    <p className={`text-sm text-gray-500`}>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita, aspernatur? Consequuntur distinctio dignissimos quas dolorem assumenda eveniet, nesciunt dolorum harum sint, est vel nemo magni facilis iusto magnam aut accusamus beatae repellendus voluptatum quisquam neque consequatur. Adipisci qui molestias ullam illum, atque non sed magnam perferendis unde dicta dolor fugit?
                    </p>
                </div>

                <Divider />

                <div className={`flex flex-col gap-2`}>
                    <p className={`text-md sm:text-lg text-gray-600 font-semibold`}>
                        Specializations
                    </p>
                    <div className={`flex gap-2`}>
                        <StatusChips status='Pediatrics' noMargin rounded />
                        <StatusChips status='Pediatrics' noMargin rounded />
                        <StatusChips status='Pediatrics' noMargin rounded />
                        <StatusChips status='Pediatrics' noMargin rounded />
                    </div>
                </div>


            </SettingsFormContainer>

            <BookAppointment />

        </div>
    )
}

export default ViewDoctor