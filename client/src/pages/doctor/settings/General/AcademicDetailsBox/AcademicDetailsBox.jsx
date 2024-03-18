import CustomButton from '@/components/CustomButton/CustomButton'
import StyledInput from '@/components/inputs/StyledInput/StyledInput'
import { Delete } from '@mui/icons-material'
import React from 'react'

const AcademicDetailsBox = ({
    data,
    index,
    handleChange,
    onDelete,
    removeCertificate
}) => {

    return (
        <div className='p-2 border-2 border-black-500 border-dashed rounded flex flex-col gap-4'>
            <div className={`flex justify-between items-start gap-6`}>
                <StyledInput
                    label='University Name'
                    size={"small"}
                    className='flex-1 sm:max-w-[70%]'
                    value={data?.university_name}
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
                <div className={`grid sm:grid-cols-2 gap-6 items-center`}>
                    <StyledInput
                        placeholder='Course'
                        size={"small"}
                        value={data?.course}
                        name={`academic_details.${index}.course`}
                        onChange={handleChange}
                    />
                    {!data?.certification ?
                        <div className='flex justify-center flex-1'>
                            <label htmlFor={`certification-${index}-doc`}>
                                <CustomButton
                                    variant='underline'
                                    color='primary'
                                    boxShadow={false}
                                    onClick={() => document.getElementById(`certification-${index}-doc`).click()}
                                >
                                    Upload Certificate
                                </CustomButton>
                            </label>
                            <input
                                type="file"
                                id={`certification-${index}-doc`}
                                style={{ display: 'none' }}
                                name={`academic_details.${index}.certification`}
                                onChange={e => handleChange(e, "file")}
                            />
                        </div>
                        :
                        <div className={`flex gap-2 flex-1 justify-center border-2 border-dashed border-gray-200 p-1`}>
                            {/* <span>{data?.certification?.name}</span> */}
                            <span>{data?.certification}</span>
                            <CustomButton
                                iconButton
                                boxShadow={false}
                                size='small'
                                color='danger'
                                variant='text'
                                onClick={() => removeCertificate(index)}
                            >
                                <Delete fontSize='small' />
                            </CustomButton>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default AcademicDetailsBox