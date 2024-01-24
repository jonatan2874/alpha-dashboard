import {
    TwCard
} from "../../../../components";
import DataForm from "../../../../components/demo-crud/DataForm";
import CodeHighlighter from "../../../../components/ui/CodeHighlighter";
import { API_ENDPOINT } from "../../../../helpers/API_ENDPOINT";

const FormExample = () => {

    const MyExampleCode = `
    const getOneUserData = async (req, res) => {
        const {
          params: { id },
        } = req;
      
        // Se busca el dato con el id del parámetro
        // (...code)
      
        const data = {
          structure: {
            name: {
              alias: "Name",
              type: "string",
            },
            document: {
              alias: "Document",
              type: "string",
            },
            email: {
              alias: "Email",
              type: "string",
            },
            gender: {
              alias: "Gender",
              type: "string",
            },
            rol: {
              alias: "Rol",
              type: "string",
            },
          },

          // IMPORTANTE que la data al ser solo una, esté representada como un objeto y no como un array
          data: {
            id: 1,
            name: "Test1",
            document: "123",
            email: "correo@correo.co",
            gender: "male",
            rol: "admin",
          },
        };
      
        res.json(data);
      };
    `;

    return (
        <TwCard>
            <DataForm endpoint={`${API_ENDPOINT}/users/1`} label="Data Form" />

            <h1 className="font-bold text-primary text-lg my-3">Uso del DataForm  (FRONT)</h1>
            <CodeHighlighter
                language='javascript'
                code={`<DataForm endpoint={"http://localhost:8080/users/1"} label="Data Form" />`}
            />

            <h1 className="font-bold text-primary text-lg my-3">Uso del DataForm  (API)</h1>
            <CodeHighlighter language='javascript' code={MyExampleCode} />

        </TwCard>
    );
}

export default FormExample;