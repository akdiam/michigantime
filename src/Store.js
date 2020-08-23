import React from 'react';
import create from 'zustand';

export const store = create(set => ({
    classList: {},
    addClass: ( class_to_add, class_name ) => 
        set(state => ({
            classList: {...state.classList, [class_name]: class_to_add}
        })),
    
}))