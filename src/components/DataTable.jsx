import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataTable = ({ endpoint }) => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [editingRow, setEditingRow] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(endpoint);
      setData(Object.entries(response.data));
      console.log(typeof response.data,response.data)
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

  return (
    <div className="p-4">
      <table className="table-auto w-full">
        <thead>
          <tr>
            {data.length > 0 &&
              data.map((column, index) => (
                <th key={index} className="px-4 py-2">{column}</th>
              ))}
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
                {console.log(row)}
              {Object.values(row).map((cellValue, cellIndex) => (
                <td key={cellIndex} className="border px-4 py-2">{cellValue}</td>
              ))}
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => handleEdit(row)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(row.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleShowModal}
        >
          Agregar
        </button>
      </div>

      <div className={`fixed top-0 left-0 h-full w-full flex items-center justify-center ${showModal ? '' : 'hidden'}`}>
        <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" onClick={handleCloseModal} />

        <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
          <div className="modal-content py-4 text-left px-6">
            <div className="flex justify-between items-center pb-3">
              <p className="text-2xl font-bold">{editingRow ? 'Editar' : 'Agregar'} Datos</p>
              <div className="modal-close cursor-pointer z-50" onClick={handleCloseModal}>
                <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                  <path
                    d="M1.39 1.393c-.38-.38-.386-.996-.002-1.383-.385-.005-.754.15-1.03.425l-.006-.005c-.36.36-.37.93-.005 1.294L1.39 1.392zm13.292 13.296c.378.378.38.992-.003 1.374.376-.004.737-.148 1.007-.418.365-.366.37-.944.003-1.31l-.007.005zM2.778 15.006c.004.385-.145.754-.42 1.028-.378.378-.993.38-1.375-.003l-.006-.005c.008-.378.15-.747.424-1.02l.005-.005c.37-.368.947-.37 1.372-.002zm12.498-12.501l.004.004c-.367.378-.386.978-.02 1.356.364-.01.738-.15 1.013-.425l.005-.005c.376-.376.388-.983.012-1.362zm-.004.008c.377-.367.387-.967.013-1.337.368-.006.74.142 1.014.415l.004-.004c.38.38.392.995.004 1.375zm-6.394-5.856c-.006.378-.15.748-.418 1.021-.378.377-.982.38-1.36.004-.375-.377-.388-.986-.008-1.363l.007-.007c.37-.37.96-.378 1.379-.005zm5.612 5.62c.368.378.386.986.01 1.365-.377.003-.742-.144-1.014-.417l-.004.003c-.375-.375-.39-.985-.012-1.363.377-.378.982-.377 1.375-.003zM2.804 4.442c-.004-.375.145-.742.42-1.016.37-.37.978-.384 1.355-.01l.004-.004c-.008.377-.152.74-.424 1.013l-.006.004c-.37.37-.964.386-1.35.017zm-.015 0c-.366-.372-.385-.98-.01-1.36-.37-.002-.74.145-1.014-.417L0 3.99l-.004.004c-.378.368-.39.966-.013 1.337zm1.403 1.397c-.36.36-.37.932-.005 1.308l-.006-.005c.004-.38.15-.748.424-1.023.37-.37.984-.376 1.357-.005l.004.004c.37.368.388.977.013 1.357-.377.003-.738-.148-1.008-.42l-.005.005zm-.015 0c-.377.367-.388.977-.012 1.358-.376.003-.742-.144-1.014-.417l-.004.003c-.37-.373-.39-.982-.012-1.36.368-.378.982-.38 1.373-.005l.005.004zM5.09 7.836c-.38-.38-.386-.995-.002-1.382-.385-.006-.754.15-1.03.425l-.006-.005c-.36.36-.37.93-.005 1.293l.006.006c.378.38.39.996.003 1.376-.376.005-.74-.147-1.01-.42l-.005.005c-.37-.372-.39-.982-.012-1.36.378-.378.984-.386 1.375-.005l.004.004c.378.366.392.975.012 1.354zm-.016 0c-.376.37-.388.98-.012 1.36-.37.002-.738-.145-1.01-.42l-.005.003c-.37-.373-.39-.982-.012-1.36.378-.378.984-.386 1.375-.005l.004.004c.378.366.392.975.012 1.354zm6.283-5.615c-.38-.38-.386-.995-.002-1.382-.385-.006-.754.15-1.03.425l-.006-.005c-.36.36-.37.93-.005 1.293l.006.006c.378.38.39.996.003 1.376-.376.005-.74-.147-1.01-.42l-.005.005c-.37-.372-.39-.982-.012-1.36.378-.378.984-.386 1.375-.005l.004.004c.378.366.392.975.012 1.354zm-.016 0c-.376.37-.388.98-.012 1.36-.37.002-.738-.145-1.01-.42l-.005.003c-.37-.373-.39-.982-.012-1.36.378-.378.984-.386 1.375-.005l.004.004c.378.366.392.975.012 1.354z"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-2">
              {/* Renderizar los campos del formulario basados en las claves del objeto de datos */}
              {data.map((field, index) => (
                <div key={index} className="mb-2">
                  <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor={field}>{field}</label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field] || ''}
                    onChange={handleChange}
                    className="w-full h-10 px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end pt-2">
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleCloseModal}
              >
                Cancelar
              </button>
              {editingRow ? (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleUpdate}
                >
                  Actualizar
                </button>
              ) : (
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleAdd}
                >
                  Agregar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
