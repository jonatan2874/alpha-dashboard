import { Checkbox, MenuItem, Radio, Switch, TextField } from '@mui/material';
import React, { useEffect } from 'react'
import { Controller } from 'react-hook-form';

const FormFields = ({ handleOptionsApi, optionsApi = {}, element, field, errors, control, formData }) => {

    const fieldName = field;
    const emit = element.emit ? element.emit : false;

    /**
     * | Permite realizar el cambio en el input y en caso de ser un sender
     * | se envía a una función en el padre que permite campturar el id y
     * | ejecutar el endpoint para traer las nuevas opciones.
     */
    const handleSender = (field) => (event) => {

        console.log(field);

        const { target: { value, name } } = event;

        field.onChange(event);
        handleOptionsApi(value, element.endpoint, emit);
    };

    const handleInputChange = (field) => (event) => field.onChange(event);

    const renderTextField = (type, field, label, rules = {}) => {
        const error = errors[field];
        return (
            <div key={field} className="mb-2">
                <label className="block text-secondary-150 text-sm font-bold mb-1" htmlFor={field}>
                    {label}
                </label>
                <Controller
                    name={field}
                    control={control}
                    defaultValue={formData[field] || ''}
                    render={({ field }) => (
                        <TextField
                            type={type}
                            {...field}
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

    if (element.type === 'select') {
        return (
            <div key={field} className="mb-2">
                <label className="block text-secondary-150 text-sm font-bold mb-1" htmlFor={field}>
                    {element.alias ? element.alias : field}
                </label>
                <Controller
                    name={field}
                    control={control}
                    defaultValue={formData[field] || ''}
                    render={({ field }) => (
                        <TextField
                            select
                            {...field}
                            variant="outlined"
                            fullWidth
                            onChange={
                                emit
                                    ? handleSender(field)
                                    : handleInputChange(field)
                            }
                        >
                            {
                                optionsApi[fieldName] !== undefined
                                    ? optionsApi[fieldName].map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))
                                    : element.options.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))
                            }
                        </TextField>
                    )}
                />
                {errors[field] && (
                    <p className="text-red-500 text-xs mt-1">Campo requerido</p>
                )}
            </div>
        );
    } else if (element.type === 'checkbox') {
        return (
            <div key={field} className="mb-2">
                <label className="block text-secondary-150 text-sm font-bold mb-1">
                    <Controller
                        name={field}
                        control={control}
                        defaultValue={formData[field] || false}
                        render={({ field }) => <Checkbox {...field} color="primary" />}
                    />
                    {element.alias ? element.alias : field}
                </label>
            </div>
        );
    } else if (element.type === 'radio') {
        const radioOptions = Array.isArray(element.options) ? element.options : [];
        return (
            <div key={field} className="mb-2">
                <label className="block text-secondary-150 text-sm font-bold mb-1">
                    {element.alias ? element.alias : field}
                </label>
                {radioOptions.map((option) => (
                    <label key={option.value} className="block text-secondary-150 text-sm mb-1">
                        <Controller
                            name={field}
                            control={control}
                            defaultValue={formData[field] || ''}
                            render={({ field }) => (
                                <Radio
                                    {...field}
                                    value={option.value}
                                    color="primary"
                                    checked={field.value === option.value}
                                />
                            )}
                        />
                        {option.label}
                    </label>
                ))}
                {errors[field] && (
                    <p className="text-red-500 text-xs mt-1">Campo requerido</p>
                )}
            </div>
        );
    } else if (element.type === 'switch') {
        return (
            <div key={field} className="mb-2">
                <label className="block text-secondary-150 text-sm font-bold mb-1">
                    <Controller
                        name={field}
                        control={control}
                        defaultValue={formData[field] || false}
                        render={({ field }) => <Switch {...field} color="primary" />}
                    />
                    {element.alias ? element.alias : field}
                </label>
            </div>
        );
    } else if (element.type === 'date') {
        return (
            <div key={field} className="mb-2">
                <label className="block text-secondary-150 text-sm font-bold mb-1">
                    {element.alias ? element.alias : field}
                </label>
                <Controller
                    name={field}
                    control={control}
                    defaultValue={formData[field] || ''}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            type="date"
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            className={`${errors[field.name] ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                            error={!!errors[field.name]} // Setea el error en true cuando error existe
                            helperText={errors[field.name]?.message || ''}
                        />
                    )}
                    rules={element.required ? { required: 'Campo requerido' } : {}}
                />
                {/* {errors[field] && (
              <p className="text-red-500 text-xs mt-1">Campo requerido</p>
            )} */}
            </div>
        );
    } else if (element.type === 'time') {
        return (
            <div key={field} className="mb-2">
                <label className="block text-secondary-150 text-sm font-bold mb-1">
                    {element.alias ? element.alias : field}
                </label>
                <Controller
                    name={field}
                    control={control}
                    defaultValue={formData[field] || ''}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            type="time"
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            className={`${errors[field.name] ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                            error={!!errors[field.name]} // Setea el error en true cuando error existe
                            helperText={errors[field.name]?.message || ''}
                        />
                    )}
                    rules={element.required ? { required: 'Campo requerido' } : {}}
                />
            </div>
        );
    } else if (element.type === 'email') {
        // Usa renderTextField para renderizar el campo de email
        const rules = {
            required: element.required ? 'correo requerido' : false,
            pattern: { value: /^\S+@\S+$/i, message: 'El e-mail no es valido' }
        }
        return (
            renderTextField(element.type, field, element.alias ? element.alias : field, rules)
        );
    } else {
        // Por defecto, mostrar un campo de texto
        // Usa renderTextField para renderizar el campo de texto
        return (
            renderTextField(element.type, field, element.alias ? element.alias : field, {
                required: element.required ? 'Campo requerido' : false,
            })
        );
    }
}

export default FormFields;