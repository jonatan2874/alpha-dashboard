import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from 'react';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export function TwTabs({ tabs = [], tabsComponents = [] }) {

    /* 
        Structure
        tabs: [ 'Label 1', 'Label 2', 'etc' ]
        tabsComponents : [ <MyComponent1 />, <MyComponent2 />,<Etc /> ]
    */

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', marginTop: '20px' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    {
                        tabs.map((tab, index) => <Tab key={index} label={<h1 className='text-sm font-semibold'>{tab}</h1>} {...a11yProps(index)} />)
                    }
                </Tabs>
            </Box>
            {
                tabsComponents.map((component, index) =>
                    <CustomTabPanel key={index} value={value} index={index}>
                        {component}
                    </CustomTabPanel>)
            }
        </Box>
    );
}