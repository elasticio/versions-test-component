var Q = require('q');
var sayHello = require('../commons.js').sayHello;
var elasticio = require('elasticio-node');
var messages = elasticio.messages;

exports.process = processAction;
exports.getTemplateModel = getTemplateModel;

/**
 *  This method will be called from elastic.io platform providing following data
 * 
 * @param msg
 * @param cfg
 */
function processAction(msg, cfg) {
    var self = this;


    function emitData() {

        sayHello(cfg);

        var body = {
            greeting:' How are you today?'
        };

        var data = messages.newMessageWithBody(body);

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

function getTemplateModel(cfg, cb) {
    sayHello(cfg);

    cb(null, {
        'a': 'x',
        'b': 'y'
    })
}
