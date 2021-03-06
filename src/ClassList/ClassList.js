import React, {useMemo} from 'react';
import ClassListing from './WN2021';
import InfiniteScroll from 'react-infinite-scroll-component';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core'
import './ClassList.css';
import { ThemeProvider } from '@material-ui/core';
import { store } from '../Store';

const theme = createMuiTheme({
    typography: {
        subtitle2: {
            fontSize:20,
            fontWeight: 2000,
        },
    }
});

export default function ClassList({ current_subj, onBack, isMobile, formText }) {
    const subj_to_find = '(' + current_subj + ')';
    const relevant_classes = ClassListing.filter(subj => subj['Subject'].includes(subj_to_find));
    let seen_nbrs = {};
    const filtered_classes = relevant_classes.filter(subj => {
        if (subj['Catalog Nbr'] in seen_nbrs) {
            return false;
        } else {
            seen_nbrs[subj['Catalog Nbr']] = true;
            return true;
        }
    });

    const gatherAllClasses = (cat_num) => {
        let specific_class_list = relevant_classes.filter(subj => subj['Catalog Nbr'] === cat_num);
        const lecs = specific_class_list.filter(subj => subj['Component'] === 'LEC');
        const discs = specific_class_list.filter(subj => subj['Component'] === 'DIS');
        const labs = specific_class_list.filter(subj => subj['Component'] === 'LAB');
        const sems = specific_class_list.filter(subj => subj['Component'] === 'SEM');
        const recs = specific_class_list.filter(subjs => subjs['Component'] === 'REC');

        const obj = {};
        if (lecs.length !== 0) {
            obj['LEC'] = lecs;
        }
        if (discs.length !== 0) {
            obj['DIS'] = discs;
        }
        if (labs.length !== 0) {
            obj['LAB'] = labs;
        }
        if (sems.length !== 0) {
            obj['SEM'] = sems;
        }
        if (recs.length !== 0) {
            obj['REC'] = recs;
        }
        return obj;
    };

    const { addClass, addTitle, addThemeToObj, availableThemeIndeces, classTitles } = store();
    let real_filtered = filtered_classes.filter(indiv_class => {
        let class_name = current_subj+' '+indiv_class['Catalog Nbr'];
        if (class_name in classTitles) {
            return false;
        }
        else {
            return true;
        }
    })

    // filtering on form search
    let form_num = formText.replace(/\D/g, '');
    console.log(form_num)
    if (form_num.length > 0) {
        real_filtered = real_filtered.filter(indiv_class => {
            let cat_num = indiv_class['Catalog Nbr'];
            if ((cat_num+'').indexOf(form_num) > -1) {
                return true;
            }
            return false;
        });
    }
    let height = "80vh"
    if (isMobile)
        height = "79vh"

    return (
        <div className="classlist">
            <Grid container spacing={2} direction="column">
                <Grid container item xs = {12} justify='center'>
                    <Button
                    variant="contained"
                    size="large"
                    onClick={() => onBack()}>
                        Back to Subjects
                    </Button>
                </Grid>
                <Grid item xs = {12}> 
                    <InfiniteScroll
                    dataLength={real_filtered.length}
                    hasMore={false}
                    height={height}
                    >
                        {real_filtered.map((indiv_class, index) => {
                            return (
                                <Paper elevation={0} style={{margin:5, padding:5, whiteSpace:"nowrap", overflow:"hidden", height:"50px"}} key={index}>
                                    <Button
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    color="secondary"
                                    style={{height:"100%", padding:0}}
                                    onClick={() => {
                                        const class_to_add = gatherAllClasses(indiv_class['Catalog Nbr']);
                                        const class_name = current_subj+' '+indiv_class['Catalog Nbr'];
                                        const class_title = indiv_class['Course Title'];
                                        addClass(class_to_add, class_name);
                                        addTitle(class_title, class_name);
                                        let filtered_theme_indeces = availableThemeIndeces;
                                        let index = filtered_theme_indeces[0];
                                        filtered_theme_indeces.shift();
                                        addThemeToObj(class_name, filtered_theme_indeces, index);
                                    }}
                                    >
                                        <ThemeProvider theme={theme}>
                                            <Grid container spacing={0} direction="column">
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle2">
                                                    {current_subj} {indiv_class['Catalog Nbr']} 
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="caption" noWrap="true">
                                                    {indiv_class['Course Title']}
                                                    </Typography>   
                                                </Grid>
                                            </Grid>
                                        </ThemeProvider>
                                    </Button>
                                </Paper>
                            )
                        })}
                    </InfiniteScroll>
                </Grid>
            </Grid>
        </div>
    )
}