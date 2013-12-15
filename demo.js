var Matrix4 = require('./lib/index').Matrix4;
var Vector4 = require('./lib/index').Vector4;
var Vector3 = require('./lib/index').Vector3;
var Quaternion = require('./lib/index').Quaternion;

var tmp = new Vector3();

var pos = new Vector3(25, 10, -50);
var dir = new Vector3(0, 0, -1);
var up = new Vector3(0, 1, 0);
var vec = new Vector3(0, 0, 0); //the vector to look at

dir.copy(vec).sub(pos).normalize();
tmp.copy(dir).cross(up).normalize();
up.copy(tmp).cross(dir).normalize();

// var vec3 = require('gl-matrix').vec3;

// var tmp0 = vec3.create();
// var pos0 = vec3.fromValues(25, 10, -50);
// var dir0 = vec3.fromValues(0, 0, -1);
// var up0 = vec3.fromValues(0, 1, 0);
// var vec0 = vec3.fromValues(0, 0, 0);

// for (var i=0; i<10000; i++) {
//     vec3.copy(dir0, vec0);
//     vec3.sub(dir0, dir0, pos0);
//     vec3.normalize(dir0, dir0);

//     //normalize the up vector
//     //calculate right vector (cross dir0 & up)
//     vec3.copy(tmp0, dir0);
//     vec3.cross(tmp0, tmp0, up0);
//     vec3.normalize(tmp0, tmp0);

//     //calculate up vector (cross right & dir0)
//     vec3.copy(up0, tmp0);
//     vec3.cross(up0, up0, dir0);
//     vec3.normalize(up0, up0);
// }
    

