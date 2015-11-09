/*global requestAnimationFrame, document, CustomEvent, window */

'use strict';

var gestures = require('../libs/polymergestures.dev.js');
var GraphicsContext = require('./GraphicsContext.js');
var rectangles = require('rectangular');

var paintables = [];
var resizables = [];
var paintLoopRunning = true;
var resizeLoopRunning = true;

var paintLoopFunction = function(now) {
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
};
requestAnimationFrame(paintLoopFunction);


var resizablesLoopFunction = function(now) {
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
};
setInterval(resizablesLoopFunction, 200);

var charMap = [];
var empty = ['', ''];
for (var i = 0; i < 256; i++) {
    charMap[i] = empty;
}

charMap[27] = ['ESC', 'ESCSHIFT'];
charMap[192] = ['`', '~'];
charMap[49] = ['1', '!'];
charMap[50] = ['2', '@'];
charMap[51] = ['3', '#'];
charMap[52] = ['4', '$'];
charMap[53] = ['5', '%'];
charMap[54] = ['6', '^'];
charMap[55] = ['7', '&'];
charMap[56] = ['8', '*'];
charMap[57] = ['9', '('];
charMap[48] = ['0', ')'];
charMap[189] = ['-', '_'];
charMap[187] = ['=', '+'];
charMap[8] = ['DELETE', 'DELETESHIFT'];
charMap[9] = ['TAB', 'TABSHIFT'];
charMap[81] = ['q', 'Q'];
charMap[87] = ['w', 'W'];
charMap[69] = ['e', 'E'];
charMap[82] = ['r', 'R'];
charMap[84] = ['t', 'T'];
charMap[89] = ['y', 'Y'];
charMap[85] = ['u', 'U'];
charMap[73] = ['i', 'I'];
charMap[79] = ['o', 'O'];
charMap[80] = ['p', 'P'];
charMap[219] = ['[', '{'];
charMap[221] = [']', '}'];
charMap[220] = ['\\', '|'];
charMap[220] = ['CAPSLOCK', 'CAPSLOCKSHIFT'];
charMap[65] = ['a', 'A'];
charMap[83] = ['s', 'S'];
charMap[68] = ['d', 'D'];
charMap[70] = ['f', 'F'];
charMap[71] = ['g', 'G'];
charMap[72] = ['h', 'H'];
charMap[74] = ['j', 'J'];
charMap[75] = ['k', 'K'];
charMap[76] = ['l', 'L'];
charMap[186] = [';', ':'];
charMap[222] = ['\'', '|'];
charMap[13] = ['RETURN', 'RETURNSHIFT'];
charMap[16] = ['SHIFT', 'SHIFT'];
charMap[90] = ['z', 'Z'];
charMap[88] = ['x', 'X'];
charMap[67] = ['c', 'C'];
charMap[86] = ['v', 'V'];
charMap[66] = ['b', 'B'];
charMap[78] = ['n', 'N'];
charMap[77] = ['m', 'M'];
charMap[188] = [',', '<'];
charMap[190] = ['.', '>'];
charMap[191] = ['/', '?'];
charMap[16] = ['SHIFT', 'SHIFT'];
charMap[17] = ['CTRL', 'CTRLSHIFT'];
charMap[18] = ['ALT', 'ALTSHIFT'];
charMap[91] = ['COMMANDLEFT', 'COMMANDLEFTSHIFT'];
charMap[32] = ['SPACE', 'SPACESHIFT'];
charMap[93] = ['COMMANDRIGHT', 'COMMANDRIGHTSHIFT'];
charMap[18] = ['ALT', 'ALTSHIFT'];
charMap[38] = ['UP', 'UPSHIFT'];
charMap[37] = ['LEFT', 'LEFTSHIFT'];
charMap[40] = ['DOWN', 'DOWNSHIFT'];
charMap[39] = ['RIGHT', 'RIGHTSHIFT'];

charMap[33] = ['PAGEUP', 'PAGEUPSHIFT'];
charMap[34] = ['PAGEDOWN', 'PAGEDOWNSHIFT'];
charMap[35] = ['PAGERIGHT', 'PAGERIGHTSHIFT'];
charMap[36] = ['PAGELEFT', 'PAGELEFTSHIFT'];

function Canvas(div, component) {
    this.div = div;
    this.component = component;
    this.initialize();
}

