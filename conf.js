const configs = {

    seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
        browserName: 'chrome',
        shardTestFiles: true,
        maxInstances: 4,
        chromeOptions: {
            args: [
                "--headless","--disable-gpu", 'window-size=1920,1080'
            ]
        },
    },
    suites: {
        facebook: ['facebook/*.spec.js']
    },
    // specs: ['Tests/*.spec.js'],
    jasmineNodeOpts: {
        showColors: true, // Use colors in the command line report.
    }
};

var timeout = 120000; // 120s

configs.framework = 'jasmine2';
configs.allScriptsTimeout = timeout;
configs.getPageTimeout = timeout;
configs.jasmineNodeOpts.isVerbose = true;
configs.jasmineNodeOpts.defaultTimeoutInterval = timeout;

configs.onPrepare = () => {
    // Prevent angular web application.
    browser.ignoreSynchronization = true;
    browser.waitForAngular(false);
    // Maximize window to capture.
    browser.driver.manage().window().maximize();

    // Reports to HTML
    var HtmlReporter = require('protractor-beautiful-reporter');
    jasmine.getEnv().addReporter(new HtmlReporter({
        baseDirectory: 'reports',
        docName: 'index.html',
        docTitle: 'e2e reporter',
        gatherBrowserLogs: false,
        jsonsSubfolder: 'jsons',
        preserveDirectory: false,
        screenshotsSubfolder: 'images',
        clientDefaults: {
            showTotalDurationIn: "header",
            totalDurationFormat: "ms",
            columnSettings: {
                warningTime: 10000, // 10s
                dangerTime: 20000 // 20s
            }
        },
        sortFunction: sortFunction
    }).getJasmine2Reporter());
}

function sortFunction(a, b) { // Sort by name and timestamp
    if (a.cachedBase === undefined) {
        var aTemp = a.description.split('|').reverse();
        a.cachedBase = aTemp.slice(0).slice(0, -1);
        a.cachedName = aTemp.slice(0).join('');
    };
    if (b.cachedBase === undefined) {
        var bTemp = b.description.split('|').reverse();
        b.cachedBase = bTemp.slice(0).slice(0, -1);
        b.cachedName = bTemp.slice(0).join('');
    };

    var firstBase = a.cachedBase;
    var secondBase = b.cachedBase;

    for (var i = 0; i < firstBase.length || i < secondBase.length; i++) {

        if (firstBase[i] === undefined) { return -1; }
        if (secondBase[i] === undefined) { return 1; }
        if (firstBase[i].localeCompare(secondBase[i]) === 0) { continue; }
        return firstBase[i].localeCompare(secondBase[i]);
    }

    var firstTimestamp = a.timestamp;
    var secondTimestamp = b.timestamp;

    if (firstTimestamp < secondTimestamp) return -1;
    else return 1;
}


// Export configurations
exports.config = configs;