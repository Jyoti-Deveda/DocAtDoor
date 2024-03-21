import DocCard from '@/components/docsComp/DocCard/DocCard'
import React from 'react'
import DocList from './DocList/DocList'
import StyledInput from '@/components/inputs/StyledInput/StyledInput';
import CustomButton from '@/components/CustomButton/CustomButton';
import { Search } from '@mui/icons-material';
import FilterListIcon from '@mui/icons-material/FilterList';

const DocListing = () => {
    const name = "HEllo this is data";


    return (
        <div className={`flex flex-col gap-6`}>

            <div className={`rounded-2xl shadow p-4 flex gap-4`}>
                <StyledInput
                    size={'small'}
                    label='Search'
                    placeholder='Search by - name, specialization, etc'
                    // style={{ flex: '1' }}
                    className='flex-1'
                />

                <CustomButton
                    iconButton
                    // boxShadow={false}
                    variant='contained'
                    color='primary'
                    className={`p-2`}
                >
                    <Search />
                </CustomButton>

                <CustomButton
                    iconButton
                    variant='text-primary'
                    className={`p-2`}
                >
                    <FilterListIcon />
                </CustomButton>

            </div>

            <DocList />
        </div>
    )
}

export default DocListing