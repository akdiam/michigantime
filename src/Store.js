import create from 'zustand';

export const store = create(set => ({
    scheduledClasses: {},
    classTitles: {},
    themeObj: {},
    availableThemeIndeces: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    addClass: ( class_to_add, class_name ) => 
        set(state => ({
            scheduledClasses: {...state.scheduledClasses, [class_name]: class_to_add}
        })),
    addTitle: ( class_title, class_name ) => 
        set(state => ({
            classTitles: {...state.classTitles, [class_name]: class_title}
        })),
    removeTitle: ( new_class_titles ) => 
        set(state => ({
            classTitles: new_class_titles
        })),
    removeClass: ( filtered_scheduled ) => 
        set(state => ({
            scheduledClasses: filtered_scheduled
        })),
    removeThemeFromObj: ( filtered_obj, index ) => 
        set(state => ({
            themeObj: filtered_obj,
            availableThemeIndeces: [...state.availableThemeIndeces, index]
        })),
    addThemeToObj: ( class_name, filtered_theme_indeces, index ) => 
        set(state => ({
            themeObj: {...state.themeObj, [class_name]: index},
            availableThemeIndeces: filtered_theme_indeces
        }))
}))