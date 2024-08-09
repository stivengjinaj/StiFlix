
export function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

export function sliceStr(str) {
    if (str.length >= 5) {
        return str.slice(0, 5).toLowerCase();
    } else {
        return str.toLowerCase(); // Or return a default value if needed
    }
}

export function rand(min, max) {
    // Ensure min is less than or equal to max
    if (min > max) {
        [min, max] = [max, min]; // Swap min and max if necessary
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

