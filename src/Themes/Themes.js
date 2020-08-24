import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';

// 200 400 700
// red

export function Themes() {
    let theme_arr = [];
    const c1 = createMuiTheme({
        palette: {
            primary: {
                light: '#EF9A9A',
                main: '#EF5350',
                dark: '#D32F2F',
            }
        }
    });
    theme_arr.push(c1);
    
    // pink
    const c2 = createMuiTheme({
        palette: {
            primary: {
                light: '#F48FB1',
                main: '#EC407A',
                dark: '#C2185B',
            }
        }
    });
    theme_arr.push(c2);
    
    // purple
    const c3 = createMuiTheme({
        palette: {
            primary: {
                light: '#CE93D8',
                main: '#AB47BC',
                dark: '#7B1FA2',
            }
        }
    });
    theme_arr.push(c3);
    
    // deep purple
    const c4 = createMuiTheme({
        palette: {
            primary: {
                light: '#9575CD',
                main: '#673AB7',
                dark: '#4527A0',
            }
        }
    });
    theme_arr.push(c4);
    
    // indigo
    const c5 = createMuiTheme({
        palette: {
            primary: {
                light: '#7986CB',
                main: '#3F51B5',
                dark: '#283593',
            }
        }
    });
    theme_arr.push(c5);
    
    // blue
    const c6 = createMuiTheme({
        palette: {
            primary: {
                light: '#E3F2FD',
                main: '#90CAF9',
                dark: '#2196F3',
            }
        }
    });
    theme_arr.push(c6);
    
    // light blue
    const c7 = createMuiTheme({
        palette: {
            primary: {
                light: '#2196F3',
                main: '#0277BD',
                dark: '#01579B',
            }
        }
    });
    theme_arr.push(c7);
    
    // cyan
    const c8 = createMuiTheme({
        palette: {
            primary: {
                light: '#80DEEA',
                main: '#26C6DA',
                dark: '#00ACC1',
            }
        }
    });
    theme_arr.push(c8);
    
    // teal
    const c9 = createMuiTheme({
        palette: {
            primary: {
                light: '#009688',
                main: '#00796B',
                dark: '#004D40',
            }
        }
    });
    theme_arr.push(c9);
    
    // green
    const c10 = createMuiTheme({
        palette: {
            primary: {
                light: '#C8E6C9',
                main: '#81C784',
                dark: '#4CAF50',
            }
        }
    });
    theme_arr.push(c10);
    
    // light green
    const c11 = createMuiTheme({
        palette: {
            primary: {
                light: '#C5E1A5',
                main: '#9CCC65',
                dark: '#689F38',
            }
        }
    });
    theme_arr.push(c11);
    
    // lime 
    const c12 = createMuiTheme({
        palette: {
            primary: {
                light: '#E6EE9C',
                main: '#D4E157',
                dark: '#AFB42B',
            }
        }
    });
    theme_arr.push(c12);
    
    // yellow 
    const c13 = createMuiTheme({
        palette: {
            primary: {
                light: '#FFF59D',
                main: '#FFEE58',
                dark: '#FBC02D',
            }
        }
    });
    theme_arr.push(c13);
    
    // amber 
    const c14 = createMuiTheme({
        palette: {
            primary: {
                light: '#FFF8E1',
                main: '#FFE082',
                dark: '#FFC107',
            }
        }
    });
    theme_arr.push(c14);
    
    // orange
    const c15 = createMuiTheme({
        palette: {
            primary: {
                light: '#FFD180',
                main: '#FFAB40',
                dark: '#FF9100',
            }
        }
    });
    theme_arr.push(c15);
    
    // deep orange
    const c16 = createMuiTheme({
        palette: {
            primary: {
                light: '#FFCCBC',
                main: '#FF8A65',
                dark: '#FF5722',
            }
        }
    });
    theme_arr.push(c16);
    
    // brown 
    const c17 = createMuiTheme({
        palette: {
            primary: {
                light: '#A1887F',
                main: '#795548',
                dark: '#5D4037',
            }
        }
    });
    theme_arr.push(c17);
    
    // grey
    const c18 = createMuiTheme({
        palette: {
            primary: {
                light: '#EEEEEE',
                main: '#BDBDBD',
                dark: '#9E9E9E',
            }
        }
    });
    theme_arr.push(c18);
    
    // blue grey
    const c19 = createMuiTheme({
        palette: {
            primary: {
                light: '#78909C',
                main: '#546E7A',
                dark: '#37474F',
            }
        }
    });
    theme_arr.push(c19);

    return theme_arr;
}
