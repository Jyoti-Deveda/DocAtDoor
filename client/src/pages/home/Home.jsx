import React from 'react'
import Style from "./Home.module.css";
import CustomButton from '@/components/CustomButton/CustomButton';

const Home = () => {
    return (
        <div className={Style.outer_container}>
            <div>
                <CustomButton
                    color='primary'
                    variant='contained'
                >
                    Hello
                </CustomButton>
            </div>
        </div>
    )
}

export default Home