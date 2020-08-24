export function FormatClass( raw_section_info ) {
    const formatTime = unformattedTime => {
        if (unformattedTime === "ARR") {
            return null
        }

        let start = unformattedTime.substr(0, unformattedTime.indexOf('-'))
        let end = unformattedTime.split(/[- ABCDEFGHIJKLMNOPQRSTUVWXYZ]/)[1]
        let ampm = unformattedTime.split(/[- 0123456789]/).slice(-1)[0]
        let start_hour
        let start_min
        let end_hour
        let end_min

        if (start.length > 2) {
            if (start.length === 3) {
                start_hour = parseInt(start[0]);
                start_min = parseInt(start[1]+start[2]);
            } else {
                start_hour = parseInt(start[0]+start[1]);
                start_min = parseInt(start[2]+start[3]);
            }
        } else {
            start_hour = parseInt(start);
            start_min = 0;
        }
        if (end.length > 2) {
            if (end.length === 3) {
                end_hour = parseInt(end[0]);
                end_min = parseInt(end[1]+end[2]);
            } else {
                end_hour = parseInt(end[0]+end[1]);
                end_min = parseInt(end[2]+end[3]);
            }
        } else {
            end_hour = parseInt(end);
            end_min = 0;
        }

        if (start_hour >= 8 && start_hour <= 12 && end_hour > 0 && end_hour <= 9 && ampm === "PM") {
            end_hour += 12;
        } if (start_hour > 0 && start_hour <= 8 && ampm === "PM") {
            start_hour += 12;
            end_hour += 12;
        }

        let start_obj = {}
        let end_obj = {}
        start_obj["hour"] = start_hour;
        start_obj["min"] = start_min;
        end_obj["hour"] = end_hour;
        end_obj["min"] = end_min;
        return ({ 
            start_obj, end_obj
        })
    }

    const formatTimeString = rawTime => {
        if (!rawTime) {
            return 'ARR';
        }

        const start = rawTime['start_obj'];
        const end = rawTime['end_obj'];


        let start_string = start['hour'] > 12 ? start['hour'] - 12 : start['hour'];
        let end_string = end['hour'] > 12 ? end['hour'] - 12 : end['hour'];
        
        start_string += `:${start['min'] === 0 ? '00' : start['min']}`;
        end_string += `:${end['min'] === 0 ? '00' : end['min']}${end['hour'] < 12 ? ' a' : ' p'}m`;
        return `${start_string} - ${end_string}`;
    }   

    const formatDaysArr = rawInfo => {
        let days_arr = [];

        if (rawInfo['M'] === 'M') {
            days_arr.push('M');
        }
        if (rawInfo['T'] === 'T') {
            days_arr.push('T');
        }
        if (rawInfo['W'] === 'W') {
            days_arr.push('W');
        }
        if (rawInfo['TH'] === 'TH') {
            days_arr.push('R');
        }
        if (rawInfo['F'] === 'F') {
            days_arr.push('F');
        }
            
        return days_arr;
    }

    const formatDaysString = daysArr => {
        let daysString = '';
        for (let i = 0; i < daysArr.length; ++i) {
            daysString += daysArr[i];
        }
        if (daysString === '') {
            daysString = "ARR";
        }
        return daysString;
    }
        
    // want: time, days, instructor, location, credits, section no, class no
    let all_formatted_info = [];
    for (let i = 0; i < raw_section_info.length; ++i) {
        let indiv_formatted_info = {};
        indiv_formatted_info['Time'] = formatTime(raw_section_info[i]['Time']);
        indiv_formatted_info['TimeString'] = formatTimeString(indiv_formatted_info['Time']);
        indiv_formatted_info['DaysArr'] = formatDaysArr(raw_section_info[i]);
        indiv_formatted_info['DaysString'] = formatDaysString(indiv_formatted_info['DaysArr']);
        indiv_formatted_info['Instructor'] = raw_section_info[i]['Instructor'];
        indiv_formatted_info['Location'] = raw_section_info[i]['Location'];
        indiv_formatted_info['Credits'] = parseInt(raw_section_info[i]['Units']);
        indiv_formatted_info['Section'] = raw_section_info[i]['Section'].trim();
        indiv_formatted_info['ID'] = parseInt(raw_section_info[i]['Class Nbr']);
        all_formatted_info.push(indiv_formatted_info);
    }
    return (all_formatted_info);
}