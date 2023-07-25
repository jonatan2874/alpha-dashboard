import { useContext } from "react";
import { TwButton,TwCard } from "../../../components/ui";
import { AppContext } from "../../../context/app/AppContext";

const ButtonDoc = () => {
  const {right_bar_methods} = useContext(AppContext)
  // console.log(right_bar)
  const change_right_bar_content = ()=>{
    // aqui se pasa el componente que renderizara el right bar, el metodo renderiza y abre el menu
    right_bar_methods.change_content(new Date().toLocaleString());
  }

  return (
    <>
      <div className="mb-10">
        <h1 className="font-bold text-secondary-50 text-xl">Button Component </h1>
        <span className="text-gray-500">MUI-Tailwind</span>
      </div>
      <TwCard>
        <div className="flex flex-col items-center justify-center gap-6">
          <TwButton onClick={()=>change_right_bar_content()} variant="contained"  >Aceptar</TwButton>
          <span className="text-gray-500">Boton de MUI con el estilo personalizado, para ver props y demas, ver documentacion de button de mui</span>
        </div>
      </TwCard>
    </>
  )
}

export default ButtonDoc;
