import Crud from "../../../components/crud/Crud";
const Crudv2 = () => {
    const columns = {
        "id": {"alias":"","item":""},
        "documento": {"alias":"","item":""},
        "nombre"   : {"alias":"","item":""},
        "apellido" : {"alias":"","item":""},
        "correo"   : {"alias":"","item":""},
    };
    return (
        <><Crud columns={columns} /></>
    )
}
export default Crudv2;