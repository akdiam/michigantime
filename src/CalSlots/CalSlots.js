import React from 'react';
import {Themes} from '../Themes/Themes';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, ThemeProvider } from '@material-ui/core'

import './CalSlots.scss';

const start = 6*60;
const end = 21*60;

export const CalSlots = React.memo(( { class_to_map, class_name, theme_obj } ) => {
    console.log(class_to_map);
    const COLOR_SCHEME = Themes[theme_obj[class_name]];
    console.log(COLOR_SCHEME);
    const day_arr = class_to_map['DaysArr'];
    const class_start = class_to_map['Time']['start_obj']['hour'] * 60 + class_to_map['Time']['start_obj']['min'];
    const class_end = class_to_map['Time']['end_obj']['hour'] * 60 + class_to_map['Time']['end_obj']['min'];
    const theme = createMuiTheme({
        typography: {
            subtitle2: {
                fontSize:15,
                fontWeight: 2000,
            },
            allVariants: {
                color:COLOR_SCHEME.text,
            }
        }
    });
    return (
        <div className="slot_container">
            {day_arr && class_start !== {} && day_arr.map(day => { 
                return (<div className={'meeting '+day}
                    key={day}
                    style={{
                        top:
                        ((class_start - start) / (end - start)) * 100 +
                        '%',
                        height:
                            ((class_end - class_start) /
                            (end - start)) *
                            100 +
                            '%',
                        backgroundColor: COLOR_SCHEME.dark,
                    }}>
                {       
                    <ThemeProvider theme={theme}>
                        <div className="slot_info">
                            <div classNam="course_info">
                                <div className="course_name">
                                    <Typography variant="subtitle2">{class_to_map['ClassName']} {class_to_map['Type']} {class_to_map['Section']}</Typography>
                                </div>
                            </div>
                            <Typography variant="caption">{class_to_map['TimeString']}{' '+class_to_map['ID']}</Typography>
                            <Typography variant="caption"></Typography>
                            <Typography variant="caption">{class_to_map['Location']} {class_to_map['Instructor']}</Typography>
                        </div>
                    </ThemeProvider>
                }
                </div>
                )}
            )}
        </div>
    )
})