import create from 'zustand';

export const store = create(set => ({
    scheduledClasses: {},
    classTitles: {},
    addClass: ( class_to_add, class_name ) => 
        set(state => ({
            scheduledClasses: {...state.scheduledClasses, [class_name]: class_to_add}
        })),
    addTitle: ( class_title, class_name ) => 
        set(state => ({
            classTitles: {...state.classTitles, [class_name]: class_title}
        })),
    removeClass: ( filtered_scheduled ) => 
        set(state => ({
            scheduledClasses: filtered_scheduled
        })),
    
}))