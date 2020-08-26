import React, {useState, useCallback} from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { store } from '../Store';
import { Themes } from '../Themes/Themes';
import './TypeAccordian.scss';

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
    }
});

export const IndivSection = React.memo(({ item, class_name, display_type, addPin, removePin, pinnedArr, updatePinned, index }) => {
    console.log(`${class_name} rendered`)
    let pinned = store(useCallback(state => state.pinnedClasses[class_name], [class_name]));
    if (!pinned) {
        pinned = {};
    }
    const handleClick = () => {
        let new_pinned = [...pinnedArr];
        new_pinned.fill(false);
        if (pinnedArr[index] === false) {
            pinned[display_type] = [item];
            //all_pinned[class_name] = pinned;
            console.log(pinnedArr[index])
            new_pinned[index] = true;
            addPin(class_name, pinned, display_type);
            updatePinned(new_pinned);
        }
        else {
            delete pinned[display_type];
            removePin(class_name, pinned);
            updatePinned(new_pinned);
        }
        //toggleActive(!isActive);
    }

    return (
        <Card elevation={6} raised className="root" onClick={handleClick}>
            <div className="top">
                <div className="leftt">
                    <ThemeProvider theme={theme}>
                        <Typography variant="subtitle1">
                            {item['Section']} ({item['ID']})
                        </Typography> 
                    </ThemeProvider>
                </div>
                <div className="rightt">
                    {pinnedArr[index]===false ? <AddIcon size="large" className="add"/> : <RemoveIcon className="rem"/>}
                </div>
            </div>
            <div className="bottom">
                <ThemeProvider theme={theme}>
                    <Typography variant="subtitle2" className="leftb">
                        {item['Location']}
                    </Typography> 
                    <Typography variant="subtitle2" className="rightb">
                        {item['DaysString']}   {item['TimeString']}
                    </Typography>
                </ThemeProvider>
            </div>
        </Card>
    )
})