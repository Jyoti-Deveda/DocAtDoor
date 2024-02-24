import Container from '@/components/Common/Container/Container'
import React from 'react'

const QuoteBox = () => {
    return (
        <>
            <Container
                className={'bg-sky-600 lg:h-[200px] min-h-max lg:text-4xl text-3xl text-center flex items-center justify-center  py-8 px-2'}
            >
                <p className='w-[90%] text-sky-100 font-medium leading-normal'>
                    Your <span className='text-pink-700'> health </span>
                    and <span className='text-pink-700'> well-being </span>
                    are our <span className='text-yellow-400'> top priorities </span>,
                    and we're here to <span className='text-yellow-400'>support</span> you on your  <span className='text-pink-700'>healthcare journey</span>
                </p>
            </Container>
        </>
    )
}

export default QuoteBox