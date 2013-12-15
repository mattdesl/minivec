/**
 * A Pool for reusable objects, like vectors
 * or constraints.
 * 
 * @param {any} T  a constructor to be instantiated with 'new'
 * @param {Number} max the max size of this pool
 */
var Pool = function(T, max) {
	this.T = T;
	this.max = max || Number.MAX_VALUE;
	this.peak = 0;
	this.objects = [];
};

Pool.prototype.constructor = Pool;

/**
 * Returns the last object in the pool,
 * or a new T if the pool is empty. 
 * 
 * @return {T} 
 */
Pool.prototype.obtain = function() {
	return this.objects.length === 0 
		? new this.T() : this.objects.pop();
};

/**
 * Frees an object by placing it back in the pool, then calls
 * reset() on the object for future use.
 * 
 * @param  {T} obj     the object to put into the pool
 * @param  {Boolean} noReset optional, if true the reset() method
 *                          will not be called on the obj (default false)
 */
Pool.prototype.free = function(obj, noReset) {
	if (!obj)
		throw "no object passed to free()"
	if (this.objects.length < this.max) {
		this.objects.push(obj);
		this.peak = Math.max(this.peak, this.objects.length);
	}
	if (!noReset && obj.reset)
		obj.reset();
};

module.exports = Pool;