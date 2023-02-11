import { TwButton,TwCard } from "../../../components/ui";

const ButtonDoc = () => {
  return (
    <>
      <div className="mb-10">
        <h1 className="font-bold text-secondary-50 text-xl">Button Component </h1>
        <span className="text-gray-500">MUI-Tailwind</span>
      </div>
      <TwCard>
        <div className="flex flex-col items-center justify-center gap-6">
          <TwButton onClick={()=>console.log('in')} variant="contained"  >Aceptar</TwButton>
          <span className="text-gray-500">Boton de MUI con el estilo personalizado, para ver props y demas, ver documentacion de button de mui</span>
        </div>
      </TwCard>
    </>
  )
}

export default ButtonDoc;
