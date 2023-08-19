'use strict';

const capitalize = function(str) {
    const [firstLetter, ...rest] = str;
    return [firstLetter.toUpperCase(), rest.join('')].join('');
}

export { capitalize }