import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Typography, Toolbar, Button } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';

export default function Header() {
    const handleClick = (event) => {
        event.stopPropagation();
        const githubURL = 'https://github.com/akdiam/michigantime';
        window.open(githubURL);
    }
    return (
        <div className="header">
            <AppBar position="static" style={{height:"4vh"}} color="secondary">
                <Toolbar>
                    <Typography variant="h6" style={{paddingBottom:'25px'}}>michigantime</Typography>
                    <Button onClick={handleClick} color="inherit" style={{paddingBottom:'30px'}}><GitHubIcon/></Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}