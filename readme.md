## Vector utils

This is a small vector utility inteded to be used with [gl-matrix](https://github.com/toji/gl-matrix).

gl-matrix is very fast to use for internal high-performant (and WebGL) code, but it leads to an ugly API for the end-user:

```javascript
var a = vec2.fromValues(10, 25);
var b = vec2.fromValues(5, 2);

ctx.fillRect(a[0], b[1], b[0], b[1]); 
```

Using array indices is error-prone, has no auto-completion, and makes your code more difficult to read. 

minivec provides wrappers for the array indices, intended to be used in not-so-performance critical sections for better readability. 

```javascript
var Vector2 = require('minivec').Vector2;

var a = new Vector2(10, 25);
var b = new Vector2(25, 50);

console.log(a.items); //the Float32Array, for fast access
console.log(a.x + a.y);

a.y += 25 * a.x; //sooo much more readable! 
```

You can also access the vector like an array, so that the following works as expected:

```javascript
var out = new Vector2();
var a = new Vector2(20, 5);
var b = new Vector2(15, 2);

var vec2 = require('gl-matrix').vec2;
vec2.add(out, a, b);
```

However, for performant code (especially on Safari, which seems brutal with properties) you should use the `items` array like so:

```javascript
var vec2 = require('gl-matrix').vec2;
vec2.add(out.items, a.items, b.items);
```


## Pool

This includes a Pool class for working with reusable objects within GC limits. You specify a max number of objects for a Pool, and then use `obtain()` and `free()` to manage your objects. After you `free` an object (put it back in the pool), its `reset()` method will be called.

