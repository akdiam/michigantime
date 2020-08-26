import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Typography, Toolbar } from '@material-ui/core';

export default function Header() {
    return (
        <div className="header">
            <AppBar position="static" style={{height:"4vh"}} color="secondary">
                <Toolbar><Typography variant="h6" style={{paddingBottom:'25px'}}>michigantime</Typography></Toolbar>
            </AppBar>
        </div>
    )
}