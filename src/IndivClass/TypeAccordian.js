import React from 'react';
import Accordian from '@material-ui/core/Accordion';
import AccordianSummary from '@material-ui/core/AccordionSummary';
import AccordianDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

export default function TypeAccordian({ display_type, display_object }) {

    return (
        <Grid item xs = {12}>
            <Accordian
            defaultExpanded={true}>
                <AccordianSummary
                expandIcon={<ExpandMoreIcon/>}
                >
                <Typography>{display_type}</Typography>
                </AccordianSummary>
                <AccordianDetails>
                    <Grid container spacing={0} direction="column">
                        {display_object.map((item, index) => {
                            return (
                                <Grid item xs = {12}>
                                    <Typography>
                                        {item['Section']} {item['DaysString']}
                                    </Typography>
                                </Grid>
                            )
                        })}
                    </Grid>
                </AccordianDetails>
            </Accordian>
        </Grid>
    )
}