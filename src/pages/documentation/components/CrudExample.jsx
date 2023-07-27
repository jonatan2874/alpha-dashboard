import {
    CrudComponent,
    TwCard
} from "../../../components";
import DataTable from "../../../components/DataTable";

const CrudExample = () =>{

    return (
        <TwCard>
            <h1>Ejemplo crud</h1>
            <DataTable endpoint="http://localhost/api.php"/>
        </TwCard>
    );
}

export default CrudExample;