Canvas.prototype = {
    constructor: Canvas.prototype.constructor,
    gestures: gestures,
    g: null,
    div: null,
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

    initialize: function() {
        var self = this;
        this.dragEndtime = Date.now();
        this.g = rectangles;

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

        this.mouseLocation = new this.g.Point(-1, -1);
        this.dragstart = new this.g.Point(-1, -1);
        //this.origin = new this.g.Point(0, 0);
        this.bounds = new this.g.Rectangle(0, 0, 0, 0);
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
    },

    addEventListener: function(name, callback) {
        this.canvas.addEventListener(name, callback);
    },

    stopPaintThread: function() {
        paintLoopRunning = false;
    },

    restartPaintThread: function() {
        if (paintLoopRunning) {
            return; // already running
        }
        paintLoopRunning = true;
        requestAnimationFrame(paintLoopFunction);
    },

    stopResizeThread: function() {
        resizeLoopRunning = false;
    },

    restartResizeThread: function() {
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

    isHiDPI: function() {
        return this.canvas.getAttribute('hidpi') !== null;
    },

    useBitBlit: function() {
        return this.canvas.getAttribute('bitblit') !== 'false';
    },

    getFPS: function() {
        var fps = this.canvas.parentElement.getAttribute('fps');
        return fps ? parseInt(fps) : 0;
    },

    getComponent: function() {
        return this.component;
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
        this.size = this.div.getBoundingClientRect();

        this.canvas.width = this.div.clientWidth;
        this.canvas.height = this.div.clientHeight;

        this.buffer.width = this.div.clientWidth;
        this.buffer.height = this.div.clientHeight;

        //fix ala sir spinka, see
        //http://www.html5rocks.com/en/tutorials/canvas/hidpi/
        //just add 'hdpi' as an attribute to the fin-canvas tag
        var ratio = 1;
        var useBitBlit = this.useBitBlit();
        var isHIDPI = window.devicePixelRatio && this.isHiDPI();
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
        this.canvas.width = width * ratio;
        this.canvas.height = height * ratio;
        this.buffer.width = width * ratio;
        this.buffer.height = height * ratio;

        this.canvas.style.width = width + 'px';
        this.canvas.style.height = height + 'px';
        this.buffer.style.width = width + 'px';
        this.buffer.style.height = height + 'px';

        this.bufferCTX.scale(ratio, ratio);
        if (isHIDPI && !useBitBlit) {
            this.canvasCTX.scale(ratio, ratio);
        }

        //this.origin = new this.g.Point(Math.round(this.size.left), Math.round(this.size.top));
        this.bounds = new this.g.Rectangle(0, 0, this.size.width, this.size.height);
        //setTimeout(function() {
        var comp = this.getComponent();
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
            self.paint(gc);
            self.dirty = false;
        });
    },

    safePaintImmediately: function(paintFunction) {
        var useBitBlit = this.useBitBlit(),
            gc = useBitBlit ? this.bufferGC : this.canvasCTX;
        try {
            gc.save();
            paintFunction(gc);
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

    paint: function(gc) {
        var comp = this.getComponent();
        if (comp) {
            comp._paint(gc);
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
            this.dragstart = new this.g.Point(this.mouseLocation.x, this.mouseLocation.y);
        }
        this.mouseLocation = this.getLocal(e);
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
        this.mouseLocation = this.getLocal(e);
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
        //this.mouseLocation = new this.g.Point(-1, -1);
    },

    finmouseout: function(e) {
        if (!this.mousedown) {
            this.mouseLocation = new this.g.Point(-1, -1);
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
        if (Date.now() - this.lastClickTime < 250) {
            //this is a double click...
            this.findblclick(e);
            return;
        }
        this.mouseLocation = this.getLocal(e);
        this.dispatchNewMouseKeysEvent(e, 'fin-canvas-click', {
            isRightClick: this.isRightClick(e)
        });
        this.lastClickTime = Date.now();
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
        this.mouseLocation = this.getLocal(e);
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

    getCharMap: function() {
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
        if (Date.now() - this.lastClickTime < 250) {
            //this is a double click...
            this.findblclick(e);
            return;
        }
        this.dispatchNewMouseKeysEvent(e, 'fin-canvas-context-menu', {
            isRightClick: this.isRightClick(e)
        });
        this.lastClickTime = Date.now();
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
        var p = new this.g.Point(rect.left, rect.top);
        return p;
    },

    getLocal: function(e) {
        var rect = this.canvas.getBoundingClientRect();
        var p = new this.g.Point((e.x || e.clientX) - rect.left, (e.y || e.clientY) - rect.top);
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
        this.focuser.style.display = truthy ? '' : 'none'; // previously boolean === true
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
    }
};

module.exports = Canvas;