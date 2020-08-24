import React, {useState} from 'react';
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

export default function IndivSection({ item, class_name }) {
    const [isActive, toggleActive] = useState(false);

    const { themeObj } = store();
    const theme_arr = Themes();
    const COLOR_SCHEME = theme_arr[themeObj[class_name]];
    const paperTheme = createMuiTheme({
        overrides: {
            MuiPaper: {
                root: {
                    backgroundColor: COLOR_SCHEME.palette.primary.light,
                }
            }
        },
    });

    const handleClick = () => {
        toggleActive(!isActive);
        console.log('clicked');
    }

    return (
        <ThemeProvider theme={paperTheme}>
        <Card className="root" onClick={handleClick}>
            <div className="top">
                <div className="leftt">
                    <ThemeProvider theme={theme}>
                        <Typography variant="subtitle1">
                            {item['Section']} ({item['ID']})
                        </Typography> 
                    </ThemeProvider>
                </div>
                <div className="rightt">
                    {!isActive ? <AddIcon className="icon"/> : <RemoveIcon className="icon"/>}
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
        </ThemeProvider>
    )
}