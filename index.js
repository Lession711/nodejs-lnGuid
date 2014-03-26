module.exports = (function () {
    var lnGuid = null;
    if(/^win/i.test(process.platform)) {
        lnGuid = require("./build/Release/win/lnGuid.node");
    }
    else {
        lnGuid = require("./build/Release/linux/lnGuid.node");
    }
    var guidReg = /^\{?[a-f0-9]{8}(-?[a-f0-9]{4}){3}-?[a-f0-9]{12}\}?$/gi
    var Guid = function (guid) {
        var value = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var getNumberString2X = function (num) {
            var a = num.toString(16);
            if(a.length == 1) {
                return "0" + a;
            }
            return a;
        }
        this.equals = function (guid1) {
            if(guid1 instanceof Guid) {
                var v = guid1.toArray();
                for (var i = 0; i < value.length; ++i) {
                    if(value[i] == v[i]) {
                        continue;
                    }
                    return false;
                };
                return true;
            }
            return false;
        };

        this.toArray = function () {
            var v = [];
            for (var i = 0; i < value.length; i++) {
                v.push(value[i]);
            };
            return v;
        };

        this.toString = function () {
            var result = "";
            result += getNumberString2X(value[3]);
            result += getNumberString2X(value[2]);
            result += getNumberString2X(value[1]);
            result += getNumberString2X(value[0]);
            result += "-";
            result += getNumberString2X(value[5]);
            result += getNumberString2X(value[4]);
            result += "-";
            result += getNumberString2X(value[7]);
            result += getNumberString2X(value[6]);
            result += "-";
            result += getNumberString2X(value[8]);
            result += getNumberString2X(value[9]);
            result += "-";
            result += getNumberString2X(value[10]);
            result += getNumberString2X(value[11]);
            result += getNumberString2X(value[12]);
            result += getNumberString2X(value[13]);
            result += getNumberString2X(value[14]);
            result += getNumberString2X(value[15]);
            return result.toUpperCase();
        };

        /*构造函数 开始*/
        if (guid) {
            if(typeof(guid) === 'string') {
                //将字符串转换为Guid
                guidReg.lastIndex = 0;
                if(!guidReg.test(guid)) {
                    throw "This is not a Guid string";
                }
                var arr = guid.replace(/[-\{\}]/g, "").split('');
                var itm = arr.splice(0, 2).join(''); //0
                value[3] = parseInt(itm, 16);
                itm = arr.splice(0, 2).join(''); //1
                value[2] = parseInt(itm, 16);
                itm = arr.splice(0, 2).join(''); //2
                value[1] = parseInt(itm, 16);
                itm = arr.splice(0, 2).join(''); //3
                value[0] = parseInt(itm, 16);

                itm = arr.splice(0, 2).join(''); //4
                value[5] = parseInt(itm, 16);
                itm = arr.splice(0, 2).join(''); //5
                value[4] = parseInt(itm, 16);

                itm = arr.splice(0, 2).join(''); //6
                value[7] = parseInt(itm, 16);
                itm = arr.splice(0, 2).join(''); //7
                value[6] = parseInt(itm, 16);

                for (var i = 8; i < 16; ++i) {
                    itm = arr.splice(0, 2).join(''); //8~15
                    value[i] = parseInt(itm, 16);
                }
                return;
            }
            else if(guid instanceof Guid) {
                value = guid.toArray();
            }
        };
        /*构造函数结束*/
    };

    Guid.parse = function (guidStr) {
        return new Guid(guidStr);
    };

    Guid.isGuid = function (guidStr) {
        if(typeof(guidStr) === "string") {
            guidReg.lastIndex = 0;
            return guidReg.test(guidStr);
        }
        else
            return guidStr instanceof Guid;
    };

    Guid.newGuid = function () {
        return new Guid(lnGuid.NewGuid());
    }

    Guid.empty = function () {
        return new Guid();
    };

    Guid.equals = function (guid1, guid2) {
        if(guid1 instanceof Guid) {
            return guid1.equals(guid2);
        }
        return false;
    }
    return Guid;
})();