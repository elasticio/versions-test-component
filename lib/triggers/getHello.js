var Q = require('q');
var sayHello = require('../commons.js').sayHello;
var elasticio = require('elasticio-node');
var messages = elasticio.messages;

exports.process = processTrigger;

function processTrigger(msg, cfg) {

    var self = this;

    function emitData() {
        sayHello(cfg);

        var body = {
            greeting: 'Hello World!'
        };

        var data = messages.newMessageWithBody(body);

        console.log('Emitting data');

        self.emit('data', data);
    }

    function emitError(e) {
        console.log('Oops! Error occurred');

        self.emit('error', e);
    }

    function emitEnd() {
        console.log('Finished execution');

        self.emit('end');
    }

    Q().then(emitData).fail(emitError).done(emitEnd);
}