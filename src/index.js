/* eslint-env browser */

'use strict';

var rectangular = require('rectangular');

var gestures = require('./js/polymergestures.dev.js');
var GraphicsContext = require('./js/GraphicsContext.js');

var RESIZE_POLLING_INTERVAL = 200,
    paintables = [],
    resizables = [],
    paintLoopRunning = true,
    resizeLoopRunning = true,
    charMap = makeCharMap();

function Canvas(div, component, options) {
    var self = this;

    this.div = div;
    this.component = component;

    options = options || {};
    this.doubleClickDelay = options.doubleClickDelay || 325;

    this.dragEndtime = Date.now();

    this.canvas = document.createElement('canvas');
    this.div.appendChild(this.canvas);

    this.canvas.style.outline = 'none';

    // this.focuser = document.createElement('button');
    // this.focuser.style.position = 'absolute';
    // this.focuser.style.top = '0px';
    // this.focuser.style.left = '0px';
    // this.focuser.style.zIndex = '-1';
    // this.focuser.style.outline = 'none';
    // this.div.appendChild(this.focuser);

    this.canvasCTX = this.canvas.getContext('2d');
    this.gc = new GraphicsContext(this.canvasCTX);

    this.buffer = document.createElement('canvas');
    this.bufferCTX = this.buffer.getContext('2d');
    this.bufferGC = new GraphicsContext(this.bufferCTX);

    this.mouseLocation = new rectangular.Point(-1, -1);
    this.dragstart = new rectangular.Point(-1, -1);
    //this.origin = new rectangular.Point(0, 0);
    this.bounds = new rectangular.Rectangle(0, 0, 0, 0);
    this.hasMouse = false;

    document.addEventListener('mousemove', function(e) {
        if (self.hasMouse || self.isDragging()) {
            self.finmousemove(e);
        }
    });
    document.addEventListener('mouseup', function(e) {
        self.finmouseup(e);
    });
    document.addEventListener('wheel', function(e) {
        self.finwheelmoved(e);
    });
    document.addEventListener('keydown', function(e) {
        self.finkeydown(e);
    });
    document.addEventListener('keyup', function(e) {
        self.finkeyup(e);
    });

    this.canvas.onmouseover = function() {
        self.hasMouse = true;
    };
    this.canvas.addEventListener('focus', function(e) {
        self.finfocusgained(e);
    });
    this.canvas.addEventListener('blur', function(e) {
        self.finfocuslost(e);
    });
    this.canvas.addEventListener('mousedown', function(e) {
        self.finmousedown(e);
    });
    this.canvas.addEventListener('mouseout', function(e) {
        self.hasMouse = false;
        self.finmouseout(e);
    });
    this.canvas.addEventListener('click', function(e) {
        self.finclick(e);
    });
    this.canvas.addEventListener('contextmenu', function(e) {
        self.fincontextmenu(e);
        e.preventDefault();
        return false;
    });

    gestures.addEventListener(this.canvas, 'tap', function(e) {
        self.fintap(e);
    });
    gestures.addEventListener(this.canvas, 'holdpulse', function(e) {
        self.finholdpulse(e);
    });
    gestures.addEventListener(this.canvas, 'flick', function(e) {
        self.finflick(e);
    });
    gestures.addEventListener(this.canvas, 'release', function(e) {
        self.finrelease(e);
    });
    gestures.addEventListener(this.canvas, 'trackstart', function(e) {
        self.fintrackstart(e);
    });
    gestures.addEventListener(this.canvas, 'track', function(e) {
        self.fintrack(e);
    });
    gestures.addEventListener(this.canvas, 'trackend', function(e) {
        self.fintrackend(e);
    });

    this.canvas.setAttribute('tabindex', 0);
    this.canvas.contentEditable = true;

    this.resize();

    this.beginResizing();
    this.beginPainting();
}

