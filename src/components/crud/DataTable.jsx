import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { HiDocumentAdd,HiPencil,HiXCircle   } from "react-icons/hi";




export default function DataTable({columns,endpoint,form_setOpen}) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [isLazyLoading, setIsLazyLoading] = useState(false);


  // console.log(columns)
  const fetchData = async (page,searchTerm) => {
    setIsLazyLoading(true)
    try {
      const response = await axios.get(`${endpoint}?limit=100&page=${page}${searchTerm ? `&search=${searchTerm}` : `` }`);
      if (page === 1) {
        setData(response.data); // Reemplazar datos en la primera página
      } else {
        setData(prevData => [...prevData, ...response.data]); // Concatenar nuevos datos en páginas subsiguientes
      }
      // console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLazyLoading(false)
  };

  const handleScroll = (event) => {
    const table = event.target;
    if (table.scrollHeight - table.scrollTop === table.clientHeight) {
      setPage(prevPage => prevPage + 1)
    }
  };

  const handleSearchChange = (event) => {
    setIsLazyLoading(true)
    setData([])
    const { value } = event.target;
    setSearchTerm(value);
    clearTimeout(searchTimeout);
    const timeout = setTimeout(() => {
      fetchData(1, value);
    }, 800); // Espera 500 milisegundos antes de realizar la búsqueda
    setSearchTimeout(timeout);
  };
  
  useEffect(() => {
    fetchData(page); // Llamar a fetchData cuando cambie el número de página
  }, [page]);

  return (
          <div className='h-full'>
            <div className='flex justify-between items-center h-16'>
              <Button variant="filled" onClick={()=>form_setOpen(true)} startIcon={<HiDocumentAdd />}>
                Agregar
              </Button>

              <TextField
                id="filled-search"
                label="Buscar"
                type="search"
                variant="filled"
                onChange={handleSearchChange}
              />
            </div>
              <TableContainer component={Paper} onScroll={handleScroll} sx={{ overflowY: 'auto', height: 'calc(100% - 4rem)' }} >
                <Table stickyHeader >
                  <TableHead >
                    <TableRow>
                        { Object.keys(columns).map(element => (
                          <TableCell key={element}>{element}</TableCell>
                        ))}
                          <TableCell key="edit"></TableCell>
                          <TableCell key="delete"></TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.isArray(data) &&  data.map((row, rowIndex) => (
                        <TableRow key={rowIndex} hover >
                          { Object.keys(columns).map(element => (
                            <TableCell key={element}>{row[element]}</TableCell>
                          ))}
                            <TableCell key={rowIndex+1}>
                              <HiPencil title="Editar" className='text-xl cursor-pointer'/>
                            </TableCell>
                            <TableCell key={rowIndex+2}>
                              <HiXCircle title='Eliminar' className='text-xl cursor-pointer'/>
                            </TableCell>

                        </TableRow>
                      ))}    
                    {isLazyLoading ? (
                      <TableRow>
                        <TableCell colSpan={Object.keys(columns).length+2} align="center">
                          <div className='flex items-center justify-center'>
                            cargando 
                            <div className="animate-bounce w-6 text-5xl">.</div>
                            <div className="animate-bounce w-6 text-5xl" style={{ animationDelay: '0.2s' }}>.</div>
                            <div className="animate-bounce w-6 text-5xl"  style={{ animationDelay: '0.4s' }}>.</div>
                          </div>
                        </TableCell>
                      </TableRow>
                      ) : null
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
      )
  
}
