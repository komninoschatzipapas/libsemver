/**
 * A light library to parse, compare and mess around with SemVer.
 */
import {readFileSync} from 'fs';

/*
 * A custom RegEx can be passed via the SEMVER_REGEX_PATH env variable.
 * For it to be valid, it needs to have 5 groups:
 * 1: Major version
 * 2: Minor version
 * 3: Patch version
 * 4: Pre-release version (including the hyphen)
 * 5: Build metadata (including the plus)
 *
 * Example: 6.2.3-rc1.5+somemetadata
 * should be divided into the following groups
 * ----------------------------
 * |6|2|3|-rc1.5|+somemetadata|
 * ----------------------------
 * Group 1: 6
 * Group 2: 2
 * Group 3: 3
 * Group 4: -rc1.5
 * Group 5: +somemetadata
 */
const regexString: string = readFileSync(process.env.SEMVER_REGEX_PATH ||
    '../regex.txt', 'utf8');
const REGEX: RegExp = new RegExp(regexString);

type SemVer = {
    major: number;
    minor: number;
    patch: number;
    alpha: boolean;
    beta: boolean;
    rc: boolean;
    identifiers?: Array<string>;
    metadata?: string;
};

function valid(str: string): boolean {
    return REGEX.test(str);
}

function parse(str: string): SemVer|null {
    if (!valid(str)) {
        return null;
    }
    const groups = REGEX.exec(str);

    let alpha: boolean = false;
    let beta: boolean = false;
    let rc: boolean = false;

    if (groups[4]) {
        // substr(1) is used because the 4th group (identifiers) also contains
        // the leading hyphen
        groups[4].substr(1).split('.').forEach((identifier) => {
            if (identifier.startsWith('alpha')) {
                alpha = true;
            } else if (identifier.startsWith('beta')) {
                beta = true;
            } else if (identifier.startsWith('rc')) {
                rc = true;
            }
        });
    }

    let r: SemVer = {
        'major': parseInt(groups[1]),
        'minor': parseInt(groups[2]),
        'patch': parseInt(groups[3]),
        'alpha': alpha,
        'beta': beta,
        'rc': rc,
    };
    // substr(1) is used because the 4th and 5th group also include a
    // leading character
    if (groups[4]) {
        r.identifiers = groups[4].substr(1).split('.');
    }
    if (groups[5]) {
        r.metadata = groups[5].substr(1);
    }
    return r;
}

export default {
    'REGEX': REGEX,
    'valid': valid,
    'parse': parse,
};
