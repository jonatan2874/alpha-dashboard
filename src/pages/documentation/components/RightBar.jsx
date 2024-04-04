import React, { useContext } from 'react';
import { TwButton, TwCard } from "../../../components/ui";
import { Input } from '@mui/base/Input';
import { AppContext } from '../../../context/app/AppContext';

const RightBar = () => {
    const { right_bar, right_bar_methods } = useContext(AppContext);
    const show = () => {
        right_bar_methods.show();
    };

    const change_content = (event)=>{
        right_bar_methods.change_content(event.target.value)
    }

    return (
        <TwCard>
            <div>
                <h2 className="text-gray-500 font-bold text-primary">Right Bar Menu</h2>
                <div className="py-5">
                    Menu derecho desplegable, cambia el contenido en relacion al contexto global
                </div>
            </div>
            <div>
                <h2 className="text-gray-500 font-bold text-primary">Contenido</h2>
                <div className='gray-500'>
                    {right_bar.content}
                </div>
                <div className="py-5">
                    <Input className='gray-500' multiline placeholder="Right bar content…" onKeyUp={change_content} />
                </div>                
            </div>
            <TwButton color='success' onClick={show} variant="contained">Abrir/Cerrar</TwButton>

        </TwCard>
    )
}

export default RightBar