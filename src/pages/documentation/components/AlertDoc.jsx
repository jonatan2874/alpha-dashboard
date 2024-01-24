import React, { useContext } from 'react'
import { AppContext } from '../../../context/app/AppContext';
import { TwButton } from '../../../components/ui';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import CodeHighlighter from '../../../components/ui/CodeHighlighter';

const AlertDoc = () => {

    const { alert_methods } = useContext(AppContext);

    const handleAlert = type => {
        type === "success" ?
            alert_methods.show({
                type: "success",
                msg: "success"
            })
            : type === "error" ?
                alert_methods.show({
                    type: "error",
                    msg: "error"
                })
                : type === "info" ?
                    alert_methods.show({
                        type: "info",
                        msg: "info"
                    })
                    : type === "warning" ?
                        alert_methods.show({
                            type: "warning",
                            msg: "warning"
                        })
                        : null
    };

    const MyExampleCode = `
    // Importamos el contexto de la alerta
    const { alert_methods } = useContext(AppContext);

    // Le enviamos la siguiente estructura a la alerta
    alert_methods.show({
        type: "", // success | error | info | warning
        msg: "Texto aquí"
    });
    `;

    return (
        <>
            <div className="mb-10">
                <h1 className="font-bold text-secondary-50 text-xl">Alert Component </h1>
                <span className="text-gray-500">MUI-Tailwind</span>
            </div>
            <div className='p-10 bg-secondary-100 rounded text-secondary-50 grid gap-4'>

                <div>
                    <h2 className="text-gray-500 font-bold text-primary">Instrucciones</h2>
                    <span>
                        Por medio de la etiqueta
                        <code className='bg-secondary-900 text-primary px-2 rounded mx-1'>color</code>
                        se pueden enviar los parametros
                        <code className='bg-secondary-900 text-primary px-2 rounded mx-1'>success | error | info | warning | primary</code>
                    </span>
                </div>

                <div>
                    <h2 className="text-gray-500 font-bold text-primary">Estructura</h2>
                    <CodeHighlighter language='javascript' code={MyExampleCode} />
                </div>

                <div>
                    <h2 className="text-gray-500 font-bold text-primary">Demostración</h2>
                    <div className='flex justify-left items-center rounded gap-5 mt-5'>
                        <TwButton color='success' onClick={() => handleAlert("success")} variant="contained">Success</TwButton>
                        <TwButton color='error' onClick={() => handleAlert("error")} variant="contained">Error</TwButton>
                        <TwButton color='info' onClick={() => handleAlert("info")} variant="contained">Info</TwButton>
                        <TwButton color='warning' onClick={() => handleAlert("warning")} variant="contained">Warning</TwButton>
                    </div>
                </div>

            </div>
        </>

    )
}

export default AlertDoc