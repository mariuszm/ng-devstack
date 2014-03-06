/* jshint strict: false */

module.exports = function (karma) {
    karma.set({
        frameworks: ['jasmine'],
        plugins: ['karma-jasmine', 'karma-firefox-launcher', 'karma-chrome-launcher', 'karma-phantomjs-launcher'],
        /**
         * The list of browsers to launch to test on. This includes only "Firefox" by
         * default, but other browser names include:
         * Chrome, ChromeCanary, Firefox, Opera, Safari, PhantomJS
         *
         * Note that you can also use the executable name of the browser, like "chromium"
         * or "firefox", but that these vary based on your operating system.
         */
        browsers: [
            'Chrome'
        ]
    });
};
