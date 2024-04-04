import  AllureReporter  from '@wdio/allure-reporter';
/**
 * All not needed configurations, for this boilerplate, are removed.
 * If you want to know which configuration options you have then you can
 * check https://webdriver.io/docs/configurationfile
 */
export const config: WebdriverIO.Config = {
  autoCompileOpts: {
    autoCompile: true,
    // see https://github.com/TypeStrong/ts-node#cli-and-programmatic-options
    // for all available options
    tsNodeOpts: {
      transpileOnly: true,
      // project: "tsconfig.wdio.json",
    },
    // tsconfig-paths is only used if "tsConfigPathsOpts" are provided, if you
    // do please make sure "tsconfig-paths" is installed as dependency
    tsConfigPathsOpts: {
      paths: {},
      baseUrl: './',
    },
  },
  baseUrl: process.env.SERVE_PORT
    ? `http://localhost:${process.env.SERVE_PORT}`
    : 'http://localhost:8100',
  //
  // ====================
  // Runner Configuration
  // ====================
  // WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
  // on a remote machine).
  runner: 'local',
  //
  // ==================
  // Specify Test Files
  // ==================
  //
 specs: ['./tests/**/*.spec.ts'],
  //
  // ============
  // Capabilities
  // ============
  // The capabilities are specified in:
  // - wdio.android.config.ts
  // - wdio.ios.config.ts
  // - wdio.web.config.ts
  //
  capabilities: [],
  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  //
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: process.env.VERBOSE === 'true' ? 'debug' : 'error',
  // Set specific log levels per logger
  // loggers:
  // - webdriver, webdriverio
  // - @wdio/applitools-service, @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
  // - @wdio/mocha-framework, @wdio/jasmine-framework
  // - @wdio/local-runner
  // - @wdio/sumologic-reporter
  // - @wdio/cli, @wdio/config, @wdio/utils
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  // logLevels: {
  //     webdriver: 'info',
  //     '@wdio/applitools-service': 'info'
  // },
  //
  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  bail: 0,
  // Set a base URL in order to shorten url command calls. If your `url` parameter starts

  waitforTimeout: 45000,
  // Default timeout in milliseconds for request
  // if browser driver or grid doesn't send response
  connectionRetryTimeout: 120000,
  // Default request retries count
  connectionRetryCount: 3,
  services: [],
  framework: 'mocha',

  reporters: [['allure', {
    outputDir: 'allure-results',
    disableWebdriverStepsReporting: true,
    disableWebdriverScreenshotsReporting: false,
}]],

  mochaOpts: {
    timeout: 1200000,
  },

  afterTest: async function(test, context, { error, result, duration, passed, retries }) {
      const screenshotPath = `./allure-results/${test.title}.png`;
      await browser.saveScreenshot(screenshotPath);
      await AllureReporter.addAttachment('Screenshot', Buffer.from(screenshotPath, 'base64'), 'image/png');
  }
};
