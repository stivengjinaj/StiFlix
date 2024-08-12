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
 * */
export function sortByVoteAverage(arr) {
    return arr.sort((a, b) => b.vote_average - a.vote_average);
}

