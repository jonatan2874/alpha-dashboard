import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Modal, TextField, Box, MenuItem, Switch, Radio, Checkbox } from '@mui/material';
import { MdModeEdit, MdDelete } from 'react-icons/md';

const DataTable = ({ endpoint }) => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [editingRow, setEditingRow] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(()=>{
    console.log(errors)
  },[errors])

  const fetchData = async () => {
    try {
      const response = await axios.get(endpoint, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:5173', // Ajusta la URL
          'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
          'Access-Control-Allow-Headers': '*'
        },
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({});
    setEditingRow(null);
    reset();
  };

  const onSubmit = async (formData) => {
    console.log(formData, editingRow);
    try {
      if (editingRow) {
        await axios.put(`${endpoint}/${editingRow.id}`, formData);
      } else {
        await axios.post(endpoint, formData);
      }
      fetchData();
      handleCloseModal();
    } catch (error) {
      console.error('Error adding/updating data:', error);
    }
  };

  const handleEdit = (row) => {
    setFormData(row);
    setEditingRow(row);
    handleShowModal();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${endpoint}/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const getColumns = () => {
    const columns = [];
    for (const key in data.structure) {
      const element = data.structure[key];
      columns.push({ field: key, headerName: element.alias ? element.alias : key, width: 150 });
    }
    columns.push({
      field: 'actions',
      headerName: 'Acciones',
      width: 200,
      renderCell: (params) => (
        <div className="flex items-center gap-4 text-xl">
          <MdModeEdit onClick={() => handleEdit(params.row)} className="cursor-pointer" title="editar" />
          <MdDelete
            className="cursor-pointer"
            onClick={() => handleDelete(params.row.id)}
            title="eliminar"
          />
        </div>
      ),
    });
    return columns;
  };

  const getRows = () => {
    if (data.data && Array.isArray(data.data)) {
      return data.data.map((row, index) => ({ id: index, ...row }));
    }
    return [];
  };

  const pattern = {
    email: {
      value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      message: 'Correo electrónico inválido',
    },
  };

  const renderTextField = (field, label, rules = {}) => {
    const error = errors[field];
    return (
      <div key={field} className="mb-2">
        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor={field}>
          {label}
        </label>
        <Controller
          name={field}
          control={control}
          defaultValue={formData[field] || ''}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              fullWidth
              className={`${error ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
              error={!!error} // Setea el error en true cuando error existe
              helperText={error?.message || ''} // Muestra el mensaje de error si existe, de lo contrario, muestra una cadena vacía
            />
          )}
          rules={rules}
        />
      </div>
    );
  }; 

  const setForm = () => {
    if (!data.structure) {
      return [];
    }
  
    const fields = []; // Declare the variable fields here
    for (const field in data.structure) {
      const element = data.structure[field];

      if (element.type === 'select') {
        fields.push(
          <div key={field} className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor={field}>
              {element.alias ? element.alias : field}
            </label>
            <Controller
              name={field}
              control={control}
              defaultValue={formData[field] || ''}
              render={({ field }) => (
                <TextField select {...field} variant="outlined" fullWidth>
                  {element.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            {errors[field] && (
              <p className="text-red-500 text-xs mt-1">Campo requerido</p>
            )}
          </div>
        );
      } else if (element.type === 'checkbox') {
        fields.push(
          <div key={field} className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-1">
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
        fields.push(
          <div key={field} className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-1">
              {element.alias ? element.alias : field}
            </label>
            {radioOptions.map((option) => (
              <label key={option.value} className="block text-gray-700 text-sm mb-1">
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
        fields.push(
          <div key={field} className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-1">
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
        fields.push(
          <div key={field} className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-1">
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
        fields.push(
          <div key={field} className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-1">
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
          pattern: { value: /^\S+@\S+$/i, message: 'El e-mail no es valido'}
        }
        fields.push(
          renderTextField(field, element.alias ? element.alias : field, rules)
        );
      } else {
        // Por defecto, mostrar un campo de texto
        // Usa renderTextField para renderizar el campo de texto
        fields.push(
          renderTextField(field, element.alias ? element.alias : field, {
            required: element.required ? 'Campo requerido' : false,
          })
        );
      }
    }

    return fields;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rowsOnPage = getRows().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="p-4">
      <DataGrid
        rows={rowsOnPage}
        columns={getColumns()}
        pagination
        pageSize={rowsPerPage}
        rowCount={getRows().length}
        onPageChange={handleChangePage}
        onPageSizeChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        autoHeight
        className="bg-gray-100"
      />

      {/* Botón de Agregar */}
      <Button variant="contained" color="primary" onClick={handleShowModal}>
        Agregar
      </Button>

      {/* Ventana modal para editar/agregar */}
      <Modal open={showModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            width: '300px', // Personaliza el ancho de la ventana modal
          }}
        >
          <h2>{editingRow ? 'Editar' : 'Agregar'} Datos</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Renderizar los campos del formulario basados en las claves del objeto de datos */}
            {setForm()}

            <div className="flex justify-end pt-2">
              <Button onClick={handleCloseModal}>Cancelar</Button>
              <Button type="submit" color="primary">
                {editingRow ? 'Actualizar' : 'Agregar'}
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default DataTable;
