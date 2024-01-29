import { useContext } from "react";
import { TwButton, TwCard } from "../../../components/ui";
import { AppContext } from "../../../context/app/AppContext";
import CodeHighlighter from "../../../components/ui/CodeHighlighter";

const ButtonDoc = () => {
  const { right_bar_methods } = useContext(AppContext)
  // console.log(right_bar)
  const change_right_bar_content = () => {
    // aqui se pasa el componente que renderizara el right bar, el metodo renderiza y abre el menu
    right_bar_methods.change_content(new Date().toLocaleString());
  };

  const MyExampleCode = `
  // Uso común | color = success | error | info | warning | primary
  <TwButton onClick={() => {}} color='success' variant="contained">Boton</TwButton>

  // Cargando
  <TwButton onClick={() => {}} variant="contained" loading={true}>Boton</TwButton>
  `;

  return (
    <>
      <div className="mb-10">
        <h1 className="font-bold text-secondary-50 text-xl">Button Component </h1>
        <span className="text-gray-500">MUI-Tailwind</span>
      </div>
      <TwCard>
        <div className="grid gap-5">
          <span className="text-gray-500">Boton de MUI con el estilo personalizado, para ver props y demas, ver documentacion de button de mui</span>

          <div>
            <h2 className="text-gray-500 font-bold text-primary">Uso comun</h2>
            <div className="flex items-center gap-6">
              <TwButton onClick={change_right_bar_content} color='success' variant="contained">Success</TwButton>
              <TwButton onClick={change_right_bar_content} color='error' variant="contained">Error</TwButton>
              <TwButton onClick={change_right_bar_content} color='info' variant="contained">Info</TwButton>
              <TwButton onClick={change_right_bar_content} color='warning' variant="contained">Warning</TwButton>
              <TwButton onClick={change_right_bar_content} color='primary' variant="contained">Primary</TwButton>
            </div>
          </div>

          <div>
            <h2 className="text-gray-500 font-bold text-primary">Cargando</h2>
            <TwButton color='primary' variant="contained" loading={true}>Primary</TwButton>
          </div>

          <div>
            <h2 className="text-gray-500 font-bold text-primary">Estructura</h2>
            <CodeHighlighter language='javascript' code={MyExampleCode} />
          </div>
        </div>
      </TwCard>
    </>
  )
}

export default ButtonDoc;
