import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { alert_status_description } from '../helpers/alertStatusDescription';
import FormSkeleton from './ui/skeletons/FormSkeleton';
import { AppContext } from '../context/app/AppContext';
import { TwButton } from './ui/Button';
import FormFields from './FormFields';
import { API_ENDPOINT } from '../helpers/API_ENDPOINT';

const DataForm = ({ endpoint = "", label = "Data Form" }) => {

  const { alert_methods } = useContext(AppContext);

  const [data, setData] = useState([]);
  const [dataLoader, setDataLoader] = useState(true);
  const [apiLoader, setApiLoader] = useState(false);
  const [formFields, setFormFields] = useState([]);

  const [optionsApi, setOptionsApi] = useState({});

  let dataForm = {};

  const {
    handleSubmit,
    control,
    setValue,
    // reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchData();
  }, []);

  /**
  Consume la API para obtener los datos y la estructura de la Tabla para el CRUD
 */
  const fetchData = async () => {
    try {
      const response = await axios.get(endpoint);
      setData(response.data);
      const data = response.data.data;
      setDataLoader(false);
      dataForm = data;
    } catch (error) {
      console.error('Error fetching data:', error);
      alert_methods.show(alert_status_description(error.response.status));
    }
  };

  /**
 * Se ejecuta al enviar el formulario
 */
  const onSubmit = async (formData) => {
    setApiLoader(true);
    axios.put(`${endpoint}`, formData).then(resp => {

      setApiLoader(false);

      // Genera la alerta dependiendo del estado de la petición
      alert_methods.show(alert_status_description(resp.status));
      fetchData();

    }).catch(error => {
      alert_methods.show(alert_status_description(error.response.status));
      setApiLoader(false);
    });
  };

  const handleOptionsApi = async (id, endpoint, fieldName) => {

    try {
      const { data: { data } } = await axios.get(`${API_ENDPOINT}/${endpoint}/${id}`);
      setOptionsApi(prevState => {
        return { ...prevState, [fieldName]: data }
      });

      setValue(fieldName, 0, { shouldValidate: true });

      // Resetar la variable data para activar el useEffect
      setData(prev => {
        const dataCloned = structuredClone(prev);
        return dataCloned;
      });
    } catch (error) {
      console.error('Error fetching options:', error);
    }

  };

  const fillFields = () => {
    let fields = []; // Variable para declarar los campos

    if (!data.structure) {
      fields = [];
    }

    const { data: dataForm } = data;

    for (const field in data.structure) {
      const element = data.structure[field];

      if (element.type !== "request") {
        /**
         * Permite poner por el campo requerido por defecto en True.
         * Unicamente los campos no requeridos son los que se deben poner en la petición
         */
        element.required === undefined ? element.required = true : null

        fields.push(<FormFields
          key={field}
          handleOptionsApi={handleOptionsApi}
          optionsApi={optionsApi}
          element={element}
          field={field}
          errors={errors}
          control={control}
          formData={dataForm} />);
      }
    }

    setFormFields(fields);
  };

  /**
 * Genera los campos de los formularios en base a la 
 * estructura que se haya creado en el Backend
 */
  useEffect(() => {
    fillFields();
  }, [data]);

  return (
    <div className="p-4 w-full">
      <div className='flex flex-col rounded'>
        <h2 className='font-medium text-primary text-xl mb-10'>{label}</h2>
        <div className='w-full lg:w-[50%] md:w-[70%]'>
          {
            dataLoader ? <FormSkeleton />
              :
              <form onSubmit={handleSubmit(onSubmit)}>

                {/* Renderizar los campos del formulario basados en las claves del objeto de datos */}
                {formFields}

                <div className="pt-2">
                  <TwButton label="Guardar" loading={apiLoader} type="submit" />
                </div>
              </form>
          }
        </div>
      </div>
    </div>
  );
};

export default DataForm;
