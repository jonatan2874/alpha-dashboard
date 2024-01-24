import React from 'react'
import DataTable from '../../../../components/demo-crud/DataTable'
import CodeHighlighter from '../../../../components/ui/CodeHighlighter';

import imagen_prueba from './imagen_prueba.png';

const AdvancedUsageCrud = () => {

  const codeClass = 'bg-primary px-3 rounded text-white mx-2 grid place-content-center w-fit';
  const codeClass2 = 'border border-primary px-3 rounded mx-2 grid place-content-center w-fit text-primary';

  const MyExampleCode = `

  // Este ejemplo muestra la estructura que se debe tener cuando se quiere hacer que un campo dependa de la selección de otro
  // En este caso se tiene el departamento que cuando es selceccionado, las ciudades se van a renderizar pero solo las
  // que pertenecen a ese departamento.

  const getUsersAdvc = async (req, res) => {
    let users = await User.findAll();
  
    // Se llaman ambas peticiones 
    let cities = await City.findAll();
    let departments = await Department.findAll();
  
    // Se formatean las datas de los departamentos y ciudades para que sean compatible con el componente
    departments = departments.map((item) => ({
      label: item.nombre,
      value: item.id,
    }));
    cities = cities.map((item) => ({
      label: item.nombre,
      value: item.id,
    }));
  
    const data = {
      structure: {
        nombre: {
          alias: "Nombre",
          type: "string",
        },
        departamento: {
          emit: "ciudad", // Debe llevar el nombre de la llave que quiere afectar "ciudad"
          endpoint: "ciudades", // Se pone el endpoint que consultará
          alias: "Departamento",
          type: "select",
          options: departments,
        },
        ciudad: {
          alias: "Ciudades",
          type: "select",
          options: cities,
        },

        //  La etiqueta "request" nos permite crear un boton en la tabla con el cual se abrirá una
        //  nueva tabla con el endpoint que le pasemos y este tomará el id del dato seleccionado y lo pondrá 
        //  al final de la nueva petición.
        request: {
          alias: "Equipos",
          path: "equipos", // Esta es la ruta que se consultará
          type: "request",
        },
      },
      data: users,
    };
  
    res.json(data);
  };
    `;

  return (
    <div>
      <DataTable label="Avanzado" endpoint="http://localhost:8080/api/users/advanced" />
      <h1 className='text-lg text-primary font-extrabold my-2'>Uso avanzado</h1>
      <p className='flex flex-wrap'>
        En el uso avanzado tenemos funciones más complejas como campos que dependen de otros como en la selección de un departamento y ciudad; o la redirección a otras tablas dependiendo del id del dato.
        <br /><br />
        En el uso avanzado desde la API se podría ver así:
      </p>
      <CodeHighlighter language='javascript' code={MyExampleCode} />

      <h1 className='text-lg text-primary font-extrabold my-2'>API</h1>

      <div className='divide-y-2 flex flex-col gap-3'>
        <div className='flex gap-3 pt-3'>
          <code className={codeClass}>emit</code>
          <p>Hace referencia del campo que quiere afectar ej. ciudad</p>
        </div>
        <div className='flex gap-3 pt-3'>
          <code className={codeClass}>endpoint</code>
          <p>Permite saber cuál es la ruta en la API que se debe consultar según el select ej. ciudades del departamento del Quindío</p>
        </div>
        <div className='flex gap-3 pt-3'>
          <code className={codeClass}>request</code>
          <p>
            Permite crear un boton en la tabla con el cual se abrirá una
            nueva tabla con el endpoint que le pasemos y este tomará el id de dato seleccionado y lo pondrá
            al final de la nueva petición.
            <br />
            <b>IMPORTANTE:</b>Al abrirse la nueva tabla, es importante que la ruta especificada en el API tambien
            esté como una ruta en el front.
          </p>
        </div>
        <img src={imagen_prueba} alt="prueba" width={500} />
        <div className='flex gap-3 pt-3'>
          <code className={codeClass}>path</code>
          <p>
            Representa el endpoint que se consumirá en la API
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdvancedUsageCrud