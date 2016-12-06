var sayHello = require('./lib/commons.js').sayHello;

module.exports = verify;

function verify(credentials, cb) {

    console.log('About to verify credentials');

    sayHello(credentials);

    console.log('Successfully verified credentials');

    cb(null, {verified: true});
}

