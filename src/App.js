import React, { useState, useEffect } from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Header from './Header/Header';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SubjList from './SubjList/SubjList';
import ClassList from './ClassList/ClassList';
import ScheduledClasses from './ScheduledClasses/ScheduledClasses';
import Calendar from './Calendar/Calendar';
import { store } from './Store';

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main:"#4a71ff"
    },
    secondary: {
      main:"#2e2e2e"
    },
    warning: {
      main:"#d1d1d1"
    }
  },
});

function App(){
  const [currentSubj, selectSubj] = useState('');

  return (
    <div className="container">
      <ThemeProvider theme={theme}>
        <Paper style={{height:"100vh"}}>
          <Grid container spacing={2} direction="column">
            <Grid item xs = {12}>
              {<Header/>}
            </Grid>
            <Grid item xs = {12} container spacing={2} style={{height:"96vh"}}> 
              <Grid item xs = {2} style={{maxHeight:"100%", overflow:"auto"}}>
                {currentSubj.length === 0 ? 
                <SubjList
                  onSelection={chosen_subj => selectSubj(chosen_subj)}
                /> 
                : 
                <ClassList
                  current_subj={currentSubj}
                  onBack={() => selectSubj('')}
                />
                }
              </Grid>
              <Grid item xs = {3} style={{maxHeight:"100%", overflow:"auto"}}>
                <ScheduledClasses/>
              </Grid>
              <Grid item xs = {7}>
                <Calendar/>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </ThemeProvider>
    </div>
  );
}

export default App;
