import React, { useState, useEffect } from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Header from './Header/Header';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper'
import SwipeableViews from 'react-swipeable-views';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import SubjList from './SubjList/SubjList';
import ClassList from './ClassList/ClassList';
import { ScheduledClasses } from './ScheduledClasses/ScheduledClasses';
import { Calendar } from './Calendar/Calendar';
import { store } from './Store';

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main:"#8a8a8a"
    },
    secondary: {
      main:"#2e2e2e"
    },
    warning: {
      main:"#d1d1d1"
    }
  },
});

const isMobile = () => window.innerWidth < 1024;

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function TabPanel( props ) {
  const { children, value, index } = props;
  return (
    <div
    hidden={value!=index}>
      {value === index && (children)
      }
    </div>
  )
}

function App(){
  const [currentSubj, selectSubj] = useState('');
  const [mobile, setMobile] = useState(isMobile());
  const [value, setValue] = React.useState(0);
  const { pinnedOnSchedule, themeObj, scheduledClasses, classTitles, removeClass, removeThemeFromObj, removeTitle, addPin, removePin, removeClassFromPinned } = store();
  
  
  console.log(mobile);
  useEffect(() => {
    const handleResize = (e) => {
      const newMobile = isMobile();
      if (mobile !== newMobile) {
        setMobile(newMobile);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mobile]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className="container" style={{height:"88vh"}}>
      <ThemeProvider theme={theme}>
        <Paper style={{height:"100vh"}}>
          <Grid container spacing={2} direction="column">
            <Grid item xs = {12}>
              {<Header/>}
              {mobile && 
                <Paper square>
                  <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth">
                    <Tab label="Subjects & Classes" {...a11yProps(0)} />
                    <Tab label="Scheduled Classes" {...a11yProps(1)} />
                    <Tab label="Calendar" {...a11yProps(2)} />
                  </Tabs>
                </Paper>
              }
            </Grid>
            {!mobile ? 
            <Grid item xs = {12} container spacing={2} style={{height:"96vh"}}> 
              <Grid item xs = {2} style={{maxHeight:"100%", overflow:"auto"}}>
                {currentSubj.length === 0 ? 
                <SubjList
                  onSelection={chosen_subj => selectSubj(chosen_subj)}
                  isMobile={mobile}
                /> 
                : 
                <ClassList
                  current_subj={currentSubj}
                  onBack={() => selectSubj('')}
                  isMobile={mobile}
                />
                }
              </Grid>
              <Grid item xs = {3} style={{maxHeight:"100%", overflow:"auto"}}>
                <ScheduledClasses
                scheduledClasses={scheduledClasses}
                classTitles={classTitles}
                themeObj={themeObj}
                removeClass={removeClass}
                removeThemeFromObj={removeThemeFromObj}
                removeTitle={removeTitle}
                addPin={addPin}
                removePin={removePin}
                removeClassFromPinned={removeClassFromPinned}/>
              </Grid>
              <Grid item xs = {7}>
                <Calendar
                pinned_on_schedule={pinnedOnSchedule}
                theme_obj={themeObj}/>
              </Grid>
            </Grid>
            : <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
              <Grid item style={value===0 ? {maxHeight:"100%", overflow:"auto"}:{display:"none"}}>
              {currentSubj.length === 0 ? 
              <SubjList
                onSelection={chosen_subj => selectSubj(chosen_subj)}
                isMobile={mobile}
              /> 
              : 
              <ClassList
                current_subj={currentSubj}
                onBack={() => selectSubj('')}
                isMobile={mobile}
              />
              }
            </Grid>
            <Grid item style={value===1 ? {maxHeight:"90vh", overflow:"auto"}:{display:"none"}}>
              <ScheduledClasses
              scheduledClasses={scheduledClasses}
              classTitles={classTitles}
              themeObj={themeObj}
              removeClass={removeClass}
              removeThemeFromObj={removeThemeFromObj}
              removeTitle={removeTitle}
              addPin={addPin}
              removePin={removePin}
              removeClassFromPinned={removeClassFromPinned}/>
            </Grid>
            <Grid item 
             style={value===2 ?{display:"block"}:{display:"none"}}>
            <Calendar
             pinned_on_schedule={pinnedOnSchedule}
             theme_obj={themeObj}
             isMobile={mobile}
             />
             </Grid>
            </SwipeableViews>
            } 
          </Grid>
        </Paper>
      </ThemeProvider>
    </div>
  );
}

export default App;

/*
<SwipeableViews
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              {value === 0 && 
               <Grid item style={{maxHeight:"100%", overflow:"auto"}}>
               {currentSubj.length === 0 ? 
               <SubjList
                 onSelection={chosen_subj => selectSubj(chosen_subj)}
                 isMobile={mobile}
               /> 
               : 
               <ClassList
                 current_subj={currentSubj}
                 onBack={() => selectSubj('')}
                 isMobile={mobile}
               />
               }
             </Grid>
             }

             {value === 1 && 
             <Grid item style={{maxHeight:"90vh", overflow:"auto"}}>
               <ScheduledClasses
               scheduledClasses={scheduledClasses}
               classTitles={classTitles}
               themeObj={themeObj}
               removeClass={removeClass}
               removeThemeFromObj={removeThemeFromObj}
               removeTitle={removeTitle}
               addPin={addPin}
               removePin={removePin}
               removeClassFromPinned={removeClassFromPinned}/>
             </Grid>
             }

             {value === 2 && 
             <Calendar
             pinned_on_schedule={pinnedOnSchedule}
             theme_obj={themeObj}
             isMobile={mobile}
             />
             }
            </SwipeableViews>
*/
