import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField, MenuItem, Checkbox, Switch, Radio, FormControlLabel, RadioGroup } from '@mui/material';

const Field = ({ id, type, alias, control, value, error, rules, element_options }) => {

    if (type === 'hidden') {
        return ( <input type="hidden" name={id} value={value} />
        );
    } 
    else if (type === 'separator' ) {
        return (
            <div className='md:col-span-2 py-5 bg-red font-bold cursor-default' id="scroll-dialog-title">{alias}</div>
        );
    } else if (type === 'select') {
        return (
            <div key={id} className="mb-2">
                <label className="block text-secondary-150 text-sm font-bold mb-1" htmlFor={id}>
                    {alias ? alias : id}
                </label>
                <Controller
                    name={id}
                    control={control}
                    defaultValue={value ? value : '0'}
                    render={({ field }) => (
                        <TextField
                            select
                            {...field}
                            variant="outlined"
                            fullWidth
                        >
                            <MenuItem key={id} value="0" >
                                seleccione ...
                            </MenuItem>
                            {element_options.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                    rules={rules}
                />
            </div>
        );
    } else if (type === 'checkbox') {
        return (
            <div key={id} className="mb-2">
                <label className="block text-secondary-150 text-sm font-bold mb-1">
                    <Controller
                        name={id}
                        control={control}
                        defaultValue={value || false}
                        render={({ field }) => <Checkbox {...field} color="primary" />}
                    />
                    {alias ? alias : id}
                </label>
            </div>
        );
    } else if (type === 'switch') {
        return (
            <div key={id} className="mb-2">
                <label className="block text-secondary-150 text-sm font-bold mb-1">
                    <Controller
                        name={id}
                        control={control}
                        defaultValue={value}
                        render={({ field }) => <Switch {...field} color="primary" />}
                    />
                    {alias ? alias : id}
                </label>
            </div>
        );
    } else if (type === 'radio') {
        return (
            <div key={id} className="mb-2">
                <label className="block text-secondary-150 text-sm font-bold mb-1" htmlFor={id}>
                    {alias ? alias : id}
                </label>
                <Controller
                    name={id}
                    control={control}
                    defaultValue={value}
                    render={({ field }) => (
                        <RadioGroup {...field}>
                            {element_options.map((option, index) => (
                                <FormControlLabel key={index} value={option.value} control={<Radio />} label={option.label} />
                            ))}
                        </RadioGroup>
                    )}
                    rules={rules}
                />
            </div>
        );
    } else {
        return (
            <div key={id} className="mb-2">
                <label className="block text-secondary-150 text-sm font-bold mb-1" htmlFor={id}>
                    {alias ? alias : id}
                </label>
                <Controller
                    name={id}
                    control={control}
                    defaultValue={value}
                    render={({ field }) => (
                        <TextField
                            type={type}
                            {...field}
                            variant="outlined"
                            fullWidth
                            error={!!error[id]}
                            helperText={error[id]?.message || ''}
                        />
                    )}
                    rules={rules}
                />
            </div>
        );
    }
};

export default Field;