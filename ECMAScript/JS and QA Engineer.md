# JS and QA Engineer

标签（空格分隔）： Notes

---
[TOC]

<h2>测试核心概念<sup>源码在cs1</sup></h2>

- 单元测试
- 性能测试
- 安全测试
- 功能测试

<h2>自动化单元测试</h2>

需要安装的包

```javascript
// npm ERR! Unexpected end of JSON input while parsing near
// 解决方法 npm cache clean --force
# npm init -y
# npm install karma --save-dev
# npm install karma-jasmine karma-phantomjs-launcher jasmine-core --save-dev
# npm install -g karma-cli
// 用于生成 karma.conf.js
# karma init
// karma 代码覆盖率检查
# npm install karma-coverage --save-dev


// chrome中测试
# npm install karma-chrome-launcher --save-dev
```

文件目录如下

```
tests
tests/unit
tests/unit/index.js
tests/unit/index.spec.js
docs/coverage/
karma.conf.js
package.json
```

<i class="icon-file"></i> index.js
```javascript
window.add = function(a) {
  if (a == 1) {
    return 1;
  } else {
    return a + 1;
  }
};
```

<i class="icon-file"></i> index.spec.js
```javascript
describe("测试基本函数的API", function () {
  it("+1函数的应用", function () {
    expect(window.add(1)).toBe(1);
    expect(window.add(2)).toBe(3);
  });
});
```

<i class="icon-file"></i> package.json
```javascript
{
  "name": "cs1",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "directories": {
    "test": "tests"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "unit": "karma start"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "jasmine-core": "^3.4.0",
    "karma": "^4.1.0",
    "karma-coverage": "^1.1.2",
    "karma-jasmine": "^2.0.1",
    "karma-phantomjs-launcher": "^1.0.4"
  }
}

```

<i class="icon-file"></i> karma.conf.js
```javascript
// Karma configuration
// Generated on Wed May 22 2019 14:53:20 GMT+0800 (GMT+08:00)

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      './tests/unit/**/*.js',
      './tests/unit/**/*.spec.js'
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // 源文件，您想为其生成报告
      // 不包含测试或库
      // （这些文件将由 Istanbul 检测）
      './tests/unit/**/*.js': ['coverage']
    },

    // （可选）配置报告器
    coverageReporter: {
      type: 'html',
      dir: './docs/coverage/'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    // 代码覆盖路检查 'coverage'
    reporters: ['progress', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}

```


<h2>e2e 测试(百度)</h2>

`Nightwatch.js`也是做e2e的
需要安装的包

```javascript
# npm install selenium-webdriver
```

文件目录如下

```
tests
tests/e2e
tests/e2e/baidu.spec.js
geckodriver.exe
package.json
```

<i class="icon-file"></i> baidu.spec.js
```javascript
const {Builder, By, Key, until} = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('firefox').build();
  try {
    await driver.get('https://www.baidu.com/');
    await driver.findElement(By.name('wd')).sendKeys('javascript', Key.RETURN);
    await driver.wait(until.titleIs('javascript_百度搜索'), 1000);
  } finally {
    await driver.quit();
  }
})();
```

<i class="icon-file"></i> package.json
```javascript
{
  "name": "cs1",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "directories": {
    "test": "tests"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "e2e": "node ./tests/e2e/baidu.spec.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "selenium-webdriver": "^4.0.0-alpha.1"
  }
}

```

<h3><a href="https://rize.js.org/zh-CN/#api-%E5%8F%82%E8%80%83">Rize</a></h3>
需要安装的包

```javascript
# npm install --save-dev puppeteer rize
```

<h2>React单元测试</h2>
需要安装的包

```javascript
# npm install --save-dev react-testing-library
# npm install --save react-dom react
// react用的好像是 jest
# npm install --save-dev jest-dom jest
```

文件目录如下

```
src
src/index.js
src/index.spec.js
package.json
```

<i class="icon-file"></i> index.js
```javascript
import React from "react";

export const App = () => {
  return (
    <div>
      <h2 data-testid="js-h2">京程一灯</h2>
      <ul data-testid="js-ul">
        <li>JavaScript</li>
        <li>CSS</li>
      </ul>
    </div>
  )
}
```

