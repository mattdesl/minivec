var ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;

/**
 * A Pool for array types. This is useful
 * if you just want really fast internal code with minimal GC.
 * 
 * @param {Number} numComponents number of components for new arrays
 * @param {Number} max the max size of this pool
 */
var ArrayPool = function(numComponents, max) {
	this.numComponents = numComponents;
	this.max = max || Number.MAX_VALUE;
	this.peak = 0;
	this.objects = [];
};

ArrayPool.prototype.constructor = ArrayPool;

/**
 * Returns the last object in the ArrayPool,
 * or a new array if the ArrayPool is empty. 
 * 
 * @return {Float32Array | Array} the pooled array, or a new one
 */
ArrayPool.prototype.obtain = function() {
	return this.objects.length === 0 
		? new ARRAY_TYPE(this.numComponents) 
		: this.objects.pop();
};

/**
 * By default, simply makes all elements in the array
 * zero. A subclass may wish to override this, e.g. for
 * an identity matrix. 
 * 
 * @param  {Float32Array | Array} obj the array to reset
 */
ArrayPool.prototype.reset = function(obj) {
	//reset the array to initial state
    var len = obj.length;
    switch (len) {
        //fall through
        case 4: obj[3] = 0;
        case 3: obj[2] = 0;
        case 2: obj[1] = 0;
        case 1: obj[0] = 0;
        	break;
        default: //For big arrays we need to loop through and clear...
        	var i = len;
        	while (i--)
        		obj[i] = 0;
        	break;
    }
};

/**
 * Frees an array by placing it back in the ArrayPool, then resets
 * the array by calling ArrayPool's `reset` function.
 *
 * If the pool has reached its max, the object is not put into the pool.
 * 
 * @param  {Float32Array | Array}  obj     the object to put into the ArrayPool
 */
ArrayPool.prototype.free = function(obj) {
	if (!obj)
		throw "no object passed to free()"
	if (this.objects.length < this.max) {
		this.objects.push(obj);
		this.peak = Math.max(this.peak, this.objects.length);
	}

	this.reset(obj);
    return obj;
};

module.exports = ArrayPool;