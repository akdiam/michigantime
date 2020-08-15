import React, {useState} from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Header from './Header/Header';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SubjList from './SubjList/SubjList';
import ClassList from './ClassList/ClassList';

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
  const [classList, updateList] = useState({});

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
                  current_classes={classList}
                  onSelect={class_list => updateList(class_list)}
                  current_subj={currentSubj}
                  onBack={() => selectSubj('')}
                />
                }
              </Grid>
              <Grid item xs = {2}>
                <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Varius sit amet mattis vulputate enim nulla aliquet porttitor lacus. Sed ullamcorper morbi tincidunt ornare massa eget egestas. Fringilla ut morbi tincidunt augue interdum velit. Nunc id cursus metus aliquam. Quisque id diam vel quam elementum pulvinar etiam. Nunc id cursus metus aliquam eleifend. Ipsum consequat nisl vel pretium lectus quam. Ut tellus elementum sagittis vitae et leo duis ut. Etiam dignissim diam quis enim lobortis scelerisque fermentum dui. Enim ut tellus elementum sagittis vitae et leo. Viverra orci sagittis eu volutpat odio facilisis mauris. Ut eu sem integer vitae. Mauris pharetra et ultrices neque ornare. At ultrices mi tempus imperdiet nulla. Augue mauris augue neque gravida in. Euismod nisi porta lorem mollis aliquam ut porttitor. Risus feugiat in ante metus dictum at tempor
                </Typography>
              </Grid>
              <Grid item xs = {8}>
                <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Varius sit amet mattis vulputate enim nulla aliquet porttitor lacus. Sed ullamcorper morbi tincidunt ornare massa eget egestas. Fringilla ut morbi tincidunt augue interdum velit. Nunc id cursus metus aliquam. Quisque id diam vel quam elementum pulvinar etiam. Nunc id cursus metus aliquam eleifend. Ipsum consequat nisl vel pretium lectus quam. Ut tellus elementum sagittis vitae et leo duis ut. Etiam dignissim diam quis enim lobortis scelerisque fermentum dui. Enim ut tellus elementum sagittis vitae et leo. Viverra orci sagittis eu volutpat odio facilisis mauris. Ut eu sem integer vitae. Mauris pharetra et ultrices neque ornare. At ultrices mi tempus imperdiet nulla. Augue mauris augue neque gravida in. Euismod nisi porta lorem mollis aliquam ut porttitor. Risus feugiat in ante metus dictum at tempor
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </ThemeProvider>
    </div>
  );
}

export default App;
