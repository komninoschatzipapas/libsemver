# libsemver [![Build Status](https://travis-ci.com/openswap/libsemver.svg?token=77tGVGQm8MEqHiybdQbG&branch=master)](https://travis-ci.com/openswap/libsemver) [![codecov](https://codecov.io/gh/openswap/libsemver/branch/master/graph/badge.svg?token=v03B5DDbqX)](https://codecov.io/gh/openswap/libsemver)

A simple SemVer library written in Typescript.
```js
const SemVer = require('libsemver');
SemVer.verify('1.3.5'); // true
SemVer.verify('not a valid semver'); // false
Semver.parse('1.2.1-alpha+githash');
// {
//   'major': 1,
//   'minor': 2,
//   'patch': 1,
//   'alpha': true,
//   'beta': false,
//   'rc': false,
//   'identifiers': ['alpha'],
//   'metadata': 'githash',
// }
SemVer.compatible('1.2.1', '1.5.2'); // true
SemVer.compatible('2.0.0', '1.0.1'); // false
SemVer.REGEX // Instance of RegExp. Used to verify SemVers
```
PRs are very welcome :)
