import create from 'zustand';
import omit from "lodash-es/omit";
import { checkConflict } from './checkConflict';

export const store = create((set, get) => ({
    scheduledClasses: {},
    classTitles: {},
    themeObj: {},
    pinnedClasses: {},
    pinnedOnSchedule: [],
    availableThemeIndeces: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    hasConflict: false,
    oldClass: {},
    newClass: {},
    pinToRemove: {},
    addClass: ( class_to_add, class_name ) => 
        set(state => ({
            scheduledClasses: {...state.scheduledClasses, [class_name]: class_to_add}
        })),
    addTitle: ( class_title, class_name ) => 
        set(state => ({
            classTitles: {...state.classTitles, [class_name]: class_title}
        })),
    removeTitle: ( class_name ) => 
        set(state => ({
            classTitles: omit(state.classTitles, [class_name])
        })),
    removeClass: ( class_name ) => 
        set(state => ({
            scheduledClasses: omit(state.scheduledClasses, [class_name])
        })),
    removeThemeFromObj: ( class_name, index ) => 
        set(state => ({
            availableThemeIndeces: [...state.availableThemeIndeces, state.themeObj[class_name]],
            themeObj: omit(state.themeObj, [class_name]),
        })),
    addThemeToObj: ( class_name, filtered_theme_indeces, index ) => 
        set(state => ({
            themeObj: {...state.themeObj, [class_name]: index},
            availableThemeIndeces: filtered_theme_indeces
        })),
    addPin: ( class_name, added_pinned, display_type ) => {
        let pinned = get().pinnedClasses;
        let pinned_on_schedule = [];
        pinned[class_name] = added_pinned;
        let has_conflict = false;
        let old_class = {};
        let new_class = {};

        exit:
        for (let classKey in pinned) {
            for (let typeKey in pinned[classKey]) {
                for (let i = 0; i < pinned[classKey][typeKey].length; ++i) {
                    let conflict_arr = checkConflict(pinned[classKey][typeKey][i], pinned_on_schedule);
                    if (conflict_arr[0]) {
                        // if pinned[classKey][typeKey][i] is the newly added class
                        if (pinned[classKey][typeKey][i]['Class Name'] === class_name && 
                            pinned[classKey][typeKey][i]['Type'] === display_type) {
                            old_class = pinned[classKey][typeKey][i];
                            new_class = conflict_arr[1];
                        }
                        // if pinned[classKey][typeKey][i] was in pinned prior to the newly added class
                        else {
                            old_class = conflict_arr[1];
                            new_class = pinned[classKey][typeKey][i];
                        }
                        has_conflict = true;
                        //break exit;
                    }
                    else {
                        if (pinned[classKey][typeKey][i]['TimeString'] !== "ARR")
                            pinned_on_schedule.push(pinned[classKey][typeKey][i]);
                    }
                }
            }
        }
        //if (has_conflict) {pinned_on_schedule = [];}
        set(state => ({
            pinnedClasses: pinned,
            pinnedOnSchedule: pinned_on_schedule,
            hasConflict: has_conflict,
            oldClass: old_class,
            newClass: new_class,
        }))
    },
    resolveConflict: ( old_class, new_class, keep_old_class ) => {
        let pinned_classes = get().pinnedClasses;
        let pinned_on_schedule = get().pinnedOnSchedule;
        const class_types = {'LEC': 'Lectures', 'LAB': 'Labs', 'DIS': 'Discussions', 'REC': 'Recitations', 'SEM': 'Seminars'};
        if (keep_old_class) {
            // delete new class from pinned_classes
            delete pinned_classes[new_class['ClassName']][class_types[new_class['Type']]];
            if (Object.keys(pinned_classes[new_class['ClassName']]).length === 0) {
                delete pinned_classes[new_class['ClassName']];
            }
        }
        else {
            // delete old class from pinned_classes and pinned_on_schedule
            delete pinned_classes[old_class['ClassName']][class_types[old_class['Type']]];
            if (Object.keys(pinned_classes[old_class['ClassName']]).length === 0) {
                delete pinned_classes[old_class['ClassName']];
            }
            for (let i = 0; i < pinned_on_schedule.length; ++i) {
                if (pinned_on_schedule[i]['ClassName'] === old_class['ClassName'] 
                    && pinned_on_schedule[i]['Type'] === old_class['Type']) {
                    pinned_on_schedule.splice(i, 1);
                    break;
                }
            }
            // add new class to pinned_on_schedule
            pinned_on_schedule.push(new_class);
        }
        set(state => ({
            pinnedClasses: pinned_classes,
            pinnedOnSchedule: pinned_on_schedule,
            hasConflict: false,
            oldClass: {},
            newClass: {},
        }))
    },
    removePin: ( class_name, removed_pinned ) => { 
        let pinned = get().pinnedClasses;
        if (Object.keys(removed_pinned).length === 0) {
            delete pinned[class_name];
        } else {
            pinned[class_name] = removed_pinned;
        }

        let pinned_on_schedule = [];
        for (let classKey in pinned) {
            for (let typeKey in pinned[classKey]) {
                for (let i = 0; i < pinned[classKey][typeKey].length; ++i) {
                    if (pinned[classKey][typeKey][i]['TimeString'] !== "ARR") {
                        pinned_on_schedule.push(pinned[classKey][typeKey][i]);
                    }
                }
            }
        }
        /*let has_conflict = false;
        exit:
        for (let classKey in pinned) {
            for (let typeKey in pinned[classKey]) {
                for (let i = 0; i < pinned[classKey][typeKey].length; ++i) {
                    if (checkConflict(pinned[classKey][typeKey][i], pinned_on_schedule)) {
                        has_conflict = true;
                        break exit;
                    }
                    else {
                        if (pinned[classKey][typeKey][i]['TimeString'] !== "ARR")
                            pinned_on_schedule.push(pinned[classKey][typeKey][i]);
                    }
                }
            }
        }*/
        set(state => ({
            pinnedClasses: pinned,
            pinnedOnSchedule: pinned_on_schedule
        }))},
    removeClassFromPinned: ( class_name ) => {
        let pinned_on_schedule = get().pinnedOnSchedule;
        let new_schedule = pinned_on_schedule.filter(cl => { 
            return cl['ClassName'] !== class_name;
        })
        set(state => ({
            pinnedClasses: omit(state.pinnedClasses, [class_name]),
            pinnedOnSchedule: new_schedule
        }))
    },
    updatePinsOnSched: ( class_obj ) => {
        set(state => ({
            pinToRemove: class_obj
        }))
    },
    satisfyPinsOnSched: () => {
        set(state => ({
            pinToRemove: {}
        }))
    },
}))