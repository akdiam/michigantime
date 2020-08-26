import React from 'react';
import { ClassNames } from '../ClassNames';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { createMuiTheme, ThemeProvider, Typography } from '@material-ui/core';
import './SubjList.css';
import InfiniteScroll from 'react-infinite-scroll-component';

const theme = createMuiTheme({
    typography: {
        subtitle2: {
            fontSize:20,
            fontWeight: 2000,
        },
    }
})

export default function ClassList({ onSelection }) {
    return (
        <div className="subjlist">
            <InfiniteScroll
            dataLength={ClassNames.length}
            hasMore={false}
            height={"92vh"}
            >
                {ClassNames.map((indiv_class, index) => {
                    return (
                    <Paper elevation={0} style={{margin:5, padding:5, whiteSpace:"nowrap", overflow:"hidden"}} key={index}>
                        <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        size="large"
                        style={{height:"100%", padding:-5}}
                        onClick={() => {
                                onSelection(indiv_class);
                            }
                        } 
                        >   
                            <ThemeProvider theme={theme}>
                                <Typography variant="subtitle2">
                                    {indiv_class}
                                </Typography>
                            </ThemeProvider>
                        </Button>
                    </Paper>
                    )
                })}
            </InfiniteScroll>
        </div>
    )
}