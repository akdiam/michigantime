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

export const IndivSection = React.memo(({ item, class_name, display_type, addPin, removePin }) => {
    const [isActive, toggleActive] = useState(false);
    let pinned = store(useCallback(state => state.pinnedClasses[class_name], [class_name]));

    if (!pinned) {
        pinned = {};
    }
    const handleClick = () => {
        if (!isActive) {
            pinned[display_type] ? pinned[display_type].push(item) : pinned[display_type] = [item];
            addPin(class_name, pinned);
        }
        else {
            const index = pinned[display_type].indexOf(item);
            pinned[display_type].length === 1 ? delete pinned[display_type] : pinned[display_type].splice(index, 1);
            removePin(class_name, pinned);
        }
        toggleActive(!isActive);
    }

    return (
        <Card elevation ={0} className="root" onClick={handleClick}>
            <div className="top">
                <div className="leftt">
                    <ThemeProvider theme={theme}>
                        <Typography variant="subtitle1">
                            {item['Section']} ({item['ID']})
                        </Typography> 
                    </ThemeProvider>
                </div>
                <div className="rightt">
                    {!isActive ? <AddIcon className="add"/> : <RemoveIcon className="rem"/>}
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