import React from 'react'
import DataTable from '../../../../components/demo-crud/DataTable'
import CodeHighlighter from '../../../../components/ui/CodeHighlighter';

const BasicUsageCrud = () => {

    const codeClass = 'bg-primary px-3 rounded text-white mx-2 grid place-content-center w-fit';
    const codeClass2 = 'border border-primary px-3 rounded mx-2 grid place-content-center w-fit text-primary';

    const MyExampleCode = `
    const data = {
        structure: {
          id: {
            alias: "ID",
            type: "string",
            hidden_form: true,
          },
          name: {
            alias: "Nombre",
            type: "string",
          },
          document: {
            alias: "Documento",
            type: "number",
            validation: "number",
            hidden_table: true,
          },
          birth_day: {
            alias: "Fecha Nacimiento",
            type: "date",
            hidden_table: true,
          },
          birth_hour: {
            alias: "Hora Nacimiento",
            type: "time",
            required: false,
            hidden_table: true,
          },
          email: {
            alias: "Correo",
            validation: "email",
          },
          gender: {
            alias: "Genero",
            type: "select",
            options: [
              { label: "Masculino", value: "male" },
              { label: "Femenino", value: "female" },
            ],
          },
          system_access: {
            alias: "Acceso al sistema",
            type: "checkbox",
            hidden_table: true,
          },
          rol: {
            alias: "Rol",
            type: "radio",
            options: [
              { label: "administrados", value: "admin" },
              { label: "visitante", value: "visitor" },
            ],
          },
          active: {
            alias: "Activo",
            type: "switch",
            hidden_table: true,
          },
        },
        data: [
          {
            id: 1,
            name: "Test1",
            document: "123",
            email: "correo@correo.co",
            gender: "male",
            rol: "admin",
          },
          {
            id: 2,
            name: "usuerio 2",
            document: "456",
            email: "correo2@correo.co",
            gender: "female",
            rol: "visitor",
          },
        ],
      };
    `;

    return (
        <div>
            <DataTable label="Básico" endpoint="http://localhost:8080/api/users/basic" />
            <h1 className='text-lg text-primary font-extrabold my-2'>Uso básico</h1>
            <p className='flex flex-wrap'>
                En el uso basico podemos tener distintos tipos de datos como
                <code className={codeClass2}>integer, string, radio, select, etc</code>
                con estos tipos de datos se pueden crear nuevos registros, actualizarlos o eliminarlos.
                <br /><br />
                En el uso basico desde la API se podría ver así:
            </p>
            <CodeHighlighter language='javascript' code={MyExampleCode} />

            <h1 className='text-lg text-primary font-extrabold my-2'>API</h1>

            <div className='divide-y-2 flex flex-col gap-3'>
                <div className='flex gap-3'>
                    <code className={codeClass}>alias</code>
                    <p>Es el nombre de que llevará la columna en la tabla</p>
                </div>
                <div className='flex gap-3 pt-3'>
                    <code className={codeClass}>hidden_table = true</code>
                    <p>Permite ocultar el campo en la tabla, mas no en el formulario</p>
                </div>
                <div className='flex gap-3 pt-3'>
                    <code className={codeClass}>hidden_form = true</code>
                    <p>Permite ocultar el campo en el formulario, mas no en la tabla</p>
                </div>
                <div className='flex gap-3 pt-3'>
                    <code className={codeClass}>options</code>
                    <p className='flex flex-wrap gap-1'>Cuando el tipo sea <b>select o checkbox</b>, este debe llevar la etiqueta <code className={codeClass2}>options</code> deonde se almacenarán las opciones del mismo. <b>IMPORTANTE:</b> Que la estructura de las opciones sean <code className={codeClass2}>{JSON.stringify({ label: "Algo", value: 1 })}</code></p>
                </div>
                <div className='flex gap-3 pt-3'>
                    <code className={codeClass}>required = true</code>
                    <p>Hace que el campo en el formulario NO sea obligatorio. <b>Los demas campos por defecto lo son.</b></p>
                </div>
                <div className='flex gap-3 pt-3'>
                    <code className={codeClass}>type</code>
                    <p>Representa el tipo de dato</p>
                </div>
                <div className='flex gap-3 pt-3'>
                    <code className={codeClass}>validation</code>
                    <p>Permite que el campo sea validado en el formulario</p>
                </div>
            </div>
        </div>
    )
}

export default BasicUsageCrud