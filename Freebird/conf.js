var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: "./test/try1.spec.js",
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 2000000,
        isVerbose: true
    },
    // capabilities: {
    //     browserName: 'chrome',

    //     chromeOptions: {
    //         args: ["--headless", "--disable-gpu", "--window-size=800,600"]
    //     }
    // }
    onPrepare: function () {
        jasmine.getEnv().addReporter(
            new Jasmine2HtmlReporter({
                savePath: 'Reports/',
                takeScreenshots: true,
                takeScreenshotsOnlyOnFailures: true,
                fixedScreenshotName: true,
                consolidate: false,
                consolidateAll: true
            })
        );
    },

    multiCapabilities: [
        { browserName: 'chrome' }
        //  { browserName: 'firefox' }
        //  { browserName: 'safari' }
        //  { browserName: 'internet explorer' }
    ],

    // suites: pd.suites,
    allScriptsTimeout: 120000,
    getPageTimeout: 120000,
    untrackOutstandingTimeouts: true,

    // // Options to be passed to Jasmine-node.
    // jasmineNodeOpts: {
    //     showColors: true,
    //     defaultTimeoutInterval: 120000,
    //     isVerbose: true
    // }
}