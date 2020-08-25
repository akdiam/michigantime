import React from 'react';
import Accordian from '@material-ui/core/Accordion';
import AccordianSummary from '@material-ui/core/AccordionSummary';
import AccordianDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { Themes } from '../Themes/Themes';
import { IndivSection } from './IndivSection'; 
import { store } from '../Store';

const theme = createMuiTheme({
    typography: {
        subtitle2: {
            fontSize:15,
            fontWeight: 1000,
        },
        subtitle1: {
            fontSize:18,
            fontWeight:1200,
        }
    },
});

/*const accordianTheme = createMuiTheme({
    overrides: {
        MuiButtonBase: {
            root: {
                backgroundColor: '#a8a8a8',
            }
        }
    },
});*/

export const TypeAccordian = React.memo(({ display_type, display_object, class_name, colorScheme }) => {
    //const { themeObj } = store();
    const COLOR_SCHEME = colorScheme;
    
    const accordianTheme = createMuiTheme({
        overrides: {
            MuiButtonBase: {
                root: {
                    backgroundColor: COLOR_SCHEME.light,
                }
            }
        },
    });

    return (
        <Grid item xs = {12}>
            <ThemeProvider theme={accordianTheme}>
            <Accordian
            defaultExpanded={true}>
                <AccordianSummary
                expandIcon={<ExpandMoreIcon/>}
                >
                <ThemeProvider theme={theme}>
                    <Typography variant="subtitle1">{display_type}</Typography>
                </ThemeProvider>
                </AccordianSummary>
                <AccordianDetails>
                    <Grid container spacing={0} direction="column">
                        {display_object.map((item, index) => {
                            return (
                                <Grid item xs = {12} key={index}>
                                    <IndivSection
                                    item={item}
                                    class_name={class_name}
                                    key={item}
                                    color_scheme={COLOR_SCHEME}/>
                                </Grid>
                            )
                        })}
                    </Grid>
                </AccordianDetails>
            </Accordian>
            </ThemeProvider>
        </Grid>
    )
})