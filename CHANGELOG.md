# Changelog

## [1.3.1](https://github.com/UK-Export-Finance/mdm-api/compare/v1.3.0...v1.3.1) (2023-02-20)


### Miscellaneous

* **deps:** update szenius/set-timezone action to v1.1 ([#23](https://github.com/UK-Export-Finance/mdm-api/issues/23)) ([51e88c0](https://github.com/UK-Export-Finance/mdm-api/commit/51e88c0c095221055edbcc6f688a2560b8c5d844))

## [1.3.0](https://github.com/UK-Export-Finance/mdm-api/compare/v1.2.0...v1.3.0) (2023-02-20)


### Features

* **API-82:** Improved GHA ([#21](https://github.com/UK-Export-Finance/mdm-api/issues/21)) ([217b682](https://github.com/UK-Export-Finance/mdm-api/commit/217b682cd72b376baa94076d73e9a455dac08538))

## [1.2.0](https://github.com/UK-Export-Finance/mdm-api/compare/v1.1.0...v1.2.0) (2023-02-20)


### Features

* **API-69:** added `/interest-rates` endpoint ([#17](https://github.com/UK-Export-Finance/mdm-api/issues/17)) ([ee7a5f5](https://github.com/UK-Export-Finance/mdm-api/commit/ee7a5f51b6e87db99350de699820bc1ac8b5b06e))


### Miscellaneous

* **npm-update:** Package update + NPM minimum version requirement ([a8277b8](https://github.com/UK-Export-Finance/mdm-api/commit/a8277b83b594cef77450c47548bedcc551971be9))
* **npm-update:** Package updates ([#18](https://github.com/UK-Export-Finance/mdm-api/issues/18)) ([fe1085d](https://github.com/UK-Export-Finance/mdm-api/commit/fe1085d777a97713bb2e057ba9520e3fdd60fc36))

## [1.1.0](https://github.com/UK-Export-Finance/mdm-api/compare/v1.0.0...v1.1.0) (2023-02-17)


### Features

* added `cspell`, custom paths, lint staged files & updated all npm packages ([#11](https://github.com/UK-Export-Finance/mdm-api/issues/11)) ([193b128](https://github.com/UK-Export-Finance/mdm-api/commit/193b1283636805284043df7e484e221b539c6e90))
* added API tests for `GET` `/numbers` and `GET` `/number-types` ([#16](https://github.com/UK-Export-Finance/mdm-api/issues/16)) ([dbe6af4](https://github.com/UK-Export-Finance/mdm-api/commit/dbe6af47c0599bbec67fed4d4ce1630a6af90926))
* added tests for GET `/markets` ([#10](https://github.com/UK-Export-Finance/mdm-api/issues/10)) ([2be0006](https://github.com/UK-Export-Finance/mdm-api/commit/2be0006d15b17f21dcac5857508aec536280a26b))
* e2e test expected results WIP ([85d82ec](https://github.com/UK-Export-Finance/mdm-api/commit/85d82ec1f9b44771c0f731a08e200b8c28a90830))
* e2e tests for GET markets ([0e5de5c](https://github.com/UK-Export-Finance/mdm-api/commit/0e5de5ce5276ed5a8e8758d6949f6cdc11871f78))
* number-generator e2e tests, WIP ([b229d6e](https://github.com/UK-Export-Finance/mdm-api/commit/b229d6e7ddf6d3ce6574cccefea53b114ef31da1))


### Bug Fixes

* added path aliases to jest api tests, fixed spelling ([#14](https://github.com/UK-Export-Finance/mdm-api/issues/14)) ([0af68dd](https://github.com/UK-Export-Finance/mdm-api/commit/0af68dd000d35781d38a38501f0f46d3df327d0b))
* simplify empty array check ([bde1444](https://github.com/UK-Export-Finance/mdm-api/commit/bde14441193ddd4aecc2e933fb2a7df32f6f5b19))


### Miscellaneous

* **deps:** update dependency jest to v29.4.3 ([#15](https://github.com/UK-Export-Finance/mdm-api/issues/15)) ([ed2e241](https://github.com/UK-Export-Finance/mdm-api/commit/ed2e241057d6e4e84b8359f236117b95481f84c3))
* updated the `healthcheck` endpoints ([#13](https://github.com/UK-Export-Finance/mdm-api/issues/13)) ([8c1daeb](https://github.com/UK-Export-Finance/mdm-api/commit/8c1daeb70f89acfae1e99eae4a79b3627678a1e4))

## 1.0.0 (2023-02-08)


### Features

* add MDM databases, number generator, market and healthchecks ([#1](https://github.com/UK-Export-Finance/mdm-api/issues/1)) ([03cb77f](https://github.com/UK-Export-Finance/mdm-api/commit/03cb77f2cf19b8201da245a63842d759301b5f1f))
* added `pinojs` logging ([#8](https://github.com/UK-Export-Finance/mdm-api/issues/8)) ([f8fbceb](https://github.com/UK-Export-Finance/mdm-api/commit/f8fbceb2d92d7e8d93d5802f2d70376e9dcf13c9))


### Bug Fixes

* removed `Redis` cache ([#9](https://github.com/UK-Export-Finance/mdm-api/issues/9)) ([367ea57](https://github.com/UK-Export-Finance/mdm-api/commit/367ea57a6490b7ef39f2e252ed26e0d072affe6b))


### Miscellaneous

* added ESLint as part of PR jobs ([#2](https://github.com/UK-Export-Finance/mdm-api/issues/2)) ([9e2c4f7](https://github.com/UK-Export-Finance/mdm-api/commit/9e2c4f7de2a12734033dd2260d1b531e11e470ee))
* automated releases based on conventional commits ([a4a740d](https://github.com/UK-Export-Finance/mdm-api/commit/a4a740d432d9bc32c4c34a3c14fe94b000e70f02))
* **deps:** update all npm packages to their latest version ([#3](https://github.com/UK-Export-Finance/mdm-api/issues/3)) ([1e2ed15](https://github.com/UK-Export-Finance/mdm-api/commit/1e2ed15ecab22070a6c50dc5ca67b67fa623bf6f))
* **deps:** update dependency jest to v29.4.2 ([#6](https://github.com/UK-Export-Finance/mdm-api/issues/6)) ([e688bcd](https://github.com/UK-Export-Finance/mdm-api/commit/e688bcd8820983e10fbda9966dec0caa37ed0759))
* updated the `jest` configs ([#4](https://github.com/UK-Export-Finance/mdm-api/issues/4)) ([33ba85a](https://github.com/UK-Export-Finance/mdm-api/commit/33ba85a9f25ff4bfb549dbece198401cfc8b5db7))
