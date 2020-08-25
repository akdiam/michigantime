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

export const IndivSection = React.memo(({ item, class_name, color_scheme }) => {
    const [isActive, toggleActive] = useState(false);

    //const { themeObj } = store();
    const COLOR_SCHEME = color_scheme;
    /*const paperTheme = createMuiTheme({
        overrides: {
            MuiPaper: {
                root: {
                    backgroundColor: COLOR_SCHEME.light,
                }
            }
        },
    });*/

    const handleClick = () => {
        toggleActive(!isActive);
    }

    return (
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