Canvas.prototype = {
    constructor: Canvas.prototype.constructor,
    div: null,
    component: null,
    gestures: gestures, // TODO: why do we need this? (was previously at bottom of file)
    canvas: null,
    canvasCTX: null,
    focuser: null,
    buffer: null,
    ctx: null,
    mouseLocation: null,
    holdPulseCount: -1,
    dragstart: null,
    origin: null,
    bounds: null,
    dirty: false,
    size: null,
    mousedown: false,
    dragging: false,
    repeatKeyCount: 0,
    repeatKey: null,
    repeatKeyStartTime: 0,
    currentKeys: [],
    hasMouse: false,
    lastDoubleClickTime: 0,
    dragEndTime: 0,
    lastRepaintTime: 0,

    addEventListener: function(name, callback) {
        this.canvas.addEventListener(name, callback);
    },

    stopPaintLoop: function() {
        paintLoopRunning = false;
    },

    restartPaintLoop: function() {
        if (paintLoopRunning) {
            return; // already running
        }
        paintLoopRunning = true;
        requestAnimationFrame(paintLoopFunction);
    },

    stopResizeLoop: function() {
        resizeLoopRunning = false;
    },

    restartResizeLoop: function() {
        if (resizeLoopRunning) {
            return; // already running
        }
        resizeLoopRunning = true;
        setInterval(resizablesLoopFunction, 200);
    },

    detached: function() {
        this.stopPainting();
        this.stopResizing();
    },

    useHiDPI: function() {
        return this.component.resolveProperty('useHiDPI');
    },

    useBitBlit: function() {
        return this.component.resolveProperty('useBitBlit');
    },

    getFPS: function() {
        var fps = this.component.resolveProperty('repaintIntervalRate');
        return fps ? parseInt(fps) : 0;
    },

    tickPaint: function(now) {
        var fps = this.getFPS();
        if (fps === 0) {
            return;
        }
        var interval = 1000 / fps;

        var elapsed = now - this.lastRepaintTime;
        if (elapsed > interval && this.dirty) {
            this.lastRepaintTime = now - (elapsed % interval);
            this.paintNow();
        }
    },

    beginPainting: function() {
        var self = this;
        this.dirty = true;
        this.tickPainter = function(now) {
            self.tickPaint(now);
        };
        paintables.push(this);
    },

    stopPainting: function() {
        paintables.splice(paintables.indexOf(this), 1);
    },

    beginResizing: function() {
        var self = this;
        this.tickResizer = function() {
            self.checksize();
        };
        resizables.push(this);
    },

    stopResizing: function() {
        resizables.splice(resizables.indexOf(this), 1);
    },

    start: function() {
        this.beginPainting();
        this.beginResizing();
    },

    stop: function() {
        this.stopPainting();
        this.stopResizing();
    },

    checksize: function() {
        //this is expensive lets do it at some modulo
        var sizeNow = this.div.getBoundingClientRect();
        if (sizeNow.width !== this.size.width || sizeNow.height !== this.size.height) {
            this.sizeChangedNotification();
        }
    },

    sizeChangedNotification: function() {
        this.resize();
    },

    resize: function() {
        var box = this.size = this.div.getBoundingClientRect();

        this.canvas.width = this.buffer.width = box.width;
        this.canvas.height = this.buffer.height = box.height;

        //fix ala sir spinka, see
        //http://www.html5rocks.com/en/tutorials/canvas/hidpi/
        //just add 'hdpi' as an attribute to the fin-canvas tag
        var ratio = 1;
        var useBitBlit = this.useBitBlit();
        var isHIDPI = window.devicePixelRatio && this.useHiDPI();
        if (isHIDPI) {
            var devicePixelRatio = window.devicePixelRatio || 1;
            var backingStoreRatio = this.canvasCTX.webkitBackingStorePixelRatio ||
                this.canvasCTX.mozBackingStorePixelRatio ||
                this.canvasCTX.msBackingStorePixelRatio ||
                this.canvasCTX.oBackingStorePixelRatio ||
                this.canvasCTX.backingStorePixelRatio || 1;

            ratio = devicePixelRatio / backingStoreRatio;
            //this.canvasCTX.scale(ratio, ratio);
        }
        var width = this.canvas.getAttribute('width');
        var height = this.canvas.getAttribute('height');
        this.canvas.width = this.buffer.width = width * ratio;
        this.canvas.height = this.buffer.height = height * ratio;

        this.canvas.style.width = this.buffer.style.width = width + 'px';
        this.canvas.style.height = this.buffer.style.height = height + 'px';

        this.bufferCTX.scale(ratio, ratio);
        if (isHIDPI && !useBitBlit) {
            this.canvasCTX.scale(ratio, ratio);
        }

        //this.origin = new rectangular.Point(Math.round(this.size.left), Math.round(this.size.top));
        this.bounds = new rectangular.Rectangle(0, 0, box.width, box.height);
        //setTimeout(function() {
        var comp = this.component;
        if (comp) {
            comp.setBounds(this.bounds);
        }
        this.resizeNotification();
        this.paintNow();
        //});
    },

    resizeNotification: function() {
        //to be overridden
    },

    getBounds: function() {
        return this.bounds;
    },

    paintNow: function() {
        var self = this;
        this.safePaintImmediately(function(gc) {
            gc.clearRect(0, 0, self.canvas.width, self.canvas.height);

            var comp = self.component;
            if (comp) {
                comp.paint(gc);
            }

            self.dirty = false;
        });
    },

    safePaintImmediately: function(paintFunction) {
        var useBitBlit = this.useBitBlit(),
            gc = useBitBlit ? this.bufferGC : this.gc;
        try {
            gc.save();
            paintFunction(gc);
        } catch (e) {
            console.error(e);
        } finally {
            gc.restore();
        }
        if (useBitBlit) {
            this.flushBuffer();
        }
    },

    flushBuffer: function() {
        if (this.buffer.width > 0 && this.buffer.height > 0) {
            this.canvasCTX.drawImage(this.buffer, 0, 0);
        }
    },

    dispatchNewEvent: function(event, name, detail) {
        detail = {
            detail: detail || {}
        };
        detail.detail.primitiveEvent = event;
        return this.canvas.dispatchEvent(new CustomEvent(name, detail));
    },

    dispatchNewMouseKeysEvent: function(event, name, detail) {
        detail = detail || {};
        detail.mouse = this.mouseLocation;
        detail.keys = this.currentKeys;
        return this.dispatchNewEvent(event, name, detail);
    },

    finmousemove: function(e) {
        if (!this.isDragging() && this.mousedown) {
            this.beDragging();
            this.dispatchNewMouseKeysEvent(e, 'fin-canvas-dragstart', {
                isRightClick: this.isRightClick(e)
            });
            this.dragstart = new rectangular.Point(this.mouseLocation.x, this.mouseLocation.y);
        }
        this.mouseLocation = this.getLocal(e);
        //console.log(this.mouseLocation);
        if (this.isDragging()) {
            this.dispatchNewMouseKeysEvent(e, 'fin-canvas-drag', {
                dragstart: this.dragstart,
                isRightClick: this.isRightClick(e)
            });
        }
        if (this.bounds.contains(this.mouseLocation)) {
            this.dispatchNewMouseKeysEvent(e, 'fin-canvas-mousemove');
        }
    },

    finmousedown: function(e) {
        this.mouseLocation = this.mouseDownLocation = this.getLocal(e);
        this.mousedown = true;

        this.dispatchNewMouseKeysEvent(e, 'fin-canvas-mousedown', {
            isRightClick: this.isRightClick(e)
        });
        this.takeFocus();
    },

    finmouseup: function(e) {
        if (this.isDragging()) {
            this.dispatchNewMouseKeysEvent(e, 'fin-canvas-dragend', {
                dragstart: this.dragstart,
                isRightClick: this.isRightClick(e)
            });
            this.beNotDragging();
            this.dragEndtime = Date.now();
        }
        this.mousedown = false;
        this.dispatchNewMouseKeysEvent(e, 'fin-canvas-mouseup', {
            isRightClick: this.isRightClick(e)
        });
        //this.mouseLocation = new rectangular.Point(-1, -1);
    },

    finmouseout: function(e) {
        if (!this.mousedown) {
            this.mouseLocation = new rectangular.Point(-1, -1);
        }
        this.dispatchNewMouseKeysEvent(e, 'fin-canvas-mouseout');
    },

    finwheelmoved: function(e) {
        if (this.isDragging() || !this.hasFocus()) {
            return;
        }
        e.preventDefault();
        this.dispatchNewMouseKeysEvent(e, 'fin-canvas-wheelmoved', {
            isRightClick: this.isRightClick(e)
        });
    },

    finclick: function(e) {
        if (this.doubleClickTimer && Date.now() - this.lastClickTime < this.doubleClickDelay) {
            //this is a double click...
            clearTimeout(this.doubleClickTimer); // prevent click event
            this.doubleClickTimer = undefined;
            this.findblclick(e);
        } else {
            this.lastClickTime = Date.now();

            this.doubleClickTimer = setTimeout(function() {
                this.doubleClickTimer = undefined;
                this.mouseLocation = this.getLocal(e);
                this.dispatchNewMouseKeysEvent(e, 'fin-canvas-click', {
                    isRightClick: this.isRightClick(e)
                });
            }.bind(this), this.doubleClickDelay);
        }
    },

    finrelease: function(e) {
        this.holdPulseCount = 0;
        this.mouseLocation = this.getLocal(e);
        this.dispatchNewMouseKeysEvent(e, 'fin-canvas-release');
    },

    finflick: function(e) {
        if (!this.hasFocus()) {
            return;
        }
        this.mouseLocation = this.getLocal(e);
        this.dispatchNewMouseKeysEvent(e, 'fin-canvas-flick', {
            isRightClick: this.isRightClick(e)
        });
    },

    fintrackstart: function(e) {
        if (!this.hasFocus()) {
            return;
        }
        this.mouseLocation = this.getLocal(e);
        this.dispatchNewMouseKeysEvent(e, 'fin-canvas-trackstart');
    },

    fintrack: function(e) {
        if (!this.hasFocus()) {
            return;
        }
        this.mouseLocation = this.getLocal(e);
        this.dispatchNewMouseKeysEvent(e, 'fin-canvas-track');
    },

    fintrackend: function(e) {
        this.mouseLocation = this.getLocal(e);
        this.dispatchNewMouseKeysEvent(e, 'fin-canvas-trackend');
    },

    finhold: function(e) {
        this.mouseLocation = this.getLocal(e);
        this.dispatchNewMouseKeysEvent(e, 'fin-canvas-hold', {
            isRightClick: this.isRightClick(e)
        });
    },

    finholdpulse: function(e) {
        this.mouseLocation = this.getLocal(e);
        this.dispatchNewMouseKeysEvent(e, 'fin-canvas-holdpulse', {
            count: this.holdPulseCount++
        });
    },

    fintap: function(e) {
        //this nonsense is to hold a tap if it's really a double click
        var self = this;
        var now = Date.now();
        var dif = now - this.lastDoubleClickTime;
        if (dif < 300) {
            return;
        }
        //dragend is also causing a tap
        //lets fix this here
        if (now - this.dragEndtime < 100) {
            return;
        }
        setTimeout(function() {
            self._fintap(e);
        }, 180);
    },

    _fintap: function(e) {
        //this nonsense is to hold a tap if it's really a double click
        var now = Date.now();
        var dif = now - this.lastDoubleClickTime;
        if (dif < 300) {
            return;
        }

        if (this.mouseDownLocation) { // maybe no mousedown on a phone?
            this.mouseLocation = this.mouseDownLocation; // mouse may have moved since mousedown
            this.mouseDownLocation = undefined; // consume it (maybe not needed; once a mousedown always a mousedown)
        }

        this.dispatchNewMouseKeysEvent(e, 'fin-canvas-tap', {
            isRightClick: this.isRightClick(e)
        });
    },

    findblclick: function(e) {
        this.mouseLocation = this.getLocal(e);
        this.lastDoubleClickTime = Date.now();
        this.dispatchNewMouseKeysEvent(e, 'fin-canvas-dblclick', {
            isRightClick: this.isRightClick(e)
        });
        //console.log('dblclick', this.currentKeys);
    },

    getCharMap: function() { //TODO: This is static. Make it a property of the constructor.
        return charMap;
    },

    finkeydown: function(e) {
        if (!this.hasFocus()) {
            return;
        }

        //e.preventDefault();
        var keyChar = e.shiftKey ? charMap[e.keyCode][1] : charMap[e.keyCode][0];
        if (e.repeat) {
            if (this.repeatKey === keyChar) {
                this.repeatKeyCount++;
            } else {
                this.repeatKey = keyChar;
                this.repeatKeyStartTime = Date.now();
            }
        } else {
            this.repeatKey = null;
            this.repeatKeyCount = 0;
            this.repeatKeyStartTime = 0;
        }
        if (this.currentKeys.indexOf(keyChar) === -1) {
            this.currentKeys.push(keyChar);
        }
        //console.log(keyChar, e.keyCode);
        this.dispatchNewEvent(e, 'fin-canvas-keydown', {
            alt: e.altKey,
            ctrl: e.ctrlKey,
            char: keyChar,
            code: e.charCode,
            key: e.keyCode,
            meta: e.metaKey,
            repeatCount: this.repeatKeyCount,
            repeatStartTime: this.repeatKeyStartTime,
            shift: e.shiftKey,
            identifier: e.keyIdentifier,
            currentKeys: this.currentKeys.slice(0)
        });
    },

    finkeyup: function(e) {
        var keyChar = e.shiftKey ? charMap[e.keyCode][1] : charMap[e.keyCode][0];
        this.currentKeys.splice(this.currentKeys.indexOf(keyChar), 1);
        if (!this.hasFocus()) {
            return;
        }
        this.repeatKeyCount = 0;
        this.repeatKey = null;
        this.repeatKeyStartTime = 0;
        this.dispatchNewEvent(e, 'fin-canvas-keyup', {
            alt: e.altKey,
            ctrl: e.ctrlKey,
            char: keyChar,
            code: e.charCode,
            key: e.keyCode,
            meta: e.metaKey,
            repeat: e.repeat,
            shift: e.shiftKey,
            identifier: e.keyIdentifier,
            currentKeys: this.currentKeys.slice(0)
        });
    },

    finfocusgained: function(e) {
        this.dispatchNewEvent(e, 'fin-canvas-focus-gained');
    },

    finfocuslost: function(e) {
        this.dispatchNewEvent(e, 'fin-canvas-focus-lost');
    },

    fincontextmenu: function(e) {
        if (e.ctrlKey && this.currentKeys.indexOf('CTRL') === -1) {
            this.currentKeys.push('CTRL');
        }
        if (this.doubleRightClickTimer && Date.now() - this.lastClickTime < this.doubleClickDelay) {
            //this is a double click...
            clearTimeout(this.doubleRightClickTimer); // prevent context menu event
            this.doubleRightClickTimer = undefined;
            this.findblclick(e);
        } else {
            this.lastClickTime = Date.now();

            this.doubleRightClickTimer = setTimeout(function() {
                this.doubleRightClickTimer = undefined;
                this.dispatchNewMouseKeysEvent(e, 'fin-canvas-context-menu', {
                    isRightClick: this.isRightClick(e)
                });
            }.bind(this), this.doubleClickDelay);
        }
    },

    repaint: function() {
        var fps = this.getFPS();
        this.dirty = true;
        if (!paintLoopRunning || fps === 0) {
            this.paintNow();
        }
    },

    getMouseLocation: function() {
        return this.mouseLocation;
    },

    getOrigin: function() {
        var rect = this.canvas.getBoundingClientRect();
        var p = new rectangular.Point(rect.left, rect.top);
        return p;
    },

    getLocal: function(e) {
        var rect = this.canvas.getBoundingClientRect();
        var p = new rectangular.Point(e.clientX - rect.left, e.clientY - rect.top);
        return p;
    },

    hasFocus: function() {
        return document.activeElement === this.canvas;
    },

    takeFocus: function() {
        var self = this;
        if (!this.hasFocus()) {
            setTimeout(function() {
                self.canvas.focus();
            }, 10);
        }
    },

    beDragging: function() {
        this.dragging = true;
        this.disableDocumentElementSelection();
    },

    beNotDragging: function() {
        this.dragging = false;
        this.enableDocumentElementSelection();
    },

    isDragging: function() {
        return this.dragging;
    },

    disableDocumentElementSelection: function() {
        var style = document.body.style;
        style.cssText = style.cssText + '-webkit-user-select: none';
    },

    enableDocumentElementSelection: function() {
        var style = document.body.style;
        style.cssText = style.cssText.replace('-webkit-user-select: none', '');
    },

    setFocusable: function(truthy) {
        this.focuser.style.display = truthy ? '' : 'none';
    },

    isRightClick: function(e) {
        var isRightMB;
        e = e || window.event;

        if ('which' in e) { // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
            isRightMB = e.which === 3;
        } else if ('button' in e) { // IE, Opera
            isRightMB = e.button === 2;
        }
        return isRightMB;
    },

    dispatchEvent: function(e) {
        return this.canvas.dispatchEvent(e);
    }
};

