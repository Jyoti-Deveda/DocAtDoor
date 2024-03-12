import CustomButton from '@/components/CustomButton/CustomButton'
import StyledInput from '@/components/inputs/StyledInput/StyledInput'
import { Delete } from '@mui/icons-material'
import React from 'react'

const AcademicDetailsBox = ({
    data,
    index,
    handleChange,
    onDelete
}) => {
    return (
        <div className='p-2 border-2 border-black-500 border-dashed rounded flex flex-col gap-4'>
            <div className={`flex justify-between items-start gap-6`}>
                <StyledInput
                    label='University Name'
                    size={"small"}
                    className='flex-1 sm:max-w-[70%]'
                    value={data.university_name}
                    name={`academic_details.${index}.university_name`}
                    onChange={handleChange}
                />
                {
                    index > 0 && <CustomButton
                        variant='contained'
                        color='danger'
                        iconButton
                        boxShadow={false}
                        size='small'
                        onClick={() => onDelete(index)}
                    >
                        <Delete fontSize='small' />
                    </CustomButton>
                }
            </div>

            <div className={`flex flex-col gap-1`}>
                <p className='text-sm'>Course and Certification</p>
                <div className={`grid sm:grid-cols-2 gap-4`}>
                    <StyledInput
                        placeholder='Course'
                        size={"small"}
                        value={data.course}
                        name={`academic_details.${index}.course`}
                        onChange={handleChange}
                    />
                    <StyledInput
                        size={"small"}
                        type='file'
                        value={data.certification}
                        name={`academic_details.${index}.certification`}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default AcademicDetailsBox