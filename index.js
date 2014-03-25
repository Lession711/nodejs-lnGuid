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
            for (var i = 0; i < value.length; i++) {
                var a = value[i].toString(16);
                if(a.length == 1)
                    a = "0" + a;
                //00 00 00 00-00 00-00 00-00 00 00 00 00 00
                if(i == 4 || i ==6 || i == 8 || i == 10)
                    result += "-";
                result += a;
            };
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
                var strGuid = guid.replace(/[-\{\}]/g, "");
                for (var i = 0; i < 16; ++i) {
                    var a = strGuid.substring(0,2);
                    value[i] = parseInt(a, 16);
                    strGuid = strGuid.substring(2);
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