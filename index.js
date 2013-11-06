var ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;

// A private constructor
var ctor = function(count, x, y, z, w) {
    x = x || 0;
    y = y || 0;
    z = z || 0;
    w = w || 0;

    this.items = new ARRAY_TYPE(count);
    this.items[0] = x;
    if (count>1) this.items[1] = y;
    if (count>2) this.items[2] = z;
    if (count>3) this.items[3] = w;
};

var props = ['x', 'y', 'z', 'w'];

//Simple property creation util...
var prop = function(index) {
    return {
        set: function(val) {
            this.items[index] = val;
        },
        get: function() {
            return this.items[index];
        }
    };
};

//For extending vector types...
var extend = function(type, base, count) {
    if (base)
        type.prototype = Object.create(base.prototype);
    type.prototype.constructor = type;

    //TODO: Support GLSL-like "xy", "xyz", "xyzw" 
    //which return a new Vector type
    for (var i=0; i<count; i++) {
        Object.defineProperty(type.prototype, props[i], prop(i));
    }
};

//Vector base class
var Vector = function(x) {
    ctor.call(this, 1, x);
};
extend(Vector, null, 1);

//Vector2
var Vector2 = function(x, y) {
    ctor.call(this, 2, x, y);
};
extend(Vector2, Vector, 2);

//Vector3
var Vector3 = function(x, y, z) {
    ctor.call(this, 3, x, y, z);
};
extend(Vector3, Vector, 3);

//Vector4
var Vector4 = function(x, y, z, w) {
    ctor.call(this, 4, x, y, z, w);
};
extend(Vector4, Vector, 4);

//Export our types...
module.exports = {
    Vector: Vector,
    Vector2: Vector2,
    Vector3: Vector3,
    Vector4: Vector4
};