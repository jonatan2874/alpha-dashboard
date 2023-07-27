import {
    CrudComponent,
    TwCard
} from "../../../components";
import DataTable from "../../../components/DataTable";

const CrudExample = () =>{

    return (
        <TwCard>
            <h1>Ejemplo crud</h1>
            <DataTable endpoint="http://logicalerp.localhost/api/v1/debug/index.php"/>
        </TwCard>
    );
}

export default CrudExample;