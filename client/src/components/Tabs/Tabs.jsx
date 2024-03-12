import React from 'react'
import Style from './Tabs.module.css';
import { Tab, Tabs } from '@mui/material';


const CustomTabs = ({ tabs }) => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={Style.container}>
            <div className={Style.tab_container}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant='scrollable'
                    scrollButtons='auto'
                >
                    {tabs?.map((item, i) => (
                        <Tab icon={item.icon} iconPosition='start' key={i} label={item.label} />
                    ))}
                </Tabs>
            </div>

            {tabs?.map(({ component }, i) => (
                <TabPanel value={value} index={i} key={i}>
                    {component}
                </TabPanel>
            ))}

        </div>
    )
}

function TabPanel(props) {
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
                <>
                    {children}
                </>
            )}
        </div>
    );
}

export default CustomTabs