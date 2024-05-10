import {useState} from "react";
import DataTable from "./DataTable";
import Form from "./Form";
export default function Crud({columns,endpoint,form_fields}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Form 
        open={open} 
        setOpen={setOpen} 
        form_fields={form_fields}
      />
      <DataTable 
        columns={columns} 
        endpoint={endpoint}
        form_setOpen={setOpen}
      />
    
    </>
  );
}
