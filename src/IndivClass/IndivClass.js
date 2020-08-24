import React, { useState } from 'react';
import { FormatClass } from './FormatClass';
import { store } from '../Store';
import Accordian from '@material-ui/core/Accordion';
import AccordianSummary from '@material-ui/core/AccordionSummary';
import AccordianDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import TypeAccordian from './TypeAccordian';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { createMuiTheme, ThemeProvider } from '@material-ui/core'

const theme = createMuiTheme({
    typography: {
        subtitle2: {
            fontSize:20,
            fontWeight: 2000,
        },
    }
});

export default function IndivClass({ class_name }) {
    const { scheduledClasses, classTitles, removeClass } = store();
    const classObj = scheduledClasses[class_name];
    const keys = Object.keys(classObj);
    const title = classTitles[class_name];
    const [isExpanded, changeExpansion] = useState(true);
    
    let dispObj = {};
    for (let key in keys) {
        switch (keys[key]) {
            case 'LEC': dispObj['Lectures'] = FormatClass(classObj[keys[key]]); break;
            case 'DIS': dispObj['Discussions'] = FormatClass(classObj[keys[key]]); break;
            case 'LAB': dispObj['Labs'] = FormatClass(classObj[keys[key]]); break;
            case 'SEM': dispObj['Seminars'] = FormatClass(classObj[keys[key]]); break;
            case 'REC': dispObj['Recitations'] = FormatClass(classObj[keys[key]]); break;
        }
    }

    let is_msg = '';
    if (dispObj == {}) {
        is_msg = 'Independent Study';
    }
    
    const display_keys = Object.keys(dispObj);

    const delClass = () => {
        let temp_classes = scheduledClasses;
        delete temp_classes[class_name];
        removeClass(temp_classes);
    }

    return (
        <div className="parent">
            {isExpanded ? 
            <Grid item xs = {12}>
                <Accordian
                defaultExpanded={true}>
                    <AccordianSummary
                    expandIcon={<ExpandMoreIcon/>}
                    >   
                        <ThemeProvider theme={theme}>
                            <Grid container spacing={0} direction="column">
                                <Grid item xs={12}>
                                    <Typography variant="subtitle2">
                                    {class_name} 
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="caption">
                                    {title}
                                    </Typography>   
                                </Grid>
                            </Grid>
                        </ThemeProvider>
                        <IconButton
                        onClick={delClass}>
                            <DeleteIcon/>
                        </IconButton>
                    </AccordianSummary>
                    <AccordianDetails>
                        <Grid container spacing = {2} direction="row">
                        {is_msg === '' ? 
                        display_keys.map((item, index) => {
                            return (
                                <TypeAccordian
                                display_type={item}
                                display_object={dispObj[item]}/>
                            )
                        }) : 
                        <Grid item xs = {12}>
                        <Typography>{is_msg}sss</Typography> </Grid> }
                        </Grid>
                    </AccordianDetails>
                </Accordian>
            </Grid>
            :
            <div>{class_name}: {title}</div>}
        </div>
    )
}