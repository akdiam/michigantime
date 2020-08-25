import React, { useState, useCallback } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
//import { updateAllSchedules } from './updateAllSchedules';
import './Calendar.scss';

const days = ['M', 'T', 'W', 'R', 'F'];
const start = 7;
const end = 21;

export const Calendar = React.memo(({ pinned_classes, pinned_on_schedule, update_pinned_sched }) => {
    const [currIndex, updateIndex] = useState(0);
    const createDispTime = time => {
        const hour = (time / 60) | 0;
        return `${hour > 12 ? hour - 12 : hour}${hour < 12 ? 'a' : 'p'}m`;
    }

    let pinnedClasses = pinned_classes;
    let pinnedOnSchedule = pinned_on_schedule;

    // calendar jsx and style borrowed from gtscheduler - thanks!
    return (
        <Grid container spacing={1} direction="row" alignItems="center">
            <Grid item xs = {12} alignItems="stretch">
                <div className="calContainer">
                    <div className="times">
                    {new Array((end - start)).fill(0).map((_, i) => {
                        const time = start * 60 + i * 60;
                        return (    
                        <div className="time" key={time}>
                            <span className="label">
                                <Typography variant="caption">
                                {createDispTime(time)}
                                </Typography>
                            </span>
                        </div>
                        );
                    })}
                    </div>
                    <div className="days">
                        {days.map((day, i) => {
                            return (
                                <div className="day"> 
                                    <span className="dayLabel">
                                        <Typography>
                                            {day} 
                                        </Typography>
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </Grid>
            <Grid container item xs={12} alignItems="center" spacing={1} justify="center">
                <Grid item>
                    <IconButton>{<ArrowBackIcon style={{fontSize:"medium"}}/>}</IconButton>
                </Grid>
                <Grid item>
                    <IconButton>{<ArrowForwardIcon style={{fontSize:"medium"}}/>}</IconButton>
                </Grid>
            </Grid>
        </Grid>
    )
})