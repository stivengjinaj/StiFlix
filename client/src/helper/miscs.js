/**
 * Function used to get the dimensions of the window.
 *
 * @returns Object with width and height.
 * */
export function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

/**
 * Function used to slice a string into the first 4 letters.
 *
 * @param str - The string to slice.
 * @returns The sliced string.
 * */
export function sliceStr(str) {
    if (str.length >= 5) {
        return str.slice(0, 5).toLowerCase();
    } else {
        return str.toLowerCase();
    }
}

/**
 * Function used to get a random number between min and max.
 *
 * @param min - The minimum number.
 * @param max - The maximum number.
 * @returns The random number.
 * */
export function rand(min, max) {
    // Ensure min is less than or equal to max
    if (min > max) {
        [min, max] = [max, min]; // Swap min and max if necessary
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Function used to sort an array of movies by vote average.
 *
 * @param arr - The array to sort.
 * @returns The sorted array.
 * */
export function sortByVoteAverage(arr) {
    return arr.sort((a, b) => b.vote_average - a.vote_average);
}

/**
 * Function used to get the query string for the API.
 *
 * @param str - The string to convert.
 * @returns The converted string.
 * */
export function stringQuery(str) {
    const trimmedString = str.trim();
    if (trimmedString.includes(' ')) {
        return trimmedString.replace(/\s+/g, '+');
    }
    return trimmedString;
}

/**
 * Function used to get the year from a date string.
 *
 * @param date - The date string.
 * @returns The year.
 * */
export function getYearFromDate(date) {
    const parts = date.split('-');

    for (let part of parts) {
        if (part.length === 4 && !isNaN(part)) {
            return part;
        }
    }
    return null;
}

/**
 * Function used to get a random avatar image.
 *
 * @param avatars list of available avatars.
 * @return random avatar.
 * */
export function randomAvatar(avatars) {
    return avatars[Math.floor(Math.random() * avatars.length)];
}
