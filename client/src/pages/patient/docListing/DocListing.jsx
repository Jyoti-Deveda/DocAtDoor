import DocCard from '@/components/docsComp/DocCard/DocCard'
import React, { useContext, useEffect, useState } from 'react'
import DocList from './DocList/DocList'
import StyledInput from '@/components/inputs/StyledInput/StyledInput';
import CustomButton from '@/components/CustomButton/CustomButton';
import { Search } from '@mui/icons-material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { DocListContext } from '@/globalStates/DocListProvider';
import { useLocation } from 'react-router-dom';
import { getListFromDiseases } from '@/services/Operations/patient/getListFromDiseases';

const DocListing = () => {
    const docListManage = useContext(DocListContext);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const diseases = searchParams.get('diseases').split(',');
    const [doctorList, setDoctorList] = useState([]);

    useEffect(() => {

        if (docListManage.docList.length > 0) return;
        else {
            ; (async () => {
                const res = await getListFromDiseases(diseases);
                if (res.error) {
                    console.log(res.message);
                } else {
                    setDoctorList(res.doctorList);
                }
            })();
        }

    }, [docListManage.docList])


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

            {docListManage?.docList.length > 0 ? <DocList /> : "No Doctors Found"}
        </div>
    )
}

export default DocListing