function paintLoopFunction(now) {
    if (!paintLoopRunning) {
        return;
    }
    for (var i = 0; i < paintables.length; i++) {
        try {
            paintables[i].tickPainter(now);
        } catch (e) {
            console.error(e);
        }
    }
    requestAnimationFrame(paintLoopFunction);
}
requestAnimationFrame(paintLoopFunction);

function resizablesLoopFunction(now) {
    if (!resizeLoopRunning) {
        return;
    }
    for (var i = 0; i < resizables.length; i++) {
        try {
            resizables[i].tickResizer(now);
        } catch (e) {
            console.error(e);
        }
    }
}
setInterval(resizablesLoopFunction, RESIZE_POLLING_INTERVAL);

function makeCharMap() {
    var map = [];

    var empty = ['', ''];

    for (var i = 0; i < 256; i++) {
        map[i] = empty;
    }

    map[27] = ['ESC', 'ESCSHIFT'];
    map[192] = ['`', '~'];
    map[49] = ['1', '!'];
    map[50] = ['2', '@'];
    map[51] = ['3', '#'];
    map[52] = ['4', '$'];
    map[53] = ['5', '%'];
    map[54] = ['6', '^'];
    map[55] = ['7', '&'];
    map[56] = ['8', '*'];
    map[57] = ['9', '('];
    map[48] = ['0', ')'];
    map[189] = ['-', '_'];
    map[187] = ['=', '+'];
    map[8] = ['BACKSPACE', 'BACKSPACESHIFT'];
    map[46] = ['DELETE', 'DELETESHIFT'];
    map[9] = ['TAB', 'TABSHIFT'];
    map[81] = ['q', 'Q'];
    map[87] = ['w', 'W'];
    map[69] = ['e', 'E'];
    map[82] = ['r', 'R'];
    map[84] = ['t', 'T'];
    map[89] = ['y', 'Y'];
    map[85] = ['u', 'U'];
    map[73] = ['i', 'I'];
    map[79] = ['o', 'O'];
    map[80] = ['p', 'P'];
    map[219] = ['[', '{'];
    map[221] = [']', '}'];
    map[220] = ['\\', '|'];
    map[220] = ['CAPSLOCK', 'CAPSLOCKSHIFT'];
    map[65] = ['a', 'A'];
    map[83] = ['s', 'S'];
    map[68] = ['d', 'D'];
    map[70] = ['f', 'F'];
    map[71] = ['g', 'G'];
    map[72] = ['h', 'H'];
    map[74] = ['j', 'J'];
    map[75] = ['k', 'K'];
    map[76] = ['l', 'L'];
    map[186] = [';', ':'];
    map[222] = ['\'', '|'];
    map[13] = ['RETURN', 'RETURNSHIFT'];
    map[16] = ['SHIFT', 'SHIFT'];
    map[90] = ['z', 'Z'];
    map[88] = ['x', 'X'];
    map[67] = ['c', 'C'];
    map[86] = ['v', 'V'];
    map[66] = ['b', 'B'];
    map[78] = ['n', 'N'];
    map[77] = ['m', 'M'];
    map[188] = [',', '<'];
    map[190] = ['.', '>'];
    map[191] = ['/', '?'];
    map[16] = ['SHIFT', 'SHIFT'];
    map[17] = ['CTRL', 'CTRLSHIFT'];
    map[18] = ['ALT', 'ALTSHIFT'];
    map[91] = ['COMMANDLEFT', 'COMMANDLEFTSHIFT'];
    map[32] = ['SPACE', 'SPACESHIFT'];
    map[93] = ['COMMANDRIGHT', 'COMMANDRIGHTSHIFT'];
    map[18] = ['ALT', 'ALTSHIFT'];
    map[38] = ['UP', 'UPSHIFT'];
    map[37] = ['LEFT', 'LEFTSHIFT'];
    map[40] = ['DOWN', 'DOWNSHIFT'];
    map[39] = ['RIGHT', 'RIGHTSHIFT'];

    map[33] = ['PAGEUP', 'PAGEUPSHIFT'];
    map[34] = ['PAGEDOWN', 'PAGEDOWNSHIFT'];
    map[35] = ['PAGERIGHT', 'PAGERIGHTSHIFT']; // END
    map[36] = ['PAGELEFT', 'PAGELEFTSHIFT']; // HOME

    map[112] = ['F1', 'F1SHIFT'];
    map[113] = ['F2', 'F2SHIFT'];
    map[114] = ['F3', 'F3SHIFT'];
    map[115] = ['F4', 'F4SHIFT'];
    map[116] = ['F5', 'F5SHIFT'];
    map[117] = ['F6', 'F6SHIFT'];
    map[118] = ['F7', 'F7SHIFT'];
    map[119] = ['F8', 'F8SHIFT'];
    map[120] = ['F9', 'F9SHIFT'];
    map[121] = ['F10', 'F10SHIFT'];
    map[122] = ['F11', 'F1S1HIFT'];
    map[123] = ['F12', 'F121HIFT'];

    return map;
}

module.exports = Canvas;
