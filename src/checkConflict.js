import moment from 'moment';
import Moment from 'moment';
import { extendMoment } from 'moment-range'; 

export function checkConflict(potential_add, already_added) {
    const mom = extendMoment(Moment);

    let has_conflict = false;
    const days_map = {'M': 1, 'T': 2, 'W': 3, 'R': 4, 'F': 5};
    let already_added_ranges = [];
    let indeces = [];
    for (let i = 0; i < already_added.length; ++i) {
        for (let j = 0; j < already_added[i]['DaysArr'].length; ++j) {
            let innerobj = {};
            const start_hour = already_added[i]['Time']['start_obj']['hour'];
            const start_min = already_added[i]['Time']['start_obj']['min'];
            const end_hour = already_added[i]['Time']['end_obj']['hour'];
            const end_min = already_added[i]['Time']['end_obj']['min'];
            const start = moment({h: start_hour, m: start_min}).day(days_map[already_added[i]['DaysArr'][j]]);
            const end = moment({h: end_hour, m: end_min}).day(days_map[already_added[i]['DaysArr'][j]]);
            const interval = [start, end];
            indeces.push(i);
            already_added_ranges.push(mom.range(interval));
        }
    }

    let potential_added_ranges = [];
    for (let i = 0; i < potential_add['DaysArr'].length; ++i) {
        const start_hour = potential_add['Time']['start_obj']['hour'];
        const start_min = potential_add['Time']['start_obj']['min'];
        const end_hour = potential_add['Time']['end_obj']['hour'];
        const end_min = potential_add['Time']['end_obj']['min'];
        const start = moment({h: start_hour, m: start_min}).day(days_map[potential_add['DaysArr'][i]]);
        const end = moment({h: end_hour, m: end_min}).day(days_map[potential_add['DaysArr'][i]]);
        const interval = [start, end];
        potential_added_ranges.push(mom.range(interval));
    }

    for (let i = 0; i < already_added_ranges.length; ++i) {
        for (let j = 0; j < potential_added_ranges.length; ++j) {
            if (already_added_ranges[i].overlaps(potential_added_ranges[j])) {
                return [true, already_added[indeces[i]]];
            }
        }
    }
    return [false, null];
}