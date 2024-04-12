import React from 'react';
import Style from "./DocCard.module.css";
import logo from '../../../assets/Logo/logo.png';
import CustomButton from '@/components/CustomButton/CustomButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ReactStars from 'react-rating-stars-component'
import { FaStar } from 'react-icons/fa';
import { getExp, getSpecializationString } from '@/util/helpers';
import { useNavigate, useLocation } from 'react-router-dom'


const DocCard = ({
    data
}) => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const diseases = searchParams.get('diseases').split(',');

    const navigate = useNavigate();

    // console.log(data);

    const handleClick = () => {
        const diseaseListString = diseases.join(',');
        if (data?._id) {
            navigate(`/search-doctor/doctor/${data._id}${diseaseListString && `?diseases=${diseaseListString}`}`)
        }
    }

    return (
        <>
            {data &&
                <div
                    onClick={handleClick}
                    className={`${Style.container} flex-1`}
                >

                    <div className={`flex gap-6 flex-1 items-center p-3`}>
                        {/* profile picture  */}
                        <div className={`flex items-center justify-center`}>
                            <div className={`w-28 h-28 border border-gray-500 rounded-full`}>
                                <img
                                    src={data?.image ? data?.image : logo}
                                    alt="name"
                                    className={`rounded-full`}
                                />
                            </div>
                        </div>

                        {/* details  */}
                        <div className={`flex flex-col`}>
                            <p className={`text-sm sm:text-lg text-gray-600 font-semibold`}>
                                {data?.personalDetails?.firstName}{' '}{data?.personalDetails?.lastName}
                            </p>
                            <p className={`text-sm text-gray-500 max-w-44 overflow-hidden text-ellipsis text-nowrap`}>
                                {getSpecializationString(data?.doctorsProfile?.specialization)}
                            </p>
                            <p className={`text-sm md:text-md text-gray-500`}>
                                {getExp(data?.doctorsProfile?.experience)}{' '}of experience
                            </p>
                            <div className={`mt-2 flex gap-1 items-center`}>
                                <ReactStars
                                    count={5}
                                    value={data?.doctorsProfile?.rating?.value}
                                    size={20}
                                    activeColor="#ffd700"
                                    edit={false}
                                    emptyIcon={<FaStar />}
                                    fullIcon={<FaStar />}
                                />
                                <p className={`text-sm text-gray-500`}>
                                    ({data?.doctorsProfile?.rating?.count})
                                </p>
                            </div>


                            {/* state chips here if required  */}

                        </div>
                    </div>

                    <div className={`flex items-stretch`}>
                        <CustomButton
                            variant='text-primary'
                            boxShadow={false}
                            className={`p-1`}
                        >
                            <ArrowForwardIcon />
                        </CustomButton>
                    </div>


                </div>
            }
        </>
    )
}

export default DocCard