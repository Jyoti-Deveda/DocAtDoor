import React from 'react'
import Style from "./StyledInput.module.css";
import { FormControl, Input, InputAdornment, InputLabel, MenuItem, OutlinedInput, TextField } from '@mui/material';
import classNames from 'classnames';


const StyledInput = ({
    label = '',
    name = '',
    value = '',
    onChange,
    placeholder = '',
    id = '',
    type = 'text',
    param = [],
    variant = 'outlined',
    className = '',
    disabled = false,
    multiline = false,
    maxRows = 3,
    minRows = 1,
    select = false,
    options = [],
    rounded = false,
    background = 'default',
    style,
    size,
    startAdornment,
    endAdornment,
}) => {

    const inputClas = classNames(Style.input, {
        [Style.rounded]: rounded,
        [Style.bg_white]: background === 'white',
    })


    return (
        <TextField
            variant={variant}
            name={name}
            value={value}
            onChange={(e) => onChange(e, ...param)}
            label={label}
            placeholder={placeholder}
            id={id}
            type={type}
            className={`${inputClas} ${className}`}
            disabled={disabled}
            multiline={multiline}
            maxRows={maxRows}
            minRows={minRows}
            select={select}
            style={style}
            size={size}
            InputProps={{
                startAdornment: startAdornment && (
                    <InputAdornment position='start'>{startAdornment}</InputAdornment>
                ),
                endAdornment: endAdornment && (
                    <InputAdornment position='end'>{endAdornment}</InputAdornment>
                ),
            }}
        >
            {select && options?.map((item, index) => (
                <MenuItem key={index} value={item?.value}>{item?.label}</MenuItem>
            ))}
        </TextField>

    )
}

export default StyledInput