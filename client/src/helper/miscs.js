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
    const replacedString = trimmedString.replace(/&/g, '%26');
    return replacedString.replace(/\s+/g, '+');
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

/**
 * Function used to get the current date in the format of dd-mm-yyyy.
 *
 * @return current date in the format of dd-mm-yyyy.
 */
export function getCurrentDateString() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}
/**
 * Function used to parse a date string into a Date object.
 *
 * @param dateString - The date string to parse.
 * @return Date object.
 */
export function parseDateString(dateString) {
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
}

/**
 * Function used to truncate a string to a maximum length.
 *
 * @param str - The string to truncate.
 * @param maxLength - The maximum length.
 * @return The truncated string.
 */
export function truncateString(str, maxLength) {
    if (str.length > maxLength) {
        return str.slice(0, maxLength) + "...";
    }
    return str;
}

/**
 * Function used to format a string into a lowercase spaceless string.
 *
 * @param str - The string to format.
 * @return The formatted string.
 * */
export function formatString(str) {
    return str.toLowerCase().replace(/\s+/g, '');
}

/**
 * Function used to check if a string contains non-latin characters.
 *
 * @param str - The string to check.
 * @return True if the string contains non-latin characters, false otherwise.
 * */
export function containsNonLatinChars(str) {
    let regex = /^[a-zA-Z]+$/;
    return regex.test(str);
}

/**
 * Function used to replace Latin Extended-A characters with their base Latin equivalents.
 *
 * @param str - The string to replace characters in.
 * @return The string with Latin Extended-A characters replaced.
 * */
export function replaceLatinExtendedChars(str) {
    // Map of Latin Extended-A characters to their base Latin equivalents
    const charMap = {
        'ā': 'a', 'č': 'c', 'ē': 'e', 'ģ': 'g', 'ī': 'i', 'ķ': 'k', 'ļ': 'l',
        'ņ': 'n', 'ō': 'o', 'ŗ': 'r', 'š': 's', 'ū': 'u', 'ž': 'z',
        'Ā': 'A', 'Č': 'C', 'Ē': 'E', 'Ģ': 'G', 'Ī': 'I', 'Ķ': 'K', 'Ļ': 'L',
        'Ņ': 'N', 'Ō': 'O', 'Ŗ': 'R', 'Š': 'S', 'Ū': 'U', 'Ž': 'Z'
    };

    return str.replace(/[\u0100-\u017F]/g, match => charMap[match] || match);
}

/**
 * Fisher-Yates (Knuth) Shuffle algorithm to shuffle an array.
 *
 * @param array - The array to shuffle.
 * @return The shuffled array.
 * */
export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));

        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
}