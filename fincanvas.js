(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/* eslint-env node, browser */

/**
 * Creates a new read-only property and attaches it to the provided context.
 * @private
 * @param {string} name - Name for new property.
 * @param {*} [value] - Value of new property.
 */
function addReadOnlyProperty(name, value) {
    Object.defineProperty(this, name, {
        value: value,
        writable: false,
        enumerable: true,
        configurable: false
    });
}

/**
 * @constructor Point
 *
 * @desc This object represents a single point in an abstract 2-dimensional matrix.
 *
 * The unit of measure is typically pixels.
 * (If used to model computer graphics, vertical coordinates are typically measured downwards
 * from the top of the window. This convention however is not inherent in this object.)
 *
 * Note: This object should be instantiated with the `new` keyword.
 *
 * @param {number} x - the new point's `x` property
 * @param {number} y - the new point's `y` property
 */
function Point(x, y) {

    /**
     * @name x
     * @type {number}
     * @summary This point's horizontal coordinate.
     * @desc Created upon instantiation by the {@link Point|constructor}.
     * @memberOf Point.prototype
     * @abstract
     */
    addReadOnlyProperty.call(this, 'x', Number(x) || 0);

    /**
     * @name y
     * @type {number}
     * @summary This point's vertical coordinate.
     * @desc Created upon instantiation by the {@link Point|constructor}.
     * @memberOf Point.prototype
     * @abstract
     */
    addReadOnlyProperty.call(this, 'y', Number(y) || 0);

}

Point.prototype = {

    /**
     * @returns {Point} A new point which is this point's position increased by coordinates of given `offset`.
     * @param {Point} offset - Horizontal and vertical values to add to this point's coordinates.
     * @memberOf Point.prototype
     */
    plus: function(offset) {
        return new Point(
            this.x + offset.x,
            this.y + offset.y
        );
    },

    /**
     * @returns {Point} A new point which is this point's position increased by given offsets.
     * @param {number} [offsetX=0] - Value to add to this point's horizontal coordinate.
     * @param {number} [offsetY=0] - Value to add to this point's horizontal coordinate.
     * @memberOf Point.prototype
     */
    plusXY: function(offsetX, offsetY) {
        return new Point(
            this.x + (offsetX || 0),
            this.y + (offsetY || 0)
        );
    },

    /**
     * @returns {Point} A new point which is this point's position decreased by coordinates of given `offset`.
     * @param {Point} offset - Horizontal and vertical values to subtract from this point's coordinates.
     * @memberOf Point.prototype
     */
    minus: function(offset) {
        return new Point(
            this.x - offset.x,
            this.y - offset.y
        );
    },

    /**
     * @returns {Point} A new `Point` positioned to least x and least y of this point and given `offset`.
     * @param {Point} point - A point to compare to this point.
     * @memberOf Point.prototype
     */
    min: function(point) {
        return new Point(
            Math.min(this.x, point.x),
            Math.min(this.y, point.y)
        );
    },

    /**
     * @returns {Point} A new `Point` positioned to greatest x and greatest y of this point and given `point`.
     * @param {Point} point - A point to compare to this point.
     * @memberOf Point.prototype
     */
    max: function(point) {
        return new Point(
            Math.max(this.x, point.x),
            Math.max(this.y, point.y)
        );
    },

    /**
     * @returns {number} Distance between given `point` and this point using Pythagorean Theorem formula.
     * @param {Point} point - A point from which to compute the distance to this point.
     * @memberOf Point.prototype
     */
    distance: function(point) {
        var deltaX = point.x - this.x,
            deltaY = point.y - this.y;

        return Math.sqrt(
            deltaX * deltaX +
            deltaY * deltaY
        );
    },

    /**
     * _(Formerly: `equal`.)_
     * @returns {boolean} `true` iff _both_ coordinates of this point are exactly equal to those of given `point`.
     * @param {Point} point - A point to compare to this point.
     * @memberOf Point.prototype
     */
    equals: function(point) {
        var result = false;

        if (point) {
            result =
                this.x === point.x &&
                this.y === point.y;
        }

        return result;
    },

    /**
     * @returns {boolean} `true` iff _both_ coordinates of this point are greater than those of given `point`.
     * @param {Point} point - A point to compare to this point
     * @memberOf Point.prototype
     */
    greaterThan: function(point) {
        return (
            this.x > point.x &&
            this.y > point.y
        );
    },

    /**
     * @returns {boolean} `true` iff _both_ coordinates of this point are less than those of given `point`.
     * @param {Point} point - A point to compare to this point
     * @memberOf Point.prototype
     */
    lessThan: function(point) {
        return (
            this.x < point.x &&
            this.y < point.y
        );
    },

    /**
     * _(Formerly `greaterThanEqualTo`.)_
     * @returns {boolean} `true` iff _both_ coordinates of this point are greater than or equal to those of given `point`.
     * @param {Point} point - A point to compare to this point
     * @memberOf Point.prototype
     */
    greaterThanOrEqualTo: function(point) {
        return (
            this.x >= point.x &&
            this.y >= point.y
        );
    },

    /**
     * _(Formerly `lessThanEqualTo`.)_
     * @returns {boolean} `true` iff _both_ coordinates of this point are less than or equal to those of given `point`.
     * @param {Point} point - A point to compare to this point.
     * @memberOf Point.prototype
     */
    lessThanOrEqualTo: function(point) {
        return (
            this.x <= point.x &&
            this.y <= point.y
        );
    },

    /**
     * _(Formerly `isContainedWithinRectangle`.)_
     * @param rect {Rectangle} - Rectangle to test this point against.
     * @returns {boolean} `true` iff this point is within given `rect`.
     * @memberOf Point.prototype
     */
    within: function(rect) {
        var minX = rect.origin.x,
            maxX = minX + rect.extent.x;
        var minY = rect.origin.y,
            maxY = minY + rect.extent.y;

        if (rect.extent.x < 0) {
            minX = maxX;
            maxX = rect.origin.x;
        }

        if (rect.extent.y < 0) {
            minY = maxY;
            maxY = rect.origin.y;
        }

        return (
            minX <= this.x && this.x < maxX &&
            minY <= this.y && this.y < maxY
        );
    }
};

Point.prototype.EQ = Point.prototype.equals;
Point.prototype.GT = Point.prototype.greaterThan;
Point.prototype.LT = Point.prototype.lessThan;
Point.prototype.GE = Point.prototype.greaterThanOrEqualTo;
Point.prototype.LE = Point.prototype.lessThanOrEqualTo;


/**
 * @constructor Rectangle
 *
 * @desc This object represents a rectangular area within an abstract 2-dimensional matrix.
 *
 * The unit of measure is typically pixels.
 * (If used to model computer graphics, vertical coordinates are typically measured downwards
 * from the top of the window. This convention however is not inherent in this object.)
 *
 * Normally, the `x` and `y` parameters to the constructor describe the upper left corner of the rect.
 * However, negative values of `width` and `height` will be added to the given `x` and `y`. That is,
 * a negative value of the `width` parameter will extend the rect to the left of the given `x` and
 * a negative value of the `height` parameter will extend the rect above the given `y`.
 * In any case, after instantiation the following are guaranteed to always be true:
 * * The `extent`, `width`, and `height` properties _always_ give positive values.
 * * The `origin`, `top`, and `left` properties _always_ reflect the upper left corner.
 * * The `corner`, `bottom`, and `right` properties _always_ reflect the lower right corner.
 *
 * Note: This object should be instantiated with the `new` keyword.
 *
 * @param {number} [x=0] - Horizontal coordinate of some corner of the rect.
 * @param {number} [y=0] - Vertical coordinate of some corner of the rect.
 * @param {number} [width=0] - Width of the new rect. May be negative (see above).
 * @param {number} [height=0] - Height of the new rect. May be negative (see above).
 */
function Rectangle(x, y, width, height) {

    x = Number(x) || 0;
    y = Number(y) || 0;
    width = Number(width) || 0;
    height = Number(height) || 0;

    if (width < 0) {
        x += width;
        width = -width;
    }

    if (height < 0) {
        y += height;
        height = -height;
    }

    /**
     * @name origin
     * @type {Point}
     * @summary Upper left corner of this rect.
     * @desc Created upon instantiation by the {@linkplain Rectangle|constructor}.
     * @memberOf Rectangle.prototype
     * @abstract
     */
    addReadOnlyProperty.call(this, 'origin', new Point(x, y));

    /**
     * @name extent
     * @type {Point}
     * @summary this rect's width and height.
     * @desc Unlike the other `Point` properties, `extent` is not a global coordinate pair; rather it consists of a _width_ (`x`, always positive) and a _height_ (`y`, always positive).
     *
     * This object might be more legitimately typed as something like `Area` with properties `width` and `height`; however we wanted it to be able to use it efficiently with a point's `plus` and `minus` methods (that is, without those methods having to check and branch on the type of its parameter).
     *
     * Created upon instantiation by the {@linkplain Rectangle|constructor}.
     * @see The {@link Rectangle#corner|corner} method.
     * @memberOf Rectangle.prototype
     * @abstract
     */
    addReadOnlyProperty.call(this, 'extent', new Point(width, height));

    /**
     * @name corner
     * @type {Point}
     * @summary Lower right corner of this rect.
     * @desc This is a calculated value created upon instantiation by the {@linkplain Rectangle|constructor}. It is `origin` offset by `extent`.
     *
     * **Note:** These coordinates actually point to the pixel one below and one to the right of the rect's actual lower right pixel.
     * @memberOf Rectangle.prototype
     * @abstract
     */
    addReadOnlyProperty.call(this, 'corner', new Point(x + width, y + height));

    /**
     * @name center
     * @type {Point}
     * @summary Center of this rect.
     * @desc Created upon instantiation by the {@linkplain Rectangle|constructor}.
     * @memberOf Rectangle.prototype
     * @abstract
     */
    addReadOnlyProperty.call(this, 'center', new Point(x + (width / 2), y + (height / 2)));

}

Rectangle.prototype = {

    /**
     * @type {number}
     * @desc _(Formerly a function; now a getter.)_
     * @summary Minimum vertical coordinate of this rect.
     * @memberOf Rectangle.prototype
     */
    get top() {
        return this.origin.y;
    },

    /**
     * @type {number}
     * @desc _(Formerly a function; now a getter.)_
     * @summary Minimum horizontal coordinate of this rect.
     * @memberOf Rectangle.prototype
     */
    get left() {
        return this.origin.x;
    },

    /**
     * @type {number}
     * @desc _(Formerly a function; now a getter.)_
     * @summary Maximum vertical coordinate of this rect + 1.
     * @memberOf Rectangle.prototype
     */
    get bottom() {
        return this.corner.y;
    },

    /**
     * @type {number}
     * @desc _(Formerly a function; now a getter.)_
     * @summary Maximum horizontal coordinate of this rect + 1.
     * @memberOf Rectangle.prototype
     */
    get right() {
        return this.corner.x;
    },

    /**
     * @type {number}
     * @desc _(Formerly a function; now a getter.)_
     * @summary Width of this rect (always positive).
     * @memberOf Rectangle.prototype
     */
    get width() {
        return this.extent.x;
    },

    /**
     * @type {number}
     * @desc _(Formerly a function; now a getter.)_
     * @summary Height of this rect (always positive).
     * @memberOf Rectangle.prototype
     */
    get height() {
        return this.extent.y;
    },

    /**
     * @type {number}
     * @desc _(Formerly a function; now a getter.)_
     * @summary Area of this rect.
     * @memberOf Rectangle.prototype
     */
    get area() {
        return this.width * this.height;
    },

    /**
     * @returns {Rectangle} A copy of this rect but with horizontal position reset to given `x` and no width.
     * @param {number} x - Horizontal coordinate of the new rect.
     * @memberOf Rectangle.prototype
     */
    flattenXAt: function(x) {
        return new Rectangle(x, this.origin.y, 0, this.extent.y);
    },

    /**
     * @returns {Rectangle} A copy of this rect but with vertical position reset to given `y` and no height.
     * @param {number} y - Vertical coordinate of the new rect.
     * @memberOf Rectangle.prototype
     */
    flattenYAt: function(y) {
        return new Rectangle(this.origin.x, y, this.extent.x, 0);
    },

    /**
     * @returns {boolean} `true` iff given `point` entirely contained within this rect.
     * @param {Point} pointOrRect - The point or rect to test for containment.
     * @memberOf Rectangle.prototype
     */
    contains: function(pointOrRect) {
        return pointOrRect.within(this);
    },

    /**
     * _(Formerly `isContainedWithinRectangle`.)_
     * @returns {boolean} `true` iff `this` rect is entirely contained within given `rect`.
     * @param {Rectangle} rect - Rectangle to test against this rect.
     * @memberOf Rectangle.prototype
     */
    within: function(rect) {
        return (
            rect.origin.lessThanOrEqualTo(this.origin) &&
            rect.corner.greaterThanOrEqualTo(this.corner)
        );
    },

    /**
     * _(Formerly: `insetBy`.)_
     * @returns {Rectangle} That is enlarged/shrunk by given `padding`.
     * @param {number} padding - Amount by which to increase (+) or decrease (-) this rect
     * @see The {@link Rectangle#shrinkBy|shrinkBy} method.
     * @memberOf Rectangle.prototype
     */
    growBy: function(padding) {
        return new Rectangle(
            this.origin.x + padding,
            this.origin.y + padding,
            this.extent.x - padding - padding,
            this.extent.y - padding - padding);
    },

    /**
     * @returns {Rectangle} That is enlarged/shrunk by given `padding`.
     * @param {number} padding - Amount by which to decrease (+) or increase (-) this rect.
     * @see The {@link Rectangle#growBy|growBy} method.
     * @memberOf Rectangle.prototype
     */
    shrinkBy: function(padding) {
        return this.growBy(-padding);
    },

    /**
     * @returns {Rectangle} Bounding rect that contains both this rect and the given `rect`.
     * @param {Rectangle} rect - The rectangle to union with this rect.
     * @memberOf Rectangle.prototype
     */
    union: function(rect) {
        var origin = this.origin.min(rect.origin),
            corner = this.corner.max(rect.corner),
            extent = corner.minus(origin);

        return new Rectangle(
            origin.x, origin.y,
            extent.x, extent.y
        );
    },

    /**
     * iterate over all points within this rect, invoking `iteratee` for each.
     * @param {function(number,number)} iteratee - Function to call for each point.
     * Bound to `context` when given; otherwise it is bound to this rect.
     * Each invocation of `iteratee` is called with two arguments:
     * the horizontal and vertical coordinates of the point.
     * @param {object} [context=this] - Context to bind to `iteratee` (when not `this`).
     * @memberOf Rectangle.prototype
     */
    forEach: function(iteratee, context) {
        context = context || this;
        for (var x = this.origin.x, x2 = this.corner.x; x < x2; x++) {
            for (var y = this.origin.y, y2 = this.corner.y; y < y2; y++) {
                iteratee.call(context, x, y);
            }
        }
    },

    /**
     * @returns {Rectangle} One of:
     * * _If this rect intersects with the given `rect`:_
     *      a new rect representing that intersection.
     * * _If it doesn't intersect and `ifNoneAction` defined:_
     *      result of calling `ifNoneAction`.
     * * _If it doesn't intersect and `ifNoneAction` undefined:_
     *      `null`.
     * @param {Rectangle} rect - The rectangle to intersect with this rect.
     * @param {function(Rectangle)} [ifNoneAction] - When no intersection, invoke and return result.
     * Bound to `context` when given; otherwise bound to this rect.
     * Invoked with `rect` as sole parameter.
     * @param {object} [context=this] - Context to bind to `ifNoneAction` (when not `this`).
     * @memberOf Rectangle.prototype
     */
    intersect: function(rect, ifNoneAction, context) {
        var result = null,
            origin = this.origin.max(rect.origin),
            corner = this.corner.min(rect.corner),
            extent = corner.minus(origin);

        if (extent.x > 0 && extent.y > 0) {
            result = new Rectangle(
                origin.x, origin.y,
                extent.x, extent.y
            );
        } else if (typeof ifNoneAction === 'function') {
            result = ifNoneAction.call(context || this, rect);
        }

        return result;
    },

    /**
     * @returns {boolean} `true` iff this rect overlaps with given `rect`.
     * @param {Rectangle} rect - The rectangle to intersect with this rect.
     * @memberOf Rectangle.prototype
     */
    intersects: function(rect) {
        return (
            rect.corner.x > this.origin.x &&
            rect.corner.y > this.origin.y &&
            rect.origin.x < this.corner.x &&
            rect.origin.y < this.corner.y
        );
    }
};

// Interface
exports.Point = Point;
exports.Rectangle = Rectangle;

},{}],2:[function(require,module,exports){
'use strict';

/* eslint-env node, browser */

if (!window.fin) {
    window.fin = {};
}

if (!window.fin.Canvas) {
    window.fin.Canvas = require('./');
}

},{"./":3}],3:[function(require,module,exports){
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

    setSizeBaseOn: function(element) {
        var rect = element.getBoundingClientRect();
        this.canvas.width = this.buffer.width = rect.width;
        this.canvas.height = this.buffer.height = rect.height;
        return rect;
    },

    resize: function() {
        var box = this.size = this.setSizeBaseOn(this.div);

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
            self.setSizeBaseOn(self.canvas);

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

},{"./js/GraphicsContext.js":4,"./js/polymergestures.dev.js":6,"rectangular":1}],4:[function(require,module,exports){
'use strict';

var consoleLogger = require('./gc-console-logger');

/**
 * @constructor
 * @param gc - The 2-D graphics context from your canvas
 * @param {boolean|apiLogger} [logger=true]
 * * `true` uses `gc-console-logger` function bound to 'gc.' as prefix
 * * string uses `gc-console-logger` function bound to string
 * * function used as is
 */
function GraphicsContext(gc, logger) {
    this.gc = gc;

    var self = this;
    var reWEBKIT = /^webkit/;

    switch (typeof logger) {

        case 'string':
            logger =  consoleLogger.bind(undefined, logger + '.');
            break;

        case 'boolean':
            if (logger === true) {
                logger = consoleLogger.bind(undefined, 'gc.');
            }
            break;

        case 'function':
            if (logger.length !== 3) {
                throw 'GraphicsContext: User-supplied API logger function does not accept three parameters.';
            }
            break;

        default:
            logger = false;
    }

    // Stub out all the prototype members of the canvas 2D graphics context:
    Object.keys(Object.getPrototypeOf(gc)).forEach(MakeStub);

    // Some older browsers (e.g., Chrome 40) did not have all members of canvas
    // 2D graphics context in the prototype so we make this additional call:
    Object.keys(gc).forEach(MakeStub);

    function MakeStub(key) {
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
    }
}

module.exports = GraphicsContext;

},{"./gc-console-logger":5}],5:[function(require,module,exports){
'use strict';

var YIELDS = '\u27F9'; // LONG RIGHTWARDS DOUBLE ARROW

function consoleLogger(prefix, name, args, value) {
    var result = value;

    if (typeof value === 'string') {
        result = '"' + result + '"';
    }

    name = prefix + name;

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

module.exports = consoleLogger;

},{}],6:[function(require,module,exports){
/* eslint-disable */

/**
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
//module.exports = {};

(function(scope) {
    var hasFullPath = false;

    // test for full event path support
    var pathTest = document.createElement('meta');
    if (pathTest.createShadowRoot) {
        var sr = pathTest.createShadowRoot();
        var s = document.createElement('span');
        sr.appendChild(s);
        pathTest.addEventListener('testpath', function(ev) {
            if (ev.path) {
                // if the span is in the event path, then path[0] is the real source for all events
                hasFullPath = ev.path[0] === s;
            }
            ev.stopPropagation();
        });
        var ev = new CustomEvent('testpath', {
            bubbles: true
        });
        // must add node to DOM to trigger event listener
        document.head.appendChild(pathTest);
        s.dispatchEvent(ev);
        pathTest.parentNode.removeChild(pathTest);
        sr = s = null;
    }
    pathTest = null;

    var target = {
        shadow: function(inEl) {
            if (inEl) {
                return inEl.shadowRoot || inEl.webkitShadowRoot;
            }
        },
        canTarget: function(shadow) {
            return shadow && Boolean(shadow.elementFromPoint);
        },
        targetingShadow: function(inEl) {
            var s = this.shadow(inEl);
            if (this.canTarget(s)) {
                return s;
            }
        },
        olderShadow: function(shadow) {
            var os = shadow.olderShadowRoot;
            if (!os) {
                var se = shadow.querySelector('shadow');
                if (se) {
                    os = se.olderShadowRoot;
                }
            }
            return os;
        },
        allShadows: function(element) {
            var shadows = [],
                s = this.shadow(element);
            while (s) {
                shadows.push(s);
                s = this.olderShadow(s);
            }
            return shadows;
        },
        searchRoot: function(inRoot, x, y) {
            var t, st, sr, os;
            if (inRoot) {
                t = inRoot.elementFromPoint(x, y);
                if (t) {
                    // found element, check if it has a ShadowRoot
                    sr = this.targetingShadow(t);
                } else if (inRoot !== document) {
                    // check for sibling roots
                    sr = this.olderShadow(inRoot);
                }
                // search other roots, fall back to light dom element
                return this.searchRoot(sr, x, y) || t;
            }
        },
        owner: function(element) {
            if (!element) {
                return document;
            }
            var s = element;
            // walk up until you hit the shadow root or document
            while (s.parentNode) {
                s = s.parentNode;
            }
            // the owner element is expected to be a Document or ShadowRoot
            if (s.nodeType != Node.DOCUMENT_NODE && s.nodeType != Node.DOCUMENT_FRAGMENT_NODE) {
                s = document;
            }
            return s;
        },
        findTarget: function(inEvent) {
            if (hasFullPath && inEvent.path && inEvent.path.length) {
                return inEvent.path[0];
            }
            var x = inEvent.clientX,
                y = inEvent.clientY;
            // if the listener is in the shadow root, it is much faster to start there
            var s = this.owner(inEvent.target);
            // if x, y is not in this root, fall back to document search
            if (!s.elementFromPoint(x, y)) {
                s = document;
            }
            return this.searchRoot(s, x, y);
        },
        findTouchAction: function(inEvent) {
            var n;
            if (hasFullPath && inEvent.path && inEvent.path.length) {
                var path = inEvent.path;
                for (var i = 0; i < path.length; i++) {
                    n = path[i];
                    if (n.nodeType === Node.ELEMENT_NODE && n.hasAttribute('touch-action')) {
                        return n.getAttribute('touch-action');
                    }
                }
            } else {
                n = inEvent.target;
                while (n) {
                    if (n.nodeType === Node.ELEMENT_NODE && n.hasAttribute('touch-action')) {
                        return n.getAttribute('touch-action');
                    }
                    n = n.parentNode || n.host;
                }
            }
            // auto is default
            return "auto";
        },
        LCA: function(a, b) {
            if (a === b) {
                return a;
            }
            if (a && !b) {
                return a;
            }
            if (b && !a) {
                return b;
            }
            if (!b && !a) {
                return document;
            }
            // fast case, a is a direct descendant of b or vice versa
            if (a.contains && a.contains(b)) {
                return a;
            }
            if (b.contains && b.contains(a)) {
                return b;
            }
            var adepth = this.depth(a);
            var bdepth = this.depth(b);
            var d = adepth - bdepth;
            if (d >= 0) {
                a = this.walk(a, d);
            } else {
                b = this.walk(b, -d);
            }
            while (a && b && a !== b) {
                a = a.parentNode || a.host;
                b = b.parentNode || b.host;
            }
            return a;
        },
        walk: function(n, u) {
            for (var i = 0; n && (i < u); i++) {
                n = n.parentNode || n.host;
            }
            return n;
        },
        depth: function(n) {
            var d = 0;
            while (n) {
                d++;
                n = n.parentNode || n.host;
            }
            return d;
        },
        deepContains: function(a, b) {
            var common = this.LCA(a, b);
            // if a is the common ancestor, it must "deeply" contain b
            return common === a;
        },
        insideNode: function(node, x, y) {
            var rect = node.getBoundingClientRect();
            return (rect.left <= x) && (x <= rect.right) && (rect.top <= y) && (y <= rect.bottom);
        },
        path: function(event) {
            var p;
            if (hasFullPath && event.path && event.path.length) {
                p = event.path;
            } else {
                p = [];
                var n = this.findTarget(event);
                while (n) {
                    p.push(n);
                    n = n.parentNode || n.host;
                }
            }
            return p;
        }
    };
    scope.targetFinding = target;
    /**
     * Given an event, finds the "deepest" node that could have been the original target before ShadowDOM retargetting
     *
     * @param {Event} Event An event object with clientX and clientY properties
     * @return {Element} The probable event origninator
     */
    scope.findTarget = target.findTarget.bind(target);
    /**
     * Determines if the "container" node deeply contains the "containee" node, including situations where the "containee" is contained by one or more ShadowDOM
     * roots.
     *
     * @param {Node} container
     * @param {Node} containee
     * @return {Boolean}
     */
    scope.deepContains = target.deepContains.bind(target);

    /**
     * Determines if the x/y position is inside the given node.
     *
     * Example:
     *
     *     function upHandler(event) {
     *       var innode = PolymerGestures.insideNode(event.target, event.clientX, event.clientY);
     *       if (innode) {
     *         // wait for tap?
     *       } else {
     *         // tap will never happen
     *       }
     *     }
     *
     * @param {Node} node
     * @param {Number} x Screen X position
     * @param {Number} y screen Y position
     * @return {Boolean}
     */
    scope.insideNode = target.insideNode;

})(exports);

(function() {
    function shadowSelector(v) {
        return 'html /deep/ ' + selector(v);
    }

    function selector(v) {
        return '[touch-action="' + v + '"]';
    }

    function rule(v) {
        return '{ -ms-touch-action: ' + v + '; touch-action: ' + v + ';}';
    }
    var attrib2css = [
        'none',
        'auto',
        'pan-x',
        'pan-y', {
            rule: 'pan-x pan-y',
            selectors: [
                'pan-x pan-y',
                'pan-y pan-x'
            ]
        },
        'manipulation'
    ];
    var styles = '';
    // only install stylesheet if the browser has touch action support
    var hasTouchAction = typeof document.head.style.touchAction === 'string';
    // only add shadow selectors if shadowdom is supported
    var hasShadowRoot = !window.ShadowDOMPolyfill && document.head.createShadowRoot;

    if (hasTouchAction) {
        attrib2css.forEach(function(r) {
            if (String(r) === r) {
                styles += selector(r) + rule(r) + '\n';
                if (hasShadowRoot) {
                    styles += shadowSelector(r) + rule(r) + '\n';
                }
            } else {
                styles += r.selectors.map(selector) + rule(r.rule) + '\n';
                if (hasShadowRoot) {
                    styles += r.selectors.map(shadowSelector) + rule(r.rule) + '\n';
                }
            }
        });

        var el = document.createElement('style');
        el.textContent = styles;
        document.head.appendChild(el);
    }
})();

/**
 * This is the constructor for new PointerEvents.
 *
 * New Pointer Events must be given a type, and an optional dictionary of
 * initialization properties.
 *
 * Due to certain platform requirements, events returned from the constructor
 * identify as MouseEvents.
 *
 * @constructor
 * @param {String} inType The type of the event to create.
 * @param {Object} [inDict] An optional dictionary of initial event properties.
 * @return {Event} A new PointerEvent of type `inType` and initialized with properties from `inDict`.
 */
(function(scope) {

    var MOUSE_PROPS = [
        'bubbles',
        'cancelable',
        'view',
        'detail',
        'screenX',
        'screenY',
        'clientX',
        'clientY',
        'ctrlKey',
        'altKey',
        'shiftKey',
        'metaKey',
        'button',
        'relatedTarget',
        'pageX',
        'pageY'
    ];

    var MOUSE_DEFAULTS = [
        false,
        false,
        null,
        null,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null,
        0,
        0
    ];

    var NOP_FACTORY = function() {
        return function() {};
    };

    var eventFactory = {
        // TODO(dfreedm): this is overridden by tap recognizer, needs review
        preventTap: NOP_FACTORY,
        makeBaseEvent: function(inType, inDict) {
            var e = document.createEvent('Event');
            e.initEvent(inType, inDict.bubbles || false, inDict.cancelable || false);
            e.preventTap = eventFactory.preventTap(e);
            return e;
        },
        makeGestureEvent: function(inType, inDict) {
            inDict = inDict || Object.create(null);

            var e = this.makeBaseEvent(inType, inDict);
            for (var i = 0, keys = Object.keys(inDict), k; i < keys.length; i++) {
                k = keys[i];
                if (k !== 'bubbles' && k !== 'cancelable') {
                    e[k] = inDict[k];
                }
            }
            return e;
        },
        makePointerEvent: function(inType, inDict) {
            inDict = inDict || Object.create(null);

            var e = this.makeBaseEvent(inType, inDict);
            // define inherited MouseEvent properties
            for (var i = 2, p; i < MOUSE_PROPS.length; i++) {
                p = MOUSE_PROPS[i];
                e[p] = inDict[p] || MOUSE_DEFAULTS[i];
            }
            e.buttons = inDict.buttons || 0;

            // Spec requires that pointers without pressure specified use 0.5 for down
            // state and 0 for up state.
            var pressure = 0;
            if (inDict.pressure) {
                pressure = inDict.pressure;
            } else {
                pressure = e.buttons ? 0.5 : 0;
            }

            // add x/y properties aliased to clientX/Y
            e.x = e.clientX;
            e.y = e.clientY;

            // define the properties of the PointerEvent interface
            e.pointerId = inDict.pointerId || 0;
            e.width = inDict.width || 0;
            e.height = inDict.height || 0;
            e.pressure = pressure;
            e.tiltX = inDict.tiltX || 0;
            e.tiltY = inDict.tiltY || 0;
            e.pointerType = inDict.pointerType || '';
            e.hwTimestamp = inDict.hwTimestamp || 0;
            e.isPrimary = inDict.isPrimary || false;
            e._source = inDict._source || '';
            return e;
        }
    };

    scope.eventFactory = eventFactory;
})(exports);

/**
 * This module implements an map of pointer states
 */
(function(scope) {
    var USE_MAP = window.Map && window.Map.prototype.forEach;
    var POINTERS_FN = function() {
        return this.size;
    };

    function PointerMap() {
        if (USE_MAP) {
            var m = new Map();
            m.pointers = POINTERS_FN;
            return m;
        } else {
            this.keys = [];
            this.values = [];
        }
    }

    PointerMap.prototype = {
        set: function(inId, inEvent) {
            var i = this.keys.indexOf(inId);
            if (i > -1) {
                this.values[i] = inEvent;
            } else {
                this.keys.push(inId);
                this.values.push(inEvent);
            }
        },
        has: function(inId) {
            return this.keys.indexOf(inId) > -1;
        },
        'delete': function(inId) {
            var i = this.keys.indexOf(inId);
            if (i > -1) {
                this.keys.splice(i, 1);
                this.values.splice(i, 1);
            }
        },
        get: function(inId) {
            var i = this.keys.indexOf(inId);
            return this.values[i];
        },
        clear: function() {
            this.keys.length = 0;
            this.values.length = 0;
        },
        // return value, key, map
        forEach: function(callback, thisArg) {
            this.values.forEach(function(v, i) {
                callback.call(thisArg, v, this.keys[i], this);
            }, this);
        },
        pointers: function() {
            return this.keys.length;
        }
    };

    scope.PointerMap = PointerMap;
})(exports);

(function(scope) {
    var CLONE_PROPS = [
        // MouseEvent
        'bubbles',
        'cancelable',
        'view',
        'detail',
        'screenX',
        'screenY',
        'clientX',
        'clientY',
        'ctrlKey',
        'altKey',
        'shiftKey',
        'metaKey',
        'button',
        'relatedTarget',
        // DOM Level 3
        'buttons',
        // PointerEvent
        'pointerId',
        'width',
        'height',
        'pressure',
        'tiltX',
        'tiltY',
        'pointerType',
        'hwTimestamp',
        'isPrimary',
        // event instance
        'type',
        'target',
        'currentTarget',
        'which',
        'pageX',
        'pageY',
        'timeStamp',
        // gesture addons
        'preventTap',
        'tapPrevented',
        '_source'
    ];

    var CLONE_DEFAULTS = [
        // MouseEvent
        false,
        false,
        null,
        null,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null,
        // DOM Level 3
        0,
        // PointerEvent
        0,
        0,
        0,
        0,
        0,
        0,
        '',
        0,
        false,
        // event instance
        '',
        null,
        null,
        0,
        0,
        0,
        0,
        function() {},
        false
    ];

    var HAS_SVG_INSTANCE = (typeof SVGElementInstance !== 'undefined');

    var eventFactory = scope.eventFactory;

    // set of recognizers to run for the currently handled event
    var currentGestures;

    /**
     * This module is for normalizing events. Mouse and Touch events will be
     * collected here, and fire PointerEvents that have the same semantics, no
     * matter the source.
     * Events fired:
     *   - pointerdown: a pointing is added
     *   - pointerup: a pointer is removed
     *   - pointermove: a pointer is moved
     *   - pointerover: a pointer crosses into an element
     *   - pointerout: a pointer leaves an element
     *   - pointercancel: a pointer will no longer generate events
     */
    var dispatcher = {
        IS_IOS: false,
        pointermap: new scope.PointerMap(),
        requiredGestures: new scope.PointerMap(),
        eventMap: Object.create(null),
        // Scope objects for native events.
        // This exists for ease of testing.
        eventSources: Object.create(null),
        eventSourceList: [],
        gestures: [],
        // map gesture event -> {listeners: int, index: gestures[int]}
        dependencyMap: {
            // make sure down and up are in the map to trigger "register"
            down: {
                listeners: 0,
                index: -1
            },
            up: {
                listeners: 0,
                index: -1
            }
        },
        gestureQueue: [],
        /**
         * Add a new event source that will generate pointer events.
         *
         * `inSource` must contain an array of event names named `events`, and
         * functions with the names specified in the `events` array.
         * @param {string} name A name for the event source
         * @param {Object} source A new source of platform events.
         */
        registerSource: function(name, source) {
            var s = source;
            var newEvents = s.events;
            if (newEvents) {
                newEvents.forEach(function(e) {
                    if (s[e]) {
                        this.eventMap[e] = s[e].bind(s);
                    }
                }, this);
                this.eventSources[name] = s;
                this.eventSourceList.push(s);
            }
        },
        registerGesture: function(name, source) {
            var obj = Object.create(null);
            obj.listeners = 0;
            obj.index = this.gestures.length;
            for (var i = 0, g; i < source.exposes.length; i++) {
                g = source.exposes[i].toLowerCase();
                this.dependencyMap[g] = obj;
            }
            this.gestures.push(source);
        },
        register: function(element, initial) {
            var l = this.eventSourceList.length;
            for (var i = 0, es;
                (i < l) && (es = this.eventSourceList[i]); i++) {
                // call eventsource register
                es.register.call(es, element, initial);
            }
        },
        unregister: function(element) {
            var l = this.eventSourceList.length;
            for (var i = 0, es;
                (i < l) && (es = this.eventSourceList[i]); i++) {
                // call eventsource register
                es.unregister.call(es, element);
            }
        },
        // EVENTS
        down: function(inEvent) {
            this.requiredGestures.set(inEvent.pointerId, currentGestures);
            this.fireEvent('down', inEvent);
        },
        move: function(inEvent) {
            // pipe move events into gesture queue directly
            inEvent.type = 'move';
            this.fillGestureQueue(inEvent);
        },
        up: function(inEvent) {
            this.fireEvent('up', inEvent);
            this.requiredGestures.delete(inEvent.pointerId);
        },
        cancel: function(inEvent) {
            inEvent.tapPrevented = true;
            this.fireEvent('up', inEvent);
            this.requiredGestures.delete(inEvent.pointerId);
        },
        addGestureDependency: function(node, currentGestures) {
            var gesturesWanted = node._pgEvents;
            if (gesturesWanted && currentGestures) {
                var gk = Object.keys(gesturesWanted);
                for (var i = 0, r, ri, g; i < gk.length; i++) {
                    // gesture
                    g = gk[i];
                    if (gesturesWanted[g] > 0) {
                        // lookup gesture recognizer
                        r = this.dependencyMap[g];
                        // recognizer index
                        ri = r ? r.index : -1;
                        currentGestures[ri] = true;
                    }
                }
            }
        },
        // LISTENER LOGIC
        eventHandler: function(inEvent) {
            // This is used to prevent multiple dispatch of events from
            // platform events. This can happen when two elements in different scopes
            // are set up to create pointer events, which is relevant to Shadow DOM.

            var type = inEvent.type;

            // only generate the list of desired events on "down"
            if (type === 'touchstart' || type === 'mousedown' || type === 'pointerdown' || type === 'MSPointerDown') {
                if (!inEvent._handledByPG) {
                    currentGestures = {};
                }

                // in IOS mode, there is only a listener on the document, so this is not re-entrant
                if (this.IS_IOS) {
                    var ev = inEvent;
                    if (type === 'touchstart') {
                        var ct = inEvent.changedTouches[0];
                        // set up a fake event to give to the path builder
                        ev = {
                            target: inEvent.target,
                            clientX: ct.clientX,
                            clientY: ct.clientY,
                            path: inEvent.path
                        };
                    }
                    // use event path if available, otherwise build a path from target finding
                    var nodes = inEvent.path || scope.targetFinding.path(ev);
                    for (var i = 0, n; i < nodes.length; i++) {
                        n = nodes[i];
                        this.addGestureDependency(n, currentGestures);
                    }
                } else {
                    this.addGestureDependency(inEvent.currentTarget, currentGestures);
                }
            }

            if (inEvent._handledByPG) {
                return;
            }
            var fn = this.eventMap && this.eventMap[type];
            if (fn) {
                fn(inEvent);
            }
            inEvent._handledByPG = true;
        },
        // set up event listeners
        listen: function(target, events) {
            for (var i = 0, l = events.length, e;
                (i < l) && (e = events[i]); i++) {
                this.addEvent(target, e);
            }
        },
        // remove event listeners
        unlisten: function(target, events) {
            for (var i = 0, l = events.length, e;
                (i < l) && (e = events[i]); i++) {
                this.removeEvent(target, e);
            }
        },
        addEvent: function(target, eventName) {
            target.addEventListener(eventName, this.boundHandler);
        },
        removeEvent: function(target, eventName) {
            target.removeEventListener(eventName, this.boundHandler);
        },
        // EVENT CREATION AND TRACKING
        /**
         * Creates a new Event of type `inType`, based on the information in
         * `inEvent`.
         *
         * @param {string} inType A string representing the type of event to create
         * @param {Event} inEvent A platform event with a target
         * @return {Event} A PointerEvent of type `inType`
         */
        makeEvent: function(inType, inEvent) {
            var e = eventFactory.makePointerEvent(inType, inEvent);
            e.preventDefault = inEvent.preventDefault;
            e.tapPrevented = inEvent.tapPrevented;
            e._target = e._target || inEvent.target;
            return e;
        },
        // make and dispatch an event in one call
        fireEvent: function(inType, inEvent) {
            var e = this.makeEvent(inType, inEvent);
            return this.dispatchEvent(e);
        },
        /**
         * Returns a snapshot of inEvent, with writable properties.
         *
         * @param {Event} inEvent An event that contains properties to copy.
         * @return {Object} An object containing shallow copies of `inEvent`'s
         *    properties.
         */
        cloneEvent: function(inEvent) {
            var eventCopy = Object.create(null),
                p;
            for (var i = 0; i < CLONE_PROPS.length; i++) {
                p = CLONE_PROPS[i];
                eventCopy[p] = inEvent[p] || CLONE_DEFAULTS[i];
                // Work around SVGInstanceElement shadow tree
                // Return the <use> element that is represented by the instance for Safari, Chrome, IE.
                // This is the behavior implemented by Firefox.
                if (p === 'target' || p === 'relatedTarget') {
                    if (HAS_SVG_INSTANCE && eventCopy[p] instanceof SVGElementInstance) {
                        eventCopy[p] = eventCopy[p].correspondingUseElement;
                    }
                }
            }
            // keep the semantics of preventDefault
            eventCopy.preventDefault = function() {
                inEvent.preventDefault();
            };
            return eventCopy;
        },
        /**
         * Dispatches the event to its target.
         *
         * @param {Event} inEvent The event to be dispatched.
         * @return {Boolean} True if an event handler returns true, false otherwise.
         */
        dispatchEvent: function(inEvent) {
            var t = inEvent._target;
            if (t) {
                t.dispatchEvent(inEvent);
                // clone the event for the gesture system to process
                // clone after dispatch to pick up gesture prevention code
                var clone = this.cloneEvent(inEvent);
                clone.target = t;
                this.fillGestureQueue(clone);
            }
        },
        gestureTrigger: function() {
            // process the gesture queue
            for (var i = 0, e, rg; i < this.gestureQueue.length; i++) {
                e = this.gestureQueue[i];
                rg = e._requiredGestures;
                if (rg) {
                    for (var j = 0, g, fn; j < this.gestures.length; j++) {
                        // only run recognizer if an element in the source event's path is listening for those gestures
                        if (rg[j]) {
                            g = this.gestures[j];
                            fn = g[e.type];
                            if (fn) {
                                fn.call(g, e);
                            }
                        }
                    }
                }
            }
            this.gestureQueue.length = 0;
        },
        fillGestureQueue: function(ev) {
            // only trigger the gesture queue once
            if (!this.gestureQueue.length) {
                requestAnimationFrame(this.boundGestureTrigger);
            }
            ev._requiredGestures = this.requiredGestures.get(ev.pointerId);
            this.gestureQueue.push(ev);
        }
    };
    dispatcher.boundHandler = dispatcher.eventHandler.bind(dispatcher);
    dispatcher.boundGestureTrigger = dispatcher.gestureTrigger.bind(dispatcher);
    scope.dispatcher = dispatcher;

    /**
     * Listen for `gesture` on `node` with the `handler` function
     *
     * If `handler` is the first listener for `gesture`, the underlying gesture recognizer is then enabled.
     *
     * @param {Element} node
     * @param {string} gesture
     * @return Boolean `gesture` is a valid gesture
     */
    scope.activateGesture = function(node, gesture) {
        var g = gesture.toLowerCase();
        var dep = dispatcher.dependencyMap[g];
        if (dep) {
            var recognizer = dispatcher.gestures[dep.index];
            if (!node._pgListeners) {
                dispatcher.register(node);
                node._pgListeners = 0;
            }
            // TODO(dfreedm): re-evaluate bookkeeping to avoid using attributes
            if (recognizer) {
                var touchAction = recognizer.defaultActions && recognizer.defaultActions[g];
                var actionNode;
                switch (node.nodeType) {
                    case Node.ELEMENT_NODE:
                        actionNode = node;
                        break;
                    case Node.DOCUMENT_FRAGMENT_NODE:
                        actionNode = node.host;
                        break;
                    default:
                        actionNode = null;
                        break;
                }
                if (touchAction && actionNode && !actionNode.hasAttribute('touch-action')) {
                    actionNode.setAttribute('touch-action', touchAction);
                }
            }
            if (!node._pgEvents) {
                node._pgEvents = {};
            }
            node._pgEvents[g] = (node._pgEvents[g] || 0) + 1;
            node._pgListeners++;
        }
        return Boolean(dep);
    };

    /**
     *
     * Listen for `gesture` from `node` with `handler` function.
     *
     * @param {Element} node
     * @param {string} gesture
     * @param {Function} handler
     * @param {Boolean} capture
     */
    scope.addEventListener = function(node, gesture, handler, capture) {
        if (handler) {
            scope.activateGesture(node, gesture);
            node.addEventListener(gesture, handler, capture);
        }
    };

    /**
     * Tears down the gesture configuration for `node`
     *
     * If `handler` is the last listener for `gesture`, the underlying gesture recognizer is disabled.
     *
     * @param {Element} node
     * @param {string} gesture
     * @return Boolean `gesture` is a valid gesture
     */
    scope.deactivateGesture = function(node, gesture) {
        var g = gesture.toLowerCase();
        var dep = dispatcher.dependencyMap[g];
        if (dep) {
            if (node._pgListeners > 0) {
                node._pgListeners--;
            }
            if (node._pgListeners === 0) {
                dispatcher.unregister(node);
            }
            if (node._pgEvents) {
                if (node._pgEvents[g] > 0) {
                    node._pgEvents[g]--;
                } else {
                    node._pgEvents[g] = 0;
                }
            }
        }
        return Boolean(dep);
    };

    /**
     * Stop listening for `gesture` from `node` with `handler` function.
     *
     * @param {Element} node
     * @param {string} gesture
     * @param {Function} handler
     * @param {Boolean} capture
     */
    scope.removeEventListener = function(node, gesture, handler, capture) {
        if (handler) {
            scope.deactivateGesture(node, gesture);
            node.removeEventListener(gesture, handler, capture);
        }
    };
})(exports);

(function(scope) {
    var dispatcher = scope.dispatcher;
    var pointermap = dispatcher.pointermap;
    // radius around touchend that swallows mouse events
    var DEDUP_DIST = 25;

    var WHICH_TO_BUTTONS = [0, 1, 4, 2];

    var currentButtons = 0;

    var FIREFOX_LINUX = /Linux.*Firefox\//i;

    var HAS_BUTTONS = (function() {
        // firefox on linux returns spec-incorrect values for mouseup.buttons
        // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent.buttons#See_also
        // https://codereview.chromium.org/727593003/#msg16
        if (FIREFOX_LINUX.test(navigator.userAgent)) {
            return false;
        }
        try {
            return new MouseEvent('test', {
                buttons: 1
            }).buttons === 1;
        } catch (e) {
            return false;
        }
    })();

    // handler block for native mouse events
    var mouseEvents = {
        POINTER_ID: 1,
        POINTER_TYPE: 'mouse',
        events: [
            'mousedown',
            'mousemove',
            'mouseup'
        ],
        exposes: [
            'down',
            'up',
            'move'
        ],
        register: function(target) {
            dispatcher.listen(target, this.events);
        },
        unregister: function(target) {
            if (target.nodeType === Node.DOCUMENT_NODE) {
                return;
            }
            dispatcher.unlisten(target, this.events);
        },
        lastTouches: [],
        // collide with the global mouse listener
        isEventSimulatedFromTouch: function(inEvent) {
            var lts = this.lastTouches;
            var x = inEvent.clientX,
                y = inEvent.clientY;
            for (var i = 0, l = lts.length, t; i < l && (t = lts[i]); i++) {
                // simulated mouse events will be swallowed near a primary touchend
                var dx = Math.abs(x - t.x),
                    dy = Math.abs(y - t.y);
                if (dx <= DEDUP_DIST && dy <= DEDUP_DIST) {
                    return true;
                }
            }
        },
        prepareEvent: function(inEvent) {
            var e = dispatcher.cloneEvent(inEvent);
            e.pointerId = this.POINTER_ID;
            e.isPrimary = true;
            e.pointerType = this.POINTER_TYPE;
            e._source = 'mouse';
            if (!HAS_BUTTONS) {
                var type = inEvent.type;
                var bit = WHICH_TO_BUTTONS[inEvent.which] || 0;
                if (type === 'mousedown') {
                    currentButtons |= bit;
                } else if (type === 'mouseup') {
                    currentButtons &= ~bit;
                }
                e.buttons = currentButtons;
            }
            return e;
        },
        mousedown: function(inEvent) {
            if (!this.isEventSimulatedFromTouch(inEvent)) {
                var p = pointermap.has(this.POINTER_ID);
                var e = this.prepareEvent(inEvent);
                e.target = scope.findTarget(inEvent);
                pointermap.set(this.POINTER_ID, e.target);
                dispatcher.down(e);
            }
        },
        mousemove: function(inEvent) {
            if (!this.isEventSimulatedFromTouch(inEvent)) {
                var target = pointermap.get(this.POINTER_ID);
                if (target) {
                    var e = this.prepareEvent(inEvent);
                    e.target = target;
                    // handle case where we missed a mouseup
                    if ((HAS_BUTTONS ? e.buttons : e.which) === 0) {
                        if (!HAS_BUTTONS) {
                            currentButtons = e.buttons = 0;
                        }
                        dispatcher.cancel(e);
                        this.cleanupMouse(e.buttons);
                    } else {
                        dispatcher.move(e);
                    }
                }
            }
        },
        mouseup: function(inEvent) {
            if (!this.isEventSimulatedFromTouch(inEvent)) {
                var e = this.prepareEvent(inEvent);
                e.relatedTarget = scope.findTarget(inEvent);
                e.target = pointermap.get(this.POINTER_ID);
                dispatcher.up(e);
                this.cleanupMouse(e.buttons);
            }
        },
        cleanupMouse: function(buttons) {
            if (buttons === 0) {
                pointermap.delete(this.POINTER_ID);
            }
        }
    };

    scope.mouseEvents = mouseEvents;
})(exports);

(function(scope) {
    var dispatcher = scope.dispatcher;
    var allShadows = scope.targetFinding.allShadows.bind(scope.targetFinding);
    var pointermap = dispatcher.pointermap;
    var touchMap = Array.prototype.map.call.bind(Array.prototype.map);
    // This should be long enough to ignore compat mouse events made by touch
    var DEDUP_TIMEOUT = 2500;
    var DEDUP_DIST = 25;
    var CLICK_COUNT_TIMEOUT = 200;
    var HYSTERESIS = 20;
    var ATTRIB = 'touch-action';
    // TODO(dfreedm): disable until http://crbug.com/399765 is resolved
    // var HAS_TOUCH_ACTION = ATTRIB in document.head.style;
    var HAS_TOUCH_ACTION = false;

    // handler block for native touch events
    var touchEvents = {
        IS_IOS: false,
        events: [
            'touchstart',
            'touchmove',
            'touchend',
            'touchcancel'
        ],
        exposes: [
            'down',
            'up',
            'move'
        ],
        register: function(target, initial) {
            if (this.IS_IOS ? initial : !initial) {
                dispatcher.listen(target, this.events);
            }
        },
        unregister: function(target) {
            if (!this.IS_IOS) {
                dispatcher.unlisten(target, this.events);
            }
        },
        scrollTypes: {
            EMITTER: 'none',
            XSCROLLER: 'pan-x',
            YSCROLLER: 'pan-y',
        },
        touchActionToScrollType: function(touchAction) {
            var t = touchAction;
            var st = this.scrollTypes;
            if (t === st.EMITTER) {
                return 'none';
            } else if (t === st.XSCROLLER) {
                return 'X';
            } else if (t === st.YSCROLLER) {
                return 'Y';
            } else {
                return 'XY';
            }
        },
        POINTER_TYPE: 'touch',
        firstTouch: null,
        isPrimaryTouch: function(inTouch) {
            return this.firstTouch === inTouch.identifier;
        },
        setPrimaryTouch: function(inTouch) {
            // set primary touch if there no pointers, or the only pointer is the mouse
            if (pointermap.pointers() === 0 || (pointermap.pointers() === 1 && pointermap.has(1))) {
                this.firstTouch = inTouch.identifier;
                this.firstXY = {
                    X: inTouch.clientX,
                    Y: inTouch.clientY
                };
                this.firstTarget = inTouch.target;
                this.scrolling = null;
                this.cancelResetClickCount();
            }
        },
        removePrimaryPointer: function(inPointer) {
            if (inPointer.isPrimary) {
                this.firstTouch = null;
                this.firstXY = null;
                this.resetClickCount();
            }
        },
        clickCount: 0,
        resetId: null,
        resetClickCount: function() {
            var fn = function() {
                this.clickCount = 0;
                this.resetId = null;
            }.bind(this);
            this.resetId = setTimeout(fn, CLICK_COUNT_TIMEOUT);
        },
        cancelResetClickCount: function() {
            if (this.resetId) {
                clearTimeout(this.resetId);
            }
        },
        typeToButtons: function(type) {
            var ret = 0;
            if (type === 'touchstart' || type === 'touchmove') {
                ret = 1;
            }
            return ret;
        },
        findTarget: function(touch, id) {
            if (this.currentTouchEvent.type === 'touchstart') {
                if (this.isPrimaryTouch(touch)) {
                    var fastPath = {
                        clientX: touch.clientX,
                        clientY: touch.clientY,
                        path: this.currentTouchEvent.path,
                        target: this.currentTouchEvent.target
                    };
                    return scope.findTarget(fastPath);
                } else {
                    return scope.findTarget(touch);
                }
            }
            // reuse target we found in touchstart
            return pointermap.get(id);
        },
        touchToPointer: function(inTouch) {
            var cte = this.currentTouchEvent;
            var e = dispatcher.cloneEvent(inTouch);
            // Spec specifies that pointerId 1 is reserved for Mouse.
            // Touch identifiers can start at 0.
            // Add 2 to the touch identifier for compatibility.
            var id = e.pointerId = inTouch.identifier + 2;
            e.target = this.findTarget(inTouch, id);
            e.bubbles = true;
            e.cancelable = true;
            e.detail = this.clickCount;
            e.buttons = this.typeToButtons(cte.type);
            e.width = inTouch.webkitRadiusX || inTouch.radiusX || 0;
            e.height = inTouch.webkitRadiusY || inTouch.radiusY || 0;
            e.pressure = inTouch.webkitForce || inTouch.force || 0.5;
            e.isPrimary = this.isPrimaryTouch(inTouch);
            e.pointerType = this.POINTER_TYPE;
            e._source = 'touch';
            // forward touch preventDefaults
            var self = this;
            e.preventDefault = function() {
                self.scrolling = false;
                self.firstXY = null;
                cte.preventDefault();
            };
            return e;
        },
        processTouches: function(inEvent, inFunction) {
            var tl = inEvent.changedTouches;
            this.currentTouchEvent = inEvent;
            for (var i = 0, t, p; i < tl.length; i++) {
                t = tl[i];
                p = this.touchToPointer(t);
                if (inEvent.type === 'touchstart') {
                    pointermap.set(p.pointerId, p.target);
                }
                if (pointermap.has(p.pointerId)) {
                    inFunction.call(this, p);
                }
                if (inEvent.type === 'touchend' || inEvent._cancel) {
                    this.cleanUpPointer(p);
                }
            }
        },
        // For single axis scrollers, determines whether the element should emit
        // pointer events or behave as a scroller
        shouldScroll: function(inEvent) {
            if (this.firstXY) {
                var ret;
                var touchAction = scope.targetFinding.findTouchAction(inEvent);
                var scrollAxis = this.touchActionToScrollType(touchAction);
                if (scrollAxis === 'none') {
                    // this element is a touch-action: none, should never scroll
                    ret = false;
                } else if (scrollAxis === 'XY') {
                    // this element should always scroll
                    ret = true;
                } else {
                    var t = inEvent.changedTouches[0];
                    // check the intended scroll axis, and other axis
                    var a = scrollAxis;
                    var oa = scrollAxis === 'Y' ? 'X' : 'Y';
                    var da = Math.abs(t['client' + a] - this.firstXY[a]);
                    var doa = Math.abs(t['client' + oa] - this.firstXY[oa]);
                    // if delta in the scroll axis > delta other axis, scroll instead of
                    // making events
                    ret = da >= doa;
                }
                return ret;
            }
        },
        findTouch: function(inTL, inId) {
            for (var i = 0, l = inTL.length, t; i < l && (t = inTL[i]); i++) {
                if (t.identifier === inId) {
                    return true;
                }
            }
        },
        // In some instances, a touchstart can happen without a touchend. This
        // leaves the pointermap in a broken state.
        // Therefore, on every touchstart, we remove the touches that did not fire a
        // touchend event.
        // To keep state globally consistent, we fire a
        // pointercancel for this "abandoned" touch
        vacuumTouches: function(inEvent) {
            var tl = inEvent.touches;
            // pointermap.pointers() should be < tl.length here, as the touchstart has not
            // been processed yet.
            if (pointermap.pointers() >= tl.length) {
                var d = [];
                pointermap.forEach(function(value, key) {
                    // Never remove pointerId == 1, which is mouse.
                    // Touch identifiers are 2 smaller than their pointerId, which is the
                    // index in pointermap.
                    if (key !== 1 && !this.findTouch(tl, key - 2)) {
                        var p = value;
                        d.push(p);
                    }
                }, this);
                d.forEach(function(p) {
                    this.cancel(p);
                    pointermap.delete(p.pointerId);
                }, this);
            }
        },
        touchstart: function(inEvent) {
            this.vacuumTouches(inEvent);
            this.setPrimaryTouch(inEvent.changedTouches[0]);
            this.dedupSynthMouse(inEvent);
            if (!this.scrolling) {
                this.clickCount++;
                this.processTouches(inEvent, this.down);
            }
        },
        down: function(inPointer) {
            dispatcher.down(inPointer);
        },
        touchmove: function(inEvent) {
            if (HAS_TOUCH_ACTION) {
                // touchevent.cancelable == false is sent when the page is scrolling under native Touch Action in Chrome 36
                // https://groups.google.com/a/chromium.org/d/msg/input-dev/wHnyukcYBcA/b9kmtwM1jJQJ
                if (inEvent.cancelable) {
                    this.processTouches(inEvent, this.move);
                }
            } else {
                if (!this.scrolling) {
                    if (this.scrolling === null && this.shouldScroll(inEvent)) {
                        this.scrolling = true;
                    } else {
                        this.scrolling = false;
                        inEvent.preventDefault();
                        this.processTouches(inEvent, this.move);
                    }
                } else if (this.firstXY) {
                    var t = inEvent.changedTouches[0];
                    var dx = t.clientX - this.firstXY.X;
                    var dy = t.clientY - this.firstXY.Y;
                    var dd = Math.sqrt(dx * dx + dy * dy);
                    if (dd >= HYSTERESIS) {
                        this.touchcancel(inEvent);
                        this.scrolling = true;
                        this.firstXY = null;
                    }
                }
            }
        },
        move: function(inPointer) {
            dispatcher.move(inPointer);
        },
        touchend: function(inEvent) {
            this.dedupSynthMouse(inEvent);
            this.processTouches(inEvent, this.up);
        },
        up: function(inPointer) {
            inPointer.relatedTarget = scope.findTarget(inPointer);
            dispatcher.up(inPointer);
        },
        cancel: function(inPointer) {
            dispatcher.cancel(inPointer);
        },
        touchcancel: function(inEvent) {
            inEvent._cancel = true;
            this.processTouches(inEvent, this.cancel);
        },
        cleanUpPointer: function(inPointer) {
            pointermap['delete'](inPointer.pointerId);
            this.removePrimaryPointer(inPointer);
        },
        // prevent synth mouse events from creating pointer events
        dedupSynthMouse: function(inEvent) {
            var lts = scope.mouseEvents.lastTouches;
            var t = inEvent.changedTouches[0];
            // only the primary finger will synth mouse events
            if (this.isPrimaryTouch(t)) {
                // remember x/y of last touch
                var lt = {
                    x: t.clientX,
                    y: t.clientY
                };
                lts.push(lt);
                var fn = (function(lts, lt) {
                    var i = lts.indexOf(lt);
                    if (i > -1) {
                        lts.splice(i, 1);
                    }
                }).bind(null, lts, lt);
                setTimeout(fn, DEDUP_TIMEOUT);
            }
        }
    };

    // prevent "ghost clicks" that come from elements that were removed in a touch handler
    var STOP_PROP_FN = Event.prototype.stopImmediatePropagation || Event.prototype.stopPropagation;
    document.addEventListener('click', function(ev) {
        var x = ev.clientX,
            y = ev.clientY;
        // check if a click is within DEDUP_DIST px radius of the touchstart
        var closeTo = function(touch) {
            var dx = Math.abs(x - touch.x),
                dy = Math.abs(y - touch.y);
            return (dx <= DEDUP_DIST && dy <= DEDUP_DIST);
        };
        // if click coordinates are close to touch coordinates, assume the click came from a touch
        var wasTouched = scope.mouseEvents.lastTouches.some(closeTo);
        // if the click came from touch, and the touchstart target is not in the path of the click event,
        // then the touchstart target was probably removed, and the click should be "busted"
        var path = scope.targetFinding.path(ev);
        if (wasTouched) {
            for (var i = 0; i < path.length; i++) {
                if (path[i] === touchEvents.firstTarget) {
                    return;
                }
            }
            ev.preventDefault();
            STOP_PROP_FN.call(ev);
        }
    }, true);

    scope.touchEvents = touchEvents;
})(exports);

(function(scope) {
    var dispatcher = scope.dispatcher;
    var pointermap = dispatcher.pointermap;
    var HAS_BITMAP_TYPE = window.MSPointerEvent && typeof window.MSPointerEvent.MSPOINTER_TYPE_MOUSE === 'number';
    var msEvents = {
        events: [
            'MSPointerDown',
            'MSPointerMove',
            'MSPointerUp',
            'MSPointerCancel',
        ],
        register: function(target) {
            dispatcher.listen(target, this.events);
        },
        unregister: function(target) {
            if (target.nodeType === Node.DOCUMENT_NODE) {
                return;
            }
            dispatcher.unlisten(target, this.events);
        },
        POINTER_TYPES: [
            '',
            'unavailable',
            'touch',
            'pen',
            'mouse'
        ],
        prepareEvent: function(inEvent) {
            var e = inEvent;
            e = dispatcher.cloneEvent(inEvent);
            if (HAS_BITMAP_TYPE) {
                e.pointerType = this.POINTER_TYPES[inEvent.pointerType];
            }
            e._source = 'ms';
            return e;
        },
        cleanup: function(id) {
            pointermap['delete'](id);
        },
        MSPointerDown: function(inEvent) {
            var e = this.prepareEvent(inEvent);
            e.target = scope.findTarget(inEvent);
            pointermap.set(inEvent.pointerId, e.target);
            dispatcher.down(e);
        },
        MSPointerMove: function(inEvent) {
            var target = pointermap.get(inEvent.pointerId);
            if (target) {
                var e = this.prepareEvent(inEvent);
                e.target = target;
                dispatcher.move(e);
            }
        },
        MSPointerUp: function(inEvent) {
            var e = this.prepareEvent(inEvent);
            e.relatedTarget = scope.findTarget(inEvent);
            e.target = pointermap.get(e.pointerId);
            dispatcher.up(e);
            this.cleanup(inEvent.pointerId);
        },
        MSPointerCancel: function(inEvent) {
            var e = this.prepareEvent(inEvent);
            e.relatedTarget = scope.findTarget(inEvent);
            e.target = pointermap.get(e.pointerId);
            dispatcher.cancel(e);
            this.cleanup(inEvent.pointerId);
        }
    };

    scope.msEvents = msEvents;
})(exports);

(function(scope) {
    var dispatcher = scope.dispatcher;
    var pointermap = dispatcher.pointermap;
    var pointerEvents = {
        events: [
            'pointerdown',
            'pointermove',
            'pointerup',
            'pointercancel'
        ],
        prepareEvent: function(inEvent) {
            var e = dispatcher.cloneEvent(inEvent);
            e._source = 'pointer';
            return e;
        },
        register: function(target) {
            dispatcher.listen(target, this.events);
        },
        unregister: function(target) {
            if (target.nodeType === Node.DOCUMENT_NODE) {
                return;
            }
            dispatcher.unlisten(target, this.events);
        },
        cleanup: function(id) {
            pointermap['delete'](id);
        },
        pointerdown: function(inEvent) {
            var e = this.prepareEvent(inEvent);
            e.target = scope.findTarget(inEvent);
            pointermap.set(e.pointerId, e.target);
            dispatcher.down(e);
        },
        pointermove: function(inEvent) {
            var target = pointermap.get(inEvent.pointerId);
            if (target) {
                var e = this.prepareEvent(inEvent);
                e.target = target;
                dispatcher.move(e);
            }
        },
        pointerup: function(inEvent) {
            var e = this.prepareEvent(inEvent);
            e.relatedTarget = scope.findTarget(inEvent);
            e.target = pointermap.get(e.pointerId);
            dispatcher.up(e);
            this.cleanup(inEvent.pointerId);
        },
        pointercancel: function(inEvent) {
            var e = this.prepareEvent(inEvent);
            e.relatedTarget = scope.findTarget(inEvent);
            e.target = pointermap.get(e.pointerId);
            dispatcher.cancel(e);
            this.cleanup(inEvent.pointerId);
        }
    };

    scope.pointerEvents = pointerEvents;
})(exports);

/**
 * This module contains the handlers for native platform events.
 * From here, the dispatcher is called to create unified pointer events.
 * Included are touch events (v1), mouse events, and MSPointerEvents.
 */
(function(scope) {

    var dispatcher = scope.dispatcher;
    var nav = window.navigator;

    if (window.PointerEvent) {
        dispatcher.registerSource('pointer', scope.pointerEvents);
    } else if (nav.msPointerEnabled) {
        dispatcher.registerSource('ms', scope.msEvents);
    } else {
        dispatcher.registerSource('mouse', scope.mouseEvents);
        if (window.ontouchstart !== undefined) {
            dispatcher.registerSource('touch', scope.touchEvents);
        }
    }

    // Work around iOS bugs https://bugs.webkit.org/show_bug.cgi?id=135628 and https://bugs.webkit.org/show_bug.cgi?id=136506
    var ua = navigator.userAgent;
    var IS_IOS = ua.match(/iPad|iPhone|iPod/) && 'ontouchstart' in window;

    dispatcher.IS_IOS = IS_IOS;
    scope.touchEvents.IS_IOS = IS_IOS;

    dispatcher.register(document, true);
})(exports);

/**
 * This event denotes the beginning of a series of tracking events.
 *
 * @module PointerGestures
 * @submodule Events
 * @class trackstart
 */
/**
 * Pixels moved in the x direction since trackstart.
 * @type Number
 * @property dx
 */
/**
 * Pixes moved in the y direction since trackstart.
 * @type Number
 * @property dy
 */
/**
 * Pixels moved in the x direction since the last track.
 * @type Number
 * @property ddx
 */
/**
 * Pixles moved in the y direction since the last track.
 * @type Number
 * @property ddy
 */
/**
 * The clientX position of the track gesture.
 * @type Number
 * @property clientX
 */
/**
 * The clientY position of the track gesture.
 * @type Number
 * @property clientY
 */
/**
 * The pageX position of the track gesture.
 * @type Number
 * @property pageX
 */
/**
 * The pageY position of the track gesture.
 * @type Number
 * @property pageY
 */
/**
 * The screenX position of the track gesture.
 * @type Number
 * @property screenX
 */
/**
 * The screenY position of the track gesture.
 * @type Number
 * @property screenY
 */
/**
 * The last x axis direction of the pointer.
 * @type Number
 * @property xDirection
 */
/**
 * The last y axis direction of the pointer.
 * @type Number
 * @property yDirection
 */
/**
 * A shared object between all tracking events.
 * @type Object
 * @property trackInfo
 */
/**
 * The element currently under the pointer.
 * @type Element
 * @property relatedTarget
 */
/**
 * The type of pointer that make the track gesture.
 * @type String
 * @property pointerType
 */
/**
 *
 * This event fires for all pointer movement being tracked.
 *
 * @class track
 * @extends trackstart
 */
/**
 * This event fires when the pointer is no longer being tracked.
 *
 * @class trackend
 * @extends trackstart
 */

(function(scope) {
    var dispatcher = scope.dispatcher;
    var eventFactory = scope.eventFactory;
    var pointermap = new scope.PointerMap();
    var track = {
        events: [
            'down',
            'move',
            'up',
        ],
        exposes: [
            'trackstart',
            'track',
            'trackx',
            'tracky',
            'trackend'
        ],
        defaultActions: {
            'track': 'none',
            'trackx': 'pan-y',
            'tracky': 'pan-x'
        },
        WIGGLE_THRESHOLD: 4,
        clampDir: function(inDelta) {
            return inDelta > 0 ? 1 : -1;
        },
        calcPositionDelta: function(inA, inB) {
            var x = 0,
                y = 0;
            if (inA && inB) {
                x = inB.pageX - inA.pageX;
                y = inB.pageY - inA.pageY;
            }
            return {
                x: x,
                y: y
            };
        },
        fireTrack: function(inType, inEvent, inTrackingData) {
            var t = inTrackingData;
            var d = this.calcPositionDelta(t.downEvent, inEvent);
            var dd = this.calcPositionDelta(t.lastMoveEvent, inEvent);
            if (dd.x) {
                t.xDirection = this.clampDir(dd.x);
            } else if (inType === 'trackx') {
                return;
            }
            if (dd.y) {
                t.yDirection = this.clampDir(dd.y);
            } else if (inType === 'tracky') {
                return;
            }
            var gestureProto = {
                bubbles: true,
                cancelable: true,
                trackInfo: t.trackInfo,
                relatedTarget: inEvent.relatedTarget,
                pointerType: inEvent.pointerType,
                pointerId: inEvent.pointerId,
                _source: 'track'
            };
            if (inType !== 'tracky') {
                gestureProto.x = inEvent.x;
                gestureProto.dx = d.x;
                gestureProto.ddx = dd.x;
                gestureProto.clientX = inEvent.clientX;
                gestureProto.pageX = inEvent.pageX;
                gestureProto.screenX = inEvent.screenX;
                gestureProto.xDirection = t.xDirection;
            }
            if (inType !== 'trackx') {
                gestureProto.dy = d.y;
                gestureProto.ddy = dd.y;
                gestureProto.y = inEvent.y;
                gestureProto.clientY = inEvent.clientY;
                gestureProto.pageY = inEvent.pageY;
                gestureProto.screenY = inEvent.screenY;
                gestureProto.yDirection = t.yDirection;
            }
            var e = eventFactory.makeGestureEvent(inType, gestureProto);
            t.downTarget.dispatchEvent(e);
        },
        down: function(inEvent) {
            if (inEvent.isPrimary && (inEvent.pointerType === 'mouse' ? inEvent.buttons === 1 : true)) {
                var p = {
                    downEvent: inEvent,
                    downTarget: inEvent.target,
                    trackInfo: {},
                    lastMoveEvent: null,
                    xDirection: 0,
                    yDirection: 0,
                    tracking: false
                };
                pointermap.set(inEvent.pointerId, p);
            }
        },
        move: function(inEvent) {
            var p = pointermap.get(inEvent.pointerId);
            if (p) {
                if (!p.tracking) {
                    var d = this.calcPositionDelta(p.downEvent, inEvent);
                    var move = d.x * d.x + d.y * d.y;
                    // start tracking only if finger moves more than WIGGLE_THRESHOLD
                    if (move > this.WIGGLE_THRESHOLD) {
                        p.tracking = true;
                        p.lastMoveEvent = p.downEvent;
                        this.fireTrack('trackstart', inEvent, p);
                    }
                }
                if (p.tracking) {
                    this.fireTrack('track', inEvent, p);
                    this.fireTrack('trackx', inEvent, p);
                    this.fireTrack('tracky', inEvent, p);
                }
                p.lastMoveEvent = inEvent;
            }
        },
        up: function(inEvent) {
            var p = pointermap.get(inEvent.pointerId);
            if (p) {
                if (p.tracking) {
                    this.fireTrack('trackend', inEvent, p);
                }
                pointermap.delete(inEvent.pointerId);
            }
        }
    };
    dispatcher.registerGesture('track', track);
})(exports);

/**
 * This event is fired when a pointer is held down for 200ms.
 *
 * @module PointerGestures
 * @submodule Events
 * @class hold
 */
/**
 * Type of pointer that made the holding event.
 * @type String
 * @property pointerType
 */
/**
 * Screen X axis position of the held pointer
 * @type Number
 * @property clientX
 */
/**
 * Screen Y axis position of the held pointer
 * @type Number
 * @property clientY
 */
/**
 * Type of pointer that made the holding event.
 * @type String
 * @property pointerType
 */
/**
 * This event is fired every 200ms while a pointer is held down.
 *
 * @class holdpulse
 * @extends hold
 */
/**
 * Milliseconds pointer has been held down.
 * @type Number
 * @property holdTime
 */
/**
 * This event is fired when a held pointer is released or moved.
 *
 * @class release
 */

(function(scope) {
    var dispatcher = scope.dispatcher;
    var eventFactory = scope.eventFactory;
    var hold = {
        // wait at least HOLD_DELAY ms between hold and pulse events
        HOLD_DELAY: 200,
        // pointer can move WIGGLE_THRESHOLD pixels before not counting as a hold
        WIGGLE_THRESHOLD: 16,
        events: [
            'down',
            'move',
            'up',
        ],
        exposes: [
            'hold',
            'holdpulse',
            'release'
        ],
        heldPointer: null,
        holdJob: null,
        pulse: function() {
            var hold = Date.now() - this.heldPointer.timeStamp;
            var type = this.held ? 'holdpulse' : 'hold';
            this.fireHold(type, hold);
            this.held = true;
        },
        cancel: function() {
            clearInterval(this.holdJob);
            if (this.held) {
                this.fireHold('release');
            }
            this.held = false;
            this.heldPointer = null;
            this.target = null;
            this.holdJob = null;
        },
        down: function(inEvent) {
            if (inEvent.isPrimary && !this.heldPointer) {
                this.heldPointer = inEvent;
                this.target = inEvent.target;
                this.holdJob = setInterval(this.pulse.bind(this), this.HOLD_DELAY);
            }
        },
        up: function(inEvent) {
            if (this.heldPointer && this.heldPointer.pointerId === inEvent.pointerId) {
                this.cancel();
            }
        },
        move: function(inEvent) {
            if (this.heldPointer && this.heldPointer.pointerId === inEvent.pointerId) {
                var x = inEvent.clientX - this.heldPointer.clientX;
                var y = inEvent.clientY - this.heldPointer.clientY;
                if ((x * x + y * y) > this.WIGGLE_THRESHOLD) {
                    this.cancel();
                }
            }
        },
        fireHold: function(inType, inHoldTime) {
            var p = {
                bubbles: true,
                cancelable: true,
                pointerType: this.heldPointer.pointerType,
                pointerId: this.heldPointer.pointerId,
                x: this.heldPointer.clientX,
                y: this.heldPointer.clientY,
                _source: 'hold'
            };
            if (inHoldTime) {
                p.holdTime = inHoldTime;
            }
            var e = eventFactory.makeGestureEvent(inType, p);
            this.target.dispatchEvent(e);
        }
    };
    dispatcher.registerGesture('hold', hold);
})(exports);

/**
 * This event is fired when a pointer quickly goes down and up, and is used to
 * denote activation.
 *
 * Any gesture event can prevent the tap event from being created by calling
 * `event.preventTap`.
 *
 * Any pointer event can prevent the tap by setting the `tapPrevented` property
 * on itself.
 *
 * @module PointerGestures
 * @submodule Events
 * @class tap
 */
/**
 * X axis position of the tap.
 * @property x
 * @type Number
 */
/**
 * Y axis position of the tap.
 * @property y
 * @type Number
 */
/**
 * Type of the pointer that made the tap.
 * @property pointerType
 * @type String
 */
(function(scope) {
    var dispatcher = scope.dispatcher;
    var eventFactory = scope.eventFactory;
    var pointermap = new scope.PointerMap();
    var tap = {
        events: [
            'down',
            'up'
        ],
        exposes: [
            'tap'
        ],
        down: function(inEvent) {
            if (inEvent.isPrimary && !inEvent.tapPrevented) {
                pointermap.set(inEvent.pointerId, {
                    target: inEvent.target,
                    buttons: inEvent.buttons,
                    x: inEvent.clientX,
                    y: inEvent.clientY
                });
            }
        },
        shouldTap: function(e, downState) {
            var tap = true;
            if (e.pointerType === 'mouse') {
                // only allow left click to tap for mouse
                tap = (e.buttons ^ 1) && (downState.buttons & 1);
            }
            return tap && !e.tapPrevented;
        },
        up: function(inEvent) {
            var start = pointermap.get(inEvent.pointerId);
            if (start && this.shouldTap(inEvent, start)) {
                // up.relatedTarget is target currently under finger
                var t = scope.targetFinding.LCA(start.target, inEvent.relatedTarget);
                if (t) {
                    var e = eventFactory.makeGestureEvent('tap', {
                        bubbles: true,
                        cancelable: true,
                        x: inEvent.clientX,
                        y: inEvent.clientY,
                        detail: inEvent.detail,
                        pointerType: inEvent.pointerType,
                        pointerId: inEvent.pointerId,
                        altKey: inEvent.altKey,
                        ctrlKey: inEvent.ctrlKey,
                        metaKey: inEvent.metaKey,
                        shiftKey: inEvent.shiftKey,
                        _source: 'tap'
                    });
                    t.dispatchEvent(e);
                }
            }
            pointermap.delete(inEvent.pointerId);
        }
    };
    // patch eventFactory to remove id from tap's pointermap for preventTap calls
    eventFactory.preventTap = function(e) {
        return function() {
            e.tapPrevented = true;
            pointermap.delete(e.pointerId);
        };
    };
    dispatcher.registerGesture('tap', tap);
})(exports);

/*
 * Basic strategy: find the farthest apart points, use as diameter of circle
 * react to size change and rotation of the chord
 */

/**
 * @module pointer-gestures
 * @submodule Events
 * @class pinch
 */
/**
 * Scale of the pinch zoom gesture
 * @property scale
 * @type Number
 */
/**
 * Center X position of pointers causing pinch
 * @property centerX
 * @type Number
 */
/**
 * Center Y position of pointers causing pinch
 * @property centerY
 * @type Number
 */

/**
 * @module pointer-gestures
 * @submodule Events
 * @class rotate
 */
/**
 * Angle (in degrees) of rotation. Measured from starting positions of pointers.
 * @property angle
 * @type Number
 */
/**
 * Center X position of pointers causing rotation
 * @property centerX
 * @type Number
 */
/**
 * Center Y position of pointers causing rotation
 * @property centerY
 * @type Number
 */
(function(scope) {
    var dispatcher = scope.dispatcher;
    var eventFactory = scope.eventFactory;
    var pointermap = new scope.PointerMap();
    var RAD_TO_DEG = 180 / Math.PI;
    var pinch = {
        events: [
            'down',
            'up',
            'move',
            'cancel'
        ],
        exposes: [
            'pinchstart',
            'pinch',
            'pinchend',
            'rotate'
        ],
        defaultActions: {
            'pinch': 'none',
            'rotate': 'none'
        },
        reference: {},
        down: function(inEvent) {
            pointermap.set(inEvent.pointerId, inEvent);
            if (pointermap.pointers() == 2) {
                var points = this.calcChord();
                var angle = this.calcAngle(points);
                this.reference = {
                    angle: angle,
                    diameter: points.diameter,
                    target: scope.targetFinding.LCA(points.a.target, points.b.target)
                };

                this.firePinch('pinchstart', points.diameter, points);
            }
        },
        up: function(inEvent) {
            var p = pointermap.get(inEvent.pointerId);
            var num = pointermap.pointers();
            if (p) {
                if (num === 2) {
                    // fire 'pinchend' before deleting pointer
                    var points = this.calcChord();
                    this.firePinch('pinchend', points.diameter, points);
                }
                pointermap.delete(inEvent.pointerId);
            }
        },
        move: function(inEvent) {
            if (pointermap.has(inEvent.pointerId)) {
                pointermap.set(inEvent.pointerId, inEvent);
                if (pointermap.pointers() > 1) {
                    this.calcPinchRotate();
                }
            }
        },
        cancel: function(inEvent) {
            this.up(inEvent);
        },
        firePinch: function(type, diameter, points) {
            var zoom = diameter / this.reference.diameter;
            var e = eventFactory.makeGestureEvent(type, {
                bubbles: true,
                cancelable: true,
                scale: zoom,
                centerX: points.center.x,
                centerY: points.center.y,
                _source: 'pinch'
            });
            this.reference.target.dispatchEvent(e);
        },
        fireRotate: function(angle, points) {
            var diff = Math.round((angle - this.reference.angle) % 360);
            var e = eventFactory.makeGestureEvent('rotate', {
                bubbles: true,
                cancelable: true,
                angle: diff,
                centerX: points.center.x,
                centerY: points.center.y,
                _source: 'pinch'
            });
            this.reference.target.dispatchEvent(e);
        },
        calcPinchRotate: function() {
            var points = this.calcChord();
            var diameter = points.diameter;
            var angle = this.calcAngle(points);
            if (diameter != this.reference.diameter) {
                this.firePinch('pinch', diameter, points);
            }
            if (angle != this.reference.angle) {
                this.fireRotate(angle, points);
            }
        },
        calcChord: function() {
            var pointers = [];
            pointermap.forEach(function(p) {
                pointers.push(p);
            });
            var dist = 0;
            // start with at least two pointers
            var points = {
                a: pointers[0],
                b: pointers[1]
            };
            var x, y, d;
            for (var i = 0; i < pointers.length; i++) {
                var a = pointers[i];
                for (var j = i + 1; j < pointers.length; j++) {
                    var b = pointers[j];
                    x = Math.abs(a.clientX - b.clientX);
                    y = Math.abs(a.clientY - b.clientY);
                    d = x + y;
                    if (d > dist) {
                        dist = d;
                        points = {
                            a: a,
                            b: b
                        };
                    }
                }
            }
            x = Math.abs(points.a.clientX + points.b.clientX) / 2;
            y = Math.abs(points.a.clientY + points.b.clientY) / 2;
            points.center = {
                x: x,
                y: y
            };
            points.diameter = dist;
            return points;
        },
        calcAngle: function(points) {
            var x = points.a.clientX - points.b.clientX;
            var y = points.a.clientY - points.b.clientY;
            return (360 + Math.atan2(y, x) * RAD_TO_DEG) % 360;
        }
    };
    dispatcher.registerGesture('pinch', pinch);
})(exports);
},{}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qb25hdGhhbi9yZXBvcy9maW5jYW52YXMvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9qb25hdGhhbi9yZXBvcy9maW5jYW52YXMvbm9kZV9tb2R1bGVzL3JlY3Rhbmd1bGFyL2luZGV4LmpzIiwiL1VzZXJzL2pvbmF0aGFuL3JlcG9zL2ZpbmNhbnZhcy9zcmMvZmFrZV9mMGYwMWM4ZS5qcyIsIi9Vc2Vycy9qb25hdGhhbi9yZXBvcy9maW5jYW52YXMvc3JjL2luZGV4LmpzIiwiL1VzZXJzL2pvbmF0aGFuL3JlcG9zL2ZpbmNhbnZhcy9zcmMvanMvR3JhcGhpY3NDb250ZXh0LmpzIiwiL1VzZXJzL2pvbmF0aGFuL3JlcG9zL2ZpbmNhbnZhcy9zcmMvanMvZ2MtY29uc29sZS1sb2dnZXIuanMiLCIvVXNlcnMvam9uYXRoYW4vcmVwb3MvZmluY2FudmFzL3NyYy9qcy9wb2x5bWVyZ2VzdHVyZXMuZGV2LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeGlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdjFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuLyogZXNsaW50LWVudiBub2RlLCBicm93c2VyICovXG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyByZWFkLW9ubHkgcHJvcGVydHkgYW5kIGF0dGFjaGVzIGl0IHRvIHRoZSBwcm92aWRlZCBjb250ZXh0LlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gTmFtZSBmb3IgbmV3IHByb3BlcnR5LlxuICogQHBhcmFtIHsqfSBbdmFsdWVdIC0gVmFsdWUgb2YgbmV3IHByb3BlcnR5LlxuICovXG5mdW5jdGlvbiBhZGRSZWFkT25seVByb3BlcnR5KG5hbWUsIHZhbHVlKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIG5hbWUsIHtcbiAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICB9KTtcbn1cblxuLyoqXG4gKiBAY29uc3RydWN0b3IgUG9pbnRcbiAqXG4gKiBAZGVzYyBUaGlzIG9iamVjdCByZXByZXNlbnRzIGEgc2luZ2xlIHBvaW50IGluIGFuIGFic3RyYWN0IDItZGltZW5zaW9uYWwgbWF0cml4LlxuICpcbiAqIFRoZSB1bml0IG9mIG1lYXN1cmUgaXMgdHlwaWNhbGx5IHBpeGVscy5cbiAqIChJZiB1c2VkIHRvIG1vZGVsIGNvbXB1dGVyIGdyYXBoaWNzLCB2ZXJ0aWNhbCBjb29yZGluYXRlcyBhcmUgdHlwaWNhbGx5IG1lYXN1cmVkIGRvd253YXJkc1xuICogZnJvbSB0aGUgdG9wIG9mIHRoZSB3aW5kb3cuIFRoaXMgY29udmVudGlvbiBob3dldmVyIGlzIG5vdCBpbmhlcmVudCBpbiB0aGlzIG9iamVjdC4pXG4gKlxuICogTm90ZTogVGhpcyBvYmplY3Qgc2hvdWxkIGJlIGluc3RhbnRpYXRlZCB3aXRoIHRoZSBgbmV3YCBrZXl3b3JkLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSB4IC0gdGhlIG5ldyBwb2ludCdzIGB4YCBwcm9wZXJ0eVxuICogQHBhcmFtIHtudW1iZXJ9IHkgLSB0aGUgbmV3IHBvaW50J3MgYHlgIHByb3BlcnR5XG4gKi9cbmZ1bmN0aW9uIFBvaW50KHgsIHkpIHtcblxuICAgIC8qKlxuICAgICAqIEBuYW1lIHhcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqIEBzdW1tYXJ5IFRoaXMgcG9pbnQncyBob3Jpem9udGFsIGNvb3JkaW5hdGUuXG4gICAgICogQGRlc2MgQ3JlYXRlZCB1cG9uIGluc3RhbnRpYXRpb24gYnkgdGhlIHtAbGluayBQb2ludHxjb25zdHJ1Y3Rvcn0uXG4gICAgICogQG1lbWJlck9mIFBvaW50LnByb3RvdHlwZVxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqL1xuICAgIGFkZFJlYWRPbmx5UHJvcGVydHkuY2FsbCh0aGlzLCAneCcsIE51bWJlcih4KSB8fCAwKTtcblxuICAgIC8qKlxuICAgICAqIEBuYW1lIHlcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqIEBzdW1tYXJ5IFRoaXMgcG9pbnQncyB2ZXJ0aWNhbCBjb29yZGluYXRlLlxuICAgICAqIEBkZXNjIENyZWF0ZWQgdXBvbiBpbnN0YW50aWF0aW9uIGJ5IHRoZSB7QGxpbmsgUG9pbnR8Y29uc3RydWN0b3J9LlxuICAgICAqIEBtZW1iZXJPZiBQb2ludC5wcm90b3R5cGVcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKi9cbiAgICBhZGRSZWFkT25seVByb3BlcnR5LmNhbGwodGhpcywgJ3knLCBOdW1iZXIoeSkgfHwgMCk7XG5cbn1cblxuUG9pbnQucHJvdG90eXBlID0ge1xuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge1BvaW50fSBBIG5ldyBwb2ludCB3aGljaCBpcyB0aGlzIHBvaW50J3MgcG9zaXRpb24gaW5jcmVhc2VkIGJ5IGNvb3JkaW5hdGVzIG9mIGdpdmVuIGBvZmZzZXRgLlxuICAgICAqIEBwYXJhbSB7UG9pbnR9IG9mZnNldCAtIEhvcml6b250YWwgYW5kIHZlcnRpY2FsIHZhbHVlcyB0byBhZGQgdG8gdGhpcyBwb2ludCdzIGNvb3JkaW5hdGVzLlxuICAgICAqIEBtZW1iZXJPZiBQb2ludC5wcm90b3R5cGVcbiAgICAgKi9cbiAgICBwbHVzOiBmdW5jdGlvbihvZmZzZXQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQb2ludChcbiAgICAgICAgICAgIHRoaXMueCArIG9mZnNldC54LFxuICAgICAgICAgICAgdGhpcy55ICsgb2Zmc2V0LnlcbiAgICAgICAgKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge1BvaW50fSBBIG5ldyBwb2ludCB3aGljaCBpcyB0aGlzIHBvaW50J3MgcG9zaXRpb24gaW5jcmVhc2VkIGJ5IGdpdmVuIG9mZnNldHMuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvZmZzZXRYPTBdIC0gVmFsdWUgdG8gYWRkIHRvIHRoaXMgcG9pbnQncyBob3Jpem9udGFsIGNvb3JkaW5hdGUuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvZmZzZXRZPTBdIC0gVmFsdWUgdG8gYWRkIHRvIHRoaXMgcG9pbnQncyBob3Jpem9udGFsIGNvb3JkaW5hdGUuXG4gICAgICogQG1lbWJlck9mIFBvaW50LnByb3RvdHlwZVxuICAgICAqL1xuICAgIHBsdXNYWTogZnVuY3Rpb24ob2Zmc2V0WCwgb2Zmc2V0WSkge1xuICAgICAgICByZXR1cm4gbmV3IFBvaW50KFxuICAgICAgICAgICAgdGhpcy54ICsgKG9mZnNldFggfHwgMCksXG4gICAgICAgICAgICB0aGlzLnkgKyAob2Zmc2V0WSB8fCAwKVxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7UG9pbnR9IEEgbmV3IHBvaW50IHdoaWNoIGlzIHRoaXMgcG9pbnQncyBwb3NpdGlvbiBkZWNyZWFzZWQgYnkgY29vcmRpbmF0ZXMgb2YgZ2l2ZW4gYG9mZnNldGAuXG4gICAgICogQHBhcmFtIHtQb2ludH0gb2Zmc2V0IC0gSG9yaXpvbnRhbCBhbmQgdmVydGljYWwgdmFsdWVzIHRvIHN1YnRyYWN0IGZyb20gdGhpcyBwb2ludCdzIGNvb3JkaW5hdGVzLlxuICAgICAqIEBtZW1iZXJPZiBQb2ludC5wcm90b3R5cGVcbiAgICAgKi9cbiAgICBtaW51czogZnVuY3Rpb24ob2Zmc2V0KSB7XG4gICAgICAgIHJldHVybiBuZXcgUG9pbnQoXG4gICAgICAgICAgICB0aGlzLnggLSBvZmZzZXQueCxcbiAgICAgICAgICAgIHRoaXMueSAtIG9mZnNldC55XG4gICAgICAgICk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtQb2ludH0gQSBuZXcgYFBvaW50YCBwb3NpdGlvbmVkIHRvIGxlYXN0IHggYW5kIGxlYXN0IHkgb2YgdGhpcyBwb2ludCBhbmQgZ2l2ZW4gYG9mZnNldGAuXG4gICAgICogQHBhcmFtIHtQb2ludH0gcG9pbnQgLSBBIHBvaW50IHRvIGNvbXBhcmUgdG8gdGhpcyBwb2ludC5cbiAgICAgKiBAbWVtYmVyT2YgUG9pbnQucHJvdG90eXBlXG4gICAgICovXG4gICAgbWluOiBmdW5jdGlvbihwb2ludCkge1xuICAgICAgICByZXR1cm4gbmV3IFBvaW50KFxuICAgICAgICAgICAgTWF0aC5taW4odGhpcy54LCBwb2ludC54KSxcbiAgICAgICAgICAgIE1hdGgubWluKHRoaXMueSwgcG9pbnQueSlcbiAgICAgICAgKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge1BvaW50fSBBIG5ldyBgUG9pbnRgIHBvc2l0aW9uZWQgdG8gZ3JlYXRlc3QgeCBhbmQgZ3JlYXRlc3QgeSBvZiB0aGlzIHBvaW50IGFuZCBnaXZlbiBgcG9pbnRgLlxuICAgICAqIEBwYXJhbSB7UG9pbnR9IHBvaW50IC0gQSBwb2ludCB0byBjb21wYXJlIHRvIHRoaXMgcG9pbnQuXG4gICAgICogQG1lbWJlck9mIFBvaW50LnByb3RvdHlwZVxuICAgICAqL1xuICAgIG1heDogZnVuY3Rpb24ocG9pbnQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQb2ludChcbiAgICAgICAgICAgIE1hdGgubWF4KHRoaXMueCwgcG9pbnQueCksXG4gICAgICAgICAgICBNYXRoLm1heCh0aGlzLnksIHBvaW50LnkpXG4gICAgICAgICk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IERpc3RhbmNlIGJldHdlZW4gZ2l2ZW4gYHBvaW50YCBhbmQgdGhpcyBwb2ludCB1c2luZyBQeXRoYWdvcmVhbiBUaGVvcmVtIGZvcm11bGEuXG4gICAgICogQHBhcmFtIHtQb2ludH0gcG9pbnQgLSBBIHBvaW50IGZyb20gd2hpY2ggdG8gY29tcHV0ZSB0aGUgZGlzdGFuY2UgdG8gdGhpcyBwb2ludC5cbiAgICAgKiBAbWVtYmVyT2YgUG9pbnQucHJvdG90eXBlXG4gICAgICovXG4gICAgZGlzdGFuY2U6IGZ1bmN0aW9uKHBvaW50KSB7XG4gICAgICAgIHZhciBkZWx0YVggPSBwb2ludC54IC0gdGhpcy54LFxuICAgICAgICAgICAgZGVsdGFZID0gcG9pbnQueSAtIHRoaXMueTtcblxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KFxuICAgICAgICAgICAgZGVsdGFYICogZGVsdGFYICtcbiAgICAgICAgICAgIGRlbHRhWSAqIGRlbHRhWVxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBfKEZvcm1lcmx5OiBgZXF1YWxgLilfXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZmYgX2JvdGhfIGNvb3JkaW5hdGVzIG9mIHRoaXMgcG9pbnQgYXJlIGV4YWN0bHkgZXF1YWwgdG8gdGhvc2Ugb2YgZ2l2ZW4gYHBvaW50YC5cbiAgICAgKiBAcGFyYW0ge1BvaW50fSBwb2ludCAtIEEgcG9pbnQgdG8gY29tcGFyZSB0byB0aGlzIHBvaW50LlxuICAgICAqIEBtZW1iZXJPZiBQb2ludC5wcm90b3R5cGVcbiAgICAgKi9cbiAgICBlcXVhbHM6IGZ1bmN0aW9uKHBvaW50KSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBmYWxzZTtcblxuICAgICAgICBpZiAocG9pbnQpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9XG4gICAgICAgICAgICAgICAgdGhpcy54ID09PSBwb2ludC54ICYmXG4gICAgICAgICAgICAgICAgdGhpcy55ID09PSBwb2ludC55O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZmYgX2JvdGhfIGNvb3JkaW5hdGVzIG9mIHRoaXMgcG9pbnQgYXJlIGdyZWF0ZXIgdGhhbiB0aG9zZSBvZiBnaXZlbiBgcG9pbnRgLlxuICAgICAqIEBwYXJhbSB7UG9pbnR9IHBvaW50IC0gQSBwb2ludCB0byBjb21wYXJlIHRvIHRoaXMgcG9pbnRcbiAgICAgKiBAbWVtYmVyT2YgUG9pbnQucHJvdG90eXBlXG4gICAgICovXG4gICAgZ3JlYXRlclRoYW46IGZ1bmN0aW9uKHBvaW50KSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0aGlzLnggPiBwb2ludC54ICYmXG4gICAgICAgICAgICB0aGlzLnkgPiBwb2ludC55XG4gICAgICAgICk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWZmIF9ib3RoXyBjb29yZGluYXRlcyBvZiB0aGlzIHBvaW50IGFyZSBsZXNzIHRoYW4gdGhvc2Ugb2YgZ2l2ZW4gYHBvaW50YC5cbiAgICAgKiBAcGFyYW0ge1BvaW50fSBwb2ludCAtIEEgcG9pbnQgdG8gY29tcGFyZSB0byB0aGlzIHBvaW50XG4gICAgICogQG1lbWJlck9mIFBvaW50LnByb3RvdHlwZVxuICAgICAqL1xuICAgIGxlc3NUaGFuOiBmdW5jdGlvbihwb2ludCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdGhpcy54IDwgcG9pbnQueCAmJlxuICAgICAgICAgICAgdGhpcy55IDwgcG9pbnQueVxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBfKEZvcm1lcmx5IGBncmVhdGVyVGhhbkVxdWFsVG9gLilfXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZmYgX2JvdGhfIGNvb3JkaW5hdGVzIG9mIHRoaXMgcG9pbnQgYXJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byB0aG9zZSBvZiBnaXZlbiBgcG9pbnRgLlxuICAgICAqIEBwYXJhbSB7UG9pbnR9IHBvaW50IC0gQSBwb2ludCB0byBjb21wYXJlIHRvIHRoaXMgcG9pbnRcbiAgICAgKiBAbWVtYmVyT2YgUG9pbnQucHJvdG90eXBlXG4gICAgICovXG4gICAgZ3JlYXRlclRoYW5PckVxdWFsVG86IGZ1bmN0aW9uKHBvaW50KSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0aGlzLnggPj0gcG9pbnQueCAmJlxuICAgICAgICAgICAgdGhpcy55ID49IHBvaW50LnlcbiAgICAgICAgKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogXyhGb3JtZXJseSBgbGVzc1RoYW5FcXVhbFRvYC4pX1xuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWZmIF9ib3RoXyBjb29yZGluYXRlcyBvZiB0aGlzIHBvaW50IGFyZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gdGhvc2Ugb2YgZ2l2ZW4gYHBvaW50YC5cbiAgICAgKiBAcGFyYW0ge1BvaW50fSBwb2ludCAtIEEgcG9pbnQgdG8gY29tcGFyZSB0byB0aGlzIHBvaW50LlxuICAgICAqIEBtZW1iZXJPZiBQb2ludC5wcm90b3R5cGVcbiAgICAgKi9cbiAgICBsZXNzVGhhbk9yRXF1YWxUbzogZnVuY3Rpb24ocG9pbnQpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHRoaXMueCA8PSBwb2ludC54ICYmXG4gICAgICAgICAgICB0aGlzLnkgPD0gcG9pbnQueVxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBfKEZvcm1lcmx5IGBpc0NvbnRhaW5lZFdpdGhpblJlY3RhbmdsZWAuKV9cbiAgICAgKiBAcGFyYW0gcmVjdCB7UmVjdGFuZ2xlfSAtIFJlY3RhbmdsZSB0byB0ZXN0IHRoaXMgcG9pbnQgYWdhaW5zdC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmZiB0aGlzIHBvaW50IGlzIHdpdGhpbiBnaXZlbiBgcmVjdGAuXG4gICAgICogQG1lbWJlck9mIFBvaW50LnByb3RvdHlwZVxuICAgICAqL1xuICAgIHdpdGhpbjogZnVuY3Rpb24ocmVjdCkge1xuICAgICAgICB2YXIgbWluWCA9IHJlY3Qub3JpZ2luLngsXG4gICAgICAgICAgICBtYXhYID0gbWluWCArIHJlY3QuZXh0ZW50Lng7XG4gICAgICAgIHZhciBtaW5ZID0gcmVjdC5vcmlnaW4ueSxcbiAgICAgICAgICAgIG1heFkgPSBtaW5ZICsgcmVjdC5leHRlbnQueTtcblxuICAgICAgICBpZiAocmVjdC5leHRlbnQueCA8IDApIHtcbiAgICAgICAgICAgIG1pblggPSBtYXhYO1xuICAgICAgICAgICAgbWF4WCA9IHJlY3Qub3JpZ2luLng7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVjdC5leHRlbnQueSA8IDApIHtcbiAgICAgICAgICAgIG1pblkgPSBtYXhZO1xuICAgICAgICAgICAgbWF4WSA9IHJlY3Qub3JpZ2luLnk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgbWluWCA8PSB0aGlzLnggJiYgdGhpcy54IDwgbWF4WCAmJlxuICAgICAgICAgICAgbWluWSA8PSB0aGlzLnkgJiYgdGhpcy55IDwgbWF4WVxuICAgICAgICApO1xuICAgIH1cbn07XG5cblBvaW50LnByb3RvdHlwZS5FUSA9IFBvaW50LnByb3RvdHlwZS5lcXVhbHM7XG5Qb2ludC5wcm90b3R5cGUuR1QgPSBQb2ludC5wcm90b3R5cGUuZ3JlYXRlclRoYW47XG5Qb2ludC5wcm90b3R5cGUuTFQgPSBQb2ludC5wcm90b3R5cGUubGVzc1RoYW47XG5Qb2ludC5wcm90b3R5cGUuR0UgPSBQb2ludC5wcm90b3R5cGUuZ3JlYXRlclRoYW5PckVxdWFsVG87XG5Qb2ludC5wcm90b3R5cGUuTEUgPSBQb2ludC5wcm90b3R5cGUubGVzc1RoYW5PckVxdWFsVG87XG5cblxuLyoqXG4gKiBAY29uc3RydWN0b3IgUmVjdGFuZ2xlXG4gKlxuICogQGRlc2MgVGhpcyBvYmplY3QgcmVwcmVzZW50cyBhIHJlY3Rhbmd1bGFyIGFyZWEgd2l0aGluIGFuIGFic3RyYWN0IDItZGltZW5zaW9uYWwgbWF0cml4LlxuICpcbiAqIFRoZSB1bml0IG9mIG1lYXN1cmUgaXMgdHlwaWNhbGx5IHBpeGVscy5cbiAqIChJZiB1c2VkIHRvIG1vZGVsIGNvbXB1dGVyIGdyYXBoaWNzLCB2ZXJ0aWNhbCBjb29yZGluYXRlcyBhcmUgdHlwaWNhbGx5IG1lYXN1cmVkIGRvd253YXJkc1xuICogZnJvbSB0aGUgdG9wIG9mIHRoZSB3aW5kb3cuIFRoaXMgY29udmVudGlvbiBob3dldmVyIGlzIG5vdCBpbmhlcmVudCBpbiB0aGlzIG9iamVjdC4pXG4gKlxuICogTm9ybWFsbHksIHRoZSBgeGAgYW5kIGB5YCBwYXJhbWV0ZXJzIHRvIHRoZSBjb25zdHJ1Y3RvciBkZXNjcmliZSB0aGUgdXBwZXIgbGVmdCBjb3JuZXIgb2YgdGhlIHJlY3QuXG4gKiBIb3dldmVyLCBuZWdhdGl2ZSB2YWx1ZXMgb2YgYHdpZHRoYCBhbmQgYGhlaWdodGAgd2lsbCBiZSBhZGRlZCB0byB0aGUgZ2l2ZW4gYHhgIGFuZCBgeWAuIFRoYXQgaXMsXG4gKiBhIG5lZ2F0aXZlIHZhbHVlIG9mIHRoZSBgd2lkdGhgIHBhcmFtZXRlciB3aWxsIGV4dGVuZCB0aGUgcmVjdCB0byB0aGUgbGVmdCBvZiB0aGUgZ2l2ZW4gYHhgIGFuZFxuICogYSBuZWdhdGl2ZSB2YWx1ZSBvZiB0aGUgYGhlaWdodGAgcGFyYW1ldGVyIHdpbGwgZXh0ZW5kIHRoZSByZWN0IGFib3ZlIHRoZSBnaXZlbiBgeWAuXG4gKiBJbiBhbnkgY2FzZSwgYWZ0ZXIgaW5zdGFudGlhdGlvbiB0aGUgZm9sbG93aW5nIGFyZSBndWFyYW50ZWVkIHRvIGFsd2F5cyBiZSB0cnVlOlxuICogKiBUaGUgYGV4dGVudGAsIGB3aWR0aGAsIGFuZCBgaGVpZ2h0YCBwcm9wZXJ0aWVzIF9hbHdheXNfIGdpdmUgcG9zaXRpdmUgdmFsdWVzLlxuICogKiBUaGUgYG9yaWdpbmAsIGB0b3BgLCBhbmQgYGxlZnRgIHByb3BlcnRpZXMgX2Fsd2F5c18gcmVmbGVjdCB0aGUgdXBwZXIgbGVmdCBjb3JuZXIuXG4gKiAqIFRoZSBgY29ybmVyYCwgYGJvdHRvbWAsIGFuZCBgcmlnaHRgIHByb3BlcnRpZXMgX2Fsd2F5c18gcmVmbGVjdCB0aGUgbG93ZXIgcmlnaHQgY29ybmVyLlxuICpcbiAqIE5vdGU6IFRoaXMgb2JqZWN0IHNob3VsZCBiZSBpbnN0YW50aWF0ZWQgd2l0aCB0aGUgYG5ld2Aga2V5d29yZC5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gW3g9MF0gLSBIb3Jpem9udGFsIGNvb3JkaW5hdGUgb2Ygc29tZSBjb3JuZXIgb2YgdGhlIHJlY3QuXG4gKiBAcGFyYW0ge251bWJlcn0gW3k9MF0gLSBWZXJ0aWNhbCBjb29yZGluYXRlIG9mIHNvbWUgY29ybmVyIG9mIHRoZSByZWN0LlxuICogQHBhcmFtIHtudW1iZXJ9IFt3aWR0aD0wXSAtIFdpZHRoIG9mIHRoZSBuZXcgcmVjdC4gTWF5IGJlIG5lZ2F0aXZlIChzZWUgYWJvdmUpLlxuICogQHBhcmFtIHtudW1iZXJ9IFtoZWlnaHQ9MF0gLSBIZWlnaHQgb2YgdGhlIG5ldyByZWN0LiBNYXkgYmUgbmVnYXRpdmUgKHNlZSBhYm92ZSkuXG4gKi9cbmZ1bmN0aW9uIFJlY3RhbmdsZSh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XG5cbiAgICB4ID0gTnVtYmVyKHgpIHx8IDA7XG4gICAgeSA9IE51bWJlcih5KSB8fCAwO1xuICAgIHdpZHRoID0gTnVtYmVyKHdpZHRoKSB8fCAwO1xuICAgIGhlaWdodCA9IE51bWJlcihoZWlnaHQpIHx8IDA7XG5cbiAgICBpZiAod2lkdGggPCAwKSB7XG4gICAgICAgIHggKz0gd2lkdGg7XG4gICAgICAgIHdpZHRoID0gLXdpZHRoO1xuICAgIH1cblxuICAgIGlmIChoZWlnaHQgPCAwKSB7XG4gICAgICAgIHkgKz0gaGVpZ2h0O1xuICAgICAgICBoZWlnaHQgPSAtaGVpZ2h0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBuYW1lIG9yaWdpblxuICAgICAqIEB0eXBlIHtQb2ludH1cbiAgICAgKiBAc3VtbWFyeSBVcHBlciBsZWZ0IGNvcm5lciBvZiB0aGlzIHJlY3QuXG4gICAgICogQGRlc2MgQ3JlYXRlZCB1cG9uIGluc3RhbnRpYXRpb24gYnkgdGhlIHtAbGlua3BsYWluIFJlY3RhbmdsZXxjb25zdHJ1Y3Rvcn0uXG4gICAgICogQG1lbWJlck9mIFJlY3RhbmdsZS5wcm90b3R5cGVcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKi9cbiAgICBhZGRSZWFkT25seVByb3BlcnR5LmNhbGwodGhpcywgJ29yaWdpbicsIG5ldyBQb2ludCh4LCB5KSk7XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSBleHRlbnRcbiAgICAgKiBAdHlwZSB7UG9pbnR9XG4gICAgICogQHN1bW1hcnkgdGhpcyByZWN0J3Mgd2lkdGggYW5kIGhlaWdodC5cbiAgICAgKiBAZGVzYyBVbmxpa2UgdGhlIG90aGVyIGBQb2ludGAgcHJvcGVydGllcywgYGV4dGVudGAgaXMgbm90IGEgZ2xvYmFsIGNvb3JkaW5hdGUgcGFpcjsgcmF0aGVyIGl0IGNvbnNpc3RzIG9mIGEgX3dpZHRoXyAoYHhgLCBhbHdheXMgcG9zaXRpdmUpIGFuZCBhIF9oZWlnaHRfIChgeWAsIGFsd2F5cyBwb3NpdGl2ZSkuXG4gICAgICpcbiAgICAgKiBUaGlzIG9iamVjdCBtaWdodCBiZSBtb3JlIGxlZ2l0aW1hdGVseSB0eXBlZCBhcyBzb21ldGhpbmcgbGlrZSBgQXJlYWAgd2l0aCBwcm9wZXJ0aWVzIGB3aWR0aGAgYW5kIGBoZWlnaHRgOyBob3dldmVyIHdlIHdhbnRlZCBpdCB0byBiZSBhYmxlIHRvIHVzZSBpdCBlZmZpY2llbnRseSB3aXRoIGEgcG9pbnQncyBgcGx1c2AgYW5kIGBtaW51c2AgbWV0aG9kcyAodGhhdCBpcywgd2l0aG91dCB0aG9zZSBtZXRob2RzIGhhdmluZyB0byBjaGVjayBhbmQgYnJhbmNoIG9uIHRoZSB0eXBlIG9mIGl0cyBwYXJhbWV0ZXIpLlxuICAgICAqXG4gICAgICogQ3JlYXRlZCB1cG9uIGluc3RhbnRpYXRpb24gYnkgdGhlIHtAbGlua3BsYWluIFJlY3RhbmdsZXxjb25zdHJ1Y3Rvcn0uXG4gICAgICogQHNlZSBUaGUge0BsaW5rIFJlY3RhbmdsZSNjb3JuZXJ8Y29ybmVyfSBtZXRob2QuXG4gICAgICogQG1lbWJlck9mIFJlY3RhbmdsZS5wcm90b3R5cGVcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKi9cbiAgICBhZGRSZWFkT25seVByb3BlcnR5LmNhbGwodGhpcywgJ2V4dGVudCcsIG5ldyBQb2ludCh3aWR0aCwgaGVpZ2h0KSk7XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSBjb3JuZXJcbiAgICAgKiBAdHlwZSB7UG9pbnR9XG4gICAgICogQHN1bW1hcnkgTG93ZXIgcmlnaHQgY29ybmVyIG9mIHRoaXMgcmVjdC5cbiAgICAgKiBAZGVzYyBUaGlzIGlzIGEgY2FsY3VsYXRlZCB2YWx1ZSBjcmVhdGVkIHVwb24gaW5zdGFudGlhdGlvbiBieSB0aGUge0BsaW5rcGxhaW4gUmVjdGFuZ2xlfGNvbnN0cnVjdG9yfS4gSXQgaXMgYG9yaWdpbmAgb2Zmc2V0IGJ5IGBleHRlbnRgLlxuICAgICAqXG4gICAgICogKipOb3RlOioqIFRoZXNlIGNvb3JkaW5hdGVzIGFjdHVhbGx5IHBvaW50IHRvIHRoZSBwaXhlbCBvbmUgYmVsb3cgYW5kIG9uZSB0byB0aGUgcmlnaHQgb2YgdGhlIHJlY3QncyBhY3R1YWwgbG93ZXIgcmlnaHQgcGl4ZWwuXG4gICAgICogQG1lbWJlck9mIFJlY3RhbmdsZS5wcm90b3R5cGVcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKi9cbiAgICBhZGRSZWFkT25seVByb3BlcnR5LmNhbGwodGhpcywgJ2Nvcm5lcicsIG5ldyBQb2ludCh4ICsgd2lkdGgsIHkgKyBoZWlnaHQpKTtcblxuICAgIC8qKlxuICAgICAqIEBuYW1lIGNlbnRlclxuICAgICAqIEB0eXBlIHtQb2ludH1cbiAgICAgKiBAc3VtbWFyeSBDZW50ZXIgb2YgdGhpcyByZWN0LlxuICAgICAqIEBkZXNjIENyZWF0ZWQgdXBvbiBpbnN0YW50aWF0aW9uIGJ5IHRoZSB7QGxpbmtwbGFpbiBSZWN0YW5nbGV8Y29uc3RydWN0b3J9LlxuICAgICAqIEBtZW1iZXJPZiBSZWN0YW5nbGUucHJvdG90eXBlXG4gICAgICogQGFic3RyYWN0XG4gICAgICovXG4gICAgYWRkUmVhZE9ubHlQcm9wZXJ0eS5jYWxsKHRoaXMsICdjZW50ZXInLCBuZXcgUG9pbnQoeCArICh3aWR0aCAvIDIpLCB5ICsgKGhlaWdodCAvIDIpKSk7XG5cbn1cblxuUmVjdGFuZ2xlLnByb3RvdHlwZSA9IHtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQGRlc2MgXyhGb3JtZXJseSBhIGZ1bmN0aW9uOyBub3cgYSBnZXR0ZXIuKV9cbiAgICAgKiBAc3VtbWFyeSBNaW5pbXVtIHZlcnRpY2FsIGNvb3JkaW5hdGUgb2YgdGhpcyByZWN0LlxuICAgICAqIEBtZW1iZXJPZiBSZWN0YW5nbGUucHJvdG90eXBlXG4gICAgICovXG4gICAgZ2V0IHRvcCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3JpZ2luLnk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQGRlc2MgXyhGb3JtZXJseSBhIGZ1bmN0aW9uOyBub3cgYSBnZXR0ZXIuKV9cbiAgICAgKiBAc3VtbWFyeSBNaW5pbXVtIGhvcml6b250YWwgY29vcmRpbmF0ZSBvZiB0aGlzIHJlY3QuXG4gICAgICogQG1lbWJlck9mIFJlY3RhbmdsZS5wcm90b3R5cGVcbiAgICAgKi9cbiAgICBnZXQgbGVmdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3JpZ2luLng7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQGRlc2MgXyhGb3JtZXJseSBhIGZ1bmN0aW9uOyBub3cgYSBnZXR0ZXIuKV9cbiAgICAgKiBAc3VtbWFyeSBNYXhpbXVtIHZlcnRpY2FsIGNvb3JkaW5hdGUgb2YgdGhpcyByZWN0ICsgMS5cbiAgICAgKiBAbWVtYmVyT2YgUmVjdGFuZ2xlLnByb3RvdHlwZVxuICAgICAqL1xuICAgIGdldCBib3R0b20oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvcm5lci55O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqIEBkZXNjIF8oRm9ybWVybHkgYSBmdW5jdGlvbjsgbm93IGEgZ2V0dGVyLilfXG4gICAgICogQHN1bW1hcnkgTWF4aW11bSBob3Jpem9udGFsIGNvb3JkaW5hdGUgb2YgdGhpcyByZWN0ICsgMS5cbiAgICAgKiBAbWVtYmVyT2YgUmVjdGFuZ2xlLnByb3RvdHlwZVxuICAgICAqL1xuICAgIGdldCByaWdodCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29ybmVyLng7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQGRlc2MgXyhGb3JtZXJseSBhIGZ1bmN0aW9uOyBub3cgYSBnZXR0ZXIuKV9cbiAgICAgKiBAc3VtbWFyeSBXaWR0aCBvZiB0aGlzIHJlY3QgKGFsd2F5cyBwb3NpdGl2ZSkuXG4gICAgICogQG1lbWJlck9mIFJlY3RhbmdsZS5wcm90b3R5cGVcbiAgICAgKi9cbiAgICBnZXQgd2lkdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV4dGVudC54O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqIEBkZXNjIF8oRm9ybWVybHkgYSBmdW5jdGlvbjsgbm93IGEgZ2V0dGVyLilfXG4gICAgICogQHN1bW1hcnkgSGVpZ2h0IG9mIHRoaXMgcmVjdCAoYWx3YXlzIHBvc2l0aXZlKS5cbiAgICAgKiBAbWVtYmVyT2YgUmVjdGFuZ2xlLnByb3RvdHlwZVxuICAgICAqL1xuICAgIGdldCBoZWlnaHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV4dGVudC55O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqIEBkZXNjIF8oRm9ybWVybHkgYSBmdW5jdGlvbjsgbm93IGEgZ2V0dGVyLilfXG4gICAgICogQHN1bW1hcnkgQXJlYSBvZiB0aGlzIHJlY3QuXG4gICAgICogQG1lbWJlck9mIFJlY3RhbmdsZS5wcm90b3R5cGVcbiAgICAgKi9cbiAgICBnZXQgYXJlYSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2lkdGggKiB0aGlzLmhlaWdodDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge1JlY3RhbmdsZX0gQSBjb3B5IG9mIHRoaXMgcmVjdCBidXQgd2l0aCBob3Jpem9udGFsIHBvc2l0aW9uIHJlc2V0IHRvIGdpdmVuIGB4YCBhbmQgbm8gd2lkdGguXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHggLSBIb3Jpem9udGFsIGNvb3JkaW5hdGUgb2YgdGhlIG5ldyByZWN0LlxuICAgICAqIEBtZW1iZXJPZiBSZWN0YW5nbGUucHJvdG90eXBlXG4gICAgICovXG4gICAgZmxhdHRlblhBdDogZnVuY3Rpb24oeCkge1xuICAgICAgICByZXR1cm4gbmV3IFJlY3RhbmdsZSh4LCB0aGlzLm9yaWdpbi55LCAwLCB0aGlzLmV4dGVudC55KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge1JlY3RhbmdsZX0gQSBjb3B5IG9mIHRoaXMgcmVjdCBidXQgd2l0aCB2ZXJ0aWNhbCBwb3NpdGlvbiByZXNldCB0byBnaXZlbiBgeWAgYW5kIG5vIGhlaWdodC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0geSAtIFZlcnRpY2FsIGNvb3JkaW5hdGUgb2YgdGhlIG5ldyByZWN0LlxuICAgICAqIEBtZW1iZXJPZiBSZWN0YW5nbGUucHJvdG90eXBlXG4gICAgICovXG4gICAgZmxhdHRlbllBdDogZnVuY3Rpb24oeSkge1xuICAgICAgICByZXR1cm4gbmV3IFJlY3RhbmdsZSh0aGlzLm9yaWdpbi54LCB5LCB0aGlzLmV4dGVudC54LCAwKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZmYgZ2l2ZW4gYHBvaW50YCBlbnRpcmVseSBjb250YWluZWQgd2l0aGluIHRoaXMgcmVjdC5cbiAgICAgKiBAcGFyYW0ge1BvaW50fSBwb2ludE9yUmVjdCAtIFRoZSBwb2ludCBvciByZWN0IHRvIHRlc3QgZm9yIGNvbnRhaW5tZW50LlxuICAgICAqIEBtZW1iZXJPZiBSZWN0YW5nbGUucHJvdG90eXBlXG4gICAgICovXG4gICAgY29udGFpbnM6IGZ1bmN0aW9uKHBvaW50T3JSZWN0KSB7XG4gICAgICAgIHJldHVybiBwb2ludE9yUmVjdC53aXRoaW4odGhpcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIF8oRm9ybWVybHkgYGlzQ29udGFpbmVkV2l0aGluUmVjdGFuZ2xlYC4pX1xuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWZmIGB0aGlzYCByZWN0IGlzIGVudGlyZWx5IGNvbnRhaW5lZCB3aXRoaW4gZ2l2ZW4gYHJlY3RgLlxuICAgICAqIEBwYXJhbSB7UmVjdGFuZ2xlfSByZWN0IC0gUmVjdGFuZ2xlIHRvIHRlc3QgYWdhaW5zdCB0aGlzIHJlY3QuXG4gICAgICogQG1lbWJlck9mIFJlY3RhbmdsZS5wcm90b3R5cGVcbiAgICAgKi9cbiAgICB3aXRoaW46IGZ1bmN0aW9uKHJlY3QpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHJlY3Qub3JpZ2luLmxlc3NUaGFuT3JFcXVhbFRvKHRoaXMub3JpZ2luKSAmJlxuICAgICAgICAgICAgcmVjdC5jb3JuZXIuZ3JlYXRlclRoYW5PckVxdWFsVG8odGhpcy5jb3JuZXIpXG4gICAgICAgICk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIF8oRm9ybWVybHk6IGBpbnNldEJ5YC4pX1xuICAgICAqIEByZXR1cm5zIHtSZWN0YW5nbGV9IFRoYXQgaXMgZW5sYXJnZWQvc2hydW5rIGJ5IGdpdmVuIGBwYWRkaW5nYC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcGFkZGluZyAtIEFtb3VudCBieSB3aGljaCB0byBpbmNyZWFzZSAoKykgb3IgZGVjcmVhc2UgKC0pIHRoaXMgcmVjdFxuICAgICAqIEBzZWUgVGhlIHtAbGluayBSZWN0YW5nbGUjc2hyaW5rQnl8c2hyaW5rQnl9IG1ldGhvZC5cbiAgICAgKiBAbWVtYmVyT2YgUmVjdGFuZ2xlLnByb3RvdHlwZVxuICAgICAqL1xuICAgIGdyb3dCeTogZnVuY3Rpb24ocGFkZGluZykge1xuICAgICAgICByZXR1cm4gbmV3IFJlY3RhbmdsZShcbiAgICAgICAgICAgIHRoaXMub3JpZ2luLnggKyBwYWRkaW5nLFxuICAgICAgICAgICAgdGhpcy5vcmlnaW4ueSArIHBhZGRpbmcsXG4gICAgICAgICAgICB0aGlzLmV4dGVudC54IC0gcGFkZGluZyAtIHBhZGRpbmcsXG4gICAgICAgICAgICB0aGlzLmV4dGVudC55IC0gcGFkZGluZyAtIHBhZGRpbmcpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7UmVjdGFuZ2xlfSBUaGF0IGlzIGVubGFyZ2VkL3NocnVuayBieSBnaXZlbiBgcGFkZGluZ2AuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHBhZGRpbmcgLSBBbW91bnQgYnkgd2hpY2ggdG8gZGVjcmVhc2UgKCspIG9yIGluY3JlYXNlICgtKSB0aGlzIHJlY3QuXG4gICAgICogQHNlZSBUaGUge0BsaW5rIFJlY3RhbmdsZSNncm93Qnl8Z3Jvd0J5fSBtZXRob2QuXG4gICAgICogQG1lbWJlck9mIFJlY3RhbmdsZS5wcm90b3R5cGVcbiAgICAgKi9cbiAgICBzaHJpbmtCeTogZnVuY3Rpb24ocGFkZGluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5ncm93QnkoLXBhZGRpbmcpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7UmVjdGFuZ2xlfSBCb3VuZGluZyByZWN0IHRoYXQgY29udGFpbnMgYm90aCB0aGlzIHJlY3QgYW5kIHRoZSBnaXZlbiBgcmVjdGAuXG4gICAgICogQHBhcmFtIHtSZWN0YW5nbGV9IHJlY3QgLSBUaGUgcmVjdGFuZ2xlIHRvIHVuaW9uIHdpdGggdGhpcyByZWN0LlxuICAgICAqIEBtZW1iZXJPZiBSZWN0YW5nbGUucHJvdG90eXBlXG4gICAgICovXG4gICAgdW5pb246IGZ1bmN0aW9uKHJlY3QpIHtcbiAgICAgICAgdmFyIG9yaWdpbiA9IHRoaXMub3JpZ2luLm1pbihyZWN0Lm9yaWdpbiksXG4gICAgICAgICAgICBjb3JuZXIgPSB0aGlzLmNvcm5lci5tYXgocmVjdC5jb3JuZXIpLFxuICAgICAgICAgICAgZXh0ZW50ID0gY29ybmVyLm1pbnVzKG9yaWdpbik7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBSZWN0YW5nbGUoXG4gICAgICAgICAgICBvcmlnaW4ueCwgb3JpZ2luLnksXG4gICAgICAgICAgICBleHRlbnQueCwgZXh0ZW50LnlcbiAgICAgICAgKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogaXRlcmF0ZSBvdmVyIGFsbCBwb2ludHMgd2l0aGluIHRoaXMgcmVjdCwgaW52b2tpbmcgYGl0ZXJhdGVlYCBmb3IgZWFjaC5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKG51bWJlcixudW1iZXIpfSBpdGVyYXRlZSAtIEZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggcG9pbnQuXG4gICAgICogQm91bmQgdG8gYGNvbnRleHRgIHdoZW4gZ2l2ZW47IG90aGVyd2lzZSBpdCBpcyBib3VuZCB0byB0aGlzIHJlY3QuXG4gICAgICogRWFjaCBpbnZvY2F0aW9uIG9mIGBpdGVyYXRlZWAgaXMgY2FsbGVkIHdpdGggdHdvIGFyZ3VtZW50czpcbiAgICAgKiB0aGUgaG9yaXpvbnRhbCBhbmQgdmVydGljYWwgY29vcmRpbmF0ZXMgb2YgdGhlIHBvaW50LlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbY29udGV4dD10aGlzXSAtIENvbnRleHQgdG8gYmluZCB0byBgaXRlcmF0ZWVgICh3aGVuIG5vdCBgdGhpc2ApLlxuICAgICAqIEBtZW1iZXJPZiBSZWN0YW5nbGUucHJvdG90eXBlXG4gICAgICovXG4gICAgZm9yRWFjaDogZnVuY3Rpb24oaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICAgICAgY29udGV4dCA9IGNvbnRleHQgfHwgdGhpcztcbiAgICAgICAgZm9yICh2YXIgeCA9IHRoaXMub3JpZ2luLngsIHgyID0gdGhpcy5jb3JuZXIueDsgeCA8IHgyOyB4KyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIHkgPSB0aGlzLm9yaWdpbi55LCB5MiA9IHRoaXMuY29ybmVyLnk7IHkgPCB5MjsgeSsrKSB7XG4gICAgICAgICAgICAgICAgaXRlcmF0ZWUuY2FsbChjb250ZXh0LCB4LCB5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7UmVjdGFuZ2xlfSBPbmUgb2Y6XG4gICAgICogKiBfSWYgdGhpcyByZWN0IGludGVyc2VjdHMgd2l0aCB0aGUgZ2l2ZW4gYHJlY3RgOl9cbiAgICAgKiAgICAgIGEgbmV3IHJlY3QgcmVwcmVzZW50aW5nIHRoYXQgaW50ZXJzZWN0aW9uLlxuICAgICAqICogX0lmIGl0IGRvZXNuJ3QgaW50ZXJzZWN0IGFuZCBgaWZOb25lQWN0aW9uYCBkZWZpbmVkOl9cbiAgICAgKiAgICAgIHJlc3VsdCBvZiBjYWxsaW5nIGBpZk5vbmVBY3Rpb25gLlxuICAgICAqICogX0lmIGl0IGRvZXNuJ3QgaW50ZXJzZWN0IGFuZCBgaWZOb25lQWN0aW9uYCB1bmRlZmluZWQ6X1xuICAgICAqICAgICAgYG51bGxgLlxuICAgICAqIEBwYXJhbSB7UmVjdGFuZ2xlfSByZWN0IC0gVGhlIHJlY3RhbmdsZSB0byBpbnRlcnNlY3Qgd2l0aCB0aGlzIHJlY3QuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihSZWN0YW5nbGUpfSBbaWZOb25lQWN0aW9uXSAtIFdoZW4gbm8gaW50ZXJzZWN0aW9uLCBpbnZva2UgYW5kIHJldHVybiByZXN1bHQuXG4gICAgICogQm91bmQgdG8gYGNvbnRleHRgIHdoZW4gZ2l2ZW47IG90aGVyd2lzZSBib3VuZCB0byB0aGlzIHJlY3QuXG4gICAgICogSW52b2tlZCB3aXRoIGByZWN0YCBhcyBzb2xlIHBhcmFtZXRlci5cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW2NvbnRleHQ9dGhpc10gLSBDb250ZXh0IHRvIGJpbmQgdG8gYGlmTm9uZUFjdGlvbmAgKHdoZW4gbm90IGB0aGlzYCkuXG4gICAgICogQG1lbWJlck9mIFJlY3RhbmdsZS5wcm90b3R5cGVcbiAgICAgKi9cbiAgICBpbnRlcnNlY3Q6IGZ1bmN0aW9uKHJlY3QsIGlmTm9uZUFjdGlvbiwgY29udGV4dCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gbnVsbCxcbiAgICAgICAgICAgIG9yaWdpbiA9IHRoaXMub3JpZ2luLm1heChyZWN0Lm9yaWdpbiksXG4gICAgICAgICAgICBjb3JuZXIgPSB0aGlzLmNvcm5lci5taW4ocmVjdC5jb3JuZXIpLFxuICAgICAgICAgICAgZXh0ZW50ID0gY29ybmVyLm1pbnVzKG9yaWdpbik7XG5cbiAgICAgICAgaWYgKGV4dGVudC54ID4gMCAmJiBleHRlbnQueSA+IDApIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IG5ldyBSZWN0YW5nbGUoXG4gICAgICAgICAgICAgICAgb3JpZ2luLngsIG9yaWdpbi55LFxuICAgICAgICAgICAgICAgIGV4dGVudC54LCBleHRlbnQueVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaWZOb25lQWN0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBpZk5vbmVBY3Rpb24uY2FsbChjb250ZXh0IHx8IHRoaXMsIHJlY3QpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZmYgdGhpcyByZWN0IG92ZXJsYXBzIHdpdGggZ2l2ZW4gYHJlY3RgLlxuICAgICAqIEBwYXJhbSB7UmVjdGFuZ2xlfSByZWN0IC0gVGhlIHJlY3RhbmdsZSB0byBpbnRlcnNlY3Qgd2l0aCB0aGlzIHJlY3QuXG4gICAgICogQG1lbWJlck9mIFJlY3RhbmdsZS5wcm90b3R5cGVcbiAgICAgKi9cbiAgICBpbnRlcnNlY3RzOiBmdW5jdGlvbihyZWN0KSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICByZWN0LmNvcm5lci54ID4gdGhpcy5vcmlnaW4ueCAmJlxuICAgICAgICAgICAgcmVjdC5jb3JuZXIueSA+IHRoaXMub3JpZ2luLnkgJiZcbiAgICAgICAgICAgIHJlY3Qub3JpZ2luLnggPCB0aGlzLmNvcm5lci54ICYmXG4gICAgICAgICAgICByZWN0Lm9yaWdpbi55IDwgdGhpcy5jb3JuZXIueVxuICAgICAgICApO1xuICAgIH1cbn07XG5cbi8vIEludGVyZmFjZVxuZXhwb3J0cy5Qb2ludCA9IFBvaW50O1xuZXhwb3J0cy5SZWN0YW5nbGUgPSBSZWN0YW5nbGU7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qIGVzbGludC1lbnYgbm9kZSwgYnJvd3NlciAqL1xuXG5pZiAoIXdpbmRvdy5maW4pIHtcbiAgICB3aW5kb3cuZmluID0ge307XG59XG5cbmlmICghd2luZG93LmZpbi5DYW52YXMpIHtcbiAgICB3aW5kb3cuZmluLkNhbnZhcyA9IHJlcXVpcmUoJy4vJyk7XG59XG4iLCIvKiBlc2xpbnQtZW52IGJyb3dzZXIgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVjdGFuZ3VsYXIgPSByZXF1aXJlKCdyZWN0YW5ndWxhcicpO1xuXG52YXIgZ2VzdHVyZXMgPSByZXF1aXJlKCcuL2pzL3BvbHltZXJnZXN0dXJlcy5kZXYuanMnKTtcbnZhciBHcmFwaGljc0NvbnRleHQgPSByZXF1aXJlKCcuL2pzL0dyYXBoaWNzQ29udGV4dC5qcycpO1xuXG52YXIgUkVTSVpFX1BPTExJTkdfSU5URVJWQUwgPSAyMDAsXG4gICAgcGFpbnRhYmxlcyA9IFtdLFxuICAgIHJlc2l6YWJsZXMgPSBbXSxcbiAgICBwYWludExvb3BSdW5uaW5nID0gdHJ1ZSxcbiAgICByZXNpemVMb29wUnVubmluZyA9IHRydWUsXG4gICAgY2hhck1hcCA9IG1ha2VDaGFyTWFwKCk7XG5cbmZ1bmN0aW9uIENhbnZhcyhkaXYsIGNvbXBvbmVudCwgb3B0aW9ucykge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHRoaXMuZGl2ID0gZGl2O1xuICAgIHRoaXMuY29tcG9uZW50ID0gY29tcG9uZW50O1xuXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdGhpcy5kb3VibGVDbGlja0RlbGF5ID0gb3B0aW9ucy5kb3VibGVDbGlja0RlbGF5IHx8IDMyNTtcblxuICAgIHRoaXMuZHJhZ0VuZHRpbWUgPSBEYXRlLm5vdygpO1xuXG4gICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICB0aGlzLmRpdi5hcHBlbmRDaGlsZCh0aGlzLmNhbnZhcyk7XG5cbiAgICB0aGlzLmNhbnZhcy5zdHlsZS5vdXRsaW5lID0gJ25vbmUnO1xuXG4gICAgLy8gdGhpcy5mb2N1c2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgLy8gdGhpcy5mb2N1c2VyLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAvLyB0aGlzLmZvY3VzZXIuc3R5bGUudG9wID0gJzBweCc7XG4gICAgLy8gdGhpcy5mb2N1c2VyLnN0eWxlLmxlZnQgPSAnMHB4JztcbiAgICAvLyB0aGlzLmZvY3VzZXIuc3R5bGUuekluZGV4ID0gJy0xJztcbiAgICAvLyB0aGlzLmZvY3VzZXIuc3R5bGUub3V0bGluZSA9ICdub25lJztcbiAgICAvLyB0aGlzLmRpdi5hcHBlbmRDaGlsZCh0aGlzLmZvY3VzZXIpO1xuXG4gICAgdGhpcy5jYW52YXNDVFggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHRoaXMuZ2MgPSBuZXcgR3JhcGhpY3NDb250ZXh0KHRoaXMuY2FudmFzQ1RYKTtcblxuICAgIHRoaXMuYnVmZmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgdGhpcy5idWZmZXJDVFggPSB0aGlzLmJ1ZmZlci5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHRoaXMuYnVmZmVyR0MgPSBuZXcgR3JhcGhpY3NDb250ZXh0KHRoaXMuYnVmZmVyQ1RYKTtcblxuICAgIHRoaXMubW91c2VMb2NhdGlvbiA9IG5ldyByZWN0YW5ndWxhci5Qb2ludCgtMSwgLTEpO1xuICAgIHRoaXMuZHJhZ3N0YXJ0ID0gbmV3IHJlY3Rhbmd1bGFyLlBvaW50KC0xLCAtMSk7XG4gICAgLy90aGlzLm9yaWdpbiA9IG5ldyByZWN0YW5ndWxhci5Qb2ludCgwLCAwKTtcbiAgICB0aGlzLmJvdW5kcyA9IG5ldyByZWN0YW5ndWxhci5SZWN0YW5nbGUoMCwgMCwgMCwgMCk7XG4gICAgdGhpcy5oYXNNb3VzZSA9IGZhbHNlO1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoc2VsZi5oYXNNb3VzZSB8fCBzZWxmLmlzRHJhZ2dpbmcoKSkge1xuICAgICAgICAgICAgc2VsZi5maW5tb3VzZW1vdmUoZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBzZWxmLmZpbm1vdXNldXAoZSk7XG4gICAgfSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHNlbGYuZmlud2hlZWxtb3ZlZChlKTtcbiAgICB9KTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBzZWxmLmZpbmtleWRvd24oZSk7XG4gICAgfSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHNlbGYuZmlua2V5dXAoZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmNhbnZhcy5vbm1vdXNlb3ZlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBzZWxmLmhhc01vdXNlID0gdHJ1ZTtcbiAgICB9O1xuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBzZWxmLmZpbmZvY3VzZ2FpbmVkKGUpO1xuICAgIH0pO1xuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHNlbGYuZmluZm9jdXNsb3N0KGUpO1xuICAgIH0pO1xuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgc2VsZi5maW5tb3VzZWRvd24oZSk7XG4gICAgfSk7XG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHNlbGYuaGFzTW91c2UgPSBmYWxzZTtcbiAgICAgICAgc2VsZi5maW5tb3VzZW91dChlKTtcbiAgICB9KTtcbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgc2VsZi5maW5jbGljayhlKTtcbiAgICB9KTtcbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgc2VsZi5maW5jb250ZXh0bWVudShlKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICBnZXN0dXJlcy5hZGRFdmVudExpc3RlbmVyKHRoaXMuY2FudmFzLCAndGFwJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBzZWxmLmZpbnRhcChlKTtcbiAgICB9KTtcbiAgICBnZXN0dXJlcy5hZGRFdmVudExpc3RlbmVyKHRoaXMuY2FudmFzLCAnaG9sZHB1bHNlJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBzZWxmLmZpbmhvbGRwdWxzZShlKTtcbiAgICB9KTtcbiAgICBnZXN0dXJlcy5hZGRFdmVudExpc3RlbmVyKHRoaXMuY2FudmFzLCAnZmxpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHNlbGYuZmluZmxpY2soZSk7XG4gICAgfSk7XG4gICAgZ2VzdHVyZXMuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmNhbnZhcywgJ3JlbGVhc2UnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHNlbGYuZmlucmVsZWFzZShlKTtcbiAgICB9KTtcbiAgICBnZXN0dXJlcy5hZGRFdmVudExpc3RlbmVyKHRoaXMuY2FudmFzLCAndHJhY2tzdGFydCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgc2VsZi5maW50cmFja3N0YXJ0KGUpO1xuICAgIH0pO1xuICAgIGdlc3R1cmVzLmFkZEV2ZW50TGlzdGVuZXIodGhpcy5jYW52YXMsICd0cmFjaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgc2VsZi5maW50cmFjayhlKTtcbiAgICB9KTtcbiAgICBnZXN0dXJlcy5hZGRFdmVudExpc3RlbmVyKHRoaXMuY2FudmFzLCAndHJhY2tlbmQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHNlbGYuZmludHJhY2tlbmQoZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmNhbnZhcy5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgMCk7XG4gICAgdGhpcy5jYW52YXMuY29udGVudEVkaXRhYmxlID0gdHJ1ZTtcblxuICAgIHRoaXMucmVzaXplKCk7XG5cbiAgICB0aGlzLmJlZ2luUmVzaXppbmcoKTtcbiAgICB0aGlzLmJlZ2luUGFpbnRpbmcoKTtcbn1cblxuQ2FudmFzLnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ2FudmFzLnByb3RvdHlwZS5jb25zdHJ1Y3RvcixcbiAgICBkaXY6IG51bGwsXG4gICAgY29tcG9uZW50OiBudWxsLFxuICAgIGdlc3R1cmVzOiBnZXN0dXJlcywgLy8gVE9ETzogd2h5IGRvIHdlIG5lZWQgdGhpcz8gKHdhcyBwcmV2aW91c2x5IGF0IGJvdHRvbSBvZiBmaWxlKVxuICAgIGNhbnZhczogbnVsbCxcbiAgICBjYW52YXNDVFg6IG51bGwsXG4gICAgZm9jdXNlcjogbnVsbCxcbiAgICBidWZmZXI6IG51bGwsXG4gICAgY3R4OiBudWxsLFxuICAgIG1vdXNlTG9jYXRpb246IG51bGwsXG4gICAgaG9sZFB1bHNlQ291bnQ6IC0xLFxuICAgIGRyYWdzdGFydDogbnVsbCxcbiAgICBvcmlnaW46IG51bGwsXG4gICAgYm91bmRzOiBudWxsLFxuICAgIGRpcnR5OiBmYWxzZSxcbiAgICBzaXplOiBudWxsLFxuICAgIG1vdXNlZG93bjogZmFsc2UsXG4gICAgZHJhZ2dpbmc6IGZhbHNlLFxuICAgIHJlcGVhdEtleUNvdW50OiAwLFxuICAgIHJlcGVhdEtleTogbnVsbCxcbiAgICByZXBlYXRLZXlTdGFydFRpbWU6IDAsXG4gICAgY3VycmVudEtleXM6IFtdLFxuICAgIGhhc01vdXNlOiBmYWxzZSxcbiAgICBsYXN0RG91YmxlQ2xpY2tUaW1lOiAwLFxuICAgIGRyYWdFbmRUaW1lOiAwLFxuICAgIGxhc3RSZXBhaW50VGltZTogMCxcblxuICAgIGFkZEV2ZW50TGlzdGVuZXI6IGZ1bmN0aW9uKG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgY2FsbGJhY2spO1xuICAgIH0sXG5cbiAgICBzdG9wUGFpbnRMb29wOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcGFpbnRMb29wUnVubmluZyA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICByZXN0YXJ0UGFpbnRMb29wOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHBhaW50TG9vcFJ1bm5pbmcpIHtcbiAgICAgICAgICAgIHJldHVybjsgLy8gYWxyZWFkeSBydW5uaW5nXG4gICAgICAgIH1cbiAgICAgICAgcGFpbnRMb29wUnVubmluZyA9IHRydWU7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShwYWludExvb3BGdW5jdGlvbik7XG4gICAgfSxcblxuICAgIHN0b3BSZXNpemVMb29wOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVzaXplTG9vcFJ1bm5pbmcgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgcmVzdGFydFJlc2l6ZUxvb3A6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAocmVzaXplTG9vcFJ1bm5pbmcpIHtcbiAgICAgICAgICAgIHJldHVybjsgLy8gYWxyZWFkeSBydW5uaW5nXG4gICAgICAgIH1cbiAgICAgICAgcmVzaXplTG9vcFJ1bm5pbmcgPSB0cnVlO1xuICAgICAgICBzZXRJbnRlcnZhbChyZXNpemFibGVzTG9vcEZ1bmN0aW9uLCAyMDApO1xuICAgIH0sXG5cbiAgICBkZXRhY2hlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc3RvcFBhaW50aW5nKCk7XG4gICAgICAgIHRoaXMuc3RvcFJlc2l6aW5nKCk7XG4gICAgfSxcblxuICAgIHVzZUhpRFBJOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50LnJlc29sdmVQcm9wZXJ0eSgndXNlSGlEUEknKTtcbiAgICB9LFxuXG4gICAgdXNlQml0QmxpdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudC5yZXNvbHZlUHJvcGVydHkoJ3VzZUJpdEJsaXQnKTtcbiAgICB9LFxuXG4gICAgZ2V0RlBTOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGZwcyA9IHRoaXMuY29tcG9uZW50LnJlc29sdmVQcm9wZXJ0eSgncmVwYWludEludGVydmFsUmF0ZScpO1xuICAgICAgICByZXR1cm4gZnBzID8gcGFyc2VJbnQoZnBzKSA6IDA7XG4gICAgfSxcblxuICAgIHRpY2tQYWludDogZnVuY3Rpb24obm93KSB7XG4gICAgICAgIHZhciBmcHMgPSB0aGlzLmdldEZQUygpO1xuICAgICAgICBpZiAoZnBzID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGludGVydmFsID0gMTAwMCAvIGZwcztcblxuICAgICAgICB2YXIgZWxhcHNlZCA9IG5vdyAtIHRoaXMubGFzdFJlcGFpbnRUaW1lO1xuICAgICAgICBpZiAoZWxhcHNlZCA+IGludGVydmFsICYmIHRoaXMuZGlydHkpIHtcbiAgICAgICAgICAgIHRoaXMubGFzdFJlcGFpbnRUaW1lID0gbm93IC0gKGVsYXBzZWQgJSBpbnRlcnZhbCk7XG4gICAgICAgICAgICB0aGlzLnBhaW50Tm93KCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYmVnaW5QYWludGluZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5kaXJ0eSA9IHRydWU7XG4gICAgICAgIHRoaXMudGlja1BhaW50ZXIgPSBmdW5jdGlvbihub3cpIHtcbiAgICAgICAgICAgIHNlbGYudGlja1BhaW50KG5vdyk7XG4gICAgICAgIH07XG4gICAgICAgIHBhaW50YWJsZXMucHVzaCh0aGlzKTtcbiAgICB9LFxuXG4gICAgc3RvcFBhaW50aW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcGFpbnRhYmxlcy5zcGxpY2UocGFpbnRhYmxlcy5pbmRleE9mKHRoaXMpLCAxKTtcbiAgICB9LFxuXG4gICAgYmVnaW5SZXNpemluZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy50aWNrUmVzaXplciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi5jaGVja3NpemUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmVzaXphYmxlcy5wdXNoKHRoaXMpO1xuICAgIH0sXG5cbiAgICBzdG9wUmVzaXppbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXNpemFibGVzLnNwbGljZShyZXNpemFibGVzLmluZGV4T2YodGhpcyksIDEpO1xuICAgIH0sXG5cbiAgICBzdGFydDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuYmVnaW5QYWludGluZygpO1xuICAgICAgICB0aGlzLmJlZ2luUmVzaXppbmcoKTtcbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc3RvcFBhaW50aW5nKCk7XG4gICAgICAgIHRoaXMuc3RvcFJlc2l6aW5nKCk7XG4gICAgfSxcblxuICAgIGNoZWNrc2l6ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vdGhpcyBpcyBleHBlbnNpdmUgbGV0cyBkbyBpdCBhdCBzb21lIG1vZHVsb1xuICAgICAgICB2YXIgc2l6ZU5vdyA9IHRoaXMuZGl2LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBpZiAoc2l6ZU5vdy53aWR0aCAhPT0gdGhpcy5zaXplLndpZHRoIHx8IHNpemVOb3cuaGVpZ2h0ICE9PSB0aGlzLnNpemUuaGVpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnNpemVDaGFuZ2VkTm90aWZpY2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2l6ZUNoYW5nZWROb3RpZmljYXRpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnJlc2l6ZSgpO1xuICAgIH0sXG5cbiAgICBzZXRTaXplQmFzZU9uOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgIHZhciByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB0aGlzLmJ1ZmZlci53aWR0aCA9IHJlY3Qud2lkdGg7XG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHRoaXMuYnVmZmVyLmhlaWdodCA9IHJlY3QuaGVpZ2h0O1xuICAgICAgICByZXR1cm4gcmVjdDtcbiAgICB9LFxuXG4gICAgcmVzaXplOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGJveCA9IHRoaXMuc2l6ZSA9IHRoaXMuc2V0U2l6ZUJhc2VPbih0aGlzLmRpdik7XG5cbiAgICAgICAgLy9maXggYWxhIHNpciBzcGlua2EsIHNlZVxuICAgICAgICAvL2h0dHA6Ly93d3cuaHRtbDVyb2Nrcy5jb20vZW4vdHV0b3JpYWxzL2NhbnZhcy9oaWRwaS9cbiAgICAgICAgLy9qdXN0IGFkZCAnaGRwaScgYXMgYW4gYXR0cmlidXRlIHRvIHRoZSBmaW4tY2FudmFzIHRhZ1xuICAgICAgICB2YXIgcmF0aW8gPSAxO1xuICAgICAgICB2YXIgdXNlQml0QmxpdCA9IHRoaXMudXNlQml0QmxpdCgpO1xuICAgICAgICB2YXIgaXNISURQSSA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvICYmIHRoaXMudXNlSGlEUEkoKTtcbiAgICAgICAgaWYgKGlzSElEUEkpIHtcbiAgICAgICAgICAgIHZhciBkZXZpY2VQaXhlbFJhdGlvID0gd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMTtcbiAgICAgICAgICAgIHZhciBiYWNraW5nU3RvcmVSYXRpbyA9IHRoaXMuY2FudmFzQ1RYLndlYmtpdEJhY2tpbmdTdG9yZVBpeGVsUmF0aW8gfHxcbiAgICAgICAgICAgICAgICB0aGlzLmNhbnZhc0NUWC5tb3pCYWNraW5nU3RvcmVQaXhlbFJhdGlvIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXNDVFgubXNCYWNraW5nU3RvcmVQaXhlbFJhdGlvIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXNDVFgub0JhY2tpbmdTdG9yZVBpeGVsUmF0aW8gfHxcbiAgICAgICAgICAgICAgICB0aGlzLmNhbnZhc0NUWC5iYWNraW5nU3RvcmVQaXhlbFJhdGlvIHx8IDE7XG5cbiAgICAgICAgICAgIHJhdGlvID0gZGV2aWNlUGl4ZWxSYXRpbyAvIGJhY2tpbmdTdG9yZVJhdGlvO1xuICAgICAgICAgICAgLy90aGlzLmNhbnZhc0NUWC5zY2FsZShyYXRpbywgcmF0aW8pO1xuICAgICAgICB9XG4gICAgICAgIHZhciB3aWR0aCA9IHRoaXMuY2FudmFzLmdldEF0dHJpYnV0ZSgnd2lkdGgnKTtcbiAgICAgICAgdmFyIGhlaWdodCA9IHRoaXMuY2FudmFzLmdldEF0dHJpYnV0ZSgnaGVpZ2h0Jyk7XG4gICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gdGhpcy5idWZmZXIud2lkdGggPSB3aWR0aCAqIHJhdGlvO1xuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB0aGlzLmJ1ZmZlci5oZWlnaHQgPSBoZWlnaHQgKiByYXRpbztcblxuICAgICAgICB0aGlzLmNhbnZhcy5zdHlsZS53aWR0aCA9IHRoaXMuYnVmZmVyLnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuICAgICAgICB0aGlzLmNhbnZhcy5zdHlsZS5oZWlnaHQgPSB0aGlzLmJ1ZmZlci5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuXG4gICAgICAgIHRoaXMuYnVmZmVyQ1RYLnNjYWxlKHJhdGlvLCByYXRpbyk7XG4gICAgICAgIGlmIChpc0hJRFBJICYmICF1c2VCaXRCbGl0KSB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhc0NUWC5zY2FsZShyYXRpbywgcmF0aW8pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy90aGlzLm9yaWdpbiA9IG5ldyByZWN0YW5ndWxhci5Qb2ludChNYXRoLnJvdW5kKHRoaXMuc2l6ZS5sZWZ0KSwgTWF0aC5yb3VuZCh0aGlzLnNpemUudG9wKSk7XG4gICAgICAgIHRoaXMuYm91bmRzID0gbmV3IHJlY3Rhbmd1bGFyLlJlY3RhbmdsZSgwLCAwLCBib3gud2lkdGgsIGJveC5oZWlnaHQpO1xuICAgICAgICAvL3NldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjb21wID0gdGhpcy5jb21wb25lbnQ7XG4gICAgICAgIGlmIChjb21wKSB7XG4gICAgICAgICAgICBjb21wLnNldEJvdW5kcyh0aGlzLmJvdW5kcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXNpemVOb3RpZmljYXRpb24oKTtcbiAgICAgICAgdGhpcy5wYWludE5vdygpO1xuICAgICAgICAvL30pO1xuICAgIH0sXG5cbiAgICByZXNpemVOb3RpZmljYXRpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAvL3RvIGJlIG92ZXJyaWRkZW5cbiAgICB9LFxuXG4gICAgZ2V0Qm91bmRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYm91bmRzO1xuICAgIH0sXG5cbiAgICBwYWludE5vdzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICB0aGlzLnNhZmVQYWludEltbWVkaWF0ZWx5KGZ1bmN0aW9uKGdjKSB7XG4gICAgICAgICAgICBzZWxmLnNldFNpemVCYXNlT24oc2VsZi5jYW52YXMpO1xuXG4gICAgICAgICAgICB2YXIgY29tcCA9IHNlbGYuY29tcG9uZW50O1xuICAgICAgICAgICAgaWYgKGNvbXApIHtcbiAgICAgICAgICAgICAgICBjb21wLnBhaW50KGdjKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2VsZi5kaXJ0eSA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgc2FmZVBhaW50SW1tZWRpYXRlbHk6IGZ1bmN0aW9uKHBhaW50RnVuY3Rpb24pIHtcbiAgICAgICAgdmFyIHVzZUJpdEJsaXQgPSB0aGlzLnVzZUJpdEJsaXQoKSxcbiAgICAgICAgICAgIGdjID0gdXNlQml0QmxpdCA/IHRoaXMuYnVmZmVyR0MgOiB0aGlzLmdjO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZ2Muc2F2ZSgpO1xuICAgICAgICAgICAgcGFpbnRGdW5jdGlvbihnYyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICBnYy5yZXN0b3JlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVzZUJpdEJsaXQpIHtcbiAgICAgICAgICAgIHRoaXMuZmx1c2hCdWZmZXIoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBmbHVzaEJ1ZmZlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmJ1ZmZlci53aWR0aCA+IDAgJiYgdGhpcy5idWZmZXIuaGVpZ2h0ID4gMCkge1xuICAgICAgICAgICAgdGhpcy5jYW52YXNDVFguZHJhd0ltYWdlKHRoaXMuYnVmZmVyLCAwLCAwKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBkaXNwYXRjaE5ld0V2ZW50OiBmdW5jdGlvbihldmVudCwgbmFtZSwgZGV0YWlsKSB7XG4gICAgICAgIGRldGFpbCA9IHtcbiAgICAgICAgICAgIGRldGFpbDogZGV0YWlsIHx8IHt9XG4gICAgICAgIH07XG4gICAgICAgIGRldGFpbC5kZXRhaWwucHJpbWl0aXZlRXZlbnQgPSBldmVudDtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FudmFzLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KG5hbWUsIGRldGFpbCkpO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaE5ld01vdXNlS2V5c0V2ZW50OiBmdW5jdGlvbihldmVudCwgbmFtZSwgZGV0YWlsKSB7XG4gICAgICAgIGRldGFpbCA9IGRldGFpbCB8fCB7fTtcbiAgICAgICAgZGV0YWlsLm1vdXNlID0gdGhpcy5tb3VzZUxvY2F0aW9uO1xuICAgICAgICBkZXRhaWwua2V5cyA9IHRoaXMuY3VycmVudEtleXM7XG4gICAgICAgIHJldHVybiB0aGlzLmRpc3BhdGNoTmV3RXZlbnQoZXZlbnQsIG5hbWUsIGRldGFpbCk7XG4gICAgfSxcblxuICAgIGZpbm1vdXNlbW92ZTogZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNEcmFnZ2luZygpICYmIHRoaXMubW91c2Vkb3duKSB7XG4gICAgICAgICAgICB0aGlzLmJlRHJhZ2dpbmcoKTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hOZXdNb3VzZUtleXNFdmVudChlLCAnZmluLWNhbnZhcy1kcmFnc3RhcnQnLCB7XG4gICAgICAgICAgICAgICAgaXNSaWdodENsaWNrOiB0aGlzLmlzUmlnaHRDbGljayhlKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmRyYWdzdGFydCA9IG5ldyByZWN0YW5ndWxhci5Qb2ludCh0aGlzLm1vdXNlTG9jYXRpb24ueCwgdGhpcy5tb3VzZUxvY2F0aW9uLnkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubW91c2VMb2NhdGlvbiA9IHRoaXMuZ2V0TG9jYWwoZSk7XG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5tb3VzZUxvY2F0aW9uKTtcbiAgICAgICAgaWYgKHRoaXMuaXNEcmFnZ2luZygpKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoTmV3TW91c2VLZXlzRXZlbnQoZSwgJ2Zpbi1jYW52YXMtZHJhZycsIHtcbiAgICAgICAgICAgICAgICBkcmFnc3RhcnQ6IHRoaXMuZHJhZ3N0YXJ0LFxuICAgICAgICAgICAgICAgIGlzUmlnaHRDbGljazogdGhpcy5pc1JpZ2h0Q2xpY2soZSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmJvdW5kcy5jb250YWlucyh0aGlzLm1vdXNlTG9jYXRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoTmV3TW91c2VLZXlzRXZlbnQoZSwgJ2Zpbi1jYW52YXMtbW91c2Vtb3ZlJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZmlubW91c2Vkb3duOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIHRoaXMubW91c2VMb2NhdGlvbiA9IHRoaXMubW91c2VEb3duTG9jYXRpb24gPSB0aGlzLmdldExvY2FsKGUpO1xuICAgICAgICB0aGlzLm1vdXNlZG93biA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5kaXNwYXRjaE5ld01vdXNlS2V5c0V2ZW50KGUsICdmaW4tY2FudmFzLW1vdXNlZG93bicsIHtcbiAgICAgICAgICAgIGlzUmlnaHRDbGljazogdGhpcy5pc1JpZ2h0Q2xpY2soZSlcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudGFrZUZvY3VzKCk7XG4gICAgfSxcblxuICAgIGZpbm1vdXNldXA6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEcmFnZ2luZygpKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoTmV3TW91c2VLZXlzRXZlbnQoZSwgJ2Zpbi1jYW52YXMtZHJhZ2VuZCcsIHtcbiAgICAgICAgICAgICAgICBkcmFnc3RhcnQ6IHRoaXMuZHJhZ3N0YXJ0LFxuICAgICAgICAgICAgICAgIGlzUmlnaHRDbGljazogdGhpcy5pc1JpZ2h0Q2xpY2soZSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5iZU5vdERyYWdnaW5nKCk7XG4gICAgICAgICAgICB0aGlzLmRyYWdFbmR0aW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1vdXNlZG93biA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRpc3BhdGNoTmV3TW91c2VLZXlzRXZlbnQoZSwgJ2Zpbi1jYW52YXMtbW91c2V1cCcsIHtcbiAgICAgICAgICAgIGlzUmlnaHRDbGljazogdGhpcy5pc1JpZ2h0Q2xpY2soZSlcbiAgICAgICAgfSk7XG4gICAgICAgIC8vdGhpcy5tb3VzZUxvY2F0aW9uID0gbmV3IHJlY3Rhbmd1bGFyLlBvaW50KC0xLCAtMSk7XG4gICAgfSxcblxuICAgIGZpbm1vdXNlb3V0OiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICghdGhpcy5tb3VzZWRvd24pIHtcbiAgICAgICAgICAgIHRoaXMubW91c2VMb2NhdGlvbiA9IG5ldyByZWN0YW5ndWxhci5Qb2ludCgtMSwgLTEpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hOZXdNb3VzZUtleXNFdmVudChlLCAnZmluLWNhbnZhcy1tb3VzZW91dCcpO1xuICAgIH0sXG5cbiAgICBmaW53aGVlbG1vdmVkOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRHJhZ2dpbmcoKSB8fCAhdGhpcy5oYXNGb2N1cygpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmRpc3BhdGNoTmV3TW91c2VLZXlzRXZlbnQoZSwgJ2Zpbi1jYW52YXMtd2hlZWxtb3ZlZCcsIHtcbiAgICAgICAgICAgIGlzUmlnaHRDbGljazogdGhpcy5pc1JpZ2h0Q2xpY2soZSlcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIGZpbmNsaWNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICh0aGlzLmRvdWJsZUNsaWNrVGltZXIgJiYgRGF0ZS5ub3coKSAtIHRoaXMubGFzdENsaWNrVGltZSA8IHRoaXMuZG91YmxlQ2xpY2tEZWxheSkge1xuICAgICAgICAgICAgLy90aGlzIGlzIGEgZG91YmxlIGNsaWNrLi4uXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5kb3VibGVDbGlja1RpbWVyKTsgLy8gcHJldmVudCBjbGljayBldmVudFxuICAgICAgICAgICAgdGhpcy5kb3VibGVDbGlja1RpbWVyID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdGhpcy5maW5kYmxjbGljayhlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubGFzdENsaWNrVGltZSA9IERhdGUubm93KCk7XG5cbiAgICAgICAgICAgIHRoaXMuZG91YmxlQ2xpY2tUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kb3VibGVDbGlja1RpbWVyID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHRoaXMubW91c2VMb2NhdGlvbiA9IHRoaXMuZ2V0TG9jYWwoZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaE5ld01vdXNlS2V5c0V2ZW50KGUsICdmaW4tY2FudmFzLWNsaWNrJywge1xuICAgICAgICAgICAgICAgICAgICBpc1JpZ2h0Q2xpY2s6IHRoaXMuaXNSaWdodENsaWNrKGUpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcyksIHRoaXMuZG91YmxlQ2xpY2tEZWxheSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZmlucmVsZWFzZTogZnVuY3Rpb24oZSkge1xuICAgICAgICB0aGlzLmhvbGRQdWxzZUNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5tb3VzZUxvY2F0aW9uID0gdGhpcy5nZXRMb2NhbChlKTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaE5ld01vdXNlS2V5c0V2ZW50KGUsICdmaW4tY2FudmFzLXJlbGVhc2UnKTtcbiAgICB9LFxuXG4gICAgZmluZmxpY2s6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc0ZvY3VzKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1vdXNlTG9jYXRpb24gPSB0aGlzLmdldExvY2FsKGUpO1xuICAgICAgICB0aGlzLmRpc3BhdGNoTmV3TW91c2VLZXlzRXZlbnQoZSwgJ2Zpbi1jYW52YXMtZmxpY2snLCB7XG4gICAgICAgICAgICBpc1JpZ2h0Q2xpY2s6IHRoaXMuaXNSaWdodENsaWNrKGUpXG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBmaW50cmFja3N0YXJ0OiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICghdGhpcy5oYXNGb2N1cygpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tb3VzZUxvY2F0aW9uID0gdGhpcy5nZXRMb2NhbChlKTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaE5ld01vdXNlS2V5c0V2ZW50KGUsICdmaW4tY2FudmFzLXRyYWNrc3RhcnQnKTtcbiAgICB9LFxuXG4gICAgZmludHJhY2s6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc0ZvY3VzKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1vdXNlTG9jYXRpb24gPSB0aGlzLmdldExvY2FsKGUpO1xuICAgICAgICB0aGlzLmRpc3BhdGNoTmV3TW91c2VLZXlzRXZlbnQoZSwgJ2Zpbi1jYW52YXMtdHJhY2snKTtcbiAgICB9LFxuXG4gICAgZmludHJhY2tlbmQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdGhpcy5tb3VzZUxvY2F0aW9uID0gdGhpcy5nZXRMb2NhbChlKTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaE5ld01vdXNlS2V5c0V2ZW50KGUsICdmaW4tY2FudmFzLXRyYWNrZW5kJyk7XG4gICAgfSxcblxuICAgIGZpbmhvbGQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdGhpcy5tb3VzZUxvY2F0aW9uID0gdGhpcy5nZXRMb2NhbChlKTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaE5ld01vdXNlS2V5c0V2ZW50KGUsICdmaW4tY2FudmFzLWhvbGQnLCB7XG4gICAgICAgICAgICBpc1JpZ2h0Q2xpY2s6IHRoaXMuaXNSaWdodENsaWNrKGUpXG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBmaW5ob2xkcHVsc2U6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdGhpcy5tb3VzZUxvY2F0aW9uID0gdGhpcy5nZXRMb2NhbChlKTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaE5ld01vdXNlS2V5c0V2ZW50KGUsICdmaW4tY2FudmFzLWhvbGRwdWxzZScsIHtcbiAgICAgICAgICAgIGNvdW50OiB0aGlzLmhvbGRQdWxzZUNvdW50KytcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIGZpbnRhcDogZnVuY3Rpb24oZSkge1xuICAgICAgICAvL3RoaXMgbm9uc2Vuc2UgaXMgdG8gaG9sZCBhIHRhcCBpZiBpdCdzIHJlYWxseSBhIGRvdWJsZSBjbGlja1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICB2YXIgZGlmID0gbm93IC0gdGhpcy5sYXN0RG91YmxlQ2xpY2tUaW1lO1xuICAgICAgICBpZiAoZGlmIDwgMzAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy9kcmFnZW5kIGlzIGFsc28gY2F1c2luZyBhIHRhcFxuICAgICAgICAvL2xldHMgZml4IHRoaXMgaGVyZVxuICAgICAgICBpZiAobm93IC0gdGhpcy5kcmFnRW5kdGltZSA8IDEwMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLl9maW50YXAoZSk7XG4gICAgICAgIH0sIDE4MCk7XG4gICAgfSxcblxuICAgIF9maW50YXA6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgLy90aGlzIG5vbnNlbnNlIGlzIHRvIGhvbGQgYSB0YXAgaWYgaXQncyByZWFsbHkgYSBkb3VibGUgY2xpY2tcbiAgICAgICAgdmFyIG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIHZhciBkaWYgPSBub3cgLSB0aGlzLmxhc3REb3VibGVDbGlja1RpbWU7XG4gICAgICAgIGlmIChkaWYgPCAzMDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1vdXNlRG93bkxvY2F0aW9uKSB7IC8vIG1heWJlIG5vIG1vdXNlZG93biBvbiBhIHBob25lP1xuICAgICAgICAgICAgdGhpcy5tb3VzZUxvY2F0aW9uID0gdGhpcy5tb3VzZURvd25Mb2NhdGlvbjsgLy8gbW91c2UgbWF5IGhhdmUgbW92ZWQgc2luY2UgbW91c2Vkb3duXG4gICAgICAgICAgICB0aGlzLm1vdXNlRG93bkxvY2F0aW9uID0gdW5kZWZpbmVkOyAvLyBjb25zdW1lIGl0IChtYXliZSBub3QgbmVlZGVkOyBvbmNlIGEgbW91c2Vkb3duIGFsd2F5cyBhIG1vdXNlZG93bilcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hOZXdNb3VzZUtleXNFdmVudChlLCAnZmluLWNhbnZhcy10YXAnLCB7XG4gICAgICAgICAgICBpc1JpZ2h0Q2xpY2s6IHRoaXMuaXNSaWdodENsaWNrKGUpXG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBmaW5kYmxjbGljazogZnVuY3Rpb24oZSkge1xuICAgICAgICB0aGlzLm1vdXNlTG9jYXRpb24gPSB0aGlzLmdldExvY2FsKGUpO1xuICAgICAgICB0aGlzLmxhc3REb3VibGVDbGlja1RpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLmRpc3BhdGNoTmV3TW91c2VLZXlzRXZlbnQoZSwgJ2Zpbi1jYW52YXMtZGJsY2xpY2snLCB7XG4gICAgICAgICAgICBpc1JpZ2h0Q2xpY2s6IHRoaXMuaXNSaWdodENsaWNrKGUpXG4gICAgICAgIH0pO1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdkYmxjbGljaycsIHRoaXMuY3VycmVudEtleXMpO1xuICAgIH0sXG5cbiAgICBnZXRDaGFyTWFwOiBmdW5jdGlvbigpIHsgLy9UT0RPOiBUaGlzIGlzIHN0YXRpYy4gTWFrZSBpdCBhIHByb3BlcnR5IG9mIHRoZSBjb25zdHJ1Y3Rvci5cbiAgICAgICAgcmV0dXJuIGNoYXJNYXA7XG4gICAgfSxcblxuICAgIGZpbmtleWRvd246IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc0ZvY3VzKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB2YXIga2V5Q2hhciA9IGUuc2hpZnRLZXkgPyBjaGFyTWFwW2Uua2V5Q29kZV1bMV0gOiBjaGFyTWFwW2Uua2V5Q29kZV1bMF07XG4gICAgICAgIGlmIChlLnJlcGVhdCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucmVwZWF0S2V5ID09PSBrZXlDaGFyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXBlYXRLZXlDb3VudCsrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlcGVhdEtleSA9IGtleUNoYXI7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXBlYXRLZXlTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZXBlYXRLZXkgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5yZXBlYXRLZXlDb3VudCA9IDA7XG4gICAgICAgICAgICB0aGlzLnJlcGVhdEtleVN0YXJ0VGltZSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEtleXMuaW5kZXhPZihrZXlDaGFyKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEtleXMucHVzaChrZXlDaGFyKTtcbiAgICAgICAgfVxuICAgICAgICAvL2NvbnNvbGUubG9nKGtleUNoYXIsIGUua2V5Q29kZSk7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hOZXdFdmVudChlLCAnZmluLWNhbnZhcy1rZXlkb3duJywge1xuICAgICAgICAgICAgYWx0OiBlLmFsdEtleSxcbiAgICAgICAgICAgIGN0cmw6IGUuY3RybEtleSxcbiAgICAgICAgICAgIGNoYXI6IGtleUNoYXIsXG4gICAgICAgICAgICBjb2RlOiBlLmNoYXJDb2RlLFxuICAgICAgICAgICAga2V5OiBlLmtleUNvZGUsXG4gICAgICAgICAgICBtZXRhOiBlLm1ldGFLZXksXG4gICAgICAgICAgICByZXBlYXRDb3VudDogdGhpcy5yZXBlYXRLZXlDb3VudCxcbiAgICAgICAgICAgIHJlcGVhdFN0YXJ0VGltZTogdGhpcy5yZXBlYXRLZXlTdGFydFRpbWUsXG4gICAgICAgICAgICBzaGlmdDogZS5zaGlmdEtleSxcbiAgICAgICAgICAgIGlkZW50aWZpZXI6IGUua2V5SWRlbnRpZmllcixcbiAgICAgICAgICAgIGN1cnJlbnRLZXlzOiB0aGlzLmN1cnJlbnRLZXlzLnNsaWNlKDApXG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBmaW5rZXl1cDogZnVuY3Rpb24oZSkge1xuICAgICAgICB2YXIga2V5Q2hhciA9IGUuc2hpZnRLZXkgPyBjaGFyTWFwW2Uua2V5Q29kZV1bMV0gOiBjaGFyTWFwW2Uua2V5Q29kZV1bMF07XG4gICAgICAgIHRoaXMuY3VycmVudEtleXMuc3BsaWNlKHRoaXMuY3VycmVudEtleXMuaW5kZXhPZihrZXlDaGFyKSwgMSk7XG4gICAgICAgIGlmICghdGhpcy5oYXNGb2N1cygpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXBlYXRLZXlDb3VudCA9IDA7XG4gICAgICAgIHRoaXMucmVwZWF0S2V5ID0gbnVsbDtcbiAgICAgICAgdGhpcy5yZXBlYXRLZXlTdGFydFRpbWUgPSAwO1xuICAgICAgICB0aGlzLmRpc3BhdGNoTmV3RXZlbnQoZSwgJ2Zpbi1jYW52YXMta2V5dXAnLCB7XG4gICAgICAgICAgICBhbHQ6IGUuYWx0S2V5LFxuICAgICAgICAgICAgY3RybDogZS5jdHJsS2V5LFxuICAgICAgICAgICAgY2hhcjoga2V5Q2hhcixcbiAgICAgICAgICAgIGNvZGU6IGUuY2hhckNvZGUsXG4gICAgICAgICAgICBrZXk6IGUua2V5Q29kZSxcbiAgICAgICAgICAgIG1ldGE6IGUubWV0YUtleSxcbiAgICAgICAgICAgIHJlcGVhdDogZS5yZXBlYXQsXG4gICAgICAgICAgICBzaGlmdDogZS5zaGlmdEtleSxcbiAgICAgICAgICAgIGlkZW50aWZpZXI6IGUua2V5SWRlbnRpZmllcixcbiAgICAgICAgICAgIGN1cnJlbnRLZXlzOiB0aGlzLmN1cnJlbnRLZXlzLnNsaWNlKDApXG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBmaW5mb2N1c2dhaW5lZDogZnVuY3Rpb24oZSkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoTmV3RXZlbnQoZSwgJ2Zpbi1jYW52YXMtZm9jdXMtZ2FpbmVkJyk7XG4gICAgfSxcblxuICAgIGZpbmZvY3VzbG9zdDogZnVuY3Rpb24oZSkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoTmV3RXZlbnQoZSwgJ2Zpbi1jYW52YXMtZm9jdXMtbG9zdCcpO1xuICAgIH0sXG5cbiAgICBmaW5jb250ZXh0bWVudTogZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoZS5jdHJsS2V5ICYmIHRoaXMuY3VycmVudEtleXMuaW5kZXhPZignQ1RSTCcpID09PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50S2V5cy5wdXNoKCdDVFJMJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZG91YmxlUmlnaHRDbGlja1RpbWVyICYmIERhdGUubm93KCkgLSB0aGlzLmxhc3RDbGlja1RpbWUgPCB0aGlzLmRvdWJsZUNsaWNrRGVsYXkpIHtcbiAgICAgICAgICAgIC8vdGhpcyBpcyBhIGRvdWJsZSBjbGljay4uLlxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZG91YmxlUmlnaHRDbGlja1RpbWVyKTsgLy8gcHJldmVudCBjb250ZXh0IG1lbnUgZXZlbnRcbiAgICAgICAgICAgIHRoaXMuZG91YmxlUmlnaHRDbGlja1RpbWVyID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdGhpcy5maW5kYmxjbGljayhlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubGFzdENsaWNrVGltZSA9IERhdGUubm93KCk7XG5cbiAgICAgICAgICAgIHRoaXMuZG91YmxlUmlnaHRDbGlja1RpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRvdWJsZVJpZ2h0Q2xpY2tUaW1lciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoTmV3TW91c2VLZXlzRXZlbnQoZSwgJ2Zpbi1jYW52YXMtY29udGV4dC1tZW51Jywge1xuICAgICAgICAgICAgICAgICAgICBpc1JpZ2h0Q2xpY2s6IHRoaXMuaXNSaWdodENsaWNrKGUpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcyksIHRoaXMuZG91YmxlQ2xpY2tEZWxheSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVwYWludDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBmcHMgPSB0aGlzLmdldEZQUygpO1xuICAgICAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgaWYgKCFwYWludExvb3BSdW5uaW5nIHx8IGZwcyA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5wYWludE5vdygpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdldE1vdXNlTG9jYXRpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb3VzZUxvY2F0aW9uO1xuICAgIH0sXG5cbiAgICBnZXRPcmlnaW46IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmVjdCA9IHRoaXMuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB2YXIgcCA9IG5ldyByZWN0YW5ndWxhci5Qb2ludChyZWN0LmxlZnQsIHJlY3QudG9wKTtcbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfSxcblxuICAgIGdldExvY2FsOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIHZhciByZWN0ID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHZhciBwID0gbmV3IHJlY3Rhbmd1bGFyLlBvaW50KGUuY2xpZW50WCAtIHJlY3QubGVmdCwgZS5jbGllbnRZIC0gcmVjdC50b3ApO1xuICAgICAgICByZXR1cm4gcDtcbiAgICB9LFxuXG4gICAgaGFzRm9jdXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gdGhpcy5jYW52YXM7XG4gICAgfSxcblxuICAgIHRha2VGb2N1czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKCF0aGlzLmhhc0ZvY3VzKCkpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jYW52YXMuZm9jdXMoKTtcbiAgICAgICAgICAgIH0sIDEwKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBiZURyYWdnaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kcmFnZ2luZyA9IHRydWU7XG4gICAgICAgIHRoaXMuZGlzYWJsZURvY3VtZW50RWxlbWVudFNlbGVjdGlvbigpO1xuICAgIH0sXG5cbiAgICBiZU5vdERyYWdnaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVuYWJsZURvY3VtZW50RWxlbWVudFNlbGVjdGlvbigpO1xuICAgIH0sXG5cbiAgICBpc0RyYWdnaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZHJhZ2dpbmc7XG4gICAgfSxcblxuICAgIGRpc2FibGVEb2N1bWVudEVsZW1lbnRTZWxlY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc3R5bGUgPSBkb2N1bWVudC5ib2R5LnN0eWxlO1xuICAgICAgICBzdHlsZS5jc3NUZXh0ID0gc3R5bGUuY3NzVGV4dCArICctd2Via2l0LXVzZXItc2VsZWN0OiBub25lJztcbiAgICB9LFxuXG4gICAgZW5hYmxlRG9jdW1lbnRFbGVtZW50U2VsZWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHN0eWxlID0gZG9jdW1lbnQuYm9keS5zdHlsZTtcbiAgICAgICAgc3R5bGUuY3NzVGV4dCA9IHN0eWxlLmNzc1RleHQucmVwbGFjZSgnLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZScsICcnKTtcbiAgICB9LFxuXG4gICAgc2V0Rm9jdXNhYmxlOiBmdW5jdGlvbih0cnV0aHkpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VyLnN0eWxlLmRpc3BsYXkgPSB0cnV0aHkgPyAnJyA6ICdub25lJztcbiAgICB9LFxuXG4gICAgaXNSaWdodENsaWNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIHZhciBpc1JpZ2h0TUI7XG4gICAgICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcblxuICAgICAgICBpZiAoJ3doaWNoJyBpbiBlKSB7IC8vIEdlY2tvIChGaXJlZm94KSwgV2ViS2l0IChTYWZhcmkvQ2hyb21lKSAmIE9wZXJhXG4gICAgICAgICAgICBpc1JpZ2h0TUIgPSBlLndoaWNoID09PSAzO1xuICAgICAgICB9IGVsc2UgaWYgKCdidXR0b24nIGluIGUpIHsgLy8gSUUsIE9wZXJhXG4gICAgICAgICAgICBpc1JpZ2h0TUIgPSBlLmJ1dHRvbiA9PT0gMjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXNSaWdodE1CO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV2ZW50OiBmdW5jdGlvbihlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbnZhcy5kaXNwYXRjaEV2ZW50KGUpO1xuICAgIH1cbn07XG5cbmZ1bmN0aW9uIHBhaW50TG9vcEZ1bmN0aW9uKG5vdykge1xuICAgIGlmICghcGFpbnRMb29wUnVubmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFpbnRhYmxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcGFpbnRhYmxlc1tpXS50aWNrUGFpbnRlcihub3cpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShwYWludExvb3BGdW5jdGlvbik7XG59XG5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocGFpbnRMb29wRnVuY3Rpb24pO1xuXG5mdW5jdGlvbiByZXNpemFibGVzTG9vcEZ1bmN0aW9uKG5vdykge1xuICAgIGlmICghcmVzaXplTG9vcFJ1bm5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc2l6YWJsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc2l6YWJsZXNbaV0udGlja1Jlc2l6ZXIobm93KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbnNldEludGVydmFsKHJlc2l6YWJsZXNMb29wRnVuY3Rpb24sIFJFU0laRV9QT0xMSU5HX0lOVEVSVkFMKTtcblxuZnVuY3Rpb24gbWFrZUNoYXJNYXAoKSB7XG4gICAgdmFyIG1hcCA9IFtdO1xuXG4gICAgdmFyIGVtcHR5ID0gWycnLCAnJ107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgaSsrKSB7XG4gICAgICAgIG1hcFtpXSA9IGVtcHR5O1xuICAgIH1cblxuICAgIG1hcFsyN10gPSBbJ0VTQycsICdFU0NTSElGVCddO1xuICAgIG1hcFsxOTJdID0gWydgJywgJ34nXTtcbiAgICBtYXBbNDldID0gWycxJywgJyEnXTtcbiAgICBtYXBbNTBdID0gWycyJywgJ0AnXTtcbiAgICBtYXBbNTFdID0gWyczJywgJyMnXTtcbiAgICBtYXBbNTJdID0gWyc0JywgJyQnXTtcbiAgICBtYXBbNTNdID0gWyc1JywgJyUnXTtcbiAgICBtYXBbNTRdID0gWyc2JywgJ14nXTtcbiAgICBtYXBbNTVdID0gWyc3JywgJyYnXTtcbiAgICBtYXBbNTZdID0gWyc4JywgJyonXTtcbiAgICBtYXBbNTddID0gWyc5JywgJygnXTtcbiAgICBtYXBbNDhdID0gWycwJywgJyknXTtcbiAgICBtYXBbMTg5XSA9IFsnLScsICdfJ107XG4gICAgbWFwWzE4N10gPSBbJz0nLCAnKyddO1xuICAgIG1hcFs4XSA9IFsnQkFDS1NQQUNFJywgJ0JBQ0tTUEFDRVNISUZUJ107XG4gICAgbWFwWzQ2XSA9IFsnREVMRVRFJywgJ0RFTEVURVNISUZUJ107XG4gICAgbWFwWzldID0gWydUQUInLCAnVEFCU0hJRlQnXTtcbiAgICBtYXBbODFdID0gWydxJywgJ1EnXTtcbiAgICBtYXBbODddID0gWyd3JywgJ1cnXTtcbiAgICBtYXBbNjldID0gWydlJywgJ0UnXTtcbiAgICBtYXBbODJdID0gWydyJywgJ1InXTtcbiAgICBtYXBbODRdID0gWyd0JywgJ1QnXTtcbiAgICBtYXBbODldID0gWyd5JywgJ1knXTtcbiAgICBtYXBbODVdID0gWyd1JywgJ1UnXTtcbiAgICBtYXBbNzNdID0gWydpJywgJ0knXTtcbiAgICBtYXBbNzldID0gWydvJywgJ08nXTtcbiAgICBtYXBbODBdID0gWydwJywgJ1AnXTtcbiAgICBtYXBbMjE5XSA9IFsnWycsICd7J107XG4gICAgbWFwWzIyMV0gPSBbJ10nLCAnfSddO1xuICAgIG1hcFsyMjBdID0gWydcXFxcJywgJ3wnXTtcbiAgICBtYXBbMjIwXSA9IFsnQ0FQU0xPQ0snLCAnQ0FQU0xPQ0tTSElGVCddO1xuICAgIG1hcFs2NV0gPSBbJ2EnLCAnQSddO1xuICAgIG1hcFs4M10gPSBbJ3MnLCAnUyddO1xuICAgIG1hcFs2OF0gPSBbJ2QnLCAnRCddO1xuICAgIG1hcFs3MF0gPSBbJ2YnLCAnRiddO1xuICAgIG1hcFs3MV0gPSBbJ2cnLCAnRyddO1xuICAgIG1hcFs3Ml0gPSBbJ2gnLCAnSCddO1xuICAgIG1hcFs3NF0gPSBbJ2onLCAnSiddO1xuICAgIG1hcFs3NV0gPSBbJ2snLCAnSyddO1xuICAgIG1hcFs3Nl0gPSBbJ2wnLCAnTCddO1xuICAgIG1hcFsxODZdID0gWyc7JywgJzonXTtcbiAgICBtYXBbMjIyXSA9IFsnXFwnJywgJ3wnXTtcbiAgICBtYXBbMTNdID0gWydSRVRVUk4nLCAnUkVUVVJOU0hJRlQnXTtcbiAgICBtYXBbMTZdID0gWydTSElGVCcsICdTSElGVCddO1xuICAgIG1hcFs5MF0gPSBbJ3onLCAnWiddO1xuICAgIG1hcFs4OF0gPSBbJ3gnLCAnWCddO1xuICAgIG1hcFs2N10gPSBbJ2MnLCAnQyddO1xuICAgIG1hcFs4Nl0gPSBbJ3YnLCAnViddO1xuICAgIG1hcFs2Nl0gPSBbJ2InLCAnQiddO1xuICAgIG1hcFs3OF0gPSBbJ24nLCAnTiddO1xuICAgIG1hcFs3N10gPSBbJ20nLCAnTSddO1xuICAgIG1hcFsxODhdID0gWycsJywgJzwnXTtcbiAgICBtYXBbMTkwXSA9IFsnLicsICc+J107XG4gICAgbWFwWzE5MV0gPSBbJy8nLCAnPyddO1xuICAgIG1hcFsxNl0gPSBbJ1NISUZUJywgJ1NISUZUJ107XG4gICAgbWFwWzE3XSA9IFsnQ1RSTCcsICdDVFJMU0hJRlQnXTtcbiAgICBtYXBbMThdID0gWydBTFQnLCAnQUxUU0hJRlQnXTtcbiAgICBtYXBbOTFdID0gWydDT01NQU5ETEVGVCcsICdDT01NQU5ETEVGVFNISUZUJ107XG4gICAgbWFwWzMyXSA9IFsnU1BBQ0UnLCAnU1BBQ0VTSElGVCddO1xuICAgIG1hcFs5M10gPSBbJ0NPTU1BTkRSSUdIVCcsICdDT01NQU5EUklHSFRTSElGVCddO1xuICAgIG1hcFsxOF0gPSBbJ0FMVCcsICdBTFRTSElGVCddO1xuICAgIG1hcFszOF0gPSBbJ1VQJywgJ1VQU0hJRlQnXTtcbiAgICBtYXBbMzddID0gWydMRUZUJywgJ0xFRlRTSElGVCddO1xuICAgIG1hcFs0MF0gPSBbJ0RPV04nLCAnRE9XTlNISUZUJ107XG4gICAgbWFwWzM5XSA9IFsnUklHSFQnLCAnUklHSFRTSElGVCddO1xuXG4gICAgbWFwWzMzXSA9IFsnUEFHRVVQJywgJ1BBR0VVUFNISUZUJ107XG4gICAgbWFwWzM0XSA9IFsnUEFHRURPV04nLCAnUEFHRURPV05TSElGVCddO1xuICAgIG1hcFszNV0gPSBbJ1BBR0VSSUdIVCcsICdQQUdFUklHSFRTSElGVCddOyAvLyBFTkRcbiAgICBtYXBbMzZdID0gWydQQUdFTEVGVCcsICdQQUdFTEVGVFNISUZUJ107IC8vIEhPTUVcblxuICAgIG1hcFsxMTJdID0gWydGMScsICdGMVNISUZUJ107XG4gICAgbWFwWzExM10gPSBbJ0YyJywgJ0YyU0hJRlQnXTtcbiAgICBtYXBbMTE0XSA9IFsnRjMnLCAnRjNTSElGVCddO1xuICAgIG1hcFsxMTVdID0gWydGNCcsICdGNFNISUZUJ107XG4gICAgbWFwWzExNl0gPSBbJ0Y1JywgJ0Y1U0hJRlQnXTtcbiAgICBtYXBbMTE3XSA9IFsnRjYnLCAnRjZTSElGVCddO1xuICAgIG1hcFsxMThdID0gWydGNycsICdGN1NISUZUJ107XG4gICAgbWFwWzExOV0gPSBbJ0Y4JywgJ0Y4U0hJRlQnXTtcbiAgICBtYXBbMTIwXSA9IFsnRjknLCAnRjlTSElGVCddO1xuICAgIG1hcFsxMjFdID0gWydGMTAnLCAnRjEwU0hJRlQnXTtcbiAgICBtYXBbMTIyXSA9IFsnRjExJywgJ0YxUzFISUZUJ107XG4gICAgbWFwWzEyM10gPSBbJ0YxMicsICdGMTIxSElGVCddO1xuXG4gICAgcmV0dXJuIG1hcDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDYW52YXM7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjb25zb2xlTG9nZ2VyID0gcmVxdWlyZSgnLi9nYy1jb25zb2xlLWxvZ2dlcicpO1xuXG4vKipcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIGdjIC0gVGhlIDItRCBncmFwaGljcyBjb250ZXh0IGZyb20geW91ciBjYW52YXNcbiAqIEBwYXJhbSB7Ym9vbGVhbnxhcGlMb2dnZXJ9IFtsb2dnZXI9dHJ1ZV1cbiAqICogYHRydWVgIHVzZXMgYGdjLWNvbnNvbGUtbG9nZ2VyYCBmdW5jdGlvbiBib3VuZCB0byAnZ2MuJyBhcyBwcmVmaXhcbiAqICogc3RyaW5nIHVzZXMgYGdjLWNvbnNvbGUtbG9nZ2VyYCBmdW5jdGlvbiBib3VuZCB0byBzdHJpbmdcbiAqICogZnVuY3Rpb24gdXNlZCBhcyBpc1xuICovXG5mdW5jdGlvbiBHcmFwaGljc0NvbnRleHQoZ2MsIGxvZ2dlcikge1xuICAgIHRoaXMuZ2MgPSBnYztcblxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgcmVXRUJLSVQgPSAvXndlYmtpdC87XG5cbiAgICBzd2l0Y2ggKHR5cGVvZiBsb2dnZXIpIHtcblxuICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgbG9nZ2VyID0gIGNvbnNvbGVMb2dnZXIuYmluZCh1bmRlZmluZWQsIGxvZ2dlciArICcuJyk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICAgIGlmIChsb2dnZXIgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIgPSBjb25zb2xlTG9nZ2VyLmJpbmQodW5kZWZpbmVkLCAnZ2MuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgICAgICBpZiAobG9nZ2VyLmxlbmd0aCAhPT0gMykge1xuICAgICAgICAgICAgICAgIHRocm93ICdHcmFwaGljc0NvbnRleHQ6IFVzZXItc3VwcGxpZWQgQVBJIGxvZ2dlciBmdW5jdGlvbiBkb2VzIG5vdCBhY2NlcHQgdGhyZWUgcGFyYW1ldGVycy4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGxvZ2dlciA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIFN0dWIgb3V0IGFsbCB0aGUgcHJvdG90eXBlIG1lbWJlcnMgb2YgdGhlIGNhbnZhcyAyRCBncmFwaGljcyBjb250ZXh0OlxuICAgIE9iamVjdC5rZXlzKE9iamVjdC5nZXRQcm90b3R5cGVPZihnYykpLmZvckVhY2goTWFrZVN0dWIpO1xuXG4gICAgLy8gU29tZSBvbGRlciBicm93c2VycyAoZS5nLiwgQ2hyb21lIDQwKSBkaWQgbm90IGhhdmUgYWxsIG1lbWJlcnMgb2YgY2FudmFzXG4gICAgLy8gMkQgZ3JhcGhpY3MgY29udGV4dCBpbiB0aGUgcHJvdG90eXBlIHNvIHdlIG1ha2UgdGhpcyBhZGRpdGlvbmFsIGNhbGw6XG4gICAgT2JqZWN0LmtleXMoZ2MpLmZvckVhY2goTWFrZVN0dWIpO1xuXG4gICAgZnVuY3Rpb24gTWFrZVN0dWIoa2V5KSB7XG4gICAgICAgIGlmIChrZXkgaW4gR3JhcGhpY3NDb250ZXh0LnByb3RvdHlwZSB8fCByZVdFQktJVC50ZXN0KGtleSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGdjW2tleV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHNlbGZba2V5XSA9ICFsb2dnZXIgPyBnY1trZXldLmJpbmQoZ2MpIDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxvZ2dlcihrZXksIGFyZ3VtZW50cywgZ2Nba2V5XS5hcHBseShnYywgYXJndW1lbnRzKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNlbGYsIGtleSwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBnY1trZXldO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbG9nZ2VyID8gbG9nZ2VyKGtleSwgJ2dldHRlcicsIHJlc3VsdCkgOiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGdjW2tleV0gPSBsb2dnZXIgPyBsb2dnZXIoa2V5LCAnc2V0dGVyJywgdmFsdWUpIDogdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gR3JhcGhpY3NDb250ZXh0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgWUlFTERTID0gJ1xcdTI3RjknOyAvLyBMT05HIFJJR0hUV0FSRFMgRE9VQkxFIEFSUk9XXG5cbmZ1bmN0aW9uIGNvbnNvbGVMb2dnZXIocHJlZml4LCBuYW1lLCBhcmdzLCB2YWx1ZSkge1xuICAgIHZhciByZXN1bHQgPSB2YWx1ZTtcblxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJlc3VsdCA9ICdcIicgKyByZXN1bHQgKyAnXCInO1xuICAgIH1cblxuICAgIG5hbWUgPSBwcmVmaXggKyBuYW1lO1xuXG4gICAgc3dpdGNoIChhcmdzKSB7XG4gICAgICAgIGNhc2UgJ2dldHRlcic6XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhuYW1lLCAnPScsIHJlc3VsdCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdzZXR0ZXInOlxuICAgICAgICAgICAgY29uc29sZS5sb2cobmFtZSwgWUlFTERTLCByZXN1bHQpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDogLy8gbWV0aG9kIGNhbGxcbiAgICAgICAgICAgIG5hbWUgKz0gJygnICsgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJncykuam9pbignLCAnKSArICcpJztcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG5hbWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhuYW1lLCBZSUVMRFMsIHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnNvbGVMb2dnZXI7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgVGhlIFBvbHltZXIgUHJvamVjdCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVGhpcyBjb2RlIG1heSBvbmx5IGJlIHVzZWQgdW5kZXIgdGhlIEJTRCBzdHlsZSBsaWNlbnNlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9MSUNFTlNFLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBhdXRob3JzIG1heSBiZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQVVUSE9SUy50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgY29udHJpYnV0b3JzIG1heSBiZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQ09OVFJJQlVUT1JTLnR4dFxuICogQ29kZSBkaXN0cmlidXRlZCBieSBHb29nbGUgYXMgcGFydCBvZiB0aGUgcG9seW1lciBwcm9qZWN0IGlzIGFsc29cbiAqIHN1YmplY3QgdG8gYW4gYWRkaXRpb25hbCBJUCByaWdodHMgZ3JhbnQgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL1BBVEVOVFMudHh0XG4gKi9cbi8vbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuKGZ1bmN0aW9uKHNjb3BlKSB7XG4gICAgdmFyIGhhc0Z1bGxQYXRoID0gZmFsc2U7XG5cbiAgICAvLyB0ZXN0IGZvciBmdWxsIGV2ZW50IHBhdGggc3VwcG9ydFxuICAgIHZhciBwYXRoVGVzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ21ldGEnKTtcbiAgICBpZiAocGF0aFRlc3QuY3JlYXRlU2hhZG93Um9vdCkge1xuICAgICAgICB2YXIgc3IgPSBwYXRoVGVzdC5jcmVhdGVTaGFkb3dSb290KCk7XG4gICAgICAgIHZhciBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBzci5hcHBlbmRDaGlsZChzKTtcbiAgICAgICAgcGF0aFRlc3QuYWRkRXZlbnRMaXN0ZW5lcigndGVzdHBhdGgnLCBmdW5jdGlvbihldikge1xuICAgICAgICAgICAgaWYgKGV2LnBhdGgpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgc3BhbiBpcyBpbiB0aGUgZXZlbnQgcGF0aCwgdGhlbiBwYXRoWzBdIGlzIHRoZSByZWFsIHNvdXJjZSBmb3IgYWxsIGV2ZW50c1xuICAgICAgICAgICAgICAgIGhhc0Z1bGxQYXRoID0gZXYucGF0aFswXSA9PT0gcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIGV2ID0gbmV3IEN1c3RvbUV2ZW50KCd0ZXN0cGF0aCcsIHtcbiAgICAgICAgICAgIGJ1YmJsZXM6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIG11c3QgYWRkIG5vZGUgdG8gRE9NIHRvIHRyaWdnZXIgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChwYXRoVGVzdCk7XG4gICAgICAgIHMuZGlzcGF0Y2hFdmVudChldik7XG4gICAgICAgIHBhdGhUZXN0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocGF0aFRlc3QpO1xuICAgICAgICBzciA9IHMgPSBudWxsO1xuICAgIH1cbiAgICBwYXRoVGVzdCA9IG51bGw7XG5cbiAgICB2YXIgdGFyZ2V0ID0ge1xuICAgICAgICBzaGFkb3c6IGZ1bmN0aW9uKGluRWwpIHtcbiAgICAgICAgICAgIGlmIChpbkVsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluRWwuc2hhZG93Um9vdCB8fCBpbkVsLndlYmtpdFNoYWRvd1Jvb3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNhblRhcmdldDogZnVuY3Rpb24oc2hhZG93KSB7XG4gICAgICAgICAgICByZXR1cm4gc2hhZG93ICYmIEJvb2xlYW4oc2hhZG93LmVsZW1lbnRGcm9tUG9pbnQpO1xuICAgICAgICB9LFxuICAgICAgICB0YXJnZXRpbmdTaGFkb3c6IGZ1bmN0aW9uKGluRWwpIHtcbiAgICAgICAgICAgIHZhciBzID0gdGhpcy5zaGFkb3coaW5FbCk7XG4gICAgICAgICAgICBpZiAodGhpcy5jYW5UYXJnZXQocykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb2xkZXJTaGFkb3c6IGZ1bmN0aW9uKHNoYWRvdykge1xuICAgICAgICAgICAgdmFyIG9zID0gc2hhZG93Lm9sZGVyU2hhZG93Um9vdDtcbiAgICAgICAgICAgIGlmICghb3MpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2UgPSBzaGFkb3cucXVlcnlTZWxlY3Rvcignc2hhZG93Jyk7XG4gICAgICAgICAgICAgICAgaWYgKHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIG9zID0gc2Uub2xkZXJTaGFkb3dSb290O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvcztcbiAgICAgICAgfSxcbiAgICAgICAgYWxsU2hhZG93czogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICAgICAgdmFyIHNoYWRvd3MgPSBbXSxcbiAgICAgICAgICAgICAgICBzID0gdGhpcy5zaGFkb3coZWxlbWVudCk7XG4gICAgICAgICAgICB3aGlsZSAocykge1xuICAgICAgICAgICAgICAgIHNoYWRvd3MucHVzaChzKTtcbiAgICAgICAgICAgICAgICBzID0gdGhpcy5vbGRlclNoYWRvdyhzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzaGFkb3dzO1xuICAgICAgICB9LFxuICAgICAgICBzZWFyY2hSb290OiBmdW5jdGlvbihpblJvb3QsIHgsIHkpIHtcbiAgICAgICAgICAgIHZhciB0LCBzdCwgc3IsIG9zO1xuICAgICAgICAgICAgaWYgKGluUm9vdCkge1xuICAgICAgICAgICAgICAgIHQgPSBpblJvb3QuZWxlbWVudEZyb21Qb2ludCh4LCB5KTtcbiAgICAgICAgICAgICAgICBpZiAodCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBmb3VuZCBlbGVtZW50LCBjaGVjayBpZiBpdCBoYXMgYSBTaGFkb3dSb290XG4gICAgICAgICAgICAgICAgICAgIHNyID0gdGhpcy50YXJnZXRpbmdTaGFkb3codCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpblJvb3QgIT09IGRvY3VtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIGZvciBzaWJsaW5nIHJvb3RzXG4gICAgICAgICAgICAgICAgICAgIHNyID0gdGhpcy5vbGRlclNoYWRvdyhpblJvb3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBzZWFyY2ggb3RoZXIgcm9vdHMsIGZhbGwgYmFjayB0byBsaWdodCBkb20gZWxlbWVudFxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNlYXJjaFJvb3Qoc3IsIHgsIHkpIHx8IHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG93bmVyOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcyA9IGVsZW1lbnQ7XG4gICAgICAgICAgICAvLyB3YWxrIHVwIHVudGlsIHlvdSBoaXQgdGhlIHNoYWRvdyByb290IG9yIGRvY3VtZW50XG4gICAgICAgICAgICB3aGlsZSAocy5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICAgICAgcyA9IHMucGFyZW50Tm9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHRoZSBvd25lciBlbGVtZW50IGlzIGV4cGVjdGVkIHRvIGJlIGEgRG9jdW1lbnQgb3IgU2hhZG93Um9vdFxuICAgICAgICAgICAgaWYgKHMubm9kZVR5cGUgIT0gTm9kZS5ET0NVTUVOVF9OT0RFICYmIHMubm9kZVR5cGUgIT0gTm9kZS5ET0NVTUVOVF9GUkFHTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgcyA9IGRvY3VtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHM7XG4gICAgICAgIH0sXG4gICAgICAgIGZpbmRUYXJnZXQ6IGZ1bmN0aW9uKGluRXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChoYXNGdWxsUGF0aCAmJiBpbkV2ZW50LnBhdGggJiYgaW5FdmVudC5wYXRoLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbkV2ZW50LnBhdGhbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgeCA9IGluRXZlbnQuY2xpZW50WCxcbiAgICAgICAgICAgICAgICB5ID0gaW5FdmVudC5jbGllbnRZO1xuICAgICAgICAgICAgLy8gaWYgdGhlIGxpc3RlbmVyIGlzIGluIHRoZSBzaGFkb3cgcm9vdCwgaXQgaXMgbXVjaCBmYXN0ZXIgdG8gc3RhcnQgdGhlcmVcbiAgICAgICAgICAgIHZhciBzID0gdGhpcy5vd25lcihpbkV2ZW50LnRhcmdldCk7XG4gICAgICAgICAgICAvLyBpZiB4LCB5IGlzIG5vdCBpbiB0aGlzIHJvb3QsIGZhbGwgYmFjayB0byBkb2N1bWVudCBzZWFyY2hcbiAgICAgICAgICAgIGlmICghcy5lbGVtZW50RnJvbVBvaW50KHgsIHkpKSB7XG4gICAgICAgICAgICAgICAgcyA9IGRvY3VtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoUm9vdChzLCB4LCB5KTtcbiAgICAgICAgfSxcbiAgICAgICAgZmluZFRvdWNoQWN0aW9uOiBmdW5jdGlvbihpbkV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgbjtcbiAgICAgICAgICAgIGlmIChoYXNGdWxsUGF0aCAmJiBpbkV2ZW50LnBhdGggJiYgaW5FdmVudC5wYXRoLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhciBwYXRoID0gaW5FdmVudC5wYXRoO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGF0aC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBuID0gcGF0aFtpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG4ubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFICYmIG4uaGFzQXR0cmlidXRlKCd0b3VjaC1hY3Rpb24nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG4uZ2V0QXR0cmlidXRlKCd0b3VjaC1hY3Rpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbiA9IGluRXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgICAgIHdoaWxlIChuKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSAmJiBuLmhhc0F0dHJpYnV0ZSgndG91Y2gtYWN0aW9uJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuLmdldEF0dHJpYnV0ZSgndG91Y2gtYWN0aW9uJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbiA9IG4ucGFyZW50Tm9kZSB8fCBuLmhvc3Q7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gYXV0byBpcyBkZWZhdWx0XG4gICAgICAgICAgICByZXR1cm4gXCJhdXRvXCI7XG4gICAgICAgIH0sXG4gICAgICAgIExDQTogZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgaWYgKGEgPT09IGIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhICYmICFiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYiAmJiAhYSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFiICYmICFhKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gZmFzdCBjYXNlLCBhIGlzIGEgZGlyZWN0IGRlc2NlbmRhbnQgb2YgYiBvciB2aWNlIHZlcnNhXG4gICAgICAgICAgICBpZiAoYS5jb250YWlucyAmJiBhLmNvbnRhaW5zKGIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYi5jb250YWlucyAmJiBiLmNvbnRhaW5zKGEpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgYWRlcHRoID0gdGhpcy5kZXB0aChhKTtcbiAgICAgICAgICAgIHZhciBiZGVwdGggPSB0aGlzLmRlcHRoKGIpO1xuICAgICAgICAgICAgdmFyIGQgPSBhZGVwdGggLSBiZGVwdGg7XG4gICAgICAgICAgICBpZiAoZCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgYSA9IHRoaXMud2FsayhhLCBkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYiA9IHRoaXMud2FsayhiLCAtZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZSAoYSAmJiBiICYmIGEgIT09IGIpIHtcbiAgICAgICAgICAgICAgICBhID0gYS5wYXJlbnROb2RlIHx8IGEuaG9zdDtcbiAgICAgICAgICAgICAgICBiID0gYi5wYXJlbnROb2RlIHx8IGIuaG9zdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICB9LFxuICAgICAgICB3YWxrOiBmdW5jdGlvbihuLCB1KSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgbiAmJiAoaSA8IHUpOyBpKyspIHtcbiAgICAgICAgICAgICAgICBuID0gbi5wYXJlbnROb2RlIHx8IG4uaG9zdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuO1xuICAgICAgICB9LFxuICAgICAgICBkZXB0aDogZnVuY3Rpb24obikge1xuICAgICAgICAgICAgdmFyIGQgPSAwO1xuICAgICAgICAgICAgd2hpbGUgKG4pIHtcbiAgICAgICAgICAgICAgICBkKys7XG4gICAgICAgICAgICAgICAgbiA9IG4ucGFyZW50Tm9kZSB8fCBuLmhvc3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZDtcbiAgICAgICAgfSxcbiAgICAgICAgZGVlcENvbnRhaW5zOiBmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgICB2YXIgY29tbW9uID0gdGhpcy5MQ0EoYSwgYik7XG4gICAgICAgICAgICAvLyBpZiBhIGlzIHRoZSBjb21tb24gYW5jZXN0b3IsIGl0IG11c3QgXCJkZWVwbHlcIiBjb250YWluIGJcbiAgICAgICAgICAgIHJldHVybiBjb21tb24gPT09IGE7XG4gICAgICAgIH0sXG4gICAgICAgIGluc2lkZU5vZGU6IGZ1bmN0aW9uKG5vZGUsIHgsIHkpIHtcbiAgICAgICAgICAgIHZhciByZWN0ID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIHJldHVybiAocmVjdC5sZWZ0IDw9IHgpICYmICh4IDw9IHJlY3QucmlnaHQpICYmIChyZWN0LnRvcCA8PSB5KSAmJiAoeSA8PSByZWN0LmJvdHRvbSk7XG4gICAgICAgIH0sXG4gICAgICAgIHBhdGg6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgcDtcbiAgICAgICAgICAgIGlmIChoYXNGdWxsUGF0aCAmJiBldmVudC5wYXRoICYmIGV2ZW50LnBhdGgubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcCA9IGV2ZW50LnBhdGg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHAgPSBbXTtcbiAgICAgICAgICAgICAgICB2YXIgbiA9IHRoaXMuZmluZFRhcmdldChldmVudCk7XG4gICAgICAgICAgICAgICAgd2hpbGUgKG4pIHtcbiAgICAgICAgICAgICAgICAgICAgcC5wdXNoKG4pO1xuICAgICAgICAgICAgICAgICAgICBuID0gbi5wYXJlbnROb2RlIHx8IG4uaG9zdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgc2NvcGUudGFyZ2V0RmluZGluZyA9IHRhcmdldDtcbiAgICAvKipcbiAgICAgKiBHaXZlbiBhbiBldmVudCwgZmluZHMgdGhlIFwiZGVlcGVzdFwiIG5vZGUgdGhhdCBjb3VsZCBoYXZlIGJlZW4gdGhlIG9yaWdpbmFsIHRhcmdldCBiZWZvcmUgU2hhZG93RE9NIHJldGFyZ2V0dGluZ1xuICAgICAqXG4gICAgICogQHBhcmFtIHtFdmVudH0gRXZlbnQgQW4gZXZlbnQgb2JqZWN0IHdpdGggY2xpZW50WCBhbmQgY2xpZW50WSBwcm9wZXJ0aWVzXG4gICAgICogQHJldHVybiB7RWxlbWVudH0gVGhlIHByb2JhYmxlIGV2ZW50IG9yaWduaW5hdG9yXG4gICAgICovXG4gICAgc2NvcGUuZmluZFRhcmdldCA9IHRhcmdldC5maW5kVGFyZ2V0LmJpbmQodGFyZ2V0KTtcbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBcImNvbnRhaW5lclwiIG5vZGUgZGVlcGx5IGNvbnRhaW5zIHRoZSBcImNvbnRhaW5lZVwiIG5vZGUsIGluY2x1ZGluZyBzaXR1YXRpb25zIHdoZXJlIHRoZSBcImNvbnRhaW5lZVwiIGlzIGNvbnRhaW5lZCBieSBvbmUgb3IgbW9yZSBTaGFkb3dET01cbiAgICAgKiByb290cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Tm9kZX0gY29udGFpbmVyXG4gICAgICogQHBhcmFtIHtOb2RlfSBjb250YWluZWVcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIHNjb3BlLmRlZXBDb250YWlucyA9IHRhcmdldC5kZWVwQ29udGFpbnMuYmluZCh0YXJnZXQpO1xuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyBpZiB0aGUgeC95IHBvc2l0aW9uIGlzIGluc2lkZSB0aGUgZ2l2ZW4gbm9kZS5cbiAgICAgKlxuICAgICAqIEV4YW1wbGU6XG4gICAgICpcbiAgICAgKiAgICAgZnVuY3Rpb24gdXBIYW5kbGVyKGV2ZW50KSB7XG4gICAgICogICAgICAgdmFyIGlubm9kZSA9IFBvbHltZXJHZXN0dXJlcy5pbnNpZGVOb2RlKGV2ZW50LnRhcmdldCwgZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgICogICAgICAgaWYgKGlubm9kZSkge1xuICAgICAqICAgICAgICAgLy8gd2FpdCBmb3IgdGFwP1xuICAgICAqICAgICAgIH0gZWxzZSB7XG4gICAgICogICAgICAgICAvLyB0YXAgd2lsbCBuZXZlciBoYXBwZW5cbiAgICAgKiAgICAgICB9XG4gICAgICogICAgIH1cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB4IFNjcmVlbiBYIHBvc2l0aW9uXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHkgc2NyZWVuIFkgcG9zaXRpb25cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIHNjb3BlLmluc2lkZU5vZGUgPSB0YXJnZXQuaW5zaWRlTm9kZTtcblxufSkoZXhwb3J0cyk7XG5cbihmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBzaGFkb3dTZWxlY3Rvcih2KSB7XG4gICAgICAgIHJldHVybiAnaHRtbCAvZGVlcC8gJyArIHNlbGVjdG9yKHYpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNlbGVjdG9yKHYpIHtcbiAgICAgICAgcmV0dXJuICdbdG91Y2gtYWN0aW9uPVwiJyArIHYgKyAnXCJdJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydWxlKHYpIHtcbiAgICAgICAgcmV0dXJuICd7IC1tcy10b3VjaC1hY3Rpb246ICcgKyB2ICsgJzsgdG91Y2gtYWN0aW9uOiAnICsgdiArICc7fSc7XG4gICAgfVxuICAgIHZhciBhdHRyaWIyY3NzID0gW1xuICAgICAgICAnbm9uZScsXG4gICAgICAgICdhdXRvJyxcbiAgICAgICAgJ3Bhbi14JyxcbiAgICAgICAgJ3Bhbi15Jywge1xuICAgICAgICAgICAgcnVsZTogJ3Bhbi14IHBhbi15JyxcbiAgICAgICAgICAgIHNlbGVjdG9yczogW1xuICAgICAgICAgICAgICAgICdwYW4teCBwYW4teScsXG4gICAgICAgICAgICAgICAgJ3Bhbi15IHBhbi14J1xuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICAnbWFuaXB1bGF0aW9uJ1xuICAgIF07XG4gICAgdmFyIHN0eWxlcyA9ICcnO1xuICAgIC8vIG9ubHkgaW5zdGFsbCBzdHlsZXNoZWV0IGlmIHRoZSBicm93c2VyIGhhcyB0b3VjaCBhY3Rpb24gc3VwcG9ydFxuICAgIHZhciBoYXNUb3VjaEFjdGlvbiA9IHR5cGVvZiBkb2N1bWVudC5oZWFkLnN0eWxlLnRvdWNoQWN0aW9uID09PSAnc3RyaW5nJztcbiAgICAvLyBvbmx5IGFkZCBzaGFkb3cgc2VsZWN0b3JzIGlmIHNoYWRvd2RvbSBpcyBzdXBwb3J0ZWRcbiAgICB2YXIgaGFzU2hhZG93Um9vdCA9ICF3aW5kb3cuU2hhZG93RE9NUG9seWZpbGwgJiYgZG9jdW1lbnQuaGVhZC5jcmVhdGVTaGFkb3dSb290O1xuXG4gICAgaWYgKGhhc1RvdWNoQWN0aW9uKSB7XG4gICAgICAgIGF0dHJpYjJjc3MuZm9yRWFjaChmdW5jdGlvbihyKSB7XG4gICAgICAgICAgICBpZiAoU3RyaW5nKHIpID09PSByKSB7XG4gICAgICAgICAgICAgICAgc3R5bGVzICs9IHNlbGVjdG9yKHIpICsgcnVsZShyKSArICdcXG4nO1xuICAgICAgICAgICAgICAgIGlmIChoYXNTaGFkb3dSb290KSB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlcyArPSBzaGFkb3dTZWxlY3RvcihyKSArIHJ1bGUocikgKyAnXFxuJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0eWxlcyArPSByLnNlbGVjdG9ycy5tYXAoc2VsZWN0b3IpICsgcnVsZShyLnJ1bGUpICsgJ1xcbic7XG4gICAgICAgICAgICAgICAgaWYgKGhhc1NoYWRvd1Jvb3QpIHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVzICs9IHIuc2VsZWN0b3JzLm1hcChzaGFkb3dTZWxlY3RvcikgKyBydWxlKHIucnVsZSkgKyAnXFxuJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgIGVsLnRleHRDb250ZW50ID0gc3R5bGVzO1xuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGVsKTtcbiAgICB9XG59KSgpO1xuXG4vKipcbiAqIFRoaXMgaXMgdGhlIGNvbnN0cnVjdG9yIGZvciBuZXcgUG9pbnRlckV2ZW50cy5cbiAqXG4gKiBOZXcgUG9pbnRlciBFdmVudHMgbXVzdCBiZSBnaXZlbiBhIHR5cGUsIGFuZCBhbiBvcHRpb25hbCBkaWN0aW9uYXJ5IG9mXG4gKiBpbml0aWFsaXphdGlvbiBwcm9wZXJ0aWVzLlxuICpcbiAqIER1ZSB0byBjZXJ0YWluIHBsYXRmb3JtIHJlcXVpcmVtZW50cywgZXZlbnRzIHJldHVybmVkIGZyb20gdGhlIGNvbnN0cnVjdG9yXG4gKiBpZGVudGlmeSBhcyBNb3VzZUV2ZW50cy5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7U3RyaW5nfSBpblR5cGUgVGhlIHR5cGUgb2YgdGhlIGV2ZW50IHRvIGNyZWF0ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbaW5EaWN0XSBBbiBvcHRpb25hbCBkaWN0aW9uYXJ5IG9mIGluaXRpYWwgZXZlbnQgcHJvcGVydGllcy5cbiAqIEByZXR1cm4ge0V2ZW50fSBBIG5ldyBQb2ludGVyRXZlbnQgb2YgdHlwZSBgaW5UeXBlYCBhbmQgaW5pdGlhbGl6ZWQgd2l0aCBwcm9wZXJ0aWVzIGZyb20gYGluRGljdGAuXG4gKi9cbihmdW5jdGlvbihzY29wZSkge1xuXG4gICAgdmFyIE1PVVNFX1BST1BTID0gW1xuICAgICAgICAnYnViYmxlcycsXG4gICAgICAgICdjYW5jZWxhYmxlJyxcbiAgICAgICAgJ3ZpZXcnLFxuICAgICAgICAnZGV0YWlsJyxcbiAgICAgICAgJ3NjcmVlblgnLFxuICAgICAgICAnc2NyZWVuWScsXG4gICAgICAgICdjbGllbnRYJyxcbiAgICAgICAgJ2NsaWVudFknLFxuICAgICAgICAnY3RybEtleScsXG4gICAgICAgICdhbHRLZXknLFxuICAgICAgICAnc2hpZnRLZXknLFxuICAgICAgICAnbWV0YUtleScsXG4gICAgICAgICdidXR0b24nLFxuICAgICAgICAncmVsYXRlZFRhcmdldCcsXG4gICAgICAgICdwYWdlWCcsXG4gICAgICAgICdwYWdlWSdcbiAgICBdO1xuXG4gICAgdmFyIE1PVVNFX0RFRkFVTFRTID0gW1xuICAgICAgICBmYWxzZSxcbiAgICAgICAgZmFsc2UsXG4gICAgICAgIG51bGwsXG4gICAgICAgIG51bGwsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIGZhbHNlLFxuICAgICAgICBmYWxzZSxcbiAgICAgICAgZmFsc2UsXG4gICAgICAgIGZhbHNlLFxuICAgICAgICAwLFxuICAgICAgICBudWxsLFxuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXTtcblxuICAgIHZhciBOT1BfRkFDVE9SWSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7fTtcbiAgICB9O1xuXG4gICAgdmFyIGV2ZW50RmFjdG9yeSA9IHtcbiAgICAgICAgLy8gVE9ETyhkZnJlZWRtKTogdGhpcyBpcyBvdmVycmlkZGVuIGJ5IHRhcCByZWNvZ25pemVyLCBuZWVkcyByZXZpZXdcbiAgICAgICAgcHJldmVudFRhcDogTk9QX0ZBQ1RPUlksXG4gICAgICAgIG1ha2VCYXNlRXZlbnQ6IGZ1bmN0aW9uKGluVHlwZSwgaW5EaWN0KSB7XG4gICAgICAgICAgICB2YXIgZSA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgICAgICAgICAgZS5pbml0RXZlbnQoaW5UeXBlLCBpbkRpY3QuYnViYmxlcyB8fCBmYWxzZSwgaW5EaWN0LmNhbmNlbGFibGUgfHwgZmFsc2UpO1xuICAgICAgICAgICAgZS5wcmV2ZW50VGFwID0gZXZlbnRGYWN0b3J5LnByZXZlbnRUYXAoZSk7XG4gICAgICAgICAgICByZXR1cm4gZTtcbiAgICAgICAgfSxcbiAgICAgICAgbWFrZUdlc3R1cmVFdmVudDogZnVuY3Rpb24oaW5UeXBlLCBpbkRpY3QpIHtcbiAgICAgICAgICAgIGluRGljdCA9IGluRGljdCB8fCBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gICAgICAgICAgICB2YXIgZSA9IHRoaXMubWFrZUJhc2VFdmVudChpblR5cGUsIGluRGljdCk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwga2V5cyA9IE9iamVjdC5rZXlzKGluRGljdCksIGs7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgayA9IGtleXNbaV07XG4gICAgICAgICAgICAgICAgaWYgKGsgIT09ICdidWJibGVzJyAmJiBrICE9PSAnY2FuY2VsYWJsZScpIHtcbiAgICAgICAgICAgICAgICAgICAgZVtrXSA9IGluRGljdFtrXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZTtcbiAgICAgICAgfSxcbiAgICAgICAgbWFrZVBvaW50ZXJFdmVudDogZnVuY3Rpb24oaW5UeXBlLCBpbkRpY3QpIHtcbiAgICAgICAgICAgIGluRGljdCA9IGluRGljdCB8fCBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gICAgICAgICAgICB2YXIgZSA9IHRoaXMubWFrZUJhc2VFdmVudChpblR5cGUsIGluRGljdCk7XG4gICAgICAgICAgICAvLyBkZWZpbmUgaW5oZXJpdGVkIE1vdXNlRXZlbnQgcHJvcGVydGllc1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDIsIHA7IGkgPCBNT1VTRV9QUk9QUy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHAgPSBNT1VTRV9QUk9QU1tpXTtcbiAgICAgICAgICAgICAgICBlW3BdID0gaW5EaWN0W3BdIHx8IE1PVVNFX0RFRkFVTFRTW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZS5idXR0b25zID0gaW5EaWN0LmJ1dHRvbnMgfHwgMDtcblxuICAgICAgICAgICAgLy8gU3BlYyByZXF1aXJlcyB0aGF0IHBvaW50ZXJzIHdpdGhvdXQgcHJlc3N1cmUgc3BlY2lmaWVkIHVzZSAwLjUgZm9yIGRvd25cbiAgICAgICAgICAgIC8vIHN0YXRlIGFuZCAwIGZvciB1cCBzdGF0ZS5cbiAgICAgICAgICAgIHZhciBwcmVzc3VyZSA9IDA7XG4gICAgICAgICAgICBpZiAoaW5EaWN0LnByZXNzdXJlKSB7XG4gICAgICAgICAgICAgICAgcHJlc3N1cmUgPSBpbkRpY3QucHJlc3N1cmU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHByZXNzdXJlID0gZS5idXR0b25zID8gMC41IDogMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gYWRkIHgveSBwcm9wZXJ0aWVzIGFsaWFzZWQgdG8gY2xpZW50WC9ZXG4gICAgICAgICAgICBlLnggPSBlLmNsaWVudFg7XG4gICAgICAgICAgICBlLnkgPSBlLmNsaWVudFk7XG5cbiAgICAgICAgICAgIC8vIGRlZmluZSB0aGUgcHJvcGVydGllcyBvZiB0aGUgUG9pbnRlckV2ZW50IGludGVyZmFjZVxuICAgICAgICAgICAgZS5wb2ludGVySWQgPSBpbkRpY3QucG9pbnRlcklkIHx8IDA7XG4gICAgICAgICAgICBlLndpZHRoID0gaW5EaWN0LndpZHRoIHx8IDA7XG4gICAgICAgICAgICBlLmhlaWdodCA9IGluRGljdC5oZWlnaHQgfHwgMDtcbiAgICAgICAgICAgIGUucHJlc3N1cmUgPSBwcmVzc3VyZTtcbiAgICAgICAgICAgIGUudGlsdFggPSBpbkRpY3QudGlsdFggfHwgMDtcbiAgICAgICAgICAgIGUudGlsdFkgPSBpbkRpY3QudGlsdFkgfHwgMDtcbiAgICAgICAgICAgIGUucG9pbnRlclR5cGUgPSBpbkRpY3QucG9pbnRlclR5cGUgfHwgJyc7XG4gICAgICAgICAgICBlLmh3VGltZXN0YW1wID0gaW5EaWN0Lmh3VGltZXN0YW1wIHx8IDA7XG4gICAgICAgICAgICBlLmlzUHJpbWFyeSA9IGluRGljdC5pc1ByaW1hcnkgfHwgZmFsc2U7XG4gICAgICAgICAgICBlLl9zb3VyY2UgPSBpbkRpY3QuX3NvdXJjZSB8fCAnJztcbiAgICAgICAgICAgIHJldHVybiBlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHNjb3BlLmV2ZW50RmFjdG9yeSA9IGV2ZW50RmFjdG9yeTtcbn0pKGV4cG9ydHMpO1xuXG4vKipcbiAqIFRoaXMgbW9kdWxlIGltcGxlbWVudHMgYW4gbWFwIG9mIHBvaW50ZXIgc3RhdGVzXG4gKi9cbihmdW5jdGlvbihzY29wZSkge1xuICAgIHZhciBVU0VfTUFQID0gd2luZG93Lk1hcCAmJiB3aW5kb3cuTWFwLnByb3RvdHlwZS5mb3JFYWNoO1xuICAgIHZhciBQT0lOVEVSU19GTiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zaXplO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBQb2ludGVyTWFwKCkge1xuICAgICAgICBpZiAoVVNFX01BUCkge1xuICAgICAgICAgICAgdmFyIG0gPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICBtLnBvaW50ZXJzID0gUE9JTlRFUlNfRk47XG4gICAgICAgICAgICByZXR1cm4gbTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMua2V5cyA9IFtdO1xuICAgICAgICAgICAgdGhpcy52YWx1ZXMgPSBbXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIFBvaW50ZXJNYXAucHJvdG90eXBlID0ge1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uKGluSWQsIGluRXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBpID0gdGhpcy5rZXlzLmluZGV4T2YoaW5JZCk7XG4gICAgICAgICAgICBpZiAoaSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZXNbaV0gPSBpbkV2ZW50O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmtleXMucHVzaChpbklkKTtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlcy5wdXNoKGluRXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBoYXM6IGZ1bmN0aW9uKGluSWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmtleXMuaW5kZXhPZihpbklkKSA+IC0xO1xuICAgICAgICB9LFxuICAgICAgICAnZGVsZXRlJzogZnVuY3Rpb24oaW5JZCkge1xuICAgICAgICAgICAgdmFyIGkgPSB0aGlzLmtleXMuaW5kZXhPZihpbklkKTtcbiAgICAgICAgICAgIGlmIChpID4gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmtleXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbihpbklkKSB7XG4gICAgICAgICAgICB2YXIgaSA9IHRoaXMua2V5cy5pbmRleE9mKGluSWQpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVzW2ldO1xuICAgICAgICB9LFxuICAgICAgICBjbGVhcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLmtleXMubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIHRoaXMudmFsdWVzLmxlbmd0aCA9IDA7XG4gICAgICAgIH0sXG4gICAgICAgIC8vIHJldHVybiB2YWx1ZSwga2V5LCBtYXBcbiAgICAgICAgZm9yRWFjaDogZnVuY3Rpb24oY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWVzLmZvckVhY2goZnVuY3Rpb24odiwgaSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgdiwgdGhpcy5rZXlzW2ldLCB0aGlzKTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB9LFxuICAgICAgICBwb2ludGVyczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5rZXlzLmxlbmd0aDtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBzY29wZS5Qb2ludGVyTWFwID0gUG9pbnRlck1hcDtcbn0pKGV4cG9ydHMpO1xuXG4oZnVuY3Rpb24oc2NvcGUpIHtcbiAgICB2YXIgQ0xPTkVfUFJPUFMgPSBbXG4gICAgICAgIC8vIE1vdXNlRXZlbnRcbiAgICAgICAgJ2J1YmJsZXMnLFxuICAgICAgICAnY2FuY2VsYWJsZScsXG4gICAgICAgICd2aWV3JyxcbiAgICAgICAgJ2RldGFpbCcsXG4gICAgICAgICdzY3JlZW5YJyxcbiAgICAgICAgJ3NjcmVlblknLFxuICAgICAgICAnY2xpZW50WCcsXG4gICAgICAgICdjbGllbnRZJyxcbiAgICAgICAgJ2N0cmxLZXknLFxuICAgICAgICAnYWx0S2V5JyxcbiAgICAgICAgJ3NoaWZ0S2V5JyxcbiAgICAgICAgJ21ldGFLZXknLFxuICAgICAgICAnYnV0dG9uJyxcbiAgICAgICAgJ3JlbGF0ZWRUYXJnZXQnLFxuICAgICAgICAvLyBET00gTGV2ZWwgM1xuICAgICAgICAnYnV0dG9ucycsXG4gICAgICAgIC8vIFBvaW50ZXJFdmVudFxuICAgICAgICAncG9pbnRlcklkJyxcbiAgICAgICAgJ3dpZHRoJyxcbiAgICAgICAgJ2hlaWdodCcsXG4gICAgICAgICdwcmVzc3VyZScsXG4gICAgICAgICd0aWx0WCcsXG4gICAgICAgICd0aWx0WScsXG4gICAgICAgICdwb2ludGVyVHlwZScsXG4gICAgICAgICdod1RpbWVzdGFtcCcsXG4gICAgICAgICdpc1ByaW1hcnknLFxuICAgICAgICAvLyBldmVudCBpbnN0YW5jZVxuICAgICAgICAndHlwZScsXG4gICAgICAgICd0YXJnZXQnLFxuICAgICAgICAnY3VycmVudFRhcmdldCcsXG4gICAgICAgICd3aGljaCcsXG4gICAgICAgICdwYWdlWCcsXG4gICAgICAgICdwYWdlWScsXG4gICAgICAgICd0aW1lU3RhbXAnLFxuICAgICAgICAvLyBnZXN0dXJlIGFkZG9uc1xuICAgICAgICAncHJldmVudFRhcCcsXG4gICAgICAgICd0YXBQcmV2ZW50ZWQnLFxuICAgICAgICAnX3NvdXJjZSdcbiAgICBdO1xuXG4gICAgdmFyIENMT05FX0RFRkFVTFRTID0gW1xuICAgICAgICAvLyBNb3VzZUV2ZW50XG4gICAgICAgIGZhbHNlLFxuICAgICAgICBmYWxzZSxcbiAgICAgICAgbnVsbCxcbiAgICAgICAgbnVsbCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgZmFsc2UsXG4gICAgICAgIGZhbHNlLFxuICAgICAgICBmYWxzZSxcbiAgICAgICAgZmFsc2UsXG4gICAgICAgIDAsXG4gICAgICAgIG51bGwsXG4gICAgICAgIC8vIERPTSBMZXZlbCAzXG4gICAgICAgIDAsXG4gICAgICAgIC8vIFBvaW50ZXJFdmVudFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAnJyxcbiAgICAgICAgMCxcbiAgICAgICAgZmFsc2UsXG4gICAgICAgIC8vIGV2ZW50IGluc3RhbmNlXG4gICAgICAgICcnLFxuICAgICAgICBudWxsLFxuICAgICAgICBudWxsLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICBmdW5jdGlvbigpIHt9LFxuICAgICAgICBmYWxzZVxuICAgIF07XG5cbiAgICB2YXIgSEFTX1NWR19JTlNUQU5DRSA9ICh0eXBlb2YgU1ZHRWxlbWVudEluc3RhbmNlICE9PSAndW5kZWZpbmVkJyk7XG5cbiAgICB2YXIgZXZlbnRGYWN0b3J5ID0gc2NvcGUuZXZlbnRGYWN0b3J5O1xuXG4gICAgLy8gc2V0IG9mIHJlY29nbml6ZXJzIHRvIHJ1biBmb3IgdGhlIGN1cnJlbnRseSBoYW5kbGVkIGV2ZW50XG4gICAgdmFyIGN1cnJlbnRHZXN0dXJlcztcblxuICAgIC8qKlxuICAgICAqIFRoaXMgbW9kdWxlIGlzIGZvciBub3JtYWxpemluZyBldmVudHMuIE1vdXNlIGFuZCBUb3VjaCBldmVudHMgd2lsbCBiZVxuICAgICAqIGNvbGxlY3RlZCBoZXJlLCBhbmQgZmlyZSBQb2ludGVyRXZlbnRzIHRoYXQgaGF2ZSB0aGUgc2FtZSBzZW1hbnRpY3MsIG5vXG4gICAgICogbWF0dGVyIHRoZSBzb3VyY2UuXG4gICAgICogRXZlbnRzIGZpcmVkOlxuICAgICAqICAgLSBwb2ludGVyZG93bjogYSBwb2ludGluZyBpcyBhZGRlZFxuICAgICAqICAgLSBwb2ludGVydXA6IGEgcG9pbnRlciBpcyByZW1vdmVkXG4gICAgICogICAtIHBvaW50ZXJtb3ZlOiBhIHBvaW50ZXIgaXMgbW92ZWRcbiAgICAgKiAgIC0gcG9pbnRlcm92ZXI6IGEgcG9pbnRlciBjcm9zc2VzIGludG8gYW4gZWxlbWVudFxuICAgICAqICAgLSBwb2ludGVyb3V0OiBhIHBvaW50ZXIgbGVhdmVzIGFuIGVsZW1lbnRcbiAgICAgKiAgIC0gcG9pbnRlcmNhbmNlbDogYSBwb2ludGVyIHdpbGwgbm8gbG9uZ2VyIGdlbmVyYXRlIGV2ZW50c1xuICAgICAqL1xuICAgIHZhciBkaXNwYXRjaGVyID0ge1xuICAgICAgICBJU19JT1M6IGZhbHNlLFxuICAgICAgICBwb2ludGVybWFwOiBuZXcgc2NvcGUuUG9pbnRlck1hcCgpLFxuICAgICAgICByZXF1aXJlZEdlc3R1cmVzOiBuZXcgc2NvcGUuUG9pbnRlck1hcCgpLFxuICAgICAgICBldmVudE1hcDogT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgICAgLy8gU2NvcGUgb2JqZWN0cyBmb3IgbmF0aXZlIGV2ZW50cy5cbiAgICAgICAgLy8gVGhpcyBleGlzdHMgZm9yIGVhc2Ugb2YgdGVzdGluZy5cbiAgICAgICAgZXZlbnRTb3VyY2VzOiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgICBldmVudFNvdXJjZUxpc3Q6IFtdLFxuICAgICAgICBnZXN0dXJlczogW10sXG4gICAgICAgIC8vIG1hcCBnZXN0dXJlIGV2ZW50IC0+IHtsaXN0ZW5lcnM6IGludCwgaW5kZXg6IGdlc3R1cmVzW2ludF19XG4gICAgICAgIGRlcGVuZGVuY3lNYXA6IHtcbiAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSBkb3duIGFuZCB1cCBhcmUgaW4gdGhlIG1hcCB0byB0cmlnZ2VyIFwicmVnaXN0ZXJcIlxuICAgICAgICAgICAgZG93bjoge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyczogMCxcbiAgICAgICAgICAgICAgICBpbmRleDogLTFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cDoge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyczogMCxcbiAgICAgICAgICAgICAgICBpbmRleDogLTFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZ2VzdHVyZVF1ZXVlOiBbXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZCBhIG5ldyBldmVudCBzb3VyY2UgdGhhdCB3aWxsIGdlbmVyYXRlIHBvaW50ZXIgZXZlbnRzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBgaW5Tb3VyY2VgIG11c3QgY29udGFpbiBhbiBhcnJheSBvZiBldmVudCBuYW1lcyBuYW1lZCBgZXZlbnRzYCwgYW5kXG4gICAgICAgICAqIGZ1bmN0aW9ucyB3aXRoIHRoZSBuYW1lcyBzcGVjaWZpZWQgaW4gdGhlIGBldmVudHNgIGFycmF5LlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBBIG5hbWUgZm9yIHRoZSBldmVudCBzb3VyY2VcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBBIG5ldyBzb3VyY2Ugb2YgcGxhdGZvcm0gZXZlbnRzLlxuICAgICAgICAgKi9cbiAgICAgICAgcmVnaXN0ZXJTb3VyY2U6IGZ1bmN0aW9uKG5hbWUsIHNvdXJjZSkge1xuICAgICAgICAgICAgdmFyIHMgPSBzb3VyY2U7XG4gICAgICAgICAgICB2YXIgbmV3RXZlbnRzID0gcy5ldmVudHM7XG4gICAgICAgICAgICBpZiAobmV3RXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgbmV3RXZlbnRzLmZvckVhY2goZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc1tlXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudE1hcFtlXSA9IHNbZV0uYmluZChzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRTb3VyY2VzW25hbWVdID0gcztcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50U291cmNlTGlzdC5wdXNoKHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICByZWdpc3Rlckdlc3R1cmU6IGZ1bmN0aW9uKG5hbWUsIHNvdXJjZSkge1xuICAgICAgICAgICAgdmFyIG9iaiA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgICBvYmoubGlzdGVuZXJzID0gMDtcbiAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuZ2VzdHVyZXMubGVuZ3RoO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGc7IGkgPCBzb3VyY2UuZXhwb3Nlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGcgPSBzb3VyY2UuZXhwb3Nlc1tpXS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGVwZW5kZW5jeU1hcFtnXSA9IG9iajtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZ2VzdHVyZXMucHVzaChzb3VyY2UpO1xuICAgICAgICB9LFxuICAgICAgICByZWdpc3RlcjogZnVuY3Rpb24oZWxlbWVudCwgaW5pdGlhbCkge1xuICAgICAgICAgICAgdmFyIGwgPSB0aGlzLmV2ZW50U291cmNlTGlzdC5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgZXM7XG4gICAgICAgICAgICAgICAgKGkgPCBsKSAmJiAoZXMgPSB0aGlzLmV2ZW50U291cmNlTGlzdFtpXSk7IGkrKykge1xuICAgICAgICAgICAgICAgIC8vIGNhbGwgZXZlbnRzb3VyY2UgcmVnaXN0ZXJcbiAgICAgICAgICAgICAgICBlcy5yZWdpc3Rlci5jYWxsKGVzLCBlbGVtZW50LCBpbml0aWFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdW5yZWdpc3RlcjogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICAgICAgdmFyIGwgPSB0aGlzLmV2ZW50U291cmNlTGlzdC5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgZXM7XG4gICAgICAgICAgICAgICAgKGkgPCBsKSAmJiAoZXMgPSB0aGlzLmV2ZW50U291cmNlTGlzdFtpXSk7IGkrKykge1xuICAgICAgICAgICAgICAgIC8vIGNhbGwgZXZlbnRzb3VyY2UgcmVnaXN0ZXJcbiAgICAgICAgICAgICAgICBlcy51bnJlZ2lzdGVyLmNhbGwoZXMsIGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAvLyBFVkVOVFNcbiAgICAgICAgZG93bjogZnVuY3Rpb24oaW5FdmVudCkge1xuICAgICAgICAgICAgdGhpcy5yZXF1aXJlZEdlc3R1cmVzLnNldChpbkV2ZW50LnBvaW50ZXJJZCwgY3VycmVudEdlc3R1cmVzKTtcbiAgICAgICAgICAgIHRoaXMuZmlyZUV2ZW50KCdkb3duJywgaW5FdmVudCk7XG4gICAgICAgIH0sXG4gICAgICAgIG1vdmU6IGZ1bmN0aW9uKGluRXZlbnQpIHtcbiAgICAgICAgICAgIC8vIHBpcGUgbW92ZSBldmVudHMgaW50byBnZXN0dXJlIHF1ZXVlIGRpcmVjdGx5XG4gICAgICAgICAgICBpbkV2ZW50LnR5cGUgPSAnbW92ZSc7XG4gICAgICAgICAgICB0aGlzLmZpbGxHZXN0dXJlUXVldWUoaW5FdmVudCk7XG4gICAgICAgIH0sXG4gICAgICAgIHVwOiBmdW5jdGlvbihpbkV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLmZpcmVFdmVudCgndXAnLCBpbkV2ZW50KTtcbiAgICAgICAgICAgIHRoaXMucmVxdWlyZWRHZXN0dXJlcy5kZWxldGUoaW5FdmVudC5wb2ludGVySWQpO1xuICAgICAgICB9LFxuICAgICAgICBjYW5jZWw6IGZ1bmN0aW9uKGluRXZlbnQpIHtcbiAgICAgICAgICAgIGluRXZlbnQudGFwUHJldmVudGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZmlyZUV2ZW50KCd1cCcsIGluRXZlbnQpO1xuICAgICAgICAgICAgdGhpcy5yZXF1aXJlZEdlc3R1cmVzLmRlbGV0ZShpbkV2ZW50LnBvaW50ZXJJZCk7XG4gICAgICAgIH0sXG4gICAgICAgIGFkZEdlc3R1cmVEZXBlbmRlbmN5OiBmdW5jdGlvbihub2RlLCBjdXJyZW50R2VzdHVyZXMpIHtcbiAgICAgICAgICAgIHZhciBnZXN0dXJlc1dhbnRlZCA9IG5vZGUuX3BnRXZlbnRzO1xuICAgICAgICAgICAgaWYgKGdlc3R1cmVzV2FudGVkICYmIGN1cnJlbnRHZXN0dXJlcykge1xuICAgICAgICAgICAgICAgIHZhciBnayA9IE9iamVjdC5rZXlzKGdlc3R1cmVzV2FudGVkKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgciwgcmksIGc7IGkgPCBnay5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAvLyBnZXN0dXJlXG4gICAgICAgICAgICAgICAgICAgIGcgPSBna1tpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdlc3R1cmVzV2FudGVkW2ddID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbG9va3VwIGdlc3R1cmUgcmVjb2duaXplclxuICAgICAgICAgICAgICAgICAgICAgICAgciA9IHRoaXMuZGVwZW5kZW5jeU1hcFtnXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlY29nbml6ZXIgaW5kZXhcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpID0gciA/IHIuaW5kZXggOiAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRHZXN0dXJlc1tyaV0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAvLyBMSVNURU5FUiBMT0dJQ1xuICAgICAgICBldmVudEhhbmRsZXI6IGZ1bmN0aW9uKGluRXZlbnQpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgdXNlZCB0byBwcmV2ZW50IG11bHRpcGxlIGRpc3BhdGNoIG9mIGV2ZW50cyBmcm9tXG4gICAgICAgICAgICAvLyBwbGF0Zm9ybSBldmVudHMuIFRoaXMgY2FuIGhhcHBlbiB3aGVuIHR3byBlbGVtZW50cyBpbiBkaWZmZXJlbnQgc2NvcGVzXG4gICAgICAgICAgICAvLyBhcmUgc2V0IHVwIHRvIGNyZWF0ZSBwb2ludGVyIGV2ZW50cywgd2hpY2ggaXMgcmVsZXZhbnQgdG8gU2hhZG93IERPTS5cblxuICAgICAgICAgICAgdmFyIHR5cGUgPSBpbkV2ZW50LnR5cGU7XG5cbiAgICAgICAgICAgIC8vIG9ubHkgZ2VuZXJhdGUgdGhlIGxpc3Qgb2YgZGVzaXJlZCBldmVudHMgb24gXCJkb3duXCJcbiAgICAgICAgICAgIGlmICh0eXBlID09PSAndG91Y2hzdGFydCcgfHwgdHlwZSA9PT0gJ21vdXNlZG93bicgfHwgdHlwZSA9PT0gJ3BvaW50ZXJkb3duJyB8fCB0eXBlID09PSAnTVNQb2ludGVyRG93bicpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWluRXZlbnQuX2hhbmRsZWRCeVBHKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRHZXN0dXJlcyA9IHt9O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGluIElPUyBtb2RlLCB0aGVyZSBpcyBvbmx5IGEgbGlzdGVuZXIgb24gdGhlIGRvY3VtZW50LCBzbyB0aGlzIGlzIG5vdCByZS1lbnRyYW50XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuSVNfSU9TKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBldiA9IGluRXZlbnQ7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAndG91Y2hzdGFydCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdCA9IGluRXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzZXQgdXAgYSBmYWtlIGV2ZW50IHRvIGdpdmUgdG8gdGhlIHBhdGggYnVpbGRlclxuICAgICAgICAgICAgICAgICAgICAgICAgZXYgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiBpbkV2ZW50LnRhcmdldCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnRYOiBjdC5jbGllbnRYLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudFk6IGN0LmNsaWVudFksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogaW5FdmVudC5wYXRoXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIHVzZSBldmVudCBwYXRoIGlmIGF2YWlsYWJsZSwgb3RoZXJ3aXNlIGJ1aWxkIGEgcGF0aCBmcm9tIHRhcmdldCBmaW5kaW5nXG4gICAgICAgICAgICAgICAgICAgIHZhciBub2RlcyA9IGluRXZlbnQucGF0aCB8fCBzY29wZS50YXJnZXRGaW5kaW5nLnBhdGgoZXYpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbjsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuID0gbm9kZXNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEdlc3R1cmVEZXBlbmRlbmN5KG4sIGN1cnJlbnRHZXN0dXJlcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEdlc3R1cmVEZXBlbmRlbmN5KGluRXZlbnQuY3VycmVudFRhcmdldCwgY3VycmVudEdlc3R1cmVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpbkV2ZW50Ll9oYW5kbGVkQnlQRykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBmbiA9IHRoaXMuZXZlbnRNYXAgJiYgdGhpcy5ldmVudE1hcFt0eXBlXTtcbiAgICAgICAgICAgIGlmIChmbikge1xuICAgICAgICAgICAgICAgIGZuKGluRXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5FdmVudC5faGFuZGxlZEJ5UEcgPSB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICAvLyBzZXQgdXAgZXZlbnQgbGlzdGVuZXJzXG4gICAgICAgIGxpc3RlbjogZnVuY3Rpb24odGFyZ2V0LCBldmVudHMpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gZXZlbnRzLmxlbmd0aCwgZTtcbiAgICAgICAgICAgICAgICAoaSA8IGwpICYmIChlID0gZXZlbnRzW2ldKTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRFdmVudCh0YXJnZXQsIGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAvLyByZW1vdmUgZXZlbnQgbGlzdGVuZXJzXG4gICAgICAgIHVubGlzdGVuOiBmdW5jdGlvbih0YXJnZXQsIGV2ZW50cykge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBldmVudHMubGVuZ3RoLCBlO1xuICAgICAgICAgICAgICAgIChpIDwgbCkgJiYgKGUgPSBldmVudHNbaV0pOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50KHRhcmdldCwgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGFkZEV2ZW50OiBmdW5jdGlvbih0YXJnZXQsIGV2ZW50TmFtZSkge1xuICAgICAgICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCB0aGlzLmJvdW5kSGFuZGxlcik7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbW92ZUV2ZW50OiBmdW5jdGlvbih0YXJnZXQsIGV2ZW50TmFtZSkge1xuICAgICAgICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCB0aGlzLmJvdW5kSGFuZGxlcik7XG4gICAgICAgIH0sXG4gICAgICAgIC8vIEVWRU5UIENSRUFUSU9OIEFORCBUUkFDS0lOR1xuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlcyBhIG5ldyBFdmVudCBvZiB0eXBlIGBpblR5cGVgLCBiYXNlZCBvbiB0aGUgaW5mb3JtYXRpb24gaW5cbiAgICAgICAgICogYGluRXZlbnRgLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW5UeXBlIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgdHlwZSBvZiBldmVudCB0byBjcmVhdGVcbiAgICAgICAgICogQHBhcmFtIHtFdmVudH0gaW5FdmVudCBBIHBsYXRmb3JtIGV2ZW50IHdpdGggYSB0YXJnZXRcbiAgICAgICAgICogQHJldHVybiB7RXZlbnR9IEEgUG9pbnRlckV2ZW50IG9mIHR5cGUgYGluVHlwZWBcbiAgICAgICAgICovXG4gICAgICAgIG1ha2VFdmVudDogZnVuY3Rpb24oaW5UeXBlLCBpbkV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgZSA9IGV2ZW50RmFjdG9yeS5tYWtlUG9pbnRlckV2ZW50KGluVHlwZSwgaW5FdmVudCk7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0ID0gaW5FdmVudC5wcmV2ZW50RGVmYXVsdDtcbiAgICAgICAgICAgIGUudGFwUHJldmVudGVkID0gaW5FdmVudC50YXBQcmV2ZW50ZWQ7XG4gICAgICAgICAgICBlLl90YXJnZXQgPSBlLl90YXJnZXQgfHwgaW5FdmVudC50YXJnZXQ7XG4gICAgICAgICAgICByZXR1cm4gZTtcbiAgICAgICAgfSxcbiAgICAgICAgLy8gbWFrZSBhbmQgZGlzcGF0Y2ggYW4gZXZlbnQgaW4gb25lIGNhbGxcbiAgICAgICAgZmlyZUV2ZW50OiBmdW5jdGlvbihpblR5cGUsIGluRXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBlID0gdGhpcy5tYWtlRXZlbnQoaW5UeXBlLCBpbkV2ZW50KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BhdGNoRXZlbnQoZSk7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIGEgc25hcHNob3Qgb2YgaW5FdmVudCwgd2l0aCB3cml0YWJsZSBwcm9wZXJ0aWVzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0V2ZW50fSBpbkV2ZW50IEFuIGV2ZW50IHRoYXQgY29udGFpbnMgcHJvcGVydGllcyB0byBjb3B5LlxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEFuIG9iamVjdCBjb250YWluaW5nIHNoYWxsb3cgY29waWVzIG9mIGBpbkV2ZW50YCdzXG4gICAgICAgICAqICAgIHByb3BlcnRpZXMuXG4gICAgICAgICAqL1xuICAgICAgICBjbG9uZUV2ZW50OiBmdW5jdGlvbihpbkV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgZXZlbnRDb3B5ID0gT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgICAgICAgICAgICBwO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBDTE9ORV9QUk9QUy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHAgPSBDTE9ORV9QUk9QU1tpXTtcbiAgICAgICAgICAgICAgICBldmVudENvcHlbcF0gPSBpbkV2ZW50W3BdIHx8IENMT05FX0RFRkFVTFRTW2ldO1xuICAgICAgICAgICAgICAgIC8vIFdvcmsgYXJvdW5kIFNWR0luc3RhbmNlRWxlbWVudCBzaGFkb3cgdHJlZVxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgPHVzZT4gZWxlbWVudCB0aGF0IGlzIHJlcHJlc2VudGVkIGJ5IHRoZSBpbnN0YW5jZSBmb3IgU2FmYXJpLCBDaHJvbWUsIElFLlxuICAgICAgICAgICAgICAgIC8vIFRoaXMgaXMgdGhlIGJlaGF2aW9yIGltcGxlbWVudGVkIGJ5IEZpcmVmb3guXG4gICAgICAgICAgICAgICAgaWYgKHAgPT09ICd0YXJnZXQnIHx8IHAgPT09ICdyZWxhdGVkVGFyZ2V0Jykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoSEFTX1NWR19JTlNUQU5DRSAmJiBldmVudENvcHlbcF0gaW5zdGFuY2VvZiBTVkdFbGVtZW50SW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50Q29weVtwXSA9IGV2ZW50Q29weVtwXS5jb3JyZXNwb25kaW5nVXNlRWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGtlZXAgdGhlIHNlbWFudGljcyBvZiBwcmV2ZW50RGVmYXVsdFxuICAgICAgICAgICAgZXZlbnRDb3B5LnByZXZlbnREZWZhdWx0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaW5FdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBldmVudENvcHk7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEaXNwYXRjaGVzIHRoZSBldmVudCB0byBpdHMgdGFyZ2V0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0V2ZW50fSBpbkV2ZW50IFRoZSBldmVudCB0byBiZSBkaXNwYXRjaGVkLlxuICAgICAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBUcnVlIGlmIGFuIGV2ZW50IGhhbmRsZXIgcmV0dXJucyB0cnVlLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICAgICAqL1xuICAgICAgICBkaXNwYXRjaEV2ZW50OiBmdW5jdGlvbihpbkV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgdCA9IGluRXZlbnQuX3RhcmdldDtcbiAgICAgICAgICAgIGlmICh0KSB7XG4gICAgICAgICAgICAgICAgdC5kaXNwYXRjaEV2ZW50KGluRXZlbnQpO1xuICAgICAgICAgICAgICAgIC8vIGNsb25lIHRoZSBldmVudCBmb3IgdGhlIGdlc3R1cmUgc3lzdGVtIHRvIHByb2Nlc3NcbiAgICAgICAgICAgICAgICAvLyBjbG9uZSBhZnRlciBkaXNwYXRjaCB0byBwaWNrIHVwIGdlc3R1cmUgcHJldmVudGlvbiBjb2RlXG4gICAgICAgICAgICAgICAgdmFyIGNsb25lID0gdGhpcy5jbG9uZUV2ZW50KGluRXZlbnQpO1xuICAgICAgICAgICAgICAgIGNsb25lLnRhcmdldCA9IHQ7XG4gICAgICAgICAgICAgICAgdGhpcy5maWxsR2VzdHVyZVF1ZXVlKGNsb25lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZ2VzdHVyZVRyaWdnZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gcHJvY2VzcyB0aGUgZ2VzdHVyZSBxdWV1ZVxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGUsIHJnOyBpIDwgdGhpcy5nZXN0dXJlUXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBlID0gdGhpcy5nZXN0dXJlUXVldWVbaV07XG4gICAgICAgICAgICAgICAgcmcgPSBlLl9yZXF1aXJlZEdlc3R1cmVzO1xuICAgICAgICAgICAgICAgIGlmIChyZykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMCwgZywgZm47IGogPCB0aGlzLmdlc3R1cmVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvbmx5IHJ1biByZWNvZ25pemVyIGlmIGFuIGVsZW1lbnQgaW4gdGhlIHNvdXJjZSBldmVudCdzIHBhdGggaXMgbGlzdGVuaW5nIGZvciB0aG9zZSBnZXN0dXJlc1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJnW2pdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZyA9IHRoaXMuZ2VzdHVyZXNbal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4gPSBnW2UudHlwZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLmNhbGwoZywgZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5nZXN0dXJlUXVldWUubGVuZ3RoID0gMDtcbiAgICAgICAgfSxcbiAgICAgICAgZmlsbEdlc3R1cmVRdWV1ZTogZnVuY3Rpb24oZXYpIHtcbiAgICAgICAgICAgIC8vIG9ubHkgdHJpZ2dlciB0aGUgZ2VzdHVyZSBxdWV1ZSBvbmNlXG4gICAgICAgICAgICBpZiAoIXRoaXMuZ2VzdHVyZVF1ZXVlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmJvdW5kR2VzdHVyZVRyaWdnZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXYuX3JlcXVpcmVkR2VzdHVyZXMgPSB0aGlzLnJlcXVpcmVkR2VzdHVyZXMuZ2V0KGV2LnBvaW50ZXJJZCk7XG4gICAgICAgICAgICB0aGlzLmdlc3R1cmVRdWV1ZS5wdXNoKGV2KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgZGlzcGF0Y2hlci5ib3VuZEhhbmRsZXIgPSBkaXNwYXRjaGVyLmV2ZW50SGFuZGxlci5iaW5kKGRpc3BhdGNoZXIpO1xuICAgIGRpc3BhdGNoZXIuYm91bmRHZXN0dXJlVHJpZ2dlciA9IGRpc3BhdGNoZXIuZ2VzdHVyZVRyaWdnZXIuYmluZChkaXNwYXRjaGVyKTtcbiAgICBzY29wZS5kaXNwYXRjaGVyID0gZGlzcGF0Y2hlcjtcblxuICAgIC8qKlxuICAgICAqIExpc3RlbiBmb3IgYGdlc3R1cmVgIG9uIGBub2RlYCB3aXRoIHRoZSBgaGFuZGxlcmAgZnVuY3Rpb25cbiAgICAgKlxuICAgICAqIElmIGBoYW5kbGVyYCBpcyB0aGUgZmlyc3QgbGlzdGVuZXIgZm9yIGBnZXN0dXJlYCwgdGhlIHVuZGVybHlpbmcgZ2VzdHVyZSByZWNvZ25pemVyIGlzIHRoZW4gZW5hYmxlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gbm9kZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBnZXN0dXJlXG4gICAgICogQHJldHVybiBCb29sZWFuIGBnZXN0dXJlYCBpcyBhIHZhbGlkIGdlc3R1cmVcbiAgICAgKi9cbiAgICBzY29wZS5hY3RpdmF0ZUdlc3R1cmUgPSBmdW5jdGlvbihub2RlLCBnZXN0dXJlKSB7XG4gICAgICAgIHZhciBnID0gZ2VzdHVyZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB2YXIgZGVwID0gZGlzcGF0Y2hlci5kZXBlbmRlbmN5TWFwW2ddO1xuICAgICAgICBpZiAoZGVwKSB7XG4gICAgICAgICAgICB2YXIgcmVjb2duaXplciA9IGRpc3BhdGNoZXIuZ2VzdHVyZXNbZGVwLmluZGV4XTtcbiAgICAgICAgICAgIGlmICghbm9kZS5fcGdMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKG5vZGUpO1xuICAgICAgICAgICAgICAgIG5vZGUuX3BnTGlzdGVuZXJzID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFRPRE8oZGZyZWVkbSk6IHJlLWV2YWx1YXRlIGJvb2trZWVwaW5nIHRvIGF2b2lkIHVzaW5nIGF0dHJpYnV0ZXNcbiAgICAgICAgICAgIGlmIChyZWNvZ25pemVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRvdWNoQWN0aW9uID0gcmVjb2duaXplci5kZWZhdWx0QWN0aW9ucyAmJiByZWNvZ25pemVyLmRlZmF1bHRBY3Rpb25zW2ddO1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb25Ob2RlO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAobm9kZS5ub2RlVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIE5vZGUuRUxFTUVOVF9OT0RFOlxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uTm9kZSA9IG5vZGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBOb2RlLkRPQ1VNRU5UX0ZSQUdNRU5UX05PREU6XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25Ob2RlID0gbm9kZS5ob3N0O1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25Ob2RlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodG91Y2hBY3Rpb24gJiYgYWN0aW9uTm9kZSAmJiAhYWN0aW9uTm9kZS5oYXNBdHRyaWJ1dGUoJ3RvdWNoLWFjdGlvbicpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbk5vZGUuc2V0QXR0cmlidXRlKCd0b3VjaC1hY3Rpb24nLCB0b3VjaEFjdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFub2RlLl9wZ0V2ZW50cykge1xuICAgICAgICAgICAgICAgIG5vZGUuX3BnRXZlbnRzID0ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlLl9wZ0V2ZW50c1tnXSA9IChub2RlLl9wZ0V2ZW50c1tnXSB8fCAwKSArIDE7XG4gICAgICAgICAgICBub2RlLl9wZ0xpc3RlbmVycysrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBCb29sZWFuKGRlcCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogTGlzdGVuIGZvciBgZ2VzdHVyZWAgZnJvbSBgbm9kZWAgd2l0aCBgaGFuZGxlcmAgZnVuY3Rpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IG5vZGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZ2VzdHVyZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXJcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGNhcHR1cmVcbiAgICAgKi9cbiAgICBzY29wZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24obm9kZSwgZ2VzdHVyZSwgaGFuZGxlciwgY2FwdHVyZSkge1xuICAgICAgICBpZiAoaGFuZGxlcikge1xuICAgICAgICAgICAgc2NvcGUuYWN0aXZhdGVHZXN0dXJlKG5vZGUsIGdlc3R1cmUpO1xuICAgICAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKGdlc3R1cmUsIGhhbmRsZXIsIGNhcHR1cmUpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFRlYXJzIGRvd24gdGhlIGdlc3R1cmUgY29uZmlndXJhdGlvbiBmb3IgYG5vZGVgXG4gICAgICpcbiAgICAgKiBJZiBgaGFuZGxlcmAgaXMgdGhlIGxhc3QgbGlzdGVuZXIgZm9yIGBnZXN0dXJlYCwgdGhlIHVuZGVybHlpbmcgZ2VzdHVyZSByZWNvZ25pemVyIGlzIGRpc2FibGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBub2RlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGdlc3R1cmVcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW4gYGdlc3R1cmVgIGlzIGEgdmFsaWQgZ2VzdHVyZVxuICAgICAqL1xuICAgIHNjb3BlLmRlYWN0aXZhdGVHZXN0dXJlID0gZnVuY3Rpb24obm9kZSwgZ2VzdHVyZSkge1xuICAgICAgICB2YXIgZyA9IGdlc3R1cmUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdmFyIGRlcCA9IGRpc3BhdGNoZXIuZGVwZW5kZW5jeU1hcFtnXTtcbiAgICAgICAgaWYgKGRlcCkge1xuICAgICAgICAgICAgaWYgKG5vZGUuX3BnTGlzdGVuZXJzID4gMCkge1xuICAgICAgICAgICAgICAgIG5vZGUuX3BnTGlzdGVuZXJzLS07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobm9kZS5fcGdMaXN0ZW5lcnMgPT09IDApIHtcbiAgICAgICAgICAgICAgICBkaXNwYXRjaGVyLnVucmVnaXN0ZXIobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobm9kZS5fcGdFdmVudHMpIHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5fcGdFdmVudHNbZ10gPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuX3BnRXZlbnRzW2ddLS07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5fcGdFdmVudHNbZ10gPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQm9vbGVhbihkZXApO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTdG9wIGxpc3RlbmluZyBmb3IgYGdlc3R1cmVgIGZyb20gYG5vZGVgIHdpdGggYGhhbmRsZXJgIGZ1bmN0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBub2RlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGdlc3R1cmVcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBjYXB0dXJlXG4gICAgICovXG4gICAgc2NvcGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKG5vZGUsIGdlc3R1cmUsIGhhbmRsZXIsIGNhcHR1cmUpIHtcbiAgICAgICAgaWYgKGhhbmRsZXIpIHtcbiAgICAgICAgICAgIHNjb3BlLmRlYWN0aXZhdGVHZXN0dXJlKG5vZGUsIGdlc3R1cmUpO1xuICAgICAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKGdlc3R1cmUsIGhhbmRsZXIsIGNhcHR1cmUpO1xuICAgICAgICB9XG4gICAgfTtcbn0pKGV4cG9ydHMpO1xuXG4oZnVuY3Rpb24oc2NvcGUpIHtcbiAgICB2YXIgZGlzcGF0Y2hlciA9IHNjb3BlLmRpc3BhdGNoZXI7XG4gICAgdmFyIHBvaW50ZXJtYXAgPSBkaXNwYXRjaGVyLnBvaW50ZXJtYXA7XG4gICAgLy8gcmFkaXVzIGFyb3VuZCB0b3VjaGVuZCB0aGF0IHN3YWxsb3dzIG1vdXNlIGV2ZW50c1xuICAgIHZhciBERURVUF9ESVNUID0gMjU7XG5cbiAgICB2YXIgV0hJQ0hfVE9fQlVUVE9OUyA9IFswLCAxLCA0LCAyXTtcblxuICAgIHZhciBjdXJyZW50QnV0dG9ucyA9IDA7XG5cbiAgICB2YXIgRklSRUZPWF9MSU5VWCA9IC9MaW51eC4qRmlyZWZveFxcLy9pO1xuXG4gICAgdmFyIEhBU19CVVRUT05TID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBmaXJlZm94IG9uIGxpbnV4IHJldHVybnMgc3BlYy1pbmNvcnJlY3QgdmFsdWVzIGZvciBtb3VzZXVwLmJ1dHRvbnNcbiAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL01vdXNlRXZlbnQuYnV0dG9ucyNTZWVfYWxzb1xuICAgICAgICAvLyBodHRwczovL2NvZGVyZXZpZXcuY2hyb21pdW0ub3JnLzcyNzU5MzAwMy8jbXNnMTZcbiAgICAgICAgaWYgKEZJUkVGT1hfTElOVVgudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IE1vdXNlRXZlbnQoJ3Rlc3QnLCB7XG4gICAgICAgICAgICAgICAgYnV0dG9uczogMVxuICAgICAgICAgICAgfSkuYnV0dG9ucyA9PT0gMTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSkoKTtcblxuICAgIC8vIGhhbmRsZXIgYmxvY2sgZm9yIG5hdGl2ZSBtb3VzZSBldmVudHNcbiAgICB2YXIgbW91c2VFdmVudHMgPSB7XG4gICAgICAgIFBPSU5URVJfSUQ6IDEsXG4gICAgICAgIFBPSU5URVJfVFlQRTogJ21vdXNlJyxcbiAgICAgICAgZXZlbnRzOiBbXG4gICAgICAgICAgICAnbW91c2Vkb3duJyxcbiAgICAgICAgICAgICdtb3VzZW1vdmUnLFxuICAgICAgICAgICAgJ21vdXNldXAnXG4gICAgICAgIF0sXG4gICAgICAgIGV4cG9zZXM6IFtcbiAgICAgICAgICAgICdkb3duJyxcbiAgICAgICAgICAgICd1cCcsXG4gICAgICAgICAgICAnbW92ZSdcbiAgICAgICAgXSxcbiAgICAgICAgcmVnaXN0ZXI6IGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgICAgICAgZGlzcGF0Y2hlci5saXN0ZW4odGFyZ2V0LCB0aGlzLmV2ZW50cyk7XG4gICAgICAgIH0sXG4gICAgICAgIHVucmVnaXN0ZXI6IGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgICAgICAgaWYgKHRhcmdldC5ub2RlVHlwZSA9PT0gTm9kZS5ET0NVTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGlzcGF0Y2hlci51bmxpc3Rlbih0YXJnZXQsIHRoaXMuZXZlbnRzKTtcbiAgICAgICAgfSxcbiAgICAgICAgbGFzdFRvdWNoZXM6IFtdLFxuICAgICAgICAvLyBjb2xsaWRlIHdpdGggdGhlIGdsb2JhbCBtb3VzZSBsaXN0ZW5lclxuICAgICAgICBpc0V2ZW50U2ltdWxhdGVkRnJvbVRvdWNoOiBmdW5jdGlvbihpbkV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgbHRzID0gdGhpcy5sYXN0VG91Y2hlcztcbiAgICAgICAgICAgIHZhciB4ID0gaW5FdmVudC5jbGllbnRYLFxuICAgICAgICAgICAgICAgIHkgPSBpbkV2ZW50LmNsaWVudFk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGx0cy5sZW5ndGgsIHQ7IGkgPCBsICYmICh0ID0gbHRzW2ldKTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgLy8gc2ltdWxhdGVkIG1vdXNlIGV2ZW50cyB3aWxsIGJlIHN3YWxsb3dlZCBuZWFyIGEgcHJpbWFyeSB0b3VjaGVuZFxuICAgICAgICAgICAgICAgIHZhciBkeCA9IE1hdGguYWJzKHggLSB0LngpLFxuICAgICAgICAgICAgICAgICAgICBkeSA9IE1hdGguYWJzKHkgLSB0LnkpO1xuICAgICAgICAgICAgICAgIGlmIChkeCA8PSBERURVUF9ESVNUICYmIGR5IDw9IERFRFVQX0RJU1QpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwcmVwYXJlRXZlbnQ6IGZ1bmN0aW9uKGluRXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBlID0gZGlzcGF0Y2hlci5jbG9uZUV2ZW50KGluRXZlbnQpO1xuICAgICAgICAgICAgZS5wb2ludGVySWQgPSB0aGlzLlBPSU5URVJfSUQ7XG4gICAgICAgICAgICBlLmlzUHJpbWFyeSA9IHRydWU7XG4gICAgICAgICAgICBlLnBvaW50ZXJUeXBlID0gdGhpcy5QT0lOVEVSX1RZUEU7XG4gICAgICAgICAgICBlLl9zb3VyY2UgPSAnbW91c2UnO1xuICAgICAgICAgICAgaWYgKCFIQVNfQlVUVE9OUykge1xuICAgICAgICAgICAgICAgIHZhciB0eXBlID0gaW5FdmVudC50eXBlO1xuICAgICAgICAgICAgICAgIHZhciBiaXQgPSBXSElDSF9UT19CVVRUT05TW2luRXZlbnQud2hpY2hdIHx8IDA7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdtb3VzZWRvd24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRCdXR0b25zIHw9IGJpdDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdtb3VzZXVwJykge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50QnV0dG9ucyAmPSB+Yml0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlLmJ1dHRvbnMgPSBjdXJyZW50QnV0dG9ucztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBlO1xuICAgICAgICB9LFxuICAgICAgICBtb3VzZWRvd246IGZ1bmN0aW9uKGluRXZlbnQpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0V2ZW50U2ltdWxhdGVkRnJvbVRvdWNoKGluRXZlbnQpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHAgPSBwb2ludGVybWFwLmhhcyh0aGlzLlBPSU5URVJfSUQpO1xuICAgICAgICAgICAgICAgIHZhciBlID0gdGhpcy5wcmVwYXJlRXZlbnQoaW5FdmVudCk7XG4gICAgICAgICAgICAgICAgZS50YXJnZXQgPSBzY29wZS5maW5kVGFyZ2V0KGluRXZlbnQpO1xuICAgICAgICAgICAgICAgIHBvaW50ZXJtYXAuc2V0KHRoaXMuUE9JTlRFUl9JRCwgZS50YXJnZXQpO1xuICAgICAgICAgICAgICAgIGRpc3BhdGNoZXIuZG93bihlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbW91c2Vtb3ZlOiBmdW5jdGlvbihpbkV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNFdmVudFNpbXVsYXRlZEZyb21Ub3VjaChpbkV2ZW50KSkge1xuICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSBwb2ludGVybWFwLmdldCh0aGlzLlBPSU5URVJfSUQpO1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGUgPSB0aGlzLnByZXBhcmVFdmVudChpbkV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgICAgICAgICAgICAgIC8vIGhhbmRsZSBjYXNlIHdoZXJlIHdlIG1pc3NlZCBhIG1vdXNldXBcbiAgICAgICAgICAgICAgICAgICAgaWYgKChIQVNfQlVUVE9OUyA/IGUuYnV0dG9ucyA6IGUud2hpY2gpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIUhBU19CVVRUT05TKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEJ1dHRvbnMgPSBlLmJ1dHRvbnMgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2hlci5jYW5jZWwoZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFudXBNb3VzZShlLmJ1dHRvbnMpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2hlci5tb3ZlKGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtb3VzZXVwOiBmdW5jdGlvbihpbkV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNFdmVudFNpbXVsYXRlZEZyb21Ub3VjaChpbkV2ZW50KSkge1xuICAgICAgICAgICAgICAgIHZhciBlID0gdGhpcy5wcmVwYXJlRXZlbnQoaW5FdmVudCk7XG4gICAgICAgICAgICAgICAgZS5yZWxhdGVkVGFyZ2V0ID0gc2NvcGUuZmluZFRhcmdldChpbkV2ZW50KTtcbiAgICAgICAgICAgICAgICBlLnRhcmdldCA9IHBvaW50ZXJtYXAuZ2V0KHRoaXMuUE9JTlRFUl9JRCk7XG4gICAgICAgICAgICAgICAgZGlzcGF0Y2hlci51cChlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFudXBNb3VzZShlLmJ1dHRvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjbGVhbnVwTW91c2U6IGZ1bmN0aW9uKGJ1dHRvbnMpIHtcbiAgICAgICAgICAgIGlmIChidXR0b25zID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcG9pbnRlcm1hcC5kZWxldGUodGhpcy5QT0lOVEVSX0lEKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBzY29wZS5tb3VzZUV2ZW50cyA9IG1vdXNlRXZlbnRzO1xufSkoZXhwb3J0cyk7XG5cbihmdW5jdGlvbihzY29wZSkge1xuICAgIHZhciBkaXNwYXRjaGVyID0gc2NvcGUuZGlzcGF0Y2hlcjtcbiAgICB2YXIgYWxsU2hhZG93cyA9IHNjb3BlLnRhcmdldEZpbmRpbmcuYWxsU2hhZG93cy5iaW5kKHNjb3BlLnRhcmdldEZpbmRpbmcpO1xuICAgIHZhciBwb2ludGVybWFwID0gZGlzcGF0Y2hlci5wb2ludGVybWFwO1xuICAgIHZhciB0b3VjaE1hcCA9IEFycmF5LnByb3RvdHlwZS5tYXAuY2FsbC5iaW5kKEFycmF5LnByb3RvdHlwZS5tYXApO1xuICAgIC8vIFRoaXMgc2hvdWxkIGJlIGxvbmcgZW5vdWdoIHRvIGlnbm9yZSBjb21wYXQgbW91c2UgZXZlbnRzIG1hZGUgYnkgdG91Y2hcbiAgICB2YXIgREVEVVBfVElNRU9VVCA9IDI1MDA7XG4gICAgdmFyIERFRFVQX0RJU1QgPSAyNTtcbiAgICB2YXIgQ0xJQ0tfQ09VTlRfVElNRU9VVCA9IDIwMDtcbiAgICB2YXIgSFlTVEVSRVNJUyA9IDIwO1xuICAgIHZhciBBVFRSSUIgPSAndG91Y2gtYWN0aW9uJztcbiAgICAvLyBUT0RPKGRmcmVlZG0pOiBkaXNhYmxlIHVudGlsIGh0dHA6Ly9jcmJ1Zy5jb20vMzk5NzY1IGlzIHJlc29sdmVkXG4gICAgLy8gdmFyIEhBU19UT1VDSF9BQ1RJT04gPSBBVFRSSUIgaW4gZG9jdW1lbnQuaGVhZC5zdHlsZTtcbiAgICB2YXIgSEFTX1RPVUNIX0FDVElPTiA9IGZhbHNlO1xuXG4gICAgLy8gaGFuZGxlciBibG9jayBmb3IgbmF0aXZlIHRvdWNoIGV2ZW50c1xuICAgIHZhciB0b3VjaEV2ZW50cyA9IHtcbiAgICAgICAgSVNfSU9TOiBmYWxzZSxcbiAgICAgICAgZXZlbnRzOiBbXG4gICAgICAgICAgICAndG91Y2hzdGFydCcsXG4gICAgICAgICAgICAndG91Y2htb3ZlJyxcbiAgICAgICAgICAgICd0b3VjaGVuZCcsXG4gICAgICAgICAgICAndG91Y2hjYW5jZWwnXG4gICAgICAgIF0sXG4gICAgICAgIGV4cG9zZXM6IFtcbiAgICAgICAgICAgICdkb3duJyxcbiAgICAgICAgICAgICd1cCcsXG4gICAgICAgICAgICAnbW92ZSdcbiAgICAgICAgXSxcbiAgICAgICAgcmVnaXN0ZXI6IGZ1bmN0aW9uKHRhcmdldCwgaW5pdGlhbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuSVNfSU9TID8gaW5pdGlhbCA6ICFpbml0aWFsKSB7XG4gICAgICAgICAgICAgICAgZGlzcGF0Y2hlci5saXN0ZW4odGFyZ2V0LCB0aGlzLmV2ZW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHVucmVnaXN0ZXI6IGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLklTX0lPUykge1xuICAgICAgICAgICAgICAgIGRpc3BhdGNoZXIudW5saXN0ZW4odGFyZ2V0LCB0aGlzLmV2ZW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHNjcm9sbFR5cGVzOiB7XG4gICAgICAgICAgICBFTUlUVEVSOiAnbm9uZScsXG4gICAgICAgICAgICBYU0NST0xMRVI6ICdwYW4teCcsXG4gICAgICAgICAgICBZU0NST0xMRVI6ICdwYW4teScsXG4gICAgICAgIH0sXG4gICAgICAgIHRvdWNoQWN0aW9uVG9TY3JvbGxUeXBlOiBmdW5jdGlvbih0b3VjaEFjdGlvbikge1xuICAgICAgICAgICAgdmFyIHQgPSB0b3VjaEFjdGlvbjtcbiAgICAgICAgICAgIHZhciBzdCA9IHRoaXMuc2Nyb2xsVHlwZXM7XG4gICAgICAgICAgICBpZiAodCA9PT0gc3QuRU1JVFRFUikge1xuICAgICAgICAgICAgICAgIHJldHVybiAnbm9uZSc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHQgPT09IHN0LlhTQ1JPTExFUikge1xuICAgICAgICAgICAgICAgIHJldHVybiAnWCc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHQgPT09IHN0LllTQ1JPTExFUikge1xuICAgICAgICAgICAgICAgIHJldHVybiAnWSc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAnWFknO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBQT0lOVEVSX1RZUEU6ICd0b3VjaCcsXG4gICAgICAgIGZpcnN0VG91Y2g6IG51bGwsXG4gICAgICAgIGlzUHJpbWFyeVRvdWNoOiBmdW5jdGlvbihpblRvdWNoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maXJzdFRvdWNoID09PSBpblRvdWNoLmlkZW50aWZpZXI7XG4gICAgICAgIH0sXG4gICAgICAgIHNldFByaW1hcnlUb3VjaDogZnVuY3Rpb24oaW5Ub3VjaCkge1xuICAgICAgICAgICAgLy8gc2V0IHByaW1hcnkgdG91Y2ggaWYgdGhlcmUgbm8gcG9pbnRlcnMsIG9yIHRoZSBvbmx5IHBvaW50ZXIgaXMgdGhlIG1vdXNlXG4gICAgICAgICAgICBpZiAocG9pbnRlcm1hcC5wb2ludGVycygpID09PSAwIHx8IChwb2ludGVybWFwLnBvaW50ZXJzKCkgPT09IDEgJiYgcG9pbnRlcm1hcC5oYXMoMSkpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdFRvdWNoID0gaW5Ub3VjaC5pZGVudGlmaWVyO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RYWSA9IHtcbiAgICAgICAgICAgICAgICAgICAgWDogaW5Ub3VjaC5jbGllbnRYLFxuICAgICAgICAgICAgICAgICAgICBZOiBpblRvdWNoLmNsaWVudFlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RUYXJnZXQgPSBpblRvdWNoLnRhcmdldDtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbGluZyA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5jYW5jZWxSZXNldENsaWNrQ291bnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcmVtb3ZlUHJpbWFyeVBvaW50ZXI6IGZ1bmN0aW9uKGluUG9pbnRlcikge1xuICAgICAgICAgICAgaWYgKGluUG9pbnRlci5pc1ByaW1hcnkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0VG91Y2ggPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RYWSA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldENsaWNrQ291bnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY2xpY2tDb3VudDogMCxcbiAgICAgICAgcmVzZXRJZDogbnVsbCxcbiAgICAgICAgcmVzZXRDbGlja0NvdW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBmbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tDb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldElkID0gbnVsbDtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMucmVzZXRJZCA9IHNldFRpbWVvdXQoZm4sIENMSUNLX0NPVU5UX1RJTUVPVVQpO1xuICAgICAgICB9LFxuICAgICAgICBjYW5jZWxSZXNldENsaWNrQ291bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucmVzZXRJZCkge1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnJlc2V0SWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB0eXBlVG9CdXR0b25zOiBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgICAgICB2YXIgcmV0ID0gMDtcbiAgICAgICAgICAgIGlmICh0eXBlID09PSAndG91Y2hzdGFydCcgfHwgdHlwZSA9PT0gJ3RvdWNobW92ZScpIHtcbiAgICAgICAgICAgICAgICByZXQgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfSxcbiAgICAgICAgZmluZFRhcmdldDogZnVuY3Rpb24odG91Y2gsIGlkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50VG91Y2hFdmVudC50eXBlID09PSAndG91Y2hzdGFydCcpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1ByaW1hcnlUb3VjaCh0b3VjaCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZhc3RQYXRoID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50WDogdG91Y2guY2xpZW50WCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudFk6IHRvdWNoLmNsaWVudFksXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiB0aGlzLmN1cnJlbnRUb3VjaEV2ZW50LnBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHRoaXMuY3VycmVudFRvdWNoRXZlbnQudGFyZ2V0XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzY29wZS5maW5kVGFyZ2V0KGZhc3RQYXRoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2NvcGUuZmluZFRhcmdldCh0b3VjaCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gcmV1c2UgdGFyZ2V0IHdlIGZvdW5kIGluIHRvdWNoc3RhcnRcbiAgICAgICAgICAgIHJldHVybiBwb2ludGVybWFwLmdldChpZCk7XG4gICAgICAgIH0sXG4gICAgICAgIHRvdWNoVG9Qb2ludGVyOiBmdW5jdGlvbihpblRvdWNoKSB7XG4gICAgICAgICAgICB2YXIgY3RlID0gdGhpcy5jdXJyZW50VG91Y2hFdmVudDtcbiAgICAgICAgICAgIHZhciBlID0gZGlzcGF0Y2hlci5jbG9uZUV2ZW50KGluVG91Y2gpO1xuICAgICAgICAgICAgLy8gU3BlYyBzcGVjaWZpZXMgdGhhdCBwb2ludGVySWQgMSBpcyByZXNlcnZlZCBmb3IgTW91c2UuXG4gICAgICAgICAgICAvLyBUb3VjaCBpZGVudGlmaWVycyBjYW4gc3RhcnQgYXQgMC5cbiAgICAgICAgICAgIC8vIEFkZCAyIHRvIHRoZSB0b3VjaCBpZGVudGlmaWVyIGZvciBjb21wYXRpYmlsaXR5LlxuICAgICAgICAgICAgdmFyIGlkID0gZS5wb2ludGVySWQgPSBpblRvdWNoLmlkZW50aWZpZXIgKyAyO1xuICAgICAgICAgICAgZS50YXJnZXQgPSB0aGlzLmZpbmRUYXJnZXQoaW5Ub3VjaCwgaWQpO1xuICAgICAgICAgICAgZS5idWJibGVzID0gdHJ1ZTtcbiAgICAgICAgICAgIGUuY2FuY2VsYWJsZSA9IHRydWU7XG4gICAgICAgICAgICBlLmRldGFpbCA9IHRoaXMuY2xpY2tDb3VudDtcbiAgICAgICAgICAgIGUuYnV0dG9ucyA9IHRoaXMudHlwZVRvQnV0dG9ucyhjdGUudHlwZSk7XG4gICAgICAgICAgICBlLndpZHRoID0gaW5Ub3VjaC53ZWJraXRSYWRpdXNYIHx8IGluVG91Y2gucmFkaXVzWCB8fCAwO1xuICAgICAgICAgICAgZS5oZWlnaHQgPSBpblRvdWNoLndlYmtpdFJhZGl1c1kgfHwgaW5Ub3VjaC5yYWRpdXNZIHx8IDA7XG4gICAgICAgICAgICBlLnByZXNzdXJlID0gaW5Ub3VjaC53ZWJraXRGb3JjZSB8fCBpblRvdWNoLmZvcmNlIHx8IDAuNTtcbiAgICAgICAgICAgIGUuaXNQcmltYXJ5ID0gdGhpcy5pc1ByaW1hcnlUb3VjaChpblRvdWNoKTtcbiAgICAgICAgICAgIGUucG9pbnRlclR5cGUgPSB0aGlzLlBPSU5URVJfVFlQRTtcbiAgICAgICAgICAgIGUuX3NvdXJjZSA9ICd0b3VjaCc7XG4gICAgICAgICAgICAvLyBmb3J3YXJkIHRvdWNoIHByZXZlbnREZWZhdWx0c1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuc2Nyb2xsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc2VsZi5maXJzdFhZID0gbnVsbDtcbiAgICAgICAgICAgICAgICBjdGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gZTtcbiAgICAgICAgfSxcbiAgICAgICAgcHJvY2Vzc1RvdWNoZXM6IGZ1bmN0aW9uKGluRXZlbnQsIGluRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIHZhciB0bCA9IGluRXZlbnQuY2hhbmdlZFRvdWNoZXM7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUb3VjaEV2ZW50ID0gaW5FdmVudDtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCB0LCBwOyBpIDwgdGwubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0ID0gdGxbaV07XG4gICAgICAgICAgICAgICAgcCA9IHRoaXMudG91Y2hUb1BvaW50ZXIodCk7XG4gICAgICAgICAgICAgICAgaWYgKGluRXZlbnQudHlwZSA9PT0gJ3RvdWNoc3RhcnQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHBvaW50ZXJtYXAuc2V0KHAucG9pbnRlcklkLCBwLnRhcmdldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwb2ludGVybWFwLmhhcyhwLnBvaW50ZXJJZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5GdW5jdGlvbi5jYWxsKHRoaXMsIHApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaW5FdmVudC50eXBlID09PSAndG91Y2hlbmQnIHx8IGluRXZlbnQuX2NhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFuVXBQb2ludGVyKHApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgLy8gRm9yIHNpbmdsZSBheGlzIHNjcm9sbGVycywgZGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBlbGVtZW50IHNob3VsZCBlbWl0XG4gICAgICAgIC8vIHBvaW50ZXIgZXZlbnRzIG9yIGJlaGF2ZSBhcyBhIHNjcm9sbGVyXG4gICAgICAgIHNob3VsZFNjcm9sbDogZnVuY3Rpb24oaW5FdmVudCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZmlyc3RYWSkge1xuICAgICAgICAgICAgICAgIHZhciByZXQ7XG4gICAgICAgICAgICAgICAgdmFyIHRvdWNoQWN0aW9uID0gc2NvcGUudGFyZ2V0RmluZGluZy5maW5kVG91Y2hBY3Rpb24oaW5FdmVudCk7XG4gICAgICAgICAgICAgICAgdmFyIHNjcm9sbEF4aXMgPSB0aGlzLnRvdWNoQWN0aW9uVG9TY3JvbGxUeXBlKHRvdWNoQWN0aW9uKTtcbiAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsQXhpcyA9PT0gJ25vbmUnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgZWxlbWVudCBpcyBhIHRvdWNoLWFjdGlvbjogbm9uZSwgc2hvdWxkIG5ldmVyIHNjcm9sbFxuICAgICAgICAgICAgICAgICAgICByZXQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNjcm9sbEF4aXMgPT09ICdYWScpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyBlbGVtZW50IHNob3VsZCBhbHdheXMgc2Nyb2xsXG4gICAgICAgICAgICAgICAgICAgIHJldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSBpbkV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayB0aGUgaW50ZW5kZWQgc2Nyb2xsIGF4aXMsIGFuZCBvdGhlciBheGlzXG4gICAgICAgICAgICAgICAgICAgIHZhciBhID0gc2Nyb2xsQXhpcztcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9hID0gc2Nyb2xsQXhpcyA9PT0gJ1knID8gJ1gnIDogJ1knO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGEgPSBNYXRoLmFicyh0WydjbGllbnQnICsgYV0gLSB0aGlzLmZpcnN0WFlbYV0pO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZG9hID0gTWF0aC5hYnModFsnY2xpZW50JyArIG9hXSAtIHRoaXMuZmlyc3RYWVtvYV0pO1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiBkZWx0YSBpbiB0aGUgc2Nyb2xsIGF4aXMgPiBkZWx0YSBvdGhlciBheGlzLCBzY3JvbGwgaW5zdGVhZCBvZlxuICAgICAgICAgICAgICAgICAgICAvLyBtYWtpbmcgZXZlbnRzXG4gICAgICAgICAgICAgICAgICAgIHJldCA9IGRhID49IGRvYTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZmluZFRvdWNoOiBmdW5jdGlvbihpblRMLCBpbklkKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGluVEwubGVuZ3RoLCB0OyBpIDwgbCAmJiAodCA9IGluVExbaV0pOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodC5pZGVudGlmaWVyID09PSBpbklkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgLy8gSW4gc29tZSBpbnN0YW5jZXMsIGEgdG91Y2hzdGFydCBjYW4gaGFwcGVuIHdpdGhvdXQgYSB0b3VjaGVuZC4gVGhpc1xuICAgICAgICAvLyBsZWF2ZXMgdGhlIHBvaW50ZXJtYXAgaW4gYSBicm9rZW4gc3RhdGUuXG4gICAgICAgIC8vIFRoZXJlZm9yZSwgb24gZXZlcnkgdG91Y2hzdGFydCwgd2UgcmVtb3ZlIHRoZSB0b3VjaGVzIHRoYXQgZGlkIG5vdCBmaXJlIGFcbiAgICAgICAgLy8gdG91Y2hlbmQgZXZlbnQuXG4gICAgICAgIC8vIFRvIGtlZXAgc3RhdGUgZ2xvYmFsbHkgY29uc2lzdGVudCwgd2UgZmlyZSBhXG4gICAgICAgIC8vIHBvaW50ZXJjYW5jZWwgZm9yIHRoaXMgXCJhYmFuZG9uZWRcIiB0b3VjaFxuICAgICAgICB2YWN1dW1Ub3VjaGVzOiBmdW5jdGlvbihpbkV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgdGwgPSBpbkV2ZW50LnRvdWNoZXM7XG4gICAgICAgICAgICAvLyBwb2ludGVybWFwLnBvaW50ZXJzKCkgc2hvdWxkIGJlIDwgdGwubGVuZ3RoIGhlcmUsIGFzIHRoZSB0b3VjaHN0YXJ0IGhhcyBub3RcbiAgICAgICAgICAgIC8vIGJlZW4gcHJvY2Vzc2VkIHlldC5cbiAgICAgICAgICAgIGlmIChwb2ludGVybWFwLnBvaW50ZXJzKCkgPj0gdGwubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGQgPSBbXTtcbiAgICAgICAgICAgICAgICBwb2ludGVybWFwLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBOZXZlciByZW1vdmUgcG9pbnRlcklkID09IDEsIHdoaWNoIGlzIG1vdXNlLlxuICAgICAgICAgICAgICAgICAgICAvLyBUb3VjaCBpZGVudGlmaWVycyBhcmUgMiBzbWFsbGVyIHRoYW4gdGhlaXIgcG9pbnRlcklkLCB3aGljaCBpcyB0aGVcbiAgICAgICAgICAgICAgICAgICAgLy8gaW5kZXggaW4gcG9pbnRlcm1hcC5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleSAhPT0gMSAmJiAhdGhpcy5maW5kVG91Y2godGwsIGtleSAtIDIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZC5wdXNoKHApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgZC5mb3JFYWNoKGZ1bmN0aW9uKHApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYW5jZWwocCk7XG4gICAgICAgICAgICAgICAgICAgIHBvaW50ZXJtYXAuZGVsZXRlKHAucG9pbnRlcklkKTtcbiAgICAgICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdG91Y2hzdGFydDogZnVuY3Rpb24oaW5FdmVudCkge1xuICAgICAgICAgICAgdGhpcy52YWN1dW1Ub3VjaGVzKGluRXZlbnQpO1xuICAgICAgICAgICAgdGhpcy5zZXRQcmltYXJ5VG91Y2goaW5FdmVudC5jaGFuZ2VkVG91Y2hlc1swXSk7XG4gICAgICAgICAgICB0aGlzLmRlZHVwU3ludGhNb3VzZShpbkV2ZW50KTtcbiAgICAgICAgICAgIGlmICghdGhpcy5zY3JvbGxpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrQ291bnQrKztcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NUb3VjaGVzKGluRXZlbnQsIHRoaXMuZG93bik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRvd246IGZ1bmN0aW9uKGluUG9pbnRlcikge1xuICAgICAgICAgICAgZGlzcGF0Y2hlci5kb3duKGluUG9pbnRlcik7XG4gICAgICAgIH0sXG4gICAgICAgIHRvdWNobW92ZTogZnVuY3Rpb24oaW5FdmVudCkge1xuICAgICAgICAgICAgaWYgKEhBU19UT1VDSF9BQ1RJT04pIHtcbiAgICAgICAgICAgICAgICAvLyB0b3VjaGV2ZW50LmNhbmNlbGFibGUgPT0gZmFsc2UgaXMgc2VudCB3aGVuIHRoZSBwYWdlIGlzIHNjcm9sbGluZyB1bmRlciBuYXRpdmUgVG91Y2ggQWN0aW9uIGluIENocm9tZSAzNlxuICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vZ3JvdXBzLmdvb2dsZS5jb20vYS9jaHJvbWl1bS5vcmcvZC9tc2cvaW5wdXQtZGV2L3dIbnl1a2NZQmNBL2I5a210d00xakpRSlxuICAgICAgICAgICAgICAgIGlmIChpbkV2ZW50LmNhbmNlbGFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzVG91Y2hlcyhpbkV2ZW50LCB0aGlzLm1vdmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnNjcm9sbGluZykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY3JvbGxpbmcgPT09IG51bGwgJiYgdGhpcy5zaG91bGRTY3JvbGwoaW5FdmVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbkV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NUb3VjaGVzKGluRXZlbnQsIHRoaXMubW92ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZmlyc3RYWSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdCA9IGluRXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgICAgICAgICAgICAgICAgIHZhciBkeCA9IHQuY2xpZW50WCAtIHRoaXMuZmlyc3RYWS5YO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZHkgPSB0LmNsaWVudFkgLSB0aGlzLmZpcnN0WFkuWTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRkID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRkID49IEhZU1RFUkVTSVMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG91Y2hjYW5jZWwoaW5FdmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcnN0WFkgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtb3ZlOiBmdW5jdGlvbihpblBvaW50ZXIpIHtcbiAgICAgICAgICAgIGRpc3BhdGNoZXIubW92ZShpblBvaW50ZXIpO1xuICAgICAgICB9LFxuICAgICAgICB0b3VjaGVuZDogZnVuY3Rpb24oaW5FdmVudCkge1xuICAgICAgICAgICAgdGhpcy5kZWR1cFN5bnRoTW91c2UoaW5FdmVudCk7XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NUb3VjaGVzKGluRXZlbnQsIHRoaXMudXApO1xuICAgICAgICB9LFxuICAgICAgICB1cDogZnVuY3Rpb24oaW5Qb2ludGVyKSB7XG4gICAgICAgICAgICBpblBvaW50ZXIucmVsYXRlZFRhcmdldCA9IHNjb3BlLmZpbmRUYXJnZXQoaW5Qb2ludGVyKTtcbiAgICAgICAgICAgIGRpc3BhdGNoZXIudXAoaW5Qb2ludGVyKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2FuY2VsOiBmdW5jdGlvbihpblBvaW50ZXIpIHtcbiAgICAgICAgICAgIGRpc3BhdGNoZXIuY2FuY2VsKGluUG9pbnRlcik7XG4gICAgICAgIH0sXG4gICAgICAgIHRvdWNoY2FuY2VsOiBmdW5jdGlvbihpbkV2ZW50KSB7XG4gICAgICAgICAgICBpbkV2ZW50Ll9jYW5jZWwgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzVG91Y2hlcyhpbkV2ZW50LCB0aGlzLmNhbmNlbCk7XG4gICAgICAgIH0sXG4gICAgICAgIGNsZWFuVXBQb2ludGVyOiBmdW5jdGlvbihpblBvaW50ZXIpIHtcbiAgICAgICAgICAgIHBvaW50ZXJtYXBbJ2RlbGV0ZSddKGluUG9pbnRlci5wb2ludGVySWQpO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVQcmltYXJ5UG9pbnRlcihpblBvaW50ZXIpO1xuICAgICAgICB9LFxuICAgICAgICAvLyBwcmV2ZW50IHN5bnRoIG1vdXNlIGV2ZW50cyBmcm9tIGNyZWF0aW5nIHBvaW50ZXIgZXZlbnRzXG4gICAgICAgIGRlZHVwU3ludGhNb3VzZTogZnVuY3Rpb24oaW5FdmVudCkge1xuICAgICAgICAgICAgdmFyIGx0cyA9IHNjb3BlLm1vdXNlRXZlbnRzLmxhc3RUb3VjaGVzO1xuICAgICAgICAgICAgdmFyIHQgPSBpbkV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgICAgICAgICAgLy8gb25seSB0aGUgcHJpbWFyeSBmaW5nZXIgd2lsbCBzeW50aCBtb3VzZSBldmVudHNcbiAgICAgICAgICAgIGlmICh0aGlzLmlzUHJpbWFyeVRvdWNoKHQpKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtZW1iZXIgeC95IG9mIGxhc3QgdG91Y2hcbiAgICAgICAgICAgICAgICB2YXIgbHQgPSB7XG4gICAgICAgICAgICAgICAgICAgIHg6IHQuY2xpZW50WCxcbiAgICAgICAgICAgICAgICAgICAgeTogdC5jbGllbnRZXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBsdHMucHVzaChsdCk7XG4gICAgICAgICAgICAgICAgdmFyIGZuID0gKGZ1bmN0aW9uKGx0cywgbHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBsdHMuaW5kZXhPZihsdCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGx0cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KS5iaW5kKG51bGwsIGx0cywgbHQpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZm4sIERFRFVQX1RJTUVPVVQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIHByZXZlbnQgXCJnaG9zdCBjbGlja3NcIiB0aGF0IGNvbWUgZnJvbSBlbGVtZW50cyB0aGF0IHdlcmUgcmVtb3ZlZCBpbiBhIHRvdWNoIGhhbmRsZXJcbiAgICB2YXIgU1RPUF9QUk9QX0ZOID0gRXZlbnQucHJvdG90eXBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiB8fCBFdmVudC5wcm90b3R5cGUuc3RvcFByb3BhZ2F0aW9uO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXYpIHtcbiAgICAgICAgdmFyIHggPSBldi5jbGllbnRYLFxuICAgICAgICAgICAgeSA9IGV2LmNsaWVudFk7XG4gICAgICAgIC8vIGNoZWNrIGlmIGEgY2xpY2sgaXMgd2l0aGluIERFRFVQX0RJU1QgcHggcmFkaXVzIG9mIHRoZSB0b3VjaHN0YXJ0XG4gICAgICAgIHZhciBjbG9zZVRvID0gZnVuY3Rpb24odG91Y2gpIHtcbiAgICAgICAgICAgIHZhciBkeCA9IE1hdGguYWJzKHggLSB0b3VjaC54KSxcbiAgICAgICAgICAgICAgICBkeSA9IE1hdGguYWJzKHkgLSB0b3VjaC55KTtcbiAgICAgICAgICAgIHJldHVybiAoZHggPD0gREVEVVBfRElTVCAmJiBkeSA8PSBERURVUF9ESVNUKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gaWYgY2xpY2sgY29vcmRpbmF0ZXMgYXJlIGNsb3NlIHRvIHRvdWNoIGNvb3JkaW5hdGVzLCBhc3N1bWUgdGhlIGNsaWNrIGNhbWUgZnJvbSBhIHRvdWNoXG4gICAgICAgIHZhciB3YXNUb3VjaGVkID0gc2NvcGUubW91c2VFdmVudHMubGFzdFRvdWNoZXMuc29tZShjbG9zZVRvKTtcbiAgICAgICAgLy8gaWYgdGhlIGNsaWNrIGNhbWUgZnJvbSB0b3VjaCwgYW5kIHRoZSB0b3VjaHN0YXJ0IHRhcmdldCBpcyBub3QgaW4gdGhlIHBhdGggb2YgdGhlIGNsaWNrIGV2ZW50LFxuICAgICAgICAvLyB0aGVuIHRoZSB0b3VjaHN0YXJ0IHRhcmdldCB3YXMgcHJvYmFibHkgcmVtb3ZlZCwgYW5kIHRoZSBjbGljayBzaG91bGQgYmUgXCJidXN0ZWRcIlxuICAgICAgICB2YXIgcGF0aCA9IHNjb3BlLnRhcmdldEZpbmRpbmcucGF0aChldik7XG4gICAgICAgIGlmICh3YXNUb3VjaGVkKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAocGF0aFtpXSA9PT0gdG91Y2hFdmVudHMuZmlyc3RUYXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBTVE9QX1BST1BfRk4uY2FsbChldik7XG4gICAgICAgIH1cbiAgICB9LCB0cnVlKTtcblxuICAgIHNjb3BlLnRvdWNoRXZlbnRzID0gdG91Y2hFdmVudHM7XG59KShleHBvcnRzKTtcblxuKGZ1bmN0aW9uKHNjb3BlKSB7XG4gICAgdmFyIGRpc3BhdGNoZXIgPSBzY29wZS5kaXNwYXRjaGVyO1xuICAgIHZhciBwb2ludGVybWFwID0gZGlzcGF0Y2hlci5wb2ludGVybWFwO1xuICAgIHZhciBIQVNfQklUTUFQX1RZUEUgPSB3aW5kb3cuTVNQb2ludGVyRXZlbnQgJiYgdHlwZW9mIHdpbmRvdy5NU1BvaW50ZXJFdmVudC5NU1BPSU5URVJfVFlQRV9NT1VTRSA9PT0gJ251bWJlcic7XG4gICAgdmFyIG1zRXZlbnRzID0ge1xuICAgICAgICBldmVudHM6IFtcbiAgICAgICAgICAgICdNU1BvaW50ZXJEb3duJyxcbiAgICAgICAgICAgICdNU1BvaW50ZXJNb3ZlJyxcbiAgICAgICAgICAgICdNU1BvaW50ZXJVcCcsXG4gICAgICAgICAgICAnTVNQb2ludGVyQ2FuY2VsJyxcbiAgICAgICAgXSxcbiAgICAgICAgcmVnaXN0ZXI6IGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgICAgICAgZGlzcGF0Y2hlci5saXN0ZW4odGFyZ2V0LCB0aGlzLmV2ZW50cyk7XG4gICAgICAgIH0sXG4gICAgICAgIHVucmVnaXN0ZXI6IGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgICAgICAgaWYgKHRhcmdldC5ub2RlVHlwZSA9PT0gTm9kZS5ET0NVTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGlzcGF0Y2hlci51bmxpc3Rlbih0YXJnZXQsIHRoaXMuZXZlbnRzKTtcbiAgICAgICAgfSxcbiAgICAgICAgUE9JTlRFUl9UWVBFUzogW1xuICAgICAgICAgICAgJycsXG4gICAgICAgICAgICAndW5hdmFpbGFibGUnLFxuICAgICAgICAgICAgJ3RvdWNoJyxcbiAgICAgICAgICAgICdwZW4nLFxuICAgICAgICAgICAgJ21vdXNlJ1xuICAgICAgICBdLFxuICAgICAgICBwcmVwYXJlRXZlbnQ6IGZ1bmN0aW9uKGluRXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBlID0gaW5FdmVudDtcbiAgICAgICAgICAgIGUgPSBkaXNwYXRjaGVyLmNsb25lRXZlbnQoaW5FdmVudCk7XG4gICAgICAgICAgICBpZiAoSEFTX0JJVE1BUF9UWVBFKSB7XG4gICAgICAgICAgICAgICAgZS5wb2ludGVyVHlwZSA9IHRoaXMuUE9JTlRFUl9UWVBFU1tpbkV2ZW50LnBvaW50ZXJUeXBlXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUuX3NvdXJjZSA9ICdtcyc7XG4gICAgICAgICAgICByZXR1cm4gZTtcbiAgICAgICAgfSxcbiAgICAgICAgY2xlYW51cDogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgICAgIHBvaW50ZXJtYXBbJ2RlbGV0ZSddKGlkKTtcbiAgICAgICAgfSxcbiAgICAgICAgTVNQb2ludGVyRG93bjogZnVuY3Rpb24oaW5FdmVudCkge1xuICAgICAgICAgICAgdmFyIGUgPSB0aGlzLnByZXBhcmVFdmVudChpbkV2ZW50KTtcbiAgICAgICAgICAgIGUudGFyZ2V0ID0gc2NvcGUuZmluZFRhcmdldChpbkV2ZW50KTtcbiAgICAgICAgICAgIHBvaW50ZXJtYXAuc2V0KGluRXZlbnQucG9pbnRlcklkLCBlLnRhcmdldCk7XG4gICAgICAgICAgICBkaXNwYXRjaGVyLmRvd24oZSk7XG4gICAgICAgIH0sXG4gICAgICAgIE1TUG9pbnRlck1vdmU6IGZ1bmN0aW9uKGluRXZlbnQpIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBwb2ludGVybWFwLmdldChpbkV2ZW50LnBvaW50ZXJJZCk7XG4gICAgICAgICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGUgPSB0aGlzLnByZXBhcmVFdmVudChpbkV2ZW50KTtcbiAgICAgICAgICAgICAgICBlLnRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgICAgICAgICBkaXNwYXRjaGVyLm1vdmUoZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIE1TUG9pbnRlclVwOiBmdW5jdGlvbihpbkV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgZSA9IHRoaXMucHJlcGFyZUV2ZW50KGluRXZlbnQpO1xuICAgICAgICAgICAgZS5yZWxhdGVkVGFyZ2V0ID0gc2NvcGUuZmluZFRhcmdldChpbkV2ZW50KTtcbiAgICAgICAgICAgIGUudGFyZ2V0ID0gcG9pbnRlcm1hcC5nZXQoZS5wb2ludGVySWQpO1xuICAgICAgICAgICAgZGlzcGF0Y2hlci51cChlKTtcbiAgICAgICAgICAgIHRoaXMuY2xlYW51cChpbkV2ZW50LnBvaW50ZXJJZCk7XG4gICAgICAgIH0sXG4gICAgICAgIE1TUG9pbnRlckNhbmNlbDogZnVuY3Rpb24oaW5FdmVudCkge1xuICAgICAgICAgICAgdmFyIGUgPSB0aGlzLnByZXBhcmVFdmVudChpbkV2ZW50KTtcbiAgICAgICAgICAgIGUucmVsYXRlZFRhcmdldCA9IHNjb3BlLmZpbmRUYXJnZXQoaW5FdmVudCk7XG4gICAgICAgICAgICBlLnRhcmdldCA9IHBvaW50ZXJtYXAuZ2V0KGUucG9pbnRlcklkKTtcbiAgICAgICAgICAgIGRpc3BhdGNoZXIuY2FuY2VsKGUpO1xuICAgICAgICAgICAgdGhpcy5jbGVhbnVwKGluRXZlbnQucG9pbnRlcklkKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBzY29wZS5tc0V2ZW50cyA9IG1zRXZlbnRzO1xufSkoZXhwb3J0cyk7XG5cbihmdW5jdGlvbihzY29wZSkge1xuICAgIHZhciBkaXNwYXRjaGVyID0gc2NvcGUuZGlzcGF0Y2hlcjtcbiAgICB2YXIgcG9pbnRlcm1hcCA9IGRpc3BhdGNoZXIucG9pbnRlcm1hcDtcbiAgICB2YXIgcG9pbnRlckV2ZW50cyA9IHtcbiAgICAgICAgZXZlbnRzOiBbXG4gICAgICAgICAgICAncG9pbnRlcmRvd24nLFxuICAgICAgICAgICAgJ3BvaW50ZXJtb3ZlJyxcbiAgICAgICAgICAgICdwb2ludGVydXAnLFxuICAgICAgICAgICAgJ3BvaW50ZXJjYW5jZWwnXG4gICAgICAgIF0sXG4gICAgICAgIHByZXBhcmVFdmVudDogZnVuY3Rpb24oaW5FdmVudCkge1xuICAgICAgICAgICAgdmFyIGUgPSBkaXNwYXRjaGVyLmNsb25lRXZlbnQoaW5FdmVudCk7XG4gICAgICAgICAgICBlLl9zb3VyY2UgPSAncG9pbnRlcic7XG4gICAgICAgICAgICByZXR1cm4gZTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVnaXN0ZXI6IGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgICAgICAgZGlzcGF0Y2hlci5saXN0ZW4odGFyZ2V0LCB0aGlzLmV2ZW50cyk7XG4gICAgICAgIH0sXG4gICAgICAgIHVucmVnaXN0ZXI6IGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgICAgICAgaWYgKHRhcmdldC5ub2RlVHlwZSA9PT0gTm9kZS5ET0NVTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGlzcGF0Y2hlci51bmxpc3Rlbih0YXJnZXQsIHRoaXMuZXZlbnRzKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2xlYW51cDogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgICAgIHBvaW50ZXJtYXBbJ2RlbGV0ZSddKGlkKTtcbiAgICAgICAgfSxcbiAgICAgICAgcG9pbnRlcmRvd246IGZ1bmN0aW9uKGluRXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBlID0gdGhpcy5wcmVwYXJlRXZlbnQoaW5FdmVudCk7XG4gICAgICAgICAgICBlLnRhcmdldCA9IHNjb3BlLmZpbmRUYXJnZXQoaW5FdmVudCk7XG4gICAgICAgICAgICBwb2ludGVybWFwLnNldChlLnBvaW50ZXJJZCwgZS50YXJnZXQpO1xuICAgICAgICAgICAgZGlzcGF0Y2hlci5kb3duKGUpO1xuICAgICAgICB9LFxuICAgICAgICBwb2ludGVybW92ZTogZnVuY3Rpb24oaW5FdmVudCkge1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9IHBvaW50ZXJtYXAuZ2V0KGluRXZlbnQucG9pbnRlcklkKTtcbiAgICAgICAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICB2YXIgZSA9IHRoaXMucHJlcGFyZUV2ZW50KGluRXZlbnQpO1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICAgICAgICAgIGRpc3BhdGNoZXIubW92ZShlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcG9pbnRlcnVwOiBmdW5jdGlvbihpbkV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgZSA9IHRoaXMucHJlcGFyZUV2ZW50KGluRXZlbnQpO1xuICAgICAgICAgICAgZS5yZWxhdGVkVGFyZ2V0ID0gc2NvcGUuZmluZFRhcmdldChpbkV2ZW50KTtcbiAgICAgICAgICAgIGUudGFyZ2V0ID0gcG9pbnRlcm1hcC5nZXQoZS5wb2ludGVySWQpO1xuICAgICAgICAgICAgZGlzcGF0Y2hlci51cChlKTtcbiAgICAgICAgICAgIHRoaXMuY2xlYW51cChpbkV2ZW50LnBvaW50ZXJJZCk7XG4gICAgICAgIH0sXG4gICAgICAgIHBvaW50ZXJjYW5jZWw6IGZ1bmN0aW9uKGluRXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBlID0gdGhpcy5wcmVwYXJlRXZlbnQoaW5FdmVudCk7XG4gICAgICAgICAgICBlLnJlbGF0ZWRUYXJnZXQgPSBzY29wZS5maW5kVGFyZ2V0KGluRXZlbnQpO1xuICAgICAgICAgICAgZS50YXJnZXQgPSBwb2ludGVybWFwLmdldChlLnBvaW50ZXJJZCk7XG4gICAgICAgICAgICBkaXNwYXRjaGVyLmNhbmNlbChlKTtcbiAgICAgICAgICAgIHRoaXMuY2xlYW51cChpbkV2ZW50LnBvaW50ZXJJZCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgc2NvcGUucG9pbnRlckV2ZW50cyA9IHBvaW50ZXJFdmVudHM7XG59KShleHBvcnRzKTtcblxuLyoqXG4gKiBUaGlzIG1vZHVsZSBjb250YWlucyB0aGUgaGFuZGxlcnMgZm9yIG5hdGl2ZSBwbGF0Zm9ybSBldmVudHMuXG4gKiBGcm9tIGhlcmUsIHRoZSBkaXNwYXRjaGVyIGlzIGNhbGxlZCB0byBjcmVhdGUgdW5pZmllZCBwb2ludGVyIGV2ZW50cy5cbiAqIEluY2x1ZGVkIGFyZSB0b3VjaCBldmVudHMgKHYxKSwgbW91c2UgZXZlbnRzLCBhbmQgTVNQb2ludGVyRXZlbnRzLlxuICovXG4oZnVuY3Rpb24oc2NvcGUpIHtcblxuICAgIHZhciBkaXNwYXRjaGVyID0gc2NvcGUuZGlzcGF0Y2hlcjtcbiAgICB2YXIgbmF2ID0gd2luZG93Lm5hdmlnYXRvcjtcblxuICAgIGlmICh3aW5kb3cuUG9pbnRlckV2ZW50KSB7XG4gICAgICAgIGRpc3BhdGNoZXIucmVnaXN0ZXJTb3VyY2UoJ3BvaW50ZXInLCBzY29wZS5wb2ludGVyRXZlbnRzKTtcbiAgICB9IGVsc2UgaWYgKG5hdi5tc1BvaW50ZXJFbmFibGVkKSB7XG4gICAgICAgIGRpc3BhdGNoZXIucmVnaXN0ZXJTb3VyY2UoJ21zJywgc2NvcGUubXNFdmVudHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGRpc3BhdGNoZXIucmVnaXN0ZXJTb3VyY2UoJ21vdXNlJywgc2NvcGUubW91c2VFdmVudHMpO1xuICAgICAgICBpZiAod2luZG93Lm9udG91Y2hzdGFydCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyU291cmNlKCd0b3VjaCcsIHNjb3BlLnRvdWNoRXZlbnRzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFdvcmsgYXJvdW5kIGlPUyBidWdzIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xMzU2MjggYW5kIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xMzY1MDZcbiAgICB2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuICAgIHZhciBJU19JT1MgPSB1YS5tYXRjaCgvaVBhZHxpUGhvbmV8aVBvZC8pICYmICdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdztcblxuICAgIGRpc3BhdGNoZXIuSVNfSU9TID0gSVNfSU9TO1xuICAgIHNjb3BlLnRvdWNoRXZlbnRzLklTX0lPUyA9IElTX0lPUztcblxuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXIoZG9jdW1lbnQsIHRydWUpO1xufSkoZXhwb3J0cyk7XG5cbi8qKlxuICogVGhpcyBldmVudCBkZW5vdGVzIHRoZSBiZWdpbm5pbmcgb2YgYSBzZXJpZXMgb2YgdHJhY2tpbmcgZXZlbnRzLlxuICpcbiAqIEBtb2R1bGUgUG9pbnRlckdlc3R1cmVzXG4gKiBAc3VibW9kdWxlIEV2ZW50c1xuICogQGNsYXNzIHRyYWNrc3RhcnRcbiAqL1xuLyoqXG4gKiBQaXhlbHMgbW92ZWQgaW4gdGhlIHggZGlyZWN0aW9uIHNpbmNlIHRyYWNrc3RhcnQuXG4gKiBAdHlwZSBOdW1iZXJcbiAqIEBwcm9wZXJ0eSBkeFxuICovXG4vKipcbiAqIFBpeGVzIG1vdmVkIGluIHRoZSB5IGRpcmVjdGlvbiBzaW5jZSB0cmFja3N0YXJ0LlxuICogQHR5cGUgTnVtYmVyXG4gKiBAcHJvcGVydHkgZHlcbiAqL1xuLyoqXG4gKiBQaXhlbHMgbW92ZWQgaW4gdGhlIHggZGlyZWN0aW9uIHNpbmNlIHRoZSBsYXN0IHRyYWNrLlxuICogQHR5cGUgTnVtYmVyXG4gKiBAcHJvcGVydHkgZGR4XG4gKi9cbi8qKlxuICogUGl4bGVzIG1vdmVkIGluIHRoZSB5IGRpcmVjdGlvbiBzaW5jZSB0aGUgbGFzdCB0cmFjay5cbiAqIEB0eXBlIE51bWJlclxuICogQHByb3BlcnR5IGRkeVxuICovXG4vKipcbiAqIFRoZSBjbGllbnRYIHBvc2l0aW9uIG9mIHRoZSB0cmFjayBnZXN0dXJlLlxuICogQHR5cGUgTnVtYmVyXG4gKiBAcHJvcGVydHkgY2xpZW50WFxuICovXG4vKipcbiAqIFRoZSBjbGllbnRZIHBvc2l0aW9uIG9mIHRoZSB0cmFjayBnZXN0dXJlLlxuICogQHR5cGUgTnVtYmVyXG4gKiBAcHJvcGVydHkgY2xpZW50WVxuICovXG4vKipcbiAqIFRoZSBwYWdlWCBwb3NpdGlvbiBvZiB0aGUgdHJhY2sgZ2VzdHVyZS5cbiAqIEB0eXBlIE51bWJlclxuICogQHByb3BlcnR5IHBhZ2VYXG4gKi9cbi8qKlxuICogVGhlIHBhZ2VZIHBvc2l0aW9uIG9mIHRoZSB0cmFjayBnZXN0dXJlLlxuICogQHR5cGUgTnVtYmVyXG4gKiBAcHJvcGVydHkgcGFnZVlcbiAqL1xuLyoqXG4gKiBUaGUgc2NyZWVuWCBwb3NpdGlvbiBvZiB0aGUgdHJhY2sgZ2VzdHVyZS5cbiAqIEB0eXBlIE51bWJlclxuICogQHByb3BlcnR5IHNjcmVlblhcbiAqL1xuLyoqXG4gKiBUaGUgc2NyZWVuWSBwb3NpdGlvbiBvZiB0aGUgdHJhY2sgZ2VzdHVyZS5cbiAqIEB0eXBlIE51bWJlclxuICogQHByb3BlcnR5IHNjcmVlbllcbiAqL1xuLyoqXG4gKiBUaGUgbGFzdCB4IGF4aXMgZGlyZWN0aW9uIG9mIHRoZSBwb2ludGVyLlxuICogQHR5cGUgTnVtYmVyXG4gKiBAcHJvcGVydHkgeERpcmVjdGlvblxuICovXG4vKipcbiAqIFRoZSBsYXN0IHkgYXhpcyBkaXJlY3Rpb24gb2YgdGhlIHBvaW50ZXIuXG4gKiBAdHlwZSBOdW1iZXJcbiAqIEBwcm9wZXJ0eSB5RGlyZWN0aW9uXG4gKi9cbi8qKlxuICogQSBzaGFyZWQgb2JqZWN0IGJldHdlZW4gYWxsIHRyYWNraW5nIGV2ZW50cy5cbiAqIEB0eXBlIE9iamVjdFxuICogQHByb3BlcnR5IHRyYWNrSW5mb1xuICovXG4vKipcbiAqIFRoZSBlbGVtZW50IGN1cnJlbnRseSB1bmRlciB0aGUgcG9pbnRlci5cbiAqIEB0eXBlIEVsZW1lbnRcbiAqIEBwcm9wZXJ0eSByZWxhdGVkVGFyZ2V0XG4gKi9cbi8qKlxuICogVGhlIHR5cGUgb2YgcG9pbnRlciB0aGF0IG1ha2UgdGhlIHRyYWNrIGdlc3R1cmUuXG4gKiBAdHlwZSBTdHJpbmdcbiAqIEBwcm9wZXJ0eSBwb2ludGVyVHlwZVxuICovXG4vKipcbiAqXG4gKiBUaGlzIGV2ZW50IGZpcmVzIGZvciBhbGwgcG9pbnRlciBtb3ZlbWVudCBiZWluZyB0cmFja2VkLlxuICpcbiAqIEBjbGFzcyB0cmFja1xuICogQGV4dGVuZHMgdHJhY2tzdGFydFxuICovXG4vKipcbiAqIFRoaXMgZXZlbnQgZmlyZXMgd2hlbiB0aGUgcG9pbnRlciBpcyBubyBsb25nZXIgYmVpbmcgdHJhY2tlZC5cbiAqXG4gKiBAY2xhc3MgdHJhY2tlbmRcbiAqIEBleHRlbmRzIHRyYWNrc3RhcnRcbiAqL1xuXG4oZnVuY3Rpb24oc2NvcGUpIHtcbiAgICB2YXIgZGlzcGF0Y2hlciA9IHNjb3BlLmRpc3BhdGNoZXI7XG4gICAgdmFyIGV2ZW50RmFjdG9yeSA9IHNjb3BlLmV2ZW50RmFjdG9yeTtcbiAgICB2YXIgcG9pbnRlcm1hcCA9IG5ldyBzY29wZS5Qb2ludGVyTWFwKCk7XG4gICAgdmFyIHRyYWNrID0ge1xuICAgICAgICBldmVudHM6IFtcbiAgICAgICAgICAgICdkb3duJyxcbiAgICAgICAgICAgICdtb3ZlJyxcbiAgICAgICAgICAgICd1cCcsXG4gICAgICAgIF0sXG4gICAgICAgIGV4cG9zZXM6IFtcbiAgICAgICAgICAgICd0cmFja3N0YXJ0JyxcbiAgICAgICAgICAgICd0cmFjaycsXG4gICAgICAgICAgICAndHJhY2t4JyxcbiAgICAgICAgICAgICd0cmFja3knLFxuICAgICAgICAgICAgJ3RyYWNrZW5kJ1xuICAgICAgICBdLFxuICAgICAgICBkZWZhdWx0QWN0aW9uczoge1xuICAgICAgICAgICAgJ3RyYWNrJzogJ25vbmUnLFxuICAgICAgICAgICAgJ3RyYWNreCc6ICdwYW4teScsXG4gICAgICAgICAgICAndHJhY2t5JzogJ3Bhbi14J1xuICAgICAgICB9LFxuICAgICAgICBXSUdHTEVfVEhSRVNIT0xEOiA0LFxuICAgICAgICBjbGFtcERpcjogZnVuY3Rpb24oaW5EZWx0YSkge1xuICAgICAgICAgICAgcmV0dXJuIGluRGVsdGEgPiAwID8gMSA6IC0xO1xuICAgICAgICB9LFxuICAgICAgICBjYWxjUG9zaXRpb25EZWx0YTogZnVuY3Rpb24oaW5BLCBpbkIpIHtcbiAgICAgICAgICAgIHZhciB4ID0gMCxcbiAgICAgICAgICAgICAgICB5ID0gMDtcbiAgICAgICAgICAgIGlmIChpbkEgJiYgaW5CKSB7XG4gICAgICAgICAgICAgICAgeCA9IGluQi5wYWdlWCAtIGluQS5wYWdlWDtcbiAgICAgICAgICAgICAgICB5ID0gaW5CLnBhZ2VZIC0gaW5BLnBhZ2VZO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgICAgIHk6IHlcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIGZpcmVUcmFjazogZnVuY3Rpb24oaW5UeXBlLCBpbkV2ZW50LCBpblRyYWNraW5nRGF0YSkge1xuICAgICAgICAgICAgdmFyIHQgPSBpblRyYWNraW5nRGF0YTtcbiAgICAgICAgICAgIHZhciBkID0gdGhpcy5jYWxjUG9zaXRpb25EZWx0YSh0LmRvd25FdmVudCwgaW5FdmVudCk7XG4gICAgICAgICAgICB2YXIgZGQgPSB0aGlzLmNhbGNQb3NpdGlvbkRlbHRhKHQubGFzdE1vdmVFdmVudCwgaW5FdmVudCk7XG4gICAgICAgICAgICBpZiAoZGQueCkge1xuICAgICAgICAgICAgICAgIHQueERpcmVjdGlvbiA9IHRoaXMuY2xhbXBEaXIoZGQueCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGluVHlwZSA9PT0gJ3RyYWNreCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGQueSkge1xuICAgICAgICAgICAgICAgIHQueURpcmVjdGlvbiA9IHRoaXMuY2xhbXBEaXIoZGQueSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGluVHlwZSA9PT0gJ3RyYWNreScpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZ2VzdHVyZVByb3RvID0ge1xuICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0cmFja0luZm86IHQudHJhY2tJbmZvLFxuICAgICAgICAgICAgICAgIHJlbGF0ZWRUYXJnZXQ6IGluRXZlbnQucmVsYXRlZFRhcmdldCxcbiAgICAgICAgICAgICAgICBwb2ludGVyVHlwZTogaW5FdmVudC5wb2ludGVyVHlwZSxcbiAgICAgICAgICAgICAgICBwb2ludGVySWQ6IGluRXZlbnQucG9pbnRlcklkLFxuICAgICAgICAgICAgICAgIF9zb3VyY2U6ICd0cmFjaydcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoaW5UeXBlICE9PSAndHJhY2t5Jykge1xuICAgICAgICAgICAgICAgIGdlc3R1cmVQcm90by54ID0gaW5FdmVudC54O1xuICAgICAgICAgICAgICAgIGdlc3R1cmVQcm90by5keCA9IGQueDtcbiAgICAgICAgICAgICAgICBnZXN0dXJlUHJvdG8uZGR4ID0gZGQueDtcbiAgICAgICAgICAgICAgICBnZXN0dXJlUHJvdG8uY2xpZW50WCA9IGluRXZlbnQuY2xpZW50WDtcbiAgICAgICAgICAgICAgICBnZXN0dXJlUHJvdG8ucGFnZVggPSBpbkV2ZW50LnBhZ2VYO1xuICAgICAgICAgICAgICAgIGdlc3R1cmVQcm90by5zY3JlZW5YID0gaW5FdmVudC5zY3JlZW5YO1xuICAgICAgICAgICAgICAgIGdlc3R1cmVQcm90by54RGlyZWN0aW9uID0gdC54RGlyZWN0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGluVHlwZSAhPT0gJ3RyYWNreCcpIHtcbiAgICAgICAgICAgICAgICBnZXN0dXJlUHJvdG8uZHkgPSBkLnk7XG4gICAgICAgICAgICAgICAgZ2VzdHVyZVByb3RvLmRkeSA9IGRkLnk7XG4gICAgICAgICAgICAgICAgZ2VzdHVyZVByb3RvLnkgPSBpbkV2ZW50Lnk7XG4gICAgICAgICAgICAgICAgZ2VzdHVyZVByb3RvLmNsaWVudFkgPSBpbkV2ZW50LmNsaWVudFk7XG4gICAgICAgICAgICAgICAgZ2VzdHVyZVByb3RvLnBhZ2VZID0gaW5FdmVudC5wYWdlWTtcbiAgICAgICAgICAgICAgICBnZXN0dXJlUHJvdG8uc2NyZWVuWSA9IGluRXZlbnQuc2NyZWVuWTtcbiAgICAgICAgICAgICAgICBnZXN0dXJlUHJvdG8ueURpcmVjdGlvbiA9IHQueURpcmVjdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBlID0gZXZlbnRGYWN0b3J5Lm1ha2VHZXN0dXJlRXZlbnQoaW5UeXBlLCBnZXN0dXJlUHJvdG8pO1xuICAgICAgICAgICAgdC5kb3duVGFyZ2V0LmRpc3BhdGNoRXZlbnQoZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGRvd246IGZ1bmN0aW9uKGluRXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChpbkV2ZW50LmlzUHJpbWFyeSAmJiAoaW5FdmVudC5wb2ludGVyVHlwZSA9PT0gJ21vdXNlJyA/IGluRXZlbnQuYnV0dG9ucyA9PT0gMSA6IHRydWUpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHAgPSB7XG4gICAgICAgICAgICAgICAgICAgIGRvd25FdmVudDogaW5FdmVudCxcbiAgICAgICAgICAgICAgICAgICAgZG93blRhcmdldDogaW5FdmVudC50YXJnZXQsXG4gICAgICAgICAgICAgICAgICAgIHRyYWNrSW5mbzoge30sXG4gICAgICAgICAgICAgICAgICAgIGxhc3RNb3ZlRXZlbnQ6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHhEaXJlY3Rpb246IDAsXG4gICAgICAgICAgICAgICAgICAgIHlEaXJlY3Rpb246IDAsXG4gICAgICAgICAgICAgICAgICAgIHRyYWNraW5nOiBmYWxzZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcG9pbnRlcm1hcC5zZXQoaW5FdmVudC5wb2ludGVySWQsIHApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtb3ZlOiBmdW5jdGlvbihpbkV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgcCA9IHBvaW50ZXJtYXAuZ2V0KGluRXZlbnQucG9pbnRlcklkKTtcbiAgICAgICAgICAgIGlmIChwKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFwLnRyYWNraW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkID0gdGhpcy5jYWxjUG9zaXRpb25EZWx0YShwLmRvd25FdmVudCwgaW5FdmVudCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtb3ZlID0gZC54ICogZC54ICsgZC55ICogZC55O1xuICAgICAgICAgICAgICAgICAgICAvLyBzdGFydCB0cmFja2luZyBvbmx5IGlmIGZpbmdlciBtb3ZlcyBtb3JlIHRoYW4gV0lHR0xFX1RIUkVTSE9MRFxuICAgICAgICAgICAgICAgICAgICBpZiAobW92ZSA+IHRoaXMuV0lHR0xFX1RIUkVTSE9MRCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcC50cmFja2luZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBwLmxhc3RNb3ZlRXZlbnQgPSBwLmRvd25FdmVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyZVRyYWNrKCd0cmFja3N0YXJ0JywgaW5FdmVudCwgcCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHAudHJhY2tpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJlVHJhY2soJ3RyYWNrJywgaW5FdmVudCwgcCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyZVRyYWNrKCd0cmFja3gnLCBpbkV2ZW50LCBwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJlVHJhY2soJ3RyYWNreScsIGluRXZlbnQsIHApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwLmxhc3RNb3ZlRXZlbnQgPSBpbkV2ZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB1cDogZnVuY3Rpb24oaW5FdmVudCkge1xuICAgICAgICAgICAgdmFyIHAgPSBwb2ludGVybWFwLmdldChpbkV2ZW50LnBvaW50ZXJJZCk7XG4gICAgICAgICAgICBpZiAocCkge1xuICAgICAgICAgICAgICAgIGlmIChwLnRyYWNraW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyZVRyYWNrKCd0cmFja2VuZCcsIGluRXZlbnQsIHApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwb2ludGVybWFwLmRlbGV0ZShpbkV2ZW50LnBvaW50ZXJJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXJHZXN0dXJlKCd0cmFjaycsIHRyYWNrKTtcbn0pKGV4cG9ydHMpO1xuXG4vKipcbiAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiBhIHBvaW50ZXIgaXMgaGVsZCBkb3duIGZvciAyMDBtcy5cbiAqXG4gKiBAbW9kdWxlIFBvaW50ZXJHZXN0dXJlc1xuICogQHN1Ym1vZHVsZSBFdmVudHNcbiAqIEBjbGFzcyBob2xkXG4gKi9cbi8qKlxuICogVHlwZSBvZiBwb2ludGVyIHRoYXQgbWFkZSB0aGUgaG9sZGluZyBldmVudC5cbiAqIEB0eXBlIFN0cmluZ1xuICogQHByb3BlcnR5IHBvaW50ZXJUeXBlXG4gKi9cbi8qKlxuICogU2NyZWVuIFggYXhpcyBwb3NpdGlvbiBvZiB0aGUgaGVsZCBwb2ludGVyXG4gKiBAdHlwZSBOdW1iZXJcbiAqIEBwcm9wZXJ0eSBjbGllbnRYXG4gKi9cbi8qKlxuICogU2NyZWVuIFkgYXhpcyBwb3NpdGlvbiBvZiB0aGUgaGVsZCBwb2ludGVyXG4gKiBAdHlwZSBOdW1iZXJcbiAqIEBwcm9wZXJ0eSBjbGllbnRZXG4gKi9cbi8qKlxuICogVHlwZSBvZiBwb2ludGVyIHRoYXQgbWFkZSB0aGUgaG9sZGluZyBldmVudC5cbiAqIEB0eXBlIFN0cmluZ1xuICogQHByb3BlcnR5IHBvaW50ZXJUeXBlXG4gKi9cbi8qKlxuICogVGhpcyBldmVudCBpcyBmaXJlZCBldmVyeSAyMDBtcyB3aGlsZSBhIHBvaW50ZXIgaXMgaGVsZCBkb3duLlxuICpcbiAqIEBjbGFzcyBob2xkcHVsc2VcbiAqIEBleHRlbmRzIGhvbGRcbiAqL1xuLyoqXG4gKiBNaWxsaXNlY29uZHMgcG9pbnRlciBoYXMgYmVlbiBoZWxkIGRvd24uXG4gKiBAdHlwZSBOdW1iZXJcbiAqIEBwcm9wZXJ0eSBob2xkVGltZVxuICovXG4vKipcbiAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiBhIGhlbGQgcG9pbnRlciBpcyByZWxlYXNlZCBvciBtb3ZlZC5cbiAqXG4gKiBAY2xhc3MgcmVsZWFzZVxuICovXG5cbihmdW5jdGlvbihzY29wZSkge1xuICAgIHZhciBkaXNwYXRjaGVyID0gc2NvcGUuZGlzcGF0Y2hlcjtcbiAgICB2YXIgZXZlbnRGYWN0b3J5ID0gc2NvcGUuZXZlbnRGYWN0b3J5O1xuICAgIHZhciBob2xkID0ge1xuICAgICAgICAvLyB3YWl0IGF0IGxlYXN0IEhPTERfREVMQVkgbXMgYmV0d2VlbiBob2xkIGFuZCBwdWxzZSBldmVudHNcbiAgICAgICAgSE9MRF9ERUxBWTogMjAwLFxuICAgICAgICAvLyBwb2ludGVyIGNhbiBtb3ZlIFdJR0dMRV9USFJFU0hPTEQgcGl4ZWxzIGJlZm9yZSBub3QgY291bnRpbmcgYXMgYSBob2xkXG4gICAgICAgIFdJR0dMRV9USFJFU0hPTEQ6IDE2LFxuICAgICAgICBldmVudHM6IFtcbiAgICAgICAgICAgICdkb3duJyxcbiAgICAgICAgICAgICdtb3ZlJyxcbiAgICAgICAgICAgICd1cCcsXG4gICAgICAgIF0sXG4gICAgICAgIGV4cG9zZXM6IFtcbiAgICAgICAgICAgICdob2xkJyxcbiAgICAgICAgICAgICdob2xkcHVsc2UnLFxuICAgICAgICAgICAgJ3JlbGVhc2UnXG4gICAgICAgIF0sXG4gICAgICAgIGhlbGRQb2ludGVyOiBudWxsLFxuICAgICAgICBob2xkSm9iOiBudWxsLFxuICAgICAgICBwdWxzZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaG9sZCA9IERhdGUubm93KCkgLSB0aGlzLmhlbGRQb2ludGVyLnRpbWVTdGFtcDtcbiAgICAgICAgICAgIHZhciB0eXBlID0gdGhpcy5oZWxkID8gJ2hvbGRwdWxzZScgOiAnaG9sZCc7XG4gICAgICAgICAgICB0aGlzLmZpcmVIb2xkKHR5cGUsIGhvbGQpO1xuICAgICAgICAgICAgdGhpcy5oZWxkID0gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgY2FuY2VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5ob2xkSm9iKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmhlbGQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmVIb2xkKCdyZWxlYXNlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmhlbGQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaGVsZFBvaW50ZXIgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy50YXJnZXQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5ob2xkSm9iID0gbnVsbDtcbiAgICAgICAgfSxcbiAgICAgICAgZG93bjogZnVuY3Rpb24oaW5FdmVudCkge1xuICAgICAgICAgICAgaWYgKGluRXZlbnQuaXNQcmltYXJ5ICYmICF0aGlzLmhlbGRQb2ludGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oZWxkUG9pbnRlciA9IGluRXZlbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQgPSBpbkV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgICAgICB0aGlzLmhvbGRKb2IgPSBzZXRJbnRlcnZhbCh0aGlzLnB1bHNlLmJpbmQodGhpcyksIHRoaXMuSE9MRF9ERUxBWSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHVwOiBmdW5jdGlvbihpbkV2ZW50KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5oZWxkUG9pbnRlciAmJiB0aGlzLmhlbGRQb2ludGVyLnBvaW50ZXJJZCA9PT0gaW5FdmVudC5wb2ludGVySWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtb3ZlOiBmdW5jdGlvbihpbkV2ZW50KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5oZWxkUG9pbnRlciAmJiB0aGlzLmhlbGRQb2ludGVyLnBvaW50ZXJJZCA9PT0gaW5FdmVudC5wb2ludGVySWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgeCA9IGluRXZlbnQuY2xpZW50WCAtIHRoaXMuaGVsZFBvaW50ZXIuY2xpZW50WDtcbiAgICAgICAgICAgICAgICB2YXIgeSA9IGluRXZlbnQuY2xpZW50WSAtIHRoaXMuaGVsZFBvaW50ZXIuY2xpZW50WTtcbiAgICAgICAgICAgICAgICBpZiAoKHggKiB4ICsgeSAqIHkpID4gdGhpcy5XSUdHTEVfVEhSRVNIT0xEKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBmaXJlSG9sZDogZnVuY3Rpb24oaW5UeXBlLCBpbkhvbGRUaW1lKSB7XG4gICAgICAgICAgICB2YXIgcCA9IHtcbiAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgcG9pbnRlclR5cGU6IHRoaXMuaGVsZFBvaW50ZXIucG9pbnRlclR5cGUsXG4gICAgICAgICAgICAgICAgcG9pbnRlcklkOiB0aGlzLmhlbGRQb2ludGVyLnBvaW50ZXJJZCxcbiAgICAgICAgICAgICAgICB4OiB0aGlzLmhlbGRQb2ludGVyLmNsaWVudFgsXG4gICAgICAgICAgICAgICAgeTogdGhpcy5oZWxkUG9pbnRlci5jbGllbnRZLFxuICAgICAgICAgICAgICAgIF9zb3VyY2U6ICdob2xkJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChpbkhvbGRUaW1lKSB7XG4gICAgICAgICAgICAgICAgcC5ob2xkVGltZSA9IGluSG9sZFRpbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZSA9IGV2ZW50RmFjdG9yeS5tYWtlR2VzdHVyZUV2ZW50KGluVHlwZSwgcCk7XG4gICAgICAgICAgICB0aGlzLnRhcmdldC5kaXNwYXRjaEV2ZW50KGUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyR2VzdHVyZSgnaG9sZCcsIGhvbGQpO1xufSkoZXhwb3J0cyk7XG5cbi8qKlxuICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIGEgcG9pbnRlciBxdWlja2x5IGdvZXMgZG93biBhbmQgdXAsIGFuZCBpcyB1c2VkIHRvXG4gKiBkZW5vdGUgYWN0aXZhdGlvbi5cbiAqXG4gKiBBbnkgZ2VzdHVyZSBldmVudCBjYW4gcHJldmVudCB0aGUgdGFwIGV2ZW50IGZyb20gYmVpbmcgY3JlYXRlZCBieSBjYWxsaW5nXG4gKiBgZXZlbnQucHJldmVudFRhcGAuXG4gKlxuICogQW55IHBvaW50ZXIgZXZlbnQgY2FuIHByZXZlbnQgdGhlIHRhcCBieSBzZXR0aW5nIHRoZSBgdGFwUHJldmVudGVkYCBwcm9wZXJ0eVxuICogb24gaXRzZWxmLlxuICpcbiAqIEBtb2R1bGUgUG9pbnRlckdlc3R1cmVzXG4gKiBAc3VibW9kdWxlIEV2ZW50c1xuICogQGNsYXNzIHRhcFxuICovXG4vKipcbiAqIFggYXhpcyBwb3NpdGlvbiBvZiB0aGUgdGFwLlxuICogQHByb3BlcnR5IHhcbiAqIEB0eXBlIE51bWJlclxuICovXG4vKipcbiAqIFkgYXhpcyBwb3NpdGlvbiBvZiB0aGUgdGFwLlxuICogQHByb3BlcnR5IHlcbiAqIEB0eXBlIE51bWJlclxuICovXG4vKipcbiAqIFR5cGUgb2YgdGhlIHBvaW50ZXIgdGhhdCBtYWRlIHRoZSB0YXAuXG4gKiBAcHJvcGVydHkgcG9pbnRlclR5cGVcbiAqIEB0eXBlIFN0cmluZ1xuICovXG4oZnVuY3Rpb24oc2NvcGUpIHtcbiAgICB2YXIgZGlzcGF0Y2hlciA9IHNjb3BlLmRpc3BhdGNoZXI7XG4gICAgdmFyIGV2ZW50RmFjdG9yeSA9IHNjb3BlLmV2ZW50RmFjdG9yeTtcbiAgICB2YXIgcG9pbnRlcm1hcCA9IG5ldyBzY29wZS5Qb2ludGVyTWFwKCk7XG4gICAgdmFyIHRhcCA9IHtcbiAgICAgICAgZXZlbnRzOiBbXG4gICAgICAgICAgICAnZG93bicsXG4gICAgICAgICAgICAndXAnXG4gICAgICAgIF0sXG4gICAgICAgIGV4cG9zZXM6IFtcbiAgICAgICAgICAgICd0YXAnXG4gICAgICAgIF0sXG4gICAgICAgIGRvd246IGZ1bmN0aW9uKGluRXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChpbkV2ZW50LmlzUHJpbWFyeSAmJiAhaW5FdmVudC50YXBQcmV2ZW50ZWQpIHtcbiAgICAgICAgICAgICAgICBwb2ludGVybWFwLnNldChpbkV2ZW50LnBvaW50ZXJJZCwge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IGluRXZlbnQudGFyZ2V0LFxuICAgICAgICAgICAgICAgICAgICBidXR0b25zOiBpbkV2ZW50LmJ1dHRvbnMsXG4gICAgICAgICAgICAgICAgICAgIHg6IGluRXZlbnQuY2xpZW50WCxcbiAgICAgICAgICAgICAgICAgICAgeTogaW5FdmVudC5jbGllbnRZXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHNob3VsZFRhcDogZnVuY3Rpb24oZSwgZG93blN0YXRlKSB7XG4gICAgICAgICAgICB2YXIgdGFwID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChlLnBvaW50ZXJUeXBlID09PSAnbW91c2UnKSB7XG4gICAgICAgICAgICAgICAgLy8gb25seSBhbGxvdyBsZWZ0IGNsaWNrIHRvIHRhcCBmb3IgbW91c2VcbiAgICAgICAgICAgICAgICB0YXAgPSAoZS5idXR0b25zIF4gMSkgJiYgKGRvd25TdGF0ZS5idXR0b25zICYgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGFwICYmICFlLnRhcFByZXZlbnRlZDtcbiAgICAgICAgfSxcbiAgICAgICAgdXA6IGZ1bmN0aW9uKGluRXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBzdGFydCA9IHBvaW50ZXJtYXAuZ2V0KGluRXZlbnQucG9pbnRlcklkKTtcbiAgICAgICAgICAgIGlmIChzdGFydCAmJiB0aGlzLnNob3VsZFRhcChpbkV2ZW50LCBzdGFydCkpIHtcbiAgICAgICAgICAgICAgICAvLyB1cC5yZWxhdGVkVGFyZ2V0IGlzIHRhcmdldCBjdXJyZW50bHkgdW5kZXIgZmluZ2VyXG4gICAgICAgICAgICAgICAgdmFyIHQgPSBzY29wZS50YXJnZXRGaW5kaW5nLkxDQShzdGFydC50YXJnZXQsIGluRXZlbnQucmVsYXRlZFRhcmdldCk7XG4gICAgICAgICAgICAgICAgaWYgKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGUgPSBldmVudEZhY3RvcnkubWFrZUdlc3R1cmVFdmVudCgndGFwJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBpbkV2ZW50LmNsaWVudFgsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiBpbkV2ZW50LmNsaWVudFksXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IGluRXZlbnQuZGV0YWlsLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlclR5cGU6IGluRXZlbnQucG9pbnRlclR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVySWQ6IGluRXZlbnQucG9pbnRlcklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWx0S2V5OiBpbkV2ZW50LmFsdEtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0cmxLZXk6IGluRXZlbnQuY3RybEtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGFLZXk6IGluRXZlbnQubWV0YUtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaWZ0S2V5OiBpbkV2ZW50LnNoaWZ0S2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgX3NvdXJjZTogJ3RhcCdcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHQuZGlzcGF0Y2hFdmVudChlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwb2ludGVybWFwLmRlbGV0ZShpbkV2ZW50LnBvaW50ZXJJZCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8vIHBhdGNoIGV2ZW50RmFjdG9yeSB0byByZW1vdmUgaWQgZnJvbSB0YXAncyBwb2ludGVybWFwIGZvciBwcmV2ZW50VGFwIGNhbGxzXG4gICAgZXZlbnRGYWN0b3J5LnByZXZlbnRUYXAgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGUudGFwUHJldmVudGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHBvaW50ZXJtYXAuZGVsZXRlKGUucG9pbnRlcklkKTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXJHZXN0dXJlKCd0YXAnLCB0YXApO1xufSkoZXhwb3J0cyk7XG5cbi8qXG4gKiBCYXNpYyBzdHJhdGVneTogZmluZCB0aGUgZmFydGhlc3QgYXBhcnQgcG9pbnRzLCB1c2UgYXMgZGlhbWV0ZXIgb2YgY2lyY2xlXG4gKiByZWFjdCB0byBzaXplIGNoYW5nZSBhbmQgcm90YXRpb24gb2YgdGhlIGNob3JkXG4gKi9cblxuLyoqXG4gKiBAbW9kdWxlIHBvaW50ZXItZ2VzdHVyZXNcbiAqIEBzdWJtb2R1bGUgRXZlbnRzXG4gKiBAY2xhc3MgcGluY2hcbiAqL1xuLyoqXG4gKiBTY2FsZSBvZiB0aGUgcGluY2ggem9vbSBnZXN0dXJlXG4gKiBAcHJvcGVydHkgc2NhbGVcbiAqIEB0eXBlIE51bWJlclxuICovXG4vKipcbiAqIENlbnRlciBYIHBvc2l0aW9uIG9mIHBvaW50ZXJzIGNhdXNpbmcgcGluY2hcbiAqIEBwcm9wZXJ0eSBjZW50ZXJYXG4gKiBAdHlwZSBOdW1iZXJcbiAqL1xuLyoqXG4gKiBDZW50ZXIgWSBwb3NpdGlvbiBvZiBwb2ludGVycyBjYXVzaW5nIHBpbmNoXG4gKiBAcHJvcGVydHkgY2VudGVyWVxuICogQHR5cGUgTnVtYmVyXG4gKi9cblxuLyoqXG4gKiBAbW9kdWxlIHBvaW50ZXItZ2VzdHVyZXNcbiAqIEBzdWJtb2R1bGUgRXZlbnRzXG4gKiBAY2xhc3Mgcm90YXRlXG4gKi9cbi8qKlxuICogQW5nbGUgKGluIGRlZ3JlZXMpIG9mIHJvdGF0aW9uLiBNZWFzdXJlZCBmcm9tIHN0YXJ0aW5nIHBvc2l0aW9ucyBvZiBwb2ludGVycy5cbiAqIEBwcm9wZXJ0eSBhbmdsZVxuICogQHR5cGUgTnVtYmVyXG4gKi9cbi8qKlxuICogQ2VudGVyIFggcG9zaXRpb24gb2YgcG9pbnRlcnMgY2F1c2luZyByb3RhdGlvblxuICogQHByb3BlcnR5IGNlbnRlclhcbiAqIEB0eXBlIE51bWJlclxuICovXG4vKipcbiAqIENlbnRlciBZIHBvc2l0aW9uIG9mIHBvaW50ZXJzIGNhdXNpbmcgcm90YXRpb25cbiAqIEBwcm9wZXJ0eSBjZW50ZXJZXG4gKiBAdHlwZSBOdW1iZXJcbiAqL1xuKGZ1bmN0aW9uKHNjb3BlKSB7XG4gICAgdmFyIGRpc3BhdGNoZXIgPSBzY29wZS5kaXNwYXRjaGVyO1xuICAgIHZhciBldmVudEZhY3RvcnkgPSBzY29wZS5ldmVudEZhY3Rvcnk7XG4gICAgdmFyIHBvaW50ZXJtYXAgPSBuZXcgc2NvcGUuUG9pbnRlck1hcCgpO1xuICAgIHZhciBSQURfVE9fREVHID0gMTgwIC8gTWF0aC5QSTtcbiAgICB2YXIgcGluY2ggPSB7XG4gICAgICAgIGV2ZW50czogW1xuICAgICAgICAgICAgJ2Rvd24nLFxuICAgICAgICAgICAgJ3VwJyxcbiAgICAgICAgICAgICdtb3ZlJyxcbiAgICAgICAgICAgICdjYW5jZWwnXG4gICAgICAgIF0sXG4gICAgICAgIGV4cG9zZXM6IFtcbiAgICAgICAgICAgICdwaW5jaHN0YXJ0JyxcbiAgICAgICAgICAgICdwaW5jaCcsXG4gICAgICAgICAgICAncGluY2hlbmQnLFxuICAgICAgICAgICAgJ3JvdGF0ZSdcbiAgICAgICAgXSxcbiAgICAgICAgZGVmYXVsdEFjdGlvbnM6IHtcbiAgICAgICAgICAgICdwaW5jaCc6ICdub25lJyxcbiAgICAgICAgICAgICdyb3RhdGUnOiAnbm9uZSdcbiAgICAgICAgfSxcbiAgICAgICAgcmVmZXJlbmNlOiB7fSxcbiAgICAgICAgZG93bjogZnVuY3Rpb24oaW5FdmVudCkge1xuICAgICAgICAgICAgcG9pbnRlcm1hcC5zZXQoaW5FdmVudC5wb2ludGVySWQsIGluRXZlbnQpO1xuICAgICAgICAgICAgaWYgKHBvaW50ZXJtYXAucG9pbnRlcnMoKSA9PSAyKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBvaW50cyA9IHRoaXMuY2FsY0Nob3JkKCk7XG4gICAgICAgICAgICAgICAgdmFyIGFuZ2xlID0gdGhpcy5jYWxjQW5nbGUocG9pbnRzKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZmVyZW5jZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgYW5nbGU6IGFuZ2xlLFxuICAgICAgICAgICAgICAgICAgICBkaWFtZXRlcjogcG9pbnRzLmRpYW1ldGVyLFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHNjb3BlLnRhcmdldEZpbmRpbmcuTENBKHBvaW50cy5hLnRhcmdldCwgcG9pbnRzLmIudGFyZ2V0KVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB0aGlzLmZpcmVQaW5jaCgncGluY2hzdGFydCcsIHBvaW50cy5kaWFtZXRlciwgcG9pbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdXA6IGZ1bmN0aW9uKGluRXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBwID0gcG9pbnRlcm1hcC5nZXQoaW5FdmVudC5wb2ludGVySWQpO1xuICAgICAgICAgICAgdmFyIG51bSA9IHBvaW50ZXJtYXAucG9pbnRlcnMoKTtcbiAgICAgICAgICAgIGlmIChwKSB7XG4gICAgICAgICAgICAgICAgaWYgKG51bSA9PT0gMikge1xuICAgICAgICAgICAgICAgICAgICAvLyBmaXJlICdwaW5jaGVuZCcgYmVmb3JlIGRlbGV0aW5nIHBvaW50ZXJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvaW50cyA9IHRoaXMuY2FsY0Nob3JkKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyZVBpbmNoKCdwaW5jaGVuZCcsIHBvaW50cy5kaWFtZXRlciwgcG9pbnRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcG9pbnRlcm1hcC5kZWxldGUoaW5FdmVudC5wb2ludGVySWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtb3ZlOiBmdW5jdGlvbihpbkV2ZW50KSB7XG4gICAgICAgICAgICBpZiAocG9pbnRlcm1hcC5oYXMoaW5FdmVudC5wb2ludGVySWQpKSB7XG4gICAgICAgICAgICAgICAgcG9pbnRlcm1hcC5zZXQoaW5FdmVudC5wb2ludGVySWQsIGluRXZlbnQpO1xuICAgICAgICAgICAgICAgIGlmIChwb2ludGVybWFwLnBvaW50ZXJzKCkgPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsY1BpbmNoUm90YXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjYW5jZWw6IGZ1bmN0aW9uKGluRXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMudXAoaW5FdmVudCk7XG4gICAgICAgIH0sXG4gICAgICAgIGZpcmVQaW5jaDogZnVuY3Rpb24odHlwZSwgZGlhbWV0ZXIsIHBvaW50cykge1xuICAgICAgICAgICAgdmFyIHpvb20gPSBkaWFtZXRlciAvIHRoaXMucmVmZXJlbmNlLmRpYW1ldGVyO1xuICAgICAgICAgICAgdmFyIGUgPSBldmVudEZhY3RvcnkubWFrZUdlc3R1cmVFdmVudCh0eXBlLCB7XG4gICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIHNjYWxlOiB6b29tLFxuICAgICAgICAgICAgICAgIGNlbnRlclg6IHBvaW50cy5jZW50ZXIueCxcbiAgICAgICAgICAgICAgICBjZW50ZXJZOiBwb2ludHMuY2VudGVyLnksXG4gICAgICAgICAgICAgICAgX3NvdXJjZTogJ3BpbmNoJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnJlZmVyZW5jZS50YXJnZXQuZGlzcGF0Y2hFdmVudChlKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmlyZVJvdGF0ZTogZnVuY3Rpb24oYW5nbGUsIHBvaW50cykge1xuICAgICAgICAgICAgdmFyIGRpZmYgPSBNYXRoLnJvdW5kKChhbmdsZSAtIHRoaXMucmVmZXJlbmNlLmFuZ2xlKSAlIDM2MCk7XG4gICAgICAgICAgICB2YXIgZSA9IGV2ZW50RmFjdG9yeS5tYWtlR2VzdHVyZUV2ZW50KCdyb3RhdGUnLCB7XG4gICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGFuZ2xlOiBkaWZmLFxuICAgICAgICAgICAgICAgIGNlbnRlclg6IHBvaW50cy5jZW50ZXIueCxcbiAgICAgICAgICAgICAgICBjZW50ZXJZOiBwb2ludHMuY2VudGVyLnksXG4gICAgICAgICAgICAgICAgX3NvdXJjZTogJ3BpbmNoJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnJlZmVyZW5jZS50YXJnZXQuZGlzcGF0Y2hFdmVudChlKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2FsY1BpbmNoUm90YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBwb2ludHMgPSB0aGlzLmNhbGNDaG9yZCgpO1xuICAgICAgICAgICAgdmFyIGRpYW1ldGVyID0gcG9pbnRzLmRpYW1ldGVyO1xuICAgICAgICAgICAgdmFyIGFuZ2xlID0gdGhpcy5jYWxjQW5nbGUocG9pbnRzKTtcbiAgICAgICAgICAgIGlmIChkaWFtZXRlciAhPSB0aGlzLnJlZmVyZW5jZS5kaWFtZXRlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyZVBpbmNoKCdwaW5jaCcsIGRpYW1ldGVyLCBwb2ludHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFuZ2xlICE9IHRoaXMucmVmZXJlbmNlLmFuZ2xlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJlUm90YXRlKGFuZ2xlLCBwb2ludHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjYWxjQ2hvcmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHBvaW50ZXJzID0gW107XG4gICAgICAgICAgICBwb2ludGVybWFwLmZvckVhY2goZnVuY3Rpb24ocCkge1xuICAgICAgICAgICAgICAgIHBvaW50ZXJzLnB1c2gocCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBkaXN0ID0gMDtcbiAgICAgICAgICAgIC8vIHN0YXJ0IHdpdGggYXQgbGVhc3QgdHdvIHBvaW50ZXJzXG4gICAgICAgICAgICB2YXIgcG9pbnRzID0ge1xuICAgICAgICAgICAgICAgIGE6IHBvaW50ZXJzWzBdLFxuICAgICAgICAgICAgICAgIGI6IHBvaW50ZXJzWzFdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIHgsIHksIGQ7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBvaW50ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGEgPSBwb2ludGVyc1tpXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gaSArIDE7IGogPCBwb2ludGVycy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYiA9IHBvaW50ZXJzW2pdO1xuICAgICAgICAgICAgICAgICAgICB4ID0gTWF0aC5hYnMoYS5jbGllbnRYIC0gYi5jbGllbnRYKTtcbiAgICAgICAgICAgICAgICAgICAgeSA9IE1hdGguYWJzKGEuY2xpZW50WSAtIGIuY2xpZW50WSk7XG4gICAgICAgICAgICAgICAgICAgIGQgPSB4ICsgeTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQgPiBkaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXN0ID0gZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50cyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhOiBhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGI6IGJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB4ID0gTWF0aC5hYnMocG9pbnRzLmEuY2xpZW50WCArIHBvaW50cy5iLmNsaWVudFgpIC8gMjtcbiAgICAgICAgICAgIHkgPSBNYXRoLmFicyhwb2ludHMuYS5jbGllbnRZICsgcG9pbnRzLmIuY2xpZW50WSkgLyAyO1xuICAgICAgICAgICAgcG9pbnRzLmNlbnRlciA9IHtcbiAgICAgICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgICAgIHk6IHlcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBwb2ludHMuZGlhbWV0ZXIgPSBkaXN0O1xuICAgICAgICAgICAgcmV0dXJuIHBvaW50cztcbiAgICAgICAgfSxcbiAgICAgICAgY2FsY0FuZ2xlOiBmdW5jdGlvbihwb2ludHMpIHtcbiAgICAgICAgICAgIHZhciB4ID0gcG9pbnRzLmEuY2xpZW50WCAtIHBvaW50cy5iLmNsaWVudFg7XG4gICAgICAgICAgICB2YXIgeSA9IHBvaW50cy5hLmNsaWVudFkgLSBwb2ludHMuYi5jbGllbnRZO1xuICAgICAgICAgICAgcmV0dXJuICgzNjAgKyBNYXRoLmF0YW4yKHksIHgpICogUkFEX1RPX0RFRykgJSAzNjA7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXJHZXN0dXJlKCdwaW5jaCcsIHBpbmNoKTtcbn0pKGV4cG9ydHMpOyJdfQ==
