import { useParams } from "react-router-dom";
import DataTable from "../../../../components/demo-crud/DataTable";
import { API_ENDPOINT } from "../../../../helpers/API_ENDPOINT";

const EquiposCrud = () => {

    /**
    * Captura el ID del equipo que está en el Path
    */
    const { idEquipo } = useParams();

    return (
        <DataTable label="Equipos" endpoint={`${API_ENDPOINT}/equipos/${idEquipo}`} />
    )
}

export default EquiposCrud;