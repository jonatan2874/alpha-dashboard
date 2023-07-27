import React, { useState, useEffect } from 'react';
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
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleAdd = async () => {
    try {
      await axios.post(endpoint, formData);
      fetchData();
      handleCloseModal();
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  const handleEdit = (row) => {
    setFormData(row);
    setEditingRow(row);
    handleShowModal();
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${endpoint}/${editingRow.id}`, formData);
      fetchData();
      handleCloseModal();
    } catch (error) {
      console.error('Error updating data:', error);
    }
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
          <MdModeEdit
            onClick={() => handleEdit(params.row)}
            className="cursor-pointer"
            title="editar"
          />
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
          {/* Renderizar los campos del formulario basados en las claves del objeto de datos */}
          {data.structure &&
            Object.keys(data.structure).map((field, index) => (
              <div key={index} className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor={field}>
                  {field}
                </label>
                <TextField
                  fullWidth
                  name={field}
                  value={formData[field] || ''}
                  onChange={handleChange}
                  variant="outlined"
                />
              </div>
            ))}

          <div className="flex justify-end pt-2">
            <Button onClick={handleCloseModal}>Cancelar</Button>
            {editingRow ? (
              <Button onClick={handleUpdate} color="primary">
                Actualizar
              </Button>
            ) : (
              <Button onClick={handleAdd} color="primary">
                Agregar
              </Button>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DataTable;
