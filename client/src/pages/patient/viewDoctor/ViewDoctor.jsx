import React, { useEffect, useState } from 'react';
import logo from '../../../assets/Logo/logo.png';
import ReactStars from 'react-rating-stars-component'
import { FaStar } from 'react-icons/fa';
import StatusChips from '@/components/Common/StatusChips/StatusChips';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SettingsFormContainer from '@/components/Common/settingsFormContainer/SettingsFormContainer';
import { Divider } from '@mui/material';
import BookAppointment from './BookAppointment/BookAppointment';
import { useParams } from 'react-router-dom';
import { getDocById } from '@/services/Operations/patient/getDocById';
import Loading from '@/components/Common/Loading/Loading';

const ViewDoctor = () => {

    const { id } = useParams();

    const [doctorDetails, setDoctorDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            setLoading(true);
            getDocById(id)
                .then(res => {
                    if (!res.error) {
                        setDoctorDetails(res.doctorsData);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, []);

    if (loading) return <Loading />


    return (
        <>
            {doctorDetails &&

                <div className={`flex flex-col gap-4`}>

                    <SettingsFormContainer>

                        <div className={`flex gap-6`}>
                            <div className={` w-48 h-48 flex justify-center items-center`}>
                                <img
                                    src={doctorDetails?.image}
                                    className={`rounded-xl border border-gray-300`}
                                    alt=""
                                />
                            </div>
                            <div className={`flex flex-col gap-1`}>
                                <p className={`text-md sm:text-3xl text-gray-600 font-semibold`}>
                                    {doctorDetails?.first_name} {doctorDetails?.last_name}
                                </p>
                                <p className={`text-sm sm:text-lg text-gray-500`}>
                                    {doctorDetails?.hospital_details.name}
                                </p>
                                <p className={`text-sm sm:text-lg text-gray-500`}>
                                    3+ Years of Experiance
                                </p>
                                <div className={`flex gap-1 items-center`}>
                                    <ReactStars
                                        count={5}
                                        value={doctorDetails?.rating?.value}
                                        size={25}
                                        activeColor="#ffd700"
                                        edit={false}
                                        emptyIcon={<FaStar />}
                                        fullIcon={<FaStar />}
                                    />
                                    <p className={`text-sm text-gray-500`}>
                                        ( {doctorDetails?.rating?.count} )
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
                                {doctorDetails?.bio}
                            </p>
                        </div>

                        <Divider />

                        <div className={`flex flex-col gap-2`}>
                            <p className={`text-md sm:text-lg text-gray-600 font-semibold`}>
                                Specializations
                            </p>
                            <div className={`flex gap-2`}>
                                {doctorDetails?.specialization?.map((spec, index) => (
                                    <StatusChips
                                        key={index}
                                        status={spec}
                                        noMargin
                                        rounded />
                                ))}
                            </div>
                        </div>


                    </SettingsFormContainer>

                    <BookAppointment
                        doctorDetails={doctorDetails}
                        doctorId={id}
                    />

                </div>
            }
        </>
    )
}

export default ViewDoctor