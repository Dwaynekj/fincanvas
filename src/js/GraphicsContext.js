'use strict';

function GraphicsContext(gc) {
    this.gc = gc;
    this.addMissingStubs(gc); // logger may be omitted
}

GraphicsContext.prototype = {

    constructor: GraphicsContext.prototype.constructor,

    addMissingStubs: function(gc, logger) {
        var self = this;
        var reWEBKIT = /^webkit/;

        Object.keys(Object.getPrototypeOf(gc)).forEach(function(key) {
            if (key in GraphicsContext.prototype || reWEBKIT.test(key)) {
                return;
            }
            if (typeof gc[key] === 'function') {
                self[key] = !logger ? gc[key].bind(gc) : function() {
                    return logger(key, arguments, gc[key].apply(gc, arguments));
                };
            } else {
                Object.defineProperty(self, key, {
                    get: function() {
                        var result = gc[key];
                        return logger ? logger(key, 'getter', result) : result;
                    },
                    set: function(value) {
                        gc[key] = logger ? logger(key, 'setter', value) : value;
                    }
                });
            }
        });
    }

};

var YIELDS = '\u27F9'; // LONG RIGHTWARDS DOUBLE ARROW

function consoleLogger(name, args, value) { // eslint-disable-line no-unused-vars
    var result = value;

    if (typeof value === 'string') {
        result = '"' + result + '"';
    }

    name = 'GC.' + name;

    switch (args) {
        case 'getter':
            console.log(name, '=', result);
            break;

        case 'setter':
            console.log(name, YIELDS, result);
            break;

        default: // method call
            name += '(' + Array.prototype.slice.call(args).join(', ') + ')';
            if (result === undefined) {
                console.log(name);
            } else {
                console.log(name, YIELDS, result);
            }
    }

    return value;
}

module.exports = GraphicsContext;