import React from 'react';
import Typography from '@material-ui/core/Typography';
import { store } from '../Store';
import IndivClass from '../IndivClass/IndivClass';
import Grid from '@material-ui/core/Grid';

export default function ScheduledClasses() {
    const { scheduledClasses } = store();
    let keys = Object.keys(scheduledClasses);
    return (
        <div className="parent">
            {keys.length !== 0 ? 
                <div className="scroller">
                {keys.reverse().map((item, index) => {
                    return (
                        <Grid container spacing={0} direction="column" key={item}>
                            <IndivClass
                            class_name={item}
                            key={item}
                            />
                        </Grid>
                    )
                })}
                </div>
                :
                <div className="warning-msg">
                    <Typography>
                        If you see a '?' next to a section, that section is not on the LSA Course Guide
                    </Typography>
                </div>
            }
        </div>
    )
}