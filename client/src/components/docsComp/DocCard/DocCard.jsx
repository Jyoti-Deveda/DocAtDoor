import React from 'react';
import Style from "./DocCard.module.css";
import logo from '../../../assets/Logo/logo.png';
import CustomButton from '@/components/CustomButton/CustomButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ReactStars from 'react-rating-stars-component'
import { FaStar } from 'react-icons/fa';


const DocCard = ({
    data
}) => {
    return (
        <div
            // whole card is clickable 
            onClick={() => ""}
            className={`${Style.container}`
            }>

            <div className={`flex gap-6  p-3`}>
                {/* profile picture  */}
                <div className={`flex items-center justify-center`}>
                    <div className={`border border-gray-500 rounded-full`}>
                        <img
                            src={logo}
                            alt="name"
                            className={`w-28 h-28 rounded-full`}
                        />
                    </div>
                </div>

                {/* details  */}
                <div className={`flex flex-col`}>
                    <p className={`text-sm sm:text-lg text-gray-600 font-semibold`}>
                        Dr. Jyoti
                    </p>
                    <p className={`text-sm text-gray-500`}>
                        Neurologist
                    </p>
                    <p className={`text-sm md:text-md text-gray-500`}>
                        3+ Years of Experiance
                    </p>
                    <div className={`mt-2 flex gap-1 items-center`}>
                        <ReactStars
                            count={5}
                            value={4}
                            size={20}
                            activeColor="#ffd700"
                            edit={false}
                            emptyIcon={<FaStar />}
                            fullIcon={<FaStar />}
                        />
                        <p className={`text-sm text-gray-500`}>
                            (21)
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
    )
}

export default DocCard