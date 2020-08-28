import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import { Themes } from '../Themes/Themes';
import { CalSlots } from '../CalSlots/CalSlots';
//import { updateAllSchedules } from './updateAllSchedules';
import './Calendar.scss';

const days = ['M', 'T', 'W', 'R', 'F'];
const start = 6;
const end = 21;

export const Calendar = React.memo(({ pinned_on_schedule, theme_obj, isMobile }) => {
    const createDispTime = time => {
        const hour = (time / 60) | 0;
        return `${hour > 12 ? hour - 12 : hour}${hour < 12 ? 'a' : 'p'}m`;
    }

    let calheight = "88vh";
    let calwidth = "96%";
    let caltop = "15px";

    if (isMobile) {
        calheight = "83vh";
        calwidth = "87%";
        caltop = "20px";
    }
    
    
    // most calendar jsx and style borrowed from gtscheduler - thanks!
    return (
        <div className="calContainer" style={{height: calheight, maxWidth: calwidth, top: caltop}}>
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
            <div className="slots">
                {pinned_on_schedule.map(indiv_pin => { 
                    return (<CalSlots 
                    key={indiv_pin['ID']}
                    class_to_map={indiv_pin}
                    class_name={indiv_pin['ClassName']}
                    theme_obj={theme_obj}
                    isMobile={isMobile}
                     />)
                })}
            </div>
        </div>
    )
})