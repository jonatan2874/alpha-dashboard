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
import IconButton from '@mui/material/IconButton';
import { HiDocumentAdd } from "react-icons/hi";




export default function DataTable({columns}) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  console.log(columns)
  const fetchData = async (page,searchTerm) => {
    try {
      const response = await axios.get(`http://localhost/api/index.php?limit=100&page=${page}${searchTerm ? `&search=${searchTerm}` : `` }`);
      if (page === 1) {
        setData(response.data); // Reemplazar datos en la primera página
      } else {
        setData(prevData => [...prevData, ...response.data]); // Concatenar nuevos datos en páginas subsiguientes
      }
      console.log(response.data.length);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleScroll = (event) => {
    const table = event.target;
    if (table.scrollHeight - table.scrollTop === table.clientHeight) {
      // Llama a tu función cuando se desplaza hasta el final de la tabla
      console.log('Llegaste al final de la tabla');
      setPage(prevPage => prevPage + 1)
    }
  };

  const handleSearchChange = (event) => {
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
          <div  className='max-h-full'>
            <div className='flex justify-between items-center'>
              <Button variant="filled" startIcon={<HiDocumentAdd />}>
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
            {/* <TableContainer component={Paper} onScroll={handleScroll}  className='h-full'> */}
              
              <Table stickyHeader >
                <TableHead >
                  <TableRow>
                      { Object.keys(columns).map(element => (
                        <TableCell key={element}>{element}</TableCell>
                      ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.length == 0 ? (
                        <TableRow>
                          <TableCell colSpan={Object.keys(columns).length} align="center">
                            Sin registros
                          </TableCell>
                        </TableRow>
                      ) : (
                        data.map((row, rowIndex) => (
                          <TableRow key={rowIndex}>
                            {Object.values(row).map((cell, cellIndex) => (
                              <TableCell key={cellIndex}>{cell}</TableCell>
                            ))}
                          </TableRow>
                        ))
                      )
                  }
                </TableBody>
              </Table>
            {/* </TableContainer> */}
          </div>
      )
  
}
