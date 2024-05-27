import Crud from "../../../components/crud/Crud";
const Crudv2 = () => {
    const columns = {
        "documento": {"alias":"","item":""},
        "nombre"   : {"alias":"","item":""},
        "apellido" : {"alias":"","item":""},
        "correo"   : {"alias":"","item":""},
    };

    const form_fields = {
        id: {
            alias: "ID",
            type: "hidden",
            hidden_form: true,
        },
        separator1:{
            type:"separator",
            alias : "Datos de usuario"
        },
        name: {
            alias: "Nombre",
            type: "string",
        },
        document: {
            alias: "Documento",
            type: "number",
            validation: "number",
        },
        birth_day: {
            alias: "Fecha Nacimiento",
            type: "date",
        },
        birth_hour: {
            alias: "Hora Nacimiento",
            type: "time",
            required: false,
        },
        separator2:{
            type:"separator",
            alias : "Datos de contacto"
        },
        email: {
            alias: "Correo",
            validation: "email",
            rules: {
                required: "correo requerido",
                pattern: {
                    value: /^\S+@\S+$/i,
                    message: "El e-mail no es valido",
                },
            },
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
        },
        
    };

    return (
        <>
            <Crud 
                columns={columns} 
                form_fields={form_fields}
                endpoint='http://localhost:8000/api/v1/enterprises/' 
            />
        </>
    )
}
export default Crudv2;