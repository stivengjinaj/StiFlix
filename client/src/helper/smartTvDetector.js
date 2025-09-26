/**
 * Detects if the current device is a Smart TV based on the user agent string.
 *
 * This function checks the `navigator.userAgent` string against a list of
 * regular expressions that match patterns commonly found in Smart TV user agents.
 *
 * @returns {boolean} - Returns `true` if the user agent matches any Smart TV pattern, otherwise `false`.
 */
export const detectSmartTV = () => {
    const userAgent = navigator.userAgent.toLowerCase();

    const smartTVPatterns = [
        // Samsung TVs
        /samsung.*smart/,
        /tizen/,
        /samsung.*tv/,
        /smart-tv/,

        // LG TVs
        /web0s/,
        /netcast/,
        /lg.*tv/,

        // Android TV / Google TV
        /android.*tv/,
        /googletv/,
        /aftm|aftb|afts|aftt/,  // Amazon Fire TV

        // Other Smart TV platforms
        /hbbtv/,        // HbbTV standard
        /vidaa/,        // Hisense VIDAA
        /roku/,         // Roku
        /viera/,        // Panasonic Viera
        /aquos/,        // Sharp Aquos
        /philips.*tv/,  // Philips Smart TV
        /sony.*tv/,     // Sony Smart TV

        // Set-top boxes and streaming devices
        /appletv/,      // Apple TV
        /chromecast/,   // Chromecast
        /xbox/,         // Xbox
        /playstation/,  // PlayStation

        // Generic TV indicators
        /smarttv/,
        /internet.tv/,
        /netfront/,     // Common TV browser
        /large.screen/,
        /tv.*browser/,

        // ARM-based TV systems
        /x11.*linux.*armv7l/,
        /arm.*linux/,

        // Additional patterns for older or regional TVs
        /maple/,        // Samsung (older)
        /liberation/,   // Some Samsung models
        /dtv/,          // Digital TV
        /settopbox/
    ];

    return smartTVPatterns.some(pattern => pattern.test(userAgent));
};