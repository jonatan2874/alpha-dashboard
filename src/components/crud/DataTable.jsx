import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



export default function DataTable() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0");
      setData(response.data.results);
      console.log(response.data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleScroll = (event) => {
    const table = event.target;
    if (table.scrollHeight - table.scrollTop === table.clientHeight) {
      // Llama a tu función cuando se desplaza hasta el final de la tabla
      console.log('Llegaste al final de la tabla');
      fetchData();
    }
  };
  
  const showData = () => {

    return (
            <TableContainer component={Paper} onScroll={handleScroll}  className='max-h-full'>
              <Table stickyHeader >
                <TableHead >
                  <TableRow>
                      { Object.keys(data[0]).map(element => (
                        <TableCell key={element}>{element}</TableCell>
                      ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                {Object.values(data).map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {Object.values(row).map((cell, cellIndex) => (
                      <TableCell key={cellIndex}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
                </TableBody>
              </Table>
            </TableContainer>
    )
  }

  useEffect(() => {
    fetchData();
  }, []);


  

  return data.length > 0 && showData();
}
