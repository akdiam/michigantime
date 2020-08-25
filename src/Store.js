import create from 'zustand';
import omit from "lodash-es/omit";

export const store = create(set => ({
    scheduledClasses: {},
    classTitles: {},
    themeObj: {},
    pinnedClasses: {},
    availableThemeIndeces: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
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
    addPin: ( class_name, added_pinned ) =>
        set(state => {
            state.pinnedClasses[class_name] = added_pinned;
        }),
    removePin: ( class_name, removed_pinned ) =>
        set(state => {
            state.pinnedClasses[class_name] = removed_pinned
        }),
    removeClassFromPinned: ( class_name ) => 
        set(state => ({
            pinnedClasses: omit(state.pinnedClasses, [class_name])
        })),
}))