nodejs-lnGuid
=============

This is used in nodejs generated Guid by c++.

This module checked your system, support on Windows, Linux, Mac OS X platform

How to use it
-------------

##Installation
You can install with `npm`:
``` bash
$ npm install lnGuid
```

##Get a Guid object from nodejs
``` javascript
var lnGuid = require('lnGuid');
var myGuid = lnGuid.newGuid(); // -> Create new Guid
console.log(myGuid.toString()); // -> The console print like this "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```
## Methods
### The Constructors
``` javascript
    var emptyGuid = new lnGuid(); // -> Create a empty Guid like `lnGuid.empty()`;
    var myGuid = new lnGuid('A4F1A501-D421-4621-BB51-DE7E8857BA09'); //Create a known Guid from String
```
### Object methods
``` javascript
    var myGuid1 = lnGuid.newGuid(); // -> Create a new Guid
    var myGuid2 = lnGuid.newGuid(); // -> Create a new Guid again
    myGuid1.equals(myGuid2); // -> Check of these two Guid object are equal
    var bytes = myGuid1.toArray(); // -> get a byte array from this `myGuid1`, length of 16, like this `[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]`
    var guidStr = myGuid2.toString(); // -> get a Guid string from this `myGuid2`, length of 36, like this '00000000-0000-0000-0000-000000000000'
```
### Static methods
``` javascript
    var emptyGuid = lnGuid.empty(); // -> Create a empty Guid, like this '00000000-0000-0000-0000-000000000000'
    var myGuid = lnGuid.parse('A4F1A501-D421-4621-BB51-DE7E8857BA09'); // -> Transform a Guid object from guid string, like `new Guid('guid string')`
    var isGuid = lnGuid.isGuid('A4F1A501-D421-4621-BB51-DE7E8857BA09'); // -> Check a `string` or a `lnGuid` object is Guid or another?
    var isEqueal = lnGuid.equals(emptyGuid, myGuid); //Check `emptyGuid` and `myGuid` is equal;
        remark: lnGuid.equals method`s two parameters must be lnGuid`s object, another return false
```