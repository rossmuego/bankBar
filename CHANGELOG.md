# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.7.3"></a>
## [0.7.3](https://github.com/johneas10/bankBar/compare/v0.7.2...v0.7.3) (2018-10-31)


### Bug Fixes

* display ampersands correctly ([3dc06b8](https://github.com/johneas10/bankBar/commit/3dc06b8)), closes [#20](https://github.com/johneas10/bankBar/issues/20)



<a name="0.7.2"></a>
## [0.7.2](https://github.com/johneas10/bankBar/compare/v0.7.1...v0.7.2) (2018-09-08)


### Bug Fixes

* text washed out when swapping between light & dark mode ([0be1ead](https://github.com/johneas10/bankBar/commit/0be1ead)), closes [#12](https://github.com/johneas10/bankBar/issues/12)



<a name="0.7.1"></a>
## [0.7.1](https://github.com/johneas10/bankBar/compare/v0.7.0...v0.7.1) (2018-07-30)


### Bug Fixes

* **login:** add auth proxy ([c9a149a](https://github.com/johneas10/bankBar/commit/c9a149a)), closes [#19](https://github.com/johneas10/bankBar/issues/19)



<a name="0.7.0"></a>
# [0.7.0](https://github.com/johneas10/bankBar/compare/v0.6.0...v0.7.0) (2018-07-23)


### Features

* **buildApp:** add manual refresh ([28d204d](https://github.com/johneas10/bankBar/commit/28d204d))
* **contact:** add slack link ([1a910f0](https://github.com/johneas10/bankBar/commit/1a910f0))
* **notifications:** add error notifications ([f523dc6](https://github.com/johneas10/bankBar/commit/f523dc6))
* **notifications:** add login success notification ([7064b9e](https://github.com/johneas10/bankBar/commit/7064b9e))



<a name="0.6.0"></a>
# [0.6.0](https://github.com/johneas10/bankBar/compare/v0.5.2...v0.6.0) (2018-07-12)


### Features

* **auth:** add deep-linking to remove hapi server ([95aa480](https://github.com/johneas10/bankBar/commit/95aa480))



<a name="0.5.2"></a>
## [0.5.2](https://github.com/johneas10/bankBar/compare/v0.5.1...v0.5.2) (2018-07-11)


### Bug Fixes

* **oauth:** oauth window crash after build ([dff7fc8](https://github.com/johneas10/bankBar/commit/dff7fc8))



<a name="0.5.1"></a>
## [0.5.1](https://github.com/johneas10/bankBar/compare/v0.5.0...v0.5.1) (2018-07-05)



<a name="0.5.0"></a>
# [0.5.0](https://github.com/johneas10/bankBar/compare/v0.4.2...v0.5.0) (2018-07-05)


### Bug Fixes

* **buildApp:** dont show submenus for pots & transactions if non exist ([df54878](https://github.com/johneas10/bankBar/commit/df54878)), closes [#18](https://github.com/johneas10/bankBar/issues/18)


### Features

* **logout:** add ability to clear data and log out ([fb7633e](https://github.com/johneas10/bankBar/commit/fb7633e))
* **OAuth flow:** add window for user to enter OAuth credentials ([6f752da](https://github.com/johneas10/bankBar/commit/6f752da))



<a name="0.4.2"></a>
## [0.4.2](https://github.com/johneas10/bankBar/compare/v0.4.1...v0.4.2) (2018-06-27)


### Bug Fixes

* **auth:** token isn't refreshed while app runs ([87feb83](https://github.com/johneas10/bankBar/commit/87feb83)), closes [#7](https://github.com/johneas10/bankBar/issues/7)



<a name="0.4.1"></a>
## [0.4.1](https://github.com/johneas10/bankBar/compare/v0.4.0...v0.4.1) (2018-06-22)



<a name="0.4.0"></a>
# [0.4.0](https://github.com/johneas10/bankBar/compare/v0.3.0...v0.4.0) (2018-06-22)


### Bug Fixes

* **formatCurrency.js:** Replaced toFixed call with toLocaleString's minimumFractionDigits parameter. ([ab32961](https://github.com/johneas10/bankBar/commit/ab32961)), closes [#11](https://github.com/johneas10/bankBar/issues/11)
* **main.js:** put store.clear behind env for safe development ([a56a0ef](https://github.com/johneas10/bankBar/commit/a56a0ef)), closes [#10](https://github.com/johneas10/bankBar/issues/10)
* **store:** remove store.clear at start of app ([f753ef2](https://github.com/johneas10/bankBar/commit/f753ef2))


### Features

* Show transactions from current day ([1d86c7d](https://github.com/johneas10/bankBar/commit/1d86c7d))



<a name="0.3.0"></a>
# [0.3.0](https://github.com/johneas10/bankBar/compare/v0.2.1...v0.3.0) (2018-06-10)


### Features

* **committing:** add pre-commit hooks for testing and linting ([dd68b58](https://github.com/johneas10/bankBar/commit/dd68b58))



<a name="0.2.1"></a>
## [0.2.1](https://github.com/johneas10/bankBar/compare/v0.2.0...v0.2.1) (2018-06-10)


### Bug Fixes

* **.env:** remove .env and replace with config.js ([ad6f2cb](https://github.com/johneas10/bankBar/commit/ad6f2cb)), closes [#6](https://github.com/johneas10/bankBar/issues/6)



<a name="0.2.0"></a>
# [0.2.0](https://github.com/johneas10/bankBar/compare/v0.1.2...v0.2.0) (2018-06-09)


### Features

* **Pots:** Added pots submenu to the menu, displaying the names and balances ([2907c63](https://github.com/johneas10/bankBar/commit/2907c63))



<a name="0.1.2"></a>
## [0.1.2](https://github.com/johneas10/bankBar/compare/v0.1.1...v0.1.2) (2018-06-07)



<a name="0.1.1"></a>
## [0.1.1](https://github.com/johneas10/bankBar/compare/v0.1.0...v0.1.1) (2018-06-06)


### Bug Fixes

* **spend:** make spend a positive value ([5f1ee60](https://github.com/johneas10/bankBar/commit/5f1ee60)), closes [#1](https://github.com/johneas10/bankBar/issues/1)



<a name="0.1.0"></a>
# 0.1.0 (2018-06-06)


### Features

* **app:** initial commit ([1c74bc5](https://github.com/johneas10/bankBar/commit/1c74bc5))