<i class="icon-file"></i> index.spec.js
```javascript
import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import { App } from "./index";

afterEach(cleanup);

describe("基础React单元测试", function () {
  it("index组件测试", function () {
    const { getByTestId } = render(<App />);
    const [ul, nav] = [getByTestId("js-ul"), getByTestId("js-h2")];
    expect(ul.children.length).toBe(2);
    expect(nav.textContent).toContain("京程一灯");
  })
});
```

<i class="icon-file"></i> package.json
```javascript
{
  "name": "cs1",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "directories": {
    "test": "tests"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "unit": "react-scripts test --env=jsdom"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "react": "^16.8.6",
    "react-dom": "^16.8.6",
    "react-scripts": "^3.0.1",
    "react-testing-library": "^7.0.1"
  }
}
```

<h2>阿里的一套 <a href="https://github.com/alibaba/f2etest">f2etest</a></h2>

<h2>设计稿比对(PhantomJS、backstopjs)</h2>

需要安装的包

```javascript
// https://www.npmjs.com/package/backstopjs
# npm install -g backstopjs
// 生成 backstop.json
# backstop init
# backstop test
```

文件目录如下

```
backstop_data
docs
docs/backstop_data
backstop.json
package.json
```

<i class="icon-file"></i> backstop.json
```javascript
{
  "id": "backstop_default",
  "viewports": [
    {
      "label": "phone",
      "width": 375,
      "height": 667
    },
    {
      "label": "tablet",
      "width": 1024,
      "height": 768
    }
  ],
  "onBeforeScript": "puppet/onBefore.js",
  "onReadyScript": "puppet/onReady.js",
  "scenarios": [
    {
      "label": "map",
      "cookiePath": "backstop_data/engine_scripts/cookies.json",
      // 线上地址
      "url": "https://map.baidu.com/mobile/webapp/index/index/",
      "referenceUrl": "",
      "readyEvent": "",
      "readySelector": "",
      "delay": 0,
      "hideSelectors": [],
      "removeSelectors": [],
      "hoverSelector": "",
      "clickSelector": "",
      "postInteractionWait": 0,
      "selectors": [],
      "selectorExpansion": true,
      "expect": 0,
      "misMatchThreshold" : 0.1,
      "requireSameDimensions": true
    }
  ],
  // 配置相关路径
  "paths": {
    "bitmaps_reference": "backstop_data/bitmaps_reference",
    "bitmaps_test": "backstop_data/bitmaps_test",
    "engine_scripts": "backstop_data/engine_scripts",
    "html_report": "./docs/backstop_data/html_report",
    "ci_report": "./docs/backstop_data/ci_report"
  },
  "report": ["browser"],
  "engine": "puppeteer",
  "engineOptions": {
    "args": ["--no-sandbox"]
  },
  "asyncCaptureLimit": 5,
  "asyncCompareLimit": 50,
  "debug": false,
  "debugWindow": false
}
```


<h2>异步接口测试(<a href="https://mochajs.org/#installation">mocha</a>)</h2>

文件目录如下 node ./mochaRunner.js

```
docs
docs/mochawesome-reporter
tests
tests/service
tests/service/router.spec.js
mochaRunner.js
package.json
```

需要安装的包

```javascript
# npm install --global mocha
// https://mochajs.org/#running-mocha-in-the-browser
# npm install --save-dev mocha
// https://www.npmjs.com/package/mochawesome
# npm install --save-dev mochawesome
# npm install axios
```

<i class="icon-file"></i> mochaRunner.js
```javascript
const Mocha = require("mocha");

const mocha = new Mocha({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: './docs/mochawesome-reporter'
  }
});

mocha.addFile("./tests/service/router.spec.js");
mocha.run(function () {
  console.log('done');
  process.exit();
});
```

<i class="icon-file"></i> router.spec.js
```javascript
const axios = require('axios');

describe("node接口", function () {
  it("test接口测试", function (done) {
    axios.get("http://xcssss.com")
      .then(function (response) {
        if (response.data.xx == "") {
          done();
        } else {
          done(new Error("数据请求出错"));
        }
      }).catch(function (error) {
        done(error);
      });
  });
});
```