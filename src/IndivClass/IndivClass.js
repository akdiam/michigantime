import React, { useState, useMemo, useCallback } from 'react';
import { FormatClass } from './FormatClass';
import { store } from '../Store';
import Accordian from '@material-ui/core/Accordion';
import AccordianSummary from '@material-ui/core/AccordionSummary';
import AccordianDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { TypeAccordian } from './TypeAccordian';
import DeleteIcon from '@material-ui/icons/Delete';
import VpnLockIcon from '@material-ui/icons/VpnLock';
import IconButton from '@material-ui/core/IconButton';
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import { Themes } from '../Themes/Themes';
import './IndivClass.css';

const theme = createMuiTheme({
    typography: {
        subtitle2: {
            fontSize:20,
            fontWeight: 2000,
        },
    }
});

export const IndivClass = React.memo(({ class_name, indiv_scheduled_class, indiv_class_title, indiv_theme, removeClass, removeThemeFromObj, removeTitle, addPin, removePin, removeClassFromPinned }) => {
    const classObj = indiv_scheduled_class;
    const keys = Object.keys(classObj);
    const title = indiv_class_title;

    const COLOR_SCHEME = Themes[indiv_theme];
    const accordianTheme = createMuiTheme({
        overrides: {
            MuiAccordionDetails: {
                root: {
                    padding: '0px 0px 0px',
                },
            },
            MuiButtonBase: {
                root: {
                    backgroundColor: COLOR_SCHEME.dark,
                    color: COLOR_SCHEME.text,
                }
            }
        },
    });

    let dispObj = {};
    for (let key in keys) {
        switch (keys[key]) {
            case 'LEC': dispObj['Lectures'] = FormatClass(classObj[keys[key]], class_name); break;
            case 'DIS': dispObj['Discussions'] = FormatClass(classObj[keys[key]], class_name); break;
            case 'LAB': dispObj['Labs'] = FormatClass(classObj[keys[key]], class_name); break;
            case 'SEM': dispObj['Seminars'] = FormatClass(classObj[keys[key]], class_name); break;
            case 'REC': dispObj['Recitations'] = FormatClass(classObj[keys[key]], class_name); break;
        }
    }

    let is_msg = '';
    if (dispObj == {}) {
        is_msg = 'Independent Study';
    }
    
    const display_keys = Object.keys(dispObj);

    const delClass = event => {
        removeClass(class_name);
        removeThemeFromObj( class_name );
        removeTitle(class_name);
        removeClassFromPinned(class_name);
        event.stopPropagation();
    }

    const takeToAtlas = event => {
        event.stopPropagation();
        const num = class_name.match(/\d+/)[0].trim();
        const subj = class_name.match(/[A-Z]+/)[0].trim();
        const atlasURL = `https://atlas.ai.umich.edu/course/${subj}%20${num}/`;
        window.open(atlasURL);
    }

    return (
        <div className="parent">
            <ThemeProvider theme={accordianTheme}>
            <Grid item xs = {12}>
                <Accordian
                defaultExpanded={true}
                >
                    <AccordianSummary
                    expandIcon={<ExpandMoreIcon/>}
                    >   
                        <ThemeProvider theme={theme}>
                            <Grid container spacing={0} direction="row">
                                <Grid item xs={12}>
                                    <Typography variant="subtitle2">
                                    {class_name} 
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1">
                                    {title}
                                    </Typography>   
                                </Grid>
                            </Grid>
                        </ThemeProvider>
                        <IconButton 
                        onClick={takeToAtlas}>
                            <VpnLockIcon/>
                        </IconButton>
                        <IconButton
                        onClick={delClass}>
                            <DeleteIcon/>
                        </IconButton>
                    </AccordianSummary>
                    <AccordianDetails>
                        <Grid container spacing = {0} direction="row">
                        {is_msg === '' ? 
                        display_keys.map((item, index) => {
                            return (
                                <TypeAccordian
                                display_type={item}
                                display_object={dispObj[item]}
                                key={item}
                                class_name={class_name}
                                colorScheme={COLOR_SCHEME}
                                addPin={addPin}
                                removePin={removePin}/>
                            )
                        }) : 
                        <Grid item xs = {12}>
                        <Typography>{is_msg}sss</Typography> </Grid> }
                        </Grid>
                    </AccordianDetails>
                </Accordian>
            </Grid>
            </ThemeProvider>
        </div>
    )
})