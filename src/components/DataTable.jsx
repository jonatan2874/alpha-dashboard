import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Modal, TextField, Box } from '@mui/material';
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

  const fetchData = async () => {
    try {
      const response = await axios.get(endpoint);
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
        className='bg-gray-100'
        componentsProps={{
          // Estilos personalizados para los encabezados de las columnas
          MuiDataGridHeader: {
            root: 'bg-blue-500 text-white', // Cambia aquí el color de fondo y el color del texto deseado
          },
        }}
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
            {data.structure &&
              Object.keys(data.structure).map((field, index) => (
                <div key={index} className="mb-2">
                  <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor={field}>
                    {field}
                  </label>
                  <Controller
                    name={field}
                    control={control}
                    defaultValue={formData[field] || ''}
                    render={({ field }) => <TextField {...field} variant="outlined" fullWidth />}
                  />
                  {errors[field] && <p className="text-red-500">{errors[field].message}</p>}
                </div>
              ))}

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