import {useEffect,useRef,useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
}
 from '@mui/material';
import { TwButton } from '../ui/Button';
import Field from './Field';

 const Form = ({open,setOpen,form_fields,style})=> {
  const {
    handleSubmit,
    control,
    setValue,
    // reset,
    formState: { errors },
  } = useForm();
  const [apiLoader, setApiLoader] = useState(false);

  // const { handleSubmit, control } = useForm()
  const handleClose = () => {
    setOpen(false);
  };
  // console.log(form_fields);
  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  useEffect(()=>{
    console.log(control)
  },[control])

   /**
 * Se ejecuta al enviar el formulario
 */
  const onSubmit = async (formData) => {
    console.log(formData)
    return
    setApiLoader(true);
    axios.put(`${endpoint}`, formData).then(resp => {

      setApiLoader(false);

      // Genera la alerta dependiendo del estado de la petición
      alert_methods.show(alert_status_description(resp.status));
      fetchData();

    }).catch(error => {
      alert_methods.show(alert_status_description(error.response.status));
      setApiLoader(false);
    });
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll='paper'
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="scroll-dialog-title">Formulario</DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              <div className={style? style : 'grid md:grid-cols-2 sm:grid-cols-1 max-w-4xl mx-auto max-w-5xl gap-3'}>
                {Object.keys(form_fields).map(field => (
                    <Field 
                      key        = {field}
                      id         = {field}
                      type       = {form_fields[field].type}
                      alias      = {form_fields[field].alias}
                      value      = {form_fields[field].value || ''}
                      validation = {form_fields[field].validation}
                      control    = {control}
                      errors     = {errors}
                    />
                ))}
              </div>

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <TwButton loading={apiLoader} type="submit">Guardar</TwButton>
            <Button  onClick={handleClose}>Cancelar</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default Form;