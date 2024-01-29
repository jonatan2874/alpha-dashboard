import React, { useContext } from 'react'
import { Alert, Snackbar } from '@mui/material'
import { AppContext } from '../../context/app/AppContext';

/*
    Tipos de Alertas
    1. success -> Exitoso
    2. error -> Error
    3. warning -> Advertencia
    4. info -> Información
*/

const TwAlert = () => {

    const { alert, alert_methods } = useContext(AppContext);

    const closeAlert = () => {
        alert_methods.hide()
    }

    const default_settings = {
        timeOut: 6000,
        type: "success",
        msg: "",
        variant: "filled"
    }
    const default_anchor = {
        vertical: "top",
        horizontal: "center"
    }

    return (
        <>
            {
                alert.show &&
                <Snackbar
                    open={alert.show}
                    autoHideDuration={alert.content.timeOut !== undefined ? alert.content.timeOut : default_settings.timeOut}
                    onClose={closeAlert}
                    anchorOrigin={default_anchor}
                >
                    <Alert
                        onClose={closeAlert}
                        variant={alert.content.variant ? alert.content.variant : default_settings.variant}
                        severity={alert.content.type ? alert.content.type : default_settings.type}
                        sx={{ width: '100%' }}>
                        {alert.content.msg ? alert.content.msg : default_settings.msg}
                    </Alert>
                </Snackbar>
            }
        </>
    )
}

export default TwAlert