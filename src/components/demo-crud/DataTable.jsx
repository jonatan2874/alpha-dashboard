import { Modal, Box, IconButton, Tooltip } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { MdModeEdit, MdDelete, MdSettings } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

import { alert_status_description } from '../../helpers/alertStatusDescription';
import TableSkeleton from '../ui/skeletons/TableSkeleton';
import { AppContext } from '../../context/app/AppContext';
import { TwButton } from '../ui/Button';
import FormFields from './FormFields';
import { API_ENDPOINT } from '../../helpers/API_ENDPOINT';

const DataTable = ({ endpoint = "", label = "Data Table", isNotFirst = false }) => {

  const { alert_methods, modal_methods } = useContext(AppContext);

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [editingRow, setEditingRow] = useState(null);

  const [optionsApi, setOptionsApi] = useState({});

  const navigate = useNavigate();

  /* 
    Si la petición tiene datos subyacentes, 
    esta variable guardará la ruta para la siguiente petición
  */
  let requestPath = "";

  /*
    Loadres
  */
  const [loadingData, setLoadingData] = useState(true);
  const [apiLoader, setApiLoader] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    setValue,
    control,
    reset,
  } = useForm();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      console.log(errors);
    }
  }, [errors]);

  /**
    Consume la API para obtener los datos y la estructura de la Tabla para el CRUD
   */
  const fetchData = async () => {
    try {
      const response = await axios.get(endpoint);

      // Valida si la data viene vacía
      response.data.length === 0 ?
        setData([])
        :
        setData(response.data);
      setLoadingData(false);
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

  /**
   * Se ejecuta al enviar el formulario
   */
  const onSubmit = async (formData) => {

    let newEndpoint = endpoint;

    /**
     * Valida si el CRUD se esta renderizando desde otro plano. 
     * Esto quiere decir que si el CRUD es perteneciente a un dato especifico, 
     * este cambiará la estructura del endpoint.
     */
    if (isNotFirst) {

      const [newUrl, extractedID] = handleEndpointEntry();
      newEndpoint = newUrl;

      /**
       * Este id_foreign_key se reemplazará por el id necesario en el 
       * backend para almacenarlo en la BD
       */
      formData.id_foreign_key = extractedID;
    };

    setApiLoader(true);
    let resp = {};
    try {
      if (editingRow) {
        resp = await axios.put(`${newEndpoint}/${editingRow.id}`, formData);
      } else {
        resp = await axios.post(newEndpoint, formData);
      }

      /**
       * Valida el estado de la petición y genera una alerta.
       * Se llaman las funciones necesarias para restaurar el proceso.
       */
      alert_methods.show(alert_status_description(resp.status));
      setApiLoader(false);
      fetchData();
      handleCloseModal();
    } catch (error) {
      console.error('Error adding/updating data:', error);
      alert_methods.show(alert_status_description(error.response.status));
      setApiLoader(false);
    }
  };

  const handleEdit = (row) => {
    setFormData(row);
    setEditingRow(row);
    handleShowModal();
  };

  /**
   * Elimina el dato seleccionado y hace el mismo proceso 
   * de la función Submit con el endpoint
   */
  const handleDelete = async (id) => {

    const [newUrl] = handleEndpointEntry();
    let newEndpoint = isNotFirst ? newUrl : endpoint;

    let resp = {};
    try {
      resp = await axios.patch(`${newEndpoint}/${id}`, { activo: 0 });
      alert_methods.show(alert_status_description(resp.status === 200 ? 204 : resp.status));
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
      alert_methods.show(alert_status_description(error.request.status));
    }
  };

  /**
   * Abre una nueva pestaña con el CRUD del campo seleccionado dato:request
   */
  const handleRequestModal = ({ id }) => navigate(`${requestPath}/${id}`);

  /**
   * Elimina el ultimo espacio del endpoint normalmente un /id
   * y retorna un nuevo endpoint sin el id y una variable que 
   * contiene el id extraído
   */
  const handleEndpointEntry = () => {

    const splitted = endpoint.split("/");

    const extractedID = splitted[splitted.length - 1]
    splitted.pop();

    return [splitted.join("/"), extractedID];
  }

  const handleOptionsApi = async (id, endpoint, fieldName) => {

    try {
      const { data: { data } } = await axios.get(`${API_ENDPOINT}/${endpoint}/${id}`);
      setOptionsApi(prevState => {
        return { ...prevState, [fieldName]: data }
      });

      setValue(fieldName, 0, { shouldValidate: true });

      // // Resetar la variable data para activar el useEffect
      // setData(prev => {
      //   const dataCloned = structuredClone(prev);
      //   return dataCloned;
      // });
    } catch (error) {
      console.error('Error fetching options:', error);
    }

  };

  /**
   * Genera las columnas de la tabla en base a la 
   * estructura enviada desde el Backend
   */
  const getColumns = () => {

    const columns = [];
    for (const key in data.structure) {
      const element = data.structure[key];

      if (element.path !== undefined) requestPath = element.path;

      /**
       * Si el registro contiene un registro adicional, se genera
       * un boton que permite enviar un nuevo endpoint con un nuevo DataTable
       */
      element.hidden_table ? null
        :
        key === "request" ?
          columns.push({
            field: 'request',
            headerName: element.alias,
            flex: 1,
            renderCell: (params) => (
              <Tooltip title={element.alias}>
                <IconButton className='ml-3' size='small' color='primary' onClick={() => handleRequestModal(params)}>
                  <MdSettings />
                </IconButton>
              </Tooltip>
            ),
          })
          :
          columns.push({ field: key, headerName: element.alias ? element.alias : key, flex: 1.5, });
    }
    /**
     * Se agrega las acciones de editar o eliminar
     */
    columns.push({
      field: 'actions',
      headerName: 'Acciones',
      width: 90,
      renderCell: (params) => (
        <div className="flex items-center gap-2 text-xl">
          <Tooltip title="Editar">
            <IconButton size='small' color='primary' onClick={() => handleEdit(params.row)}>
              <MdModeEdit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton size='small' color='primary' onClick={() => handleDelete(params.row.id)}>
              <MdDelete />
            </IconButton>
          </Tooltip>
        </div>
      ),
    });
    return columns;
  };

  /**
   * Valida si la data viene agrupada en un arreglo o si es un solo registro
   */
  const getRows = () => {
    if (data.data && Array.isArray(data.data)) {
      return data.data
        .filter(row => !row.hidden) // Filtra los elementos que no tienen hidden como true
        .map((row, index) => ({ id: index, ...row }));
    }
    else if (typeof data.data === "object") {
      const arrData = [data.data];
      return arrData.map((row, index) => ({ id: index, ...row }));
    };
    return [];
  };

  /**
   * Genera los campos de los formularios en base a la 
   * estructura que se haya creado en el Backend
   */
  const setForm = () => {
    if (!data.structure) {
      return [];
    }

    const fields = []; // Variable para declarar los campos
    for (const field in data.structure) {
      const element = data.structure[field];

      if (element.type !== "request") {
        /**
         * Permite poner por el campo requerido por defecto en True.
         * Unicamente los campos no requeridos son los que se deben poner en la petición
         */
        element.required === undefined ? element.required = true : null

        // Se generan los campos según la estructura
        element.hidden_form ? null
          :
          fields.push(
            <FormFields
              key={field}
              element={element}
              field={field}
              errors={errors}
              control={control}
              formData={formData}
              optionsApi={optionsApi}
              handleOptionsApi={handleOptionsApi}
            />);
      }
    }

    return fields;
  };

  useEffect(() => {
    setForm();
  }, [data]);

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  return (
    <div className="p-4">
      <h2 className='font-medium text-primary text-xl mb-5'>{label}</h2>
      {
        loadingData ? <TableSkeleton /> :
          <>
            <DataGrid
              rows={getRows()}
              columns={getColumns()}
              rowsPerPageOptions={[5, 10, 25]}
              autoHeight
              initialState={{
                pagination: { paginationModel: { pageSize: 5 } }
              }}
              pageSizeOptions={[5, 10]}
            />
            {/* Botón de Agregar */}
            <TwButton onClick={handleShowModal} className="mt-5">
              Agregar
            </TwButton>
          </>
      }

      {/* Ventana modal para editar/agregar */}
      <ThemeProvider theme={lightTheme}>
        <Modal open={showModal} onClose={handleCloseModal}>
          <Box
            sx={{
              position: 'absolute',
              maxHeight: '90%',
              overflowY: 'auto',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className='w-[350px] lg:w-[500px] md:w-[500px] bg-white text-black rounded'>
              <h2 className='w-full bg-neutral-800 text-white text-lg font-semibold px-5 py-2 rounded-t'>{editingRow ? 'Editar' : 'Agregar'} Datos</h2>
              <div className='p-5'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Renderizar los campos del formulario basados en las claves del objeto de datos */}
                  {setForm()}

                  <div className="flex justify-end pt-2 gap-2">
                    <TwButton label="Cancelar" onClick={handleCloseModal} color="default" />
                    <TwButton loading={apiLoader} type='submit' color="success">
                      {editingRow ? 'Actualizar' : 'Agregar'}
                    </TwButton>
                  </div>
                </form>
              </div>
            </div>
          </Box>
        </Modal>
      </ThemeProvider>
    </div>
  );
};

export default DataTable;
