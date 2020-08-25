import React from 'react';
import Typography from '@material-ui/core/Typography';
import { store } from '../Store';
import { IndivClass } from '../IndivClass/IndivClass';
import Grid from '@material-ui/core/Grid';

export const ScheduledClasses = React.memo(() => {
    const { scheduledClasses, classTitles, themeObj, removeClass, removeThemeFromObj, removeTitle, addPin, removePin, removeClassFromPinned } = store();
    //const removeClass = state => state.removeClass;
    let keys = Object.keys(scheduledClasses);
    return (
        <div className="parent">
            {keys.length !== 0 ? 
                <div className="scroller">
                    <Grid container spacing={0} direction="column">
                    {keys.reverse().map((item, index) => {
                    return (
                            <IndivClass
                            class_name={item}
                            key={item}
                            indiv_scheduled_class={scheduledClasses[item]}
                            indiv_class_title={classTitles[item]}
                            indiv_theme={themeObj[item]}
                            removeClass={removeClass}
                            removeThemeFromObj={removeThemeFromObj}
                            removeTitle={removeTitle}
                            addPin={addPin}
                            removePin={removePin}
                            removeClassFromPinned={removeClassFromPinned}
                            />
                        )
                    })}
                </Grid>
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
})