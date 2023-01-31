import React from 'react'
import PropTypes from 'prop-types';
import { Button, Box, Tabs, Tab, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { RiFilter2Fill,RiSearch2Line } from 'react-icons/ri'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className=''
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) =>{
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Tickets = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className='flex items-center justify-between gap-y-4 mb-10'>
          <div>
            <h1 className='font-bold text-gray-100 text-xl'>Overview</h1>
            <div className='flex items-center gap-2 text-sm text-gray-500'>
              <Link to="/" className='hover:text-primary transition-colors'>Home</Link>
              <span>-</span>
              <span>Suppor center</span>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <Button 
              variant="contained" 
              startIcon={<RiFilter2Fill />}
              className='bg-secondary-100/50 hover:bg-secondary-100 hover:text-primary transition-colors'
            >
              Filter
            </Button>
            <Button 
              variant="contained" 
              className='bg-primary/90 hover:bg-primary text-black transition-colors'
            >
              create
            </Button>
          </div>
      </div>
      <div className='bg-secondary-100 p-8 rounded-tl-lg rounded-tr-lg grid grid-cols-1 md:grid-cols-2 items-center'>
        <div className='p-8'>
          <h1 className='text-3xl mb-8'>How we can Help You?</h1>
          <form>
            <div className='relative'>
              <RiSearch2Line className='absolute top-1/2 -translate-y-1/2 left-4'/>
              <input 
                type="text" 
                className='bg-secondary-900 outline-none py-2 pr-4 pl-10 rounded-lg placeholder:text-gray-500 w-full' 
                placeholder='search'              
              />
            </div>
          </form>
        </div>
        <div className='flex justify-center'>
          <img src="help.svg" className='w-72 h-72 '/>
        </div>
      </div>

      <div>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="basic tabs example"
          className='bg-secondary-100'
          
          // sx={{
          //   '& .MuiTabs-indicator': { backgroundColor: 'purple' },
          //   '& .MuiTab-root': { color: 'gray-500' },
          //   '& .Mui-selected': { color: 'gray-500' },
          // }}

          classes={{
            indicator : "bg-primary"
          }}
          centered
        >
          <Tab 
            label="Overview"             
            {...a11yProps(0)} 
            classes={{
              root : "text-gray-500",
              selected : "bg-primary  text-black",
            }}
          />
          <Tab 
            label="Tickets" 
            {...a11yProps(1)} 
          />
          <Tab 
            label="FAQ" 
            {...a11yProps(2)} 
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </div>
    </div>
  )
}

export default Tickets