import { Checkbox, MenuItem, Radio, Switch, TextField,DialogTitle } from '@mui/material';
import React, { useEffect } from 'react'
import { Controller } from 'react-hook-form';

const Field = (
    {
        id,
        type,
        alias,
        value='',
        element_options = [],
        required=false,
        validation=false,
        control,
        errors
    }
    ) => {
    // console.log(id,type,alias,validation)
    // return null;
    // const fieldName = field;
    // const emit = element.emit ? element.emit : false;

    const handleInputChange = (id) => (event) => id.onChange(event);

    const renderTextField = ( rules = {}) => {
        // const error = errors[id];
        const error = '';
        return (
            <div key={id} className="mb-2">
                <label className="block text-secondary-150 text-sm font-bold mb-1" htmlFor={id}>
                    {alias ? alias : id }
                </label>
                <Controller
                    name={id}
                    control={control}
                    defaultValue={value}
                    render={({ id }) => (
                        <TextField
                            type={type}
                            {...id}
                            variant="outlined"
                            fullWidth
                            error={!!error} // Setea el error en true cuando error existe
                            helperText={error?.message || ''} // Muestra el mensaje de error si existe, de lo contrario, muestra una cadena vacía
                        />
                    )}
                    rules={rules}
                />
            </div>
        );
    };
    if(type==='separator'){
        return (
        <div className='md:col-span-2 py-5 bg-red font-bold	cursor-default' id="scroll-dialog-title">{alias}</div>
        );
    }
    else if (type === 'select') {
        return (
            <div key={id} className="mb-2">
                <label className="block text-secondary-150 text-sm font-bold mb-1" htmlFor={id}>
                    {alias ? alias : id}
                </label>
                <Controller
                    name={id}
                    control={control}
                    // defaultValue={value}
                    render={({ id }) => (
                        <TextField
                            select
                            {...id}
                            variant="outlined"
                            fullWidth
                            onChange={
                                handleInputChange(id)
                            }
                        >
                            <MenuItem key={id} value="">
                                    seleccione ...
                                </MenuItem>
                            { element_options.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                                ))
                            }
                        </TextField>
                    )}
                />
                {/* {errors[id] && (
                    <p className="text-red-500 text-xs mt-1">Campo requerido</p>
                )} */}
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
                        render={({ id }) => <Checkbox {...id} color="primary" />}
                    />
                    {alias ? alias : id}
                </label>
            </div>
        );
    } else if (type === 'radio') {
        // const radioOptions = Array.isArray(element.options) ? element.options : [];
        return (
            <div key={id} className="mb-2">
                <label className="block text-secondary-150 text-sm font-bold mb-1">
                    {alias ? alias : id}
                </label>
                {element_options.map((option) => (
                    <label key={option.value} className="block text-secondary-150 text-sm mb-1">
                        <Controller
                            name={id}
                            control={control}
                            defaultValue={value}
                            render={({ id }) => (
                                <Radio
                                    {...id}
                                    value={option.value}
                                    color="primary"
                                    checked={value === option.value}
                                />
                            )}
                        />
                        {option.label}
                    </label>
                ))}
                {/* {errors[id] && (
                    <p className="text-red-500 text-xs mt-1">Campo requerido</p>
                )} */}
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
                        render={({ id }) => <Switch {...id} color="primary" />}
                    />
                    {alias ? alias : id}
                </label>
            </div>
        );
    } else if (type === 'date') {
        return (
            <div key={id} className="mb-2">
                <label className="block text-secondary-150 text-sm font-bold mb-1">
                    {alias ? alias : id}
                </label>
                <Controller
                    name={id}
                    control={control}
                    defaultValue={value}
                    render={({ id }) => (
                        <TextField
                            {...id}
                            type="date"
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            className={`${errors[id] ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                            error={!!errors[id]} // Setea el error en true cuando error existe
                            helperText={errors[id]?.message || ''}
                        />
                    )}
                    rules={required ? { required: 'Campo requerido' } : {}}
                />
                {/* {errors[id] && (
              <p className="text-red-500 text-xs mt-1">Campo requerido</p>
            )} */}
            </div>
        );
    } else if (type === 'time') {
        return (
            <div key={id} className="mb-2">
                <label className="block text-secondary-150 text-sm font-bold mb-1">
                    {alias ? alias : id}
                </label>
                <Controller
                    name={id}
                    control={control}
                    defaultValue={value}
                    render={({ id }) => (
                        <TextField
                            {...id}
                            type="time"
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            className={`${errors[id] ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                            error={!!errors[id]} // Setea el error en true cuando error existe
                            helperText={errors[id]?.message || ''}
                        />
                    )}
                    rules={required ? { required: 'Campo requerido' } : {}}
                />
            </div>
        );
    } else if (type === 'hidden') {
        return (
            <>
                <input type="hidden" value={value} />
            </>
        )
    
    } else if (type === 'email') {
        // Usa renderTextField para renderizar el campo de email
        const rules = {
            required: required ? 'correo requerido' : false,
            pattern: { value: /^\S+@\S+$/i, message: 'El e-mail no es valido' }
        }
        return (
            renderTextField( rules)
        );
    } else {
        // Por defecto, mostrar un campo de texto
        // Usa renderTextField para renderizar el campo de texto
        return (
            renderTextField( { required: required ? 'Campo requerido' : false})
        );
    }
}

export default Field;