import React from 'react'
import Style from "./SearchSelect.module.css";
import { symptoms, initialSymptomState } from '@/lib/constant';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const SearchSelect = ({
    closeMenuOnSelect = false,
    options,
    isMulti = false,
    value,
    onChange,
    placeholder = "",
}) => {
    return (
        <Select
            closeMenuOnSelect={closeMenuOnSelect}
            components={animatedComponents}
            isMulti={isMulti}
            options={options}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            styles={{
                control: (baseStyles, state) => ({
                    ...baseStyles,
                    border: state.isFocused ? '1px solid #9c9c9c !important' : '1px solid #9c9c9c',
                    boxShadow: 'none',
                    borderRadius: '6px'
                }),
                menu: (baseStyles, state) => ({
                    ...baseStyles,
                    zIndex: '15'
                })
            }}
        />
    )
}

export default SearchSelect