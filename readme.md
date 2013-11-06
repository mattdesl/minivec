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
var a = new Vector2(10, 25);
var b = new Vector2(25, 50);

console.log(a.items); //the Float32Array, for fast access
console.log(a.x + a.y);

a.y += 25 * a.x; //sooo much more readable! 

var vec2 = require('gl-matrix').vec2;

var res = new Vector2();
vec2.add(res.items, a.items, b.items); //eh... not so nice. 
```


