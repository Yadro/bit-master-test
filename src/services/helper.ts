export function isEqual(a: object, b: object) {
    if (Object.keys(a).length !== Object.keys(b).length) {
        return false;
    }
    for (let i in a) {
        if (a[i] !== null && typeof a[i] === 'object') {
            if (!isEqual(a[i], b[i])) {
                return false;
            }
        } else if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}
