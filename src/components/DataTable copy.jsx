import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button, Modal, TextField, Box } from '@mui/material';
import { TwButton } from './ui';

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
      columns.push(<TableCell key={key}>{element.alias ? element.alias : key}</TableCell>);
    }
    return columns;
  };

  const getFormFields = () => {
    if (!data.structure) return null;

    return Object.keys(data.structure).map((field, index) => (
      <div key={index} className="mb-2">
        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor={field}>
          {field}
        </label>
        <TextField fullWidth name={field} value={formData[field] || ''} onChange={handleChange} variant="outlined" />
      </div>
    ));
  };

  const getRows = () => {
    if (data.length <= 0) return null;

    const rows = [];
    if (Object.keys(data).length > 0 && data.structure) {
      data.data.forEach((row, rowIndex) => {
        const columns = [];
        for (const key in data.structure) {
          const element = data.structure[key];
          const value = row[key];
          columns.push(<TableCell key={`${rowIndex}-${key}`}>{value || element.alias || ''}</TableCell>);
        }
        columns.push(
          <TableCell key={`actions-${rowIndex}`} className="flex items-center gap-4 text-xl">
            <MdModeEdit onClick={() => handleEdit(row)} className="cursor-pointer" title="editar" />
            <MdDelete className="cursor-pointer" onClick={() => handleDelete(row.id)} title="eliminar" />
          </TableCell>
        );
        rows.push(<TableRow key={rowIndex}>{columns}</TableRow>);
      });
    }
    return rows;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rowsOnPage = getRows() ? getRows().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : null;

  return (
    <div className="p-4">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {getColumns()}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{rowsOnPage}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={getRows() ? getRows().length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Botón de Agregar */}
      <TwButton variant="contained" color="primary" onClick={handleShowModal}>
        Agregar
      </TwButton>

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
          {getFormFields()}

          <div className="flex justify-end pt-2">
            <TwButton onClick={handleCloseModal}>Cancelar</TwButton>
            {editingRow ? (
              <TwButton onClick={handleUpdate} color="primary">
                Actualizar
              </TwButton>
            ) : (
              <TwButton onClick={handleAdd} color="primary">
                Agregar
              </TwButton>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DataTable;
