(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, (function () {
    var current = global.cnfBarcode;
    var exports = global.cnfBarcode = factory();
    exports.noConflict = function () { global.cnfBarcode = current; return exports; };
  }()));
}(this, function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var createClass = _createClass;

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

  function _typeof(obj) {
    if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return _typeof2(obj);
      };
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
      };
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
  });

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  var assertThisInitialized = _assertThisInitialized;

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
      return call;
    }

    return assertThisInitialized(self);
  }

  var possibleConstructorReturn = _possibleConstructorReturn;

  var getPrototypeOf = createCommonjsModule(function (module) {
  function _getPrototypeOf(o) {
    module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  module.exports = _getPrototypeOf;
  });

  var setPrototypeOf = createCommonjsModule(function (module) {
  function _setPrototypeOf(o, p) {
    module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  module.exports = _setPrototypeOf;
  });

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) setPrototypeOf(subClass, superClass);
  }

  var inherits = _inherits;

  var Barcode=function Barcode(data,options){classCallCheck(this,Barcode),this.data=data,this.text=options.text||data,this.options=options;};

  var CODE39=function(_Barcode){function CODE39(data,options){return classCallCheck(this,CODE39),data=data.toUpperCase(),options.mod43&&(data+=getCharacter(mod43checksum(data))),possibleConstructorReturn(this,getPrototypeOf(CODE39).call(this,data,options))}return inherits(CODE39,_Barcode),createClass(CODE39,[{key:"encode",value:function encode(){for(var result=getEncoding("*"),i=0;i<this.data.length;i++)result+="".concat(getEncoding(this.data[i]),"0");return result+=getEncoding("*"),{data:result,text:this.text}}},{key:"valid",value:function valid(){return -1!==this.data.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/)}}]),CODE39}(Barcode),characters=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","-","."," ","$","/","+","%","*"],encodings=[20957,29783,23639,30485,20951,29813,23669,20855,29789,23645,29975,23831,30533,22295,30149,24005,21623,29981,23837,22301,30023,23879,30545,22343,30161,24017,21959,30065,23921,22385,29015,18263,29141,17879,29045,18293,17783,29021,18269,17477,17489,17681,20753,35770];function getEncoding(character){return getBinary(characterValue(character))}function getBinary(characterValue){return encodings[characterValue].toString(2)}function getCharacter(characterValue){return characters[characterValue]}function characterValue(character){return characters.indexOf(character)}function mod43checksum(data){for(var checksum=0,i=0;i<data.length;i++)checksum+=characterValue(data[i]);return checksum%=43,checksum}

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var defineProperty = _defineProperty;

  var _SET_BY_CODE;var SET_A=0;var SET_B=1;var SET_C=2;var SHIFT=98;var START_A=103;var START_B=104;var START_C=105;var MODULO=103;var STOP=106;var FNC1=207;var SET_BY_CODE=(_SET_BY_CODE={},defineProperty(_SET_BY_CODE,START_A,SET_A),defineProperty(_SET_BY_CODE,START_B,SET_B),defineProperty(_SET_BY_CODE,START_C,SET_C),_SET_BY_CODE);var SWAP={101:SET_A,100:SET_B,99:SET_C};var A_START_CHAR=String.fromCharCode(208);var B_START_CHAR=String.fromCharCode(209);var C_START_CHAR=String.fromCharCode(210);var A_CHARS="[\0-_\xC8-\xCF]";var B_CHARS="[ -\x7F\xC8-\xCF]";var C_CHARS="(\xCF*[0-9]{2}\xCF*)";var BARS=[11011001100,11001101100,11001100110,10010011e3,10010001100,10001001100,10011001e3,10011000100,10001100100,11001001e3,11001000100,11000100100,10110011100,10011011100,10011001110,10111001100,10011101100,10011100110,11001110010,11001011100,11001001110,11011100100,11001110100,11101101110,11101001100,11100101100,11100100110,11101100100,11100110100,11100110010,11011011e3,11011000110,11000110110,10100011e3,10001011e3,10001000110,10110001e3,10001101e3,10001100010,11010001e3,11000101e3,11000100010,10110111e3,10110001110,10001101110,10111011e3,10111000110,10001110110,11101110110,11010001110,11000101110,11011101e3,11011100010,11011101110,11101011e3,11101000110,11100010110,11101101e3,11101100010,11100011010,11101111010,11001000010,11110001010,1010011e4,10100001100,1001011e4,10010000110,10000101100,10000100110,1011001e4,10110000100,1001101e4,10011000010,10000110100,10000110010,11000010010,1100101e4,11110111010,11000010100,10001111010,10100111100,10010111100,10010011110,10111100100,10011110100,10011110010,11110100100,11110010100,11110010010,11011011110,11011110110,11110110110,10101111e3,10100011110,10001011110,10111101e3,10111100010,11110101e3,11110100010,10111011110,10111101110,11101011110,11110101110,11010000100,1101001e4,11010011100,1100011101011];

  var CODE128=function(_Barcode){function CODE128(data,options){var _this;return classCallCheck(this,CODE128),_this=possibleConstructorReturn(this,getPrototypeOf(CODE128).call(this,data.substring(1),options)),_this.bytes=data.split("").map(function(_char){return _char.charCodeAt(0)}),_this}return inherits(CODE128,_Barcode),createClass(CODE128,[{key:"valid",value:function valid(){return /^[\x00-\x7F\xC8-\xD3]+$/.test(this.data)}},{key:"encode",value:function encode(){var bytes=this.bytes,startIndex=bytes.shift()-105,startSet=SET_BY_CODE[startIndex];if(void 0===startSet)throw new RangeError("The encoding does not start with a start character.");!0===this.shouldEncodeAsEan128()&&bytes.unshift(FNC1);var encodingResult=CODE128.next(bytes,1,startSet);return {text:this.text===this.data?this.text.replace(/[^\x20-\x7E]/g,""):this.text,data:CODE128.getBar(startIndex)+encodingResult.result+CODE128.getBar((encodingResult.checksum+startIndex)%MODULO)+CODE128.getBar(STOP)}}},{key:"shouldEncodeAsEan128",value:function shouldEncodeAsEan128(){var isEAN128=this.options.ean128||!1;return "string"==typeof isEAN128&&(isEAN128="true"===isEAN128.toLowerCase()),isEAN128}}],[{key:"getBar",value:function getBar(index){return BARS[index]?BARS[index].toString():""}},{key:"correctIndex",value:function correctIndex(bytes,set){if(set===SET_A){var charCode=bytes.shift();return 32>charCode?charCode+64:charCode-32}return set===SET_B?bytes.shift()-32:10*(bytes.shift()-48)+bytes.shift()-48}},{key:"next",value:function next(bytes,pos,set){if(!bytes.length)return {result:"",checksum:0};var nextCode,index;if(200<=bytes[0]){index=bytes.shift()-105;var nextSet=SWAP[index];void 0===nextSet?((set===SET_A||set===SET_B)&&index===SHIFT&&(bytes[0]=set===SET_A?95<bytes[0]?bytes[0]-96:bytes[0]:32>bytes[0]?bytes[0]+96:bytes[0]),nextCode=CODE128.next(bytes,pos+1,set)):nextCode=CODE128.next(bytes,pos+1,nextSet);}else index=CODE128.correctIndex(bytes,set),nextCode=CODE128.next(bytes,pos+1,set);var enc=CODE128.getBar(index),weight=index*pos;return {result:enc+nextCode.result,checksum:weight+nextCode.checksum}}}]),CODE128}(Barcode);

  var matchSetALength=function(string){return string.match(new RegExp("^".concat(A_CHARS,"*")))[0].length},matchSetBLength=function(string){return string.match(new RegExp("^".concat(B_CHARS,"*")))[0].length},matchSetC=function(string){return string.match(new RegExp("^".concat(C_CHARS,"*")))[0]};function autoSelectFromAB(string,isA){var ranges=isA?A_CHARS:B_CHARS,untilC=string.match(new RegExp("^(".concat(ranges,"+?)(([0-9]{2}){2,})([^0-9]|$)")));if(untilC)return untilC[1]+String.fromCharCode(204)+autoSelectFromC(string.substring(untilC[1].length));var chars=string.match(new RegExp("^".concat(ranges,"+")))[0];return chars.length===string.length?string:chars+String.fromCharCode(isA?205:206)+autoSelectFromAB(string.substring(chars.length),!isA)}function autoSelectFromC(string){var cMatch=matchSetC(string),length=cMatch.length;if(length===string.length)return string;string=string.substring(length);var isA=matchSetALength(string)>=matchSetBLength(string);return cMatch+String.fromCharCode(isA?206:205)+autoSelectFromAB(string,isA)}var autoSelectModes = (function(string){var newString,cLength=matchSetC(string).length;if(2<=cLength)newString=C_START_CHAR+autoSelectFromC(string);else{var isA=matchSetALength(string)>matchSetBLength(string);newString=(isA?A_START_CHAR:B_START_CHAR)+autoSelectFromAB(string,isA);}return newString.replace(/[\xCD\xCE]([^])[\xCD\xCE]/,function(match,_char){return String.fromCharCode(203)+_char})});

  var CODE128AUTO=function(_CODE){function CODE128AUTO(data,options){var _this;return classCallCheck(this,CODE128AUTO),_this=/^[\x00-\x7F\xC8-\xD3]+$/.test(data)?possibleConstructorReturn(this,getPrototypeOf(CODE128AUTO).call(this,autoSelectModes(data),options)):possibleConstructorReturn(this,getPrototypeOf(CODE128AUTO).call(this,data,options)),possibleConstructorReturn(_this)}return inherits(CODE128AUTO,_CODE),CODE128AUTO}(CODE128);

  var CODE128A=function(_CODE){function CODE128A(string,options){return classCallCheck(this,CODE128A),possibleConstructorReturn(this,getPrototypeOf(CODE128A).call(this,A_START_CHAR+string,options))}return inherits(CODE128A,_CODE),createClass(CODE128A,[{key:"valid",value:function valid(){return new RegExp("^".concat(A_CHARS,"+$")).test(this.data)}}]),CODE128A}(CODE128);

  var CODE128B=function(_CODE){function CODE128B(string,options){return classCallCheck(this,CODE128B),possibleConstructorReturn(this,getPrototypeOf(CODE128B).call(this,B_START_CHAR+string,options))}return inherits(CODE128B,_CODE),createClass(CODE128B,[{key:"valid",value:function valid(){return new RegExp("^".concat(B_CHARS,"+$")).test(this.data)}}]),CODE128B}(CODE128);

  var CODE128C=function(_CODE){function CODE128C(string,options){return classCallCheck(this,CODE128C),possibleConstructorReturn(this,getPrototypeOf(CODE128C).call(this,C_START_CHAR+string,options))}return inherits(CODE128C,_CODE),createClass(CODE128C,[{key:"valid",value:function valid(){return new RegExp("^".concat(C_CHARS,"+$")).test(this.data)}}]),CODE128C}(CODE128);

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  var superPropBase = _superPropBase;

  var get = createCommonjsModule(function (module) {
  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      module.exports = _get = Reflect.get;
    } else {
      module.exports = _get = function _get(target, property, receiver) {
        var base = superPropBase(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  module.exports = _get;
  });

  var SIDE_BIN="101";var MIDDLE_BIN="01010";var BINARIES={L:["0001101","0011001","0010011","0111101","0100011","0110001","0101111","0111011","0110111","0001011"],G:["0100111","0110011","0011011","0100001","0011101","0111001","0000101","0010001","0001001","0010111"],R:["1110010","1100110","1101100","1000010","1011100","1001110","1010000","1000100","1001000","1110100"],O:["0001101","0011001","0010011","0111101","0100011","0110001","0101111","0111011","0110111","0001011"],E:["0100111","0110011","0011011","0100001","0011101","0111001","0000101","0010001","0001001","0010111"]};var EAN2_STRUCTURE=["LL","LG","GL","GG"];var EAN5_STRUCTURE=["GGLLL","GLGLL","GLLGL","GLLLG","LGGLL","LLGGL","LLLGG","LGLGL","LGLLG","LLGLG"];var EAN13_STRUCTURE=["LLLLLL","LLGLGG","LLGGLG","LLGGGL","LGLLGG","LGGLLG","LGGGLL","LGLGLG","LGLGGL","LGGLGL"];

  var encode=function(data,structure,separator){var encoded=data.split("").map(function(val,idx){return BINARIES[structure[idx]]}).map(function(val,idx){return val?val[data[idx]]:""});if(separator){var last=data.length-1;encoded=encoded.map(function(val,idx){return idx<last?val+separator:val});}return encoded.join("")};

  var EAN=function(_Barcode){function EAN(data,options){var _this;return classCallCheck(this,EAN),_this=possibleConstructorReturn(this,getPrototypeOf(EAN).call(this,data,options)),_this.fontSize=!options.flat&&options.fontSize>10*options.width?10*options.width:options.fontSize,_this.guardHeight=options.height+_this.fontSize/2+options.textMargin,_this}return inherits(EAN,_Barcode),createClass(EAN,[{key:"encode",value:function(){return this.options.flat?this.encodeFlat():this.encodeGuarded()}},{key:"leftText",value:function leftText(from,to){return this.text.substr(from,to)}},{key:"leftEncode",value:function leftEncode(data,structure){return encode(data,structure)}},{key:"rightText",value:function rightText(from,to){return this.text.substr(from,to)}},{key:"rightEncode",value:function rightEncode(data,structure){return encode(data,structure)}},{key:"encodeGuarded",value:function encodeGuarded(){var textOptions={fontSize:this.fontSize},guardOptions={height:this.guardHeight};return [{data:SIDE_BIN,options:guardOptions},{data:this.leftEncode(),text:this.leftText(),options:textOptions},{data:MIDDLE_BIN,options:guardOptions},{data:this.rightEncode(),text:this.rightText(),options:textOptions},{data:SIDE_BIN,options:guardOptions}]}},{key:"encodeFlat",value:function encodeFlat(){var data=[SIDE_BIN,this.leftEncode(),MIDDLE_BIN,this.rightEncode(),SIDE_BIN];return {data:data.join(""),text:this.text}}}]),EAN}(Barcode);

  var checksum=function(number){var res=number.substr(0,12).split("").map(function(n){return +n}).reduce(function(sum,a,idx){return idx%2?sum+3*a:sum+a},0);return (10-res%10)%10},EAN13=function(_EAN){function EAN13(data,options){var _this;return classCallCheck(this,EAN13),-1!==data.search(/^[0-9]{12}$/)&&(data+=checksum(data)),_this=possibleConstructorReturn(this,getPrototypeOf(EAN13).call(this,data,options)),_this.lastChar=options.lastChar,_this}return inherits(EAN13,_EAN),createClass(EAN13,[{key:"valid",value:function valid(){return -1!==this.data.search(/^[0-9]{13}$/)&&+this.data[12]===checksum(this.data)}},{key:"leftText",value:function leftText(){return get(getPrototypeOf(EAN13.prototype),"leftText",this).call(this,1,6)}},{key:"leftEncode",value:function leftEncode(){var data=this.data.substr(1,6),structure=EAN13_STRUCTURE[this.data[0]];return get(getPrototypeOf(EAN13.prototype),"leftEncode",this).call(this,data,structure)}},{key:"rightText",value:function rightText(){return get(getPrototypeOf(EAN13.prototype),"rightText",this).call(this,7,6)}},{key:"rightEncode",value:function rightEncode(){var data=this.data.substr(7,6);return get(getPrototypeOf(EAN13.prototype),"rightEncode",this).call(this,data,"RRRRRR")}},{key:"encodeGuarded",value:function encodeGuarded(){var data=get(getPrototypeOf(EAN13.prototype),"encodeGuarded",this).call(this);return this.options.displayValue&&(data.unshift({data:"000000000000",text:this.text.substr(0,1),options:{textAlign:"left",fontSize:this.fontSize}}),this.options.lastChar&&(data.push({data:"00"}),data.push({data:"00000",text:this.options.lastChar,options:{fontSize:this.fontSize}}))),data}}]),EAN13}(EAN);

  var checksum$1=function(number){var res=number.substr(0,7).split("").map(function(n){return +n}).reduce(function(sum,a,idx){return idx%2?sum+a:sum+3*a},0);return (10-res%10)%10},EAN8=function(_EAN){function EAN8(data,options){return classCallCheck(this,EAN8),-1!==data.search(/^[0-9]{7}$/)&&(data+=checksum$1(data)),possibleConstructorReturn(this,getPrototypeOf(EAN8).call(this,data,options))}return inherits(EAN8,_EAN),createClass(EAN8,[{key:"valid",value:function valid(){return -1!==this.data.search(/^[0-9]{8}$/)&&+this.data[7]===checksum$1(this.data)}},{key:"leftText",value:function leftText(){return get(getPrototypeOf(EAN8.prototype),"leftText",this).call(this,0,4)}},{key:"leftEncode",value:function leftEncode(){var data=this.data.substr(0,4);return get(getPrototypeOf(EAN8.prototype),"leftEncode",this).call(this,data,"LLLL")}},{key:"rightText",value:function rightText(){return get(getPrototypeOf(EAN8.prototype),"rightText",this).call(this,4,4)}},{key:"rightEncode",value:function rightEncode(){var data=this.data.substr(4,4);return get(getPrototypeOf(EAN8.prototype),"rightEncode",this).call(this,data,"RRRR")}}]),EAN8}(EAN);

  var checksum$2=function(data){var result=data.split("").map(function(n){return +n}).reduce(function(sum,a,idx){return idx%2?sum+9*a:sum+3*a},0);return result%10},EAN5=function(_Barcode){function EAN5(data,options){return classCallCheck(this,EAN5),possibleConstructorReturn(this,getPrototypeOf(EAN5).call(this,data,options))}return inherits(EAN5,_Barcode),createClass(EAN5,[{key:"valid",value:function valid(){return -1!==this.data.search(/^[0-9]{5}$/)}},{key:"encode",value:function encode$1(){var structure=EAN5_STRUCTURE[checksum$2(this.data)];return {data:"1011".concat(encode(this.data,structure,"01")),text:this.text}}}]),EAN5}(Barcode);

  var EAN2=function(_Barcode){function EAN2(data,options){return classCallCheck(this,EAN2),possibleConstructorReturn(this,getPrototypeOf(EAN2).call(this,data,options))}return inherits(EAN2,_Barcode),createClass(EAN2,[{key:"valid",value:function valid(){return -1!==this.data.search(/^[0-9]{2}$/)}},{key:"encode",value:function encode$1(){var structure=EAN2_STRUCTURE[parseInt(this.data)%4];return {data:"1011".concat(encode(this.data,structure,"01")),text:this.text}}}]),EAN2}(Barcode);

  var UPC=function(_Barcode){function UPC(data,options){var _this;return classCallCheck(this,UPC),-1!==data.search(/^[0-9]{11}$/)&&(data+=checksum$3(data)),_this=possibleConstructorReturn(this,getPrototypeOf(UPC).call(this,data,options)),_this.displayValue=options.displayValue,_this.fontSize=options.fontSize>10*options.width?10*options.width:options.fontSize,_this.guardHeight=options.height+_this.fontSize/2+options.textMargin,_this}return inherits(UPC,_Barcode),createClass(UPC,[{key:"valid",value:function valid(){return -1!==this.data.search(/^[0-9]{12}$/)&&this.data[11]==checksum$3(this.data)}},{key:"encode",value:function(){return this.options.flat?this.flatEncoding():this.guardedEncoding()}},{key:"flatEncoding",value:function flatEncoding(){var result="";return result+="101",result+=encode(this.data.substr(0,6),"LLLLLL"),result+="01010",result+=encode(this.data.substr(6,6),"RRRRRR"),result+="101",{data:result,text:this.text}}},{key:"guardedEncoding",value:function guardedEncoding(){var result=[];return this.displayValue&&result.push({data:"00000000",text:this.text.substr(0,1),options:{textAlign:"left",fontSize:this.fontSize}}),result.push({data:"101".concat(encode(this.data[0],"L")),options:{height:this.guardHeight}}),result.push({data:encode(this.data.substr(1,5),"LLLLL"),text:this.text.substr(1,5),options:{fontSize:this.fontSize}}),result.push({data:"01010",options:{height:this.guardHeight}}),result.push({data:encode(this.data.substr(6,5),"RRRRR"),text:this.text.substr(6,5),options:{fontSize:this.fontSize}}),result.push({data:"".concat(encode(this.data[11],"R"),"101"),options:{height:this.guardHeight}}),this.displayValue&&result.push({data:"00000000",text:this.text.substr(11,1),options:{textAlign:"right",fontSize:this.fontSize}}),result}}]),UPC}(Barcode);function checksum$3(number){var i,result=0;for(i=1;11>i;i+=2)result+=parseInt(number[i]);for(i=0;11>i;i+=2)result+=3*parseInt(number[i]);return (10-result%10)%10}

  var EXPANSIONS=["XX00000XXX","XX10000XXX","XX20000XXX","XXX00000XX","XXXX00000X","XXXXX00005","XXXXX00006","XXXXX00007","XXXXX00008","XXXXX00009"],PARITIES=[["EEEOOO","OOOEEE"],["EEOEOO","OOEOEE"],["EEOOEO","OOEEOE"],["EEOOOE","OOEEEO"],["EOEEOO","OEOOEE"],["EOOEEO","OEEOOE"],["EOOOEE","OEEEOO"],["EOEOEO","OEOEOE"],["EOEOOE","OEOEEO"],["EOOEOE","OEEOEO"]],UPCE=function(_Barcode){function UPCE(data,options){var _this;if(classCallCheck(this,UPCE),_this=possibleConstructorReturn(this,getPrototypeOf(UPCE).call(this,data,options)),_this.isValid=!1,-1!==data.search(/^[0-9]{6}$/))_this.middleDigits=data,_this.upcA=expandToUPCA(data,"0"),_this.text=options.text||"".concat(_this.upcA[0]).concat(data).concat(_this.upcA[_this.upcA.length-1]),_this.isValid=!0;else{if(-1===data.search(/^[01][0-9]{7}$/))return possibleConstructorReturn(_this);if(_this.middleDigits=data.substring(1,data.length-1),_this.upcA=expandToUPCA(_this.middleDigits,data[0]),_this.upcA[_this.upcA.length-1]===data[data.length-1])_this.isValid=!0;else return possibleConstructorReturn(_this)}return _this.displayValue=options.displayValue,_this.fontSize=options.fontSize>10*options.width?10*options.width:options.fontSize,_this.guardHeight=options.height+_this.fontSize/2+options.textMargin,_this}return inherits(UPCE,_Barcode),createClass(UPCE,[{key:"valid",value:function valid(){return this.isValid}},{key:"encode",value:function(){return this.options.flat?this.flatEncoding():this.guardedEncoding()}},{key:"flatEncoding",value:function flatEncoding(){var result="";return result+="101",result+=this.encodeMiddleDigits(),result+="010101",{data:result,text:this.text}}},{key:"guardedEncoding",value:function guardedEncoding(){var result=[];return this.displayValue&&result.push({data:"00000000",text:this.text[0],options:{textAlign:"left",fontSize:this.fontSize}}),result.push({data:"101",options:{height:this.guardHeight}}),result.push({data:this.encodeMiddleDigits(),text:this.text.substring(1,7),options:{fontSize:this.fontSize}}),result.push({data:"010101",options:{height:this.guardHeight}}),this.displayValue&&result.push({data:"00000000",text:this.text[7],options:{textAlign:"right",fontSize:this.fontSize}}),result}},{key:"encodeMiddleDigits",value:function encodeMiddleDigits(){var numberSystem=this.upcA[0],checkDigit=this.upcA[this.upcA.length-1],parity=PARITIES[parseInt(checkDigit)][parseInt(numberSystem)];return encode(this.middleDigits,parity)}}]),UPCE}(Barcode);function expandToUPCA(middleDigits,numberSystem){for(var c,lastUpcE=parseInt(middleDigits[middleDigits.length-1]),expansion=EXPANSIONS[lastUpcE],result="",digitIndex=0,i=0;i<expansion.length;i++)c=expansion[i],result+="X"===c?middleDigits[digitIndex++]:c;return result="".concat(numberSystem).concat(result),"".concat(result).concat(checksum$3(result))}

  var START_BIN="1010";var END_BIN="11101";var BINARIES$1=["00110","10001","01001","11000","00101","10100","01100","00011","10010","01010"];

  var ITF=function(_Barcode){function ITF(){return classCallCheck(this,ITF),possibleConstructorReturn(this,getPrototypeOf(ITF).apply(this,arguments))}return inherits(ITF,_Barcode),createClass(ITF,[{key:"valid",value:function valid(){return -1!==this.data.search(/^([0-9]{2})+$/)}},{key:"encode",value:function encode(){var _this=this,encoded=this.data.match(/.{2}/g).map(function(pair){return _this.encodePair(pair)}).join("");return {data:START_BIN+encoded+END_BIN,text:this.text}}},{key:"encodePair",value:function encodePair(pair){var second=BINARIES$1[pair[1]];return BINARIES$1[pair[0]].split("").map(function(first,idx){return ("1"===first?"111":"1")+("1"===second[idx]?"000":"0")}).join("")}}]),ITF}(Barcode);

  var checksum$4=function(data){var res=data.substr(0,13).split("").map(function(num){return parseInt(num,10)}).reduce(function(sum,n,idx){return sum+n*(3-2*(idx%2))},0);return 10*Math.ceil(res/10)-res},ITF14=function(_ITF){function ITF14(data,options){return classCallCheck(this,ITF14),-1!==data.search(/^[0-9]{13}$/)&&(data+=checksum$4(data)),possibleConstructorReturn(this,getPrototypeOf(ITF14).call(this,data,options))}return inherits(ITF14,_ITF),createClass(ITF14,[{key:"valid",value:function valid(){return -1!==this.data.search(/^[0-9]{14}$/)&&+this.data[13]===checksum$4(this.data)}}]),ITF14}(ITF);

  var MSI=function(_Barcode){function MSI(data,options){return classCallCheck(this,MSI),possibleConstructorReturn(this,getPrototypeOf(MSI).call(this,data,options))}return inherits(MSI,_Barcode),createClass(MSI,[{key:"encode",value:function encode(){for(var ret="110",i=0;i<this.data.length;i++){var digit=parseInt(this.data[i]),bin=digit.toString(2);bin=addZeroes(bin,4-bin.length);for(var b=0;b<bin.length;b++)ret+="0"==bin[b]?"100":"110";}return ret+="1001",{data:ret,text:this.text}}},{key:"valid",value:function valid(){return -1!==this.data.search(/^[0-9]+$/)}}]),MSI}(Barcode);function addZeroes(number,n){for(var i=0;i<n;i++)number="0".concat(number);return number}

  function mod10(number){for(var n,sum=0,i=0;i<number.length;i++)n=parseInt(number[i]),sum+=0==(i+number.length)%2?n:2*n%10+Math.floor(2*n/10);return (10-sum%10)%10}function mod11(number){for(var n,sum=0,weights=[2,3,4,5,6,7],i=0;i<number.length;i++)n=parseInt(number[number.length-1-i]),sum+=weights[i%weights.length]*n;return (11-sum%11)%11}

  var MSI10=function(_MSI){function MSI10(data,options){return classCallCheck(this,MSI10),possibleConstructorReturn(this,getPrototypeOf(MSI10).call(this,data+mod10(data),options))}return inherits(MSI10,_MSI),MSI10}(MSI);

  var MSI11=function(_MSI){function MSI11(data,options){return classCallCheck(this,MSI11),possibleConstructorReturn(this,getPrototypeOf(MSI11).call(this,data+mod11(data),options))}return inherits(MSI11,_MSI),MSI11}(MSI);

  var MSI1010=function(_MSI){function MSI1010(data,options){return classCallCheck(this,MSI1010),data+=mod10(data),data+=mod10(data),possibleConstructorReturn(this,getPrototypeOf(MSI1010).call(this,data,options))}return inherits(MSI1010,_MSI),MSI1010}(MSI);

  var MSI1110=function(_MSI){function MSI1110(data,options){return classCallCheck(this,MSI1110),data+=mod11(data),data+=mod10(data),possibleConstructorReturn(this,getPrototypeOf(MSI1110).call(this,data,options))}return inherits(MSI1110,_MSI),MSI1110}(MSI);

  var pharmacode=function(_Barcode){function pharmacode(data,options){var _this;return classCallCheck(this,pharmacode),_this=possibleConstructorReturn(this,getPrototypeOf(pharmacode).call(this,data,options)),_this.number=parseInt(data,10),_this}return inherits(pharmacode,_Barcode),createClass(pharmacode,[{key:"encode",value:function encode(){for(var z=this.number,result="";!isNaN(z)&&0!=z;)0==z%2?(result="11100".concat(result),z=(z-2)/2):(result="100".concat(result),z=(z-1)/2);return result=result.slice(0,-2),{data:result,text:this.text}}},{key:"valid",value:function valid(){return 3<=this.number&&131070>=this.number}}]),pharmacode}(Barcode);

  var codabar=function(_Barcode){function codabar(data,options){var _this;return classCallCheck(this,codabar),0===data.search(/^[0-9\-\$\:\.\+\/]+$/)&&(data="A".concat(data,"A")),_this=possibleConstructorReturn(this,getPrototypeOf(codabar).call(this,data.toUpperCase(),options)),_this.text=_this.options.text||_this.text.replace(/[A-D]/g,""),_this}return inherits(codabar,_Barcode),createClass(codabar,[{key:"valid",value:function valid(){return -1!==this.data.search(/^[A-D][0-9\-\$\:\.\+\/]+[A-D]$/)}},{key:"encode",value:function encode(){for(var result=[],encodings=this.getEncodings(),i=0;i<this.data.length;i++)result.push(encodings[this.data.charAt(i)]),i!=this.data.length-1&&result.push("0");return {text:this.text,data:result.join("")}}},{key:"getEncodings",value:function getEncodings(){return {0:"101010011",1:"101011001",2:"101001011",3:"110010101",4:"101101001",5:"110101001",6:"100101011",7:"100101101",8:"100110101",9:"110100101","-":"101001101",$:"101100101",":":"1101011011","/":"1101101011",".":"1101101101","+":"101100110011",A:"1011001001",B:"1001001011",C:"1010010011",D:"1010011001"}}}]),codabar}(Barcode);

  var GenericBarcode=function(_Barcode){function GenericBarcode(data,options){return classCallCheck(this,GenericBarcode),possibleConstructorReturn(this,getPrototypeOf(GenericBarcode).call(this,data,options))}return inherits(GenericBarcode,_Barcode),createClass(GenericBarcode,[{key:"encode",value:function encode(){return {data:"10101010101010101010101010101010101010101",text:this.text}}},{key:"valid",value:function valid(){return !0}}]),GenericBarcode}(Barcode);

  var barcodes = {CODE39:CODE39,CODE128:CODE128AUTO,CODE128A:CODE128A,CODE128B:CODE128B,CODE128C:CODE128C,EAN13:EAN13,EAN8:EAN8,EAN5:EAN5,EAN2:EAN2,UPC:UPC,UPCE:UPCE,ITF14:ITF14,ITF:ITF,MSI:MSI,MSI10:MSI10,MSI11:MSI11,MSI1010:MSI1010,MSI1110:MSI1110,pharmacode:pharmacode,codabar:codabar,GenericBarcode:GenericBarcode};

  function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable})),keys.push.apply(keys,symbols);}return keys}function _objectSpread(target){for(var source,i=1;i<arguments.length;i++)source=null==arguments[i]?{}:arguments[i],i%2?ownKeys(source,!0).forEach(function(key){defineProperty(target,key,source[key]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(source).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});return target}var merge = (function(old,replaceObj){return _objectSpread({},old,{},replaceObj)});

  function linearizeEncodings(encodings){function nextLevel(encoded){if(Array.isArray(encoded))for(var i=0;i<encoded.length;i++)nextLevel(encoded[i]);else encoded.text=encoded.text||"",encoded.data=encoded.data||"",linearEncodings.push(encoded);}var linearEncodings=[];return nextLevel(encodings),linearEncodings}

  function fixOptions(options){return options.marginTop=options.marginTop||options.margin,options.marginBottom=options.marginBottom||options.margin,options.marginRight=options.marginRight||options.margin,options.marginLeft=options.marginLeft||options.margin,options}

  function createCommonjsModule$1(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var _global = createCommonjsModule$1(function (module) {
  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global = module.exports = typeof window != 'undefined' && window.Math == Math
    ? window : typeof self != 'undefined' && self.Math == Math ? self
    // eslint-disable-next-line no-new-func
    : Function('return this')();
  if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
  });

  var _core = createCommonjsModule$1(function (module) {
  var core = module.exports = { version: '2.6.9' };
  if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
  });
  var _core_1 = _core.version;

  var _aFunction = function (it) {
    if (typeof it != 'function') throw TypeError(it + ' is not a function!');
    return it;
  };

  // optional / simple context binding

  var _ctx = function (fn, that, length) {
    _aFunction(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 1: return function (a) {
        return fn.call(that, a);
      };
      case 2: return function (a, b) {
        return fn.call(that, a, b);
      };
      case 3: return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
    }
    return function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var _isObject = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  var _anObject = function (it) {
    if (!_isObject(it)) throw TypeError(it + ' is not an object!');
    return it;
  };

  var _fails = function (exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };

  // Thank's IE8 for his funny defineProperty
  var _descriptors = !_fails(function () {
    return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
  });

  var document$1 = _global.document;
  // typeof document.createElement is 'object' in old IE
  var is = _isObject(document$1) && _isObject(document$1.createElement);
  var _domCreate = function (it) {
    return is ? document$1.createElement(it) : {};
  };

  var _ie8DomDefine = !_descriptors && !_fails(function () {
    return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
  });

  // 7.1.1 ToPrimitive(input [, PreferredType])

  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var _toPrimitive = function (it, S) {
    if (!_isObject(it)) return it;
    var fn, val;
    if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
    if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
    if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var dP = Object.defineProperty;

  var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
    _anObject(O);
    P = _toPrimitive(P, true);
    _anObject(Attributes);
    if (_ie8DomDefine) try {
      return dP(O, P, Attributes);
    } catch (e) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var _objectDp = {
  	f: f
  };

  var _propertyDesc = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var _hide = _descriptors ? function (object, key, value) {
    return _objectDp.f(object, key, _propertyDesc(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var hasOwnProperty = {}.hasOwnProperty;
  var _has = function (it, key) {
    return hasOwnProperty.call(it, key);
  };

  var PROTOTYPE = 'prototype';

  var $export = function (type, name, source) {
    var IS_FORCED = type & $export.F;
    var IS_GLOBAL = type & $export.G;
    var IS_STATIC = type & $export.S;
    var IS_PROTO = type & $export.P;
    var IS_BIND = type & $export.B;
    var IS_WRAP = type & $export.W;
    var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
    var expProto = exports[PROTOTYPE];
    var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
    var key, own, out;
    if (IS_GLOBAL) source = name;
    for (key in source) {
      // contains in native
      own = !IS_FORCED && target && target[key] !== undefined;
      if (own && _has(exports, key)) continue;
      // export native or passed
      out = own ? target[key] : source[key];
      // prevent global pollution for namespaces
      exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
      // bind timers to global for call from export context
      : IS_BIND && own ? _ctx(out, _global)
      // wrap global constructors for prevent change them in library
      : IS_WRAP && target[key] == out ? (function (C) {
        var F = function (a, b, c) {
          if (this instanceof C) {
            switch (arguments.length) {
              case 0: return new C();
              case 1: return new C(a);
              case 2: return new C(a, b);
            } return new C(a, b, c);
          } return C.apply(this, arguments);
        };
        F[PROTOTYPE] = C[PROTOTYPE];
        return F;
      // make static versions for prototype methods
      })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
      // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
      if (IS_PROTO) {
        (exports.virtual || (exports.virtual = {}))[key] = out;
        // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
        if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
      }
    }
  };
  // type bitmap
  $export.F = 1;   // forced
  $export.G = 2;   // global
  $export.S = 4;   // static
  $export.P = 8;   // proto
  $export.B = 16;  // bind
  $export.W = 32;  // wrap
  $export.U = 64;  // safe
  $export.R = 128; // real proto method for `library`
  var _export = $export;

  var toString = {}.toString;

  var _cof = function (it) {
    return toString.call(it).slice(8, -1);
  };

  // 7.2.2 IsArray(argument)

  var _isArray = Array.isArray || function isArray(arg) {
    return _cof(arg) == 'Array';
  };

  // 22.1.2.2 / 15.4.3.2 Array.isArray(arg)


  _export(_export.S, 'Array', { isArray: _isArray });

  var isArray = _core.Array.isArray;

  var isArray$1 = isArray;

  // 7.2.1 RequireObjectCoercible(argument)
  var _defined = function (it) {
    if (it == undefined) throw TypeError("Can't call method on  " + it);
    return it;
  };

  // 7.1.13 ToObject(argument)

  var _toObject = function (it) {
    return Object(_defined(it));
  };

  // fallback for non-array-like ES3 and non-enumerable old V8 strings

  // eslint-disable-next-line no-prototype-builtins
  var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
    return _cof(it) == 'String' ? it.split('') : Object(it);
  };

  // to indexed object, toObject with fallback for non-array-like ES3 strings


  var _toIobject = function (it) {
    return _iobject(_defined(it));
  };

  // 7.1.4 ToInteger
  var ceil = Math.ceil;
  var floor = Math.floor;
  var _toInteger = function (it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
  };

  // 7.1.15 ToLength

  var min = Math.min;
  var _toLength = function (it) {
    return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
  };

  var max = Math.max;
  var min$1 = Math.min;
  var _toAbsoluteIndex = function (index, length) {
    index = _toInteger(index);
    return index < 0 ? max(index + length, 0) : min$1(index, length);
  };

  // false -> Array#indexOf
  // true  -> Array#includes



  var _arrayIncludes = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = _toIobject($this);
      var length = _toLength(O.length);
      var index = _toAbsoluteIndex(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
        if (O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var _shared = createCommonjsModule$1(function (module) {
  var SHARED = '__core-js_shared__';
  var store = _global[SHARED] || (_global[SHARED] = {});

  (module.exports = function (key, value) {
    return store[key] || (store[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: _core.version,
    mode:  'pure' ,
    copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
  });
  });

  var id = 0;
  var px = Math.random();
  var _uid = function (key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
  };

  var shared = _shared('keys');

  var _sharedKey = function (key) {
    return shared[key] || (shared[key] = _uid(key));
  };

  var arrayIndexOf = _arrayIncludes(false);
  var IE_PROTO = _sharedKey('IE_PROTO');

  var _objectKeysInternal = function (object, names) {
    var O = _toIobject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (_has(O, key = names[i++])) {
      ~arrayIndexOf(result, key) || result.push(key);
    }
    return result;
  };

  // IE 8- don't enum bug keys
  var _enumBugKeys = (
    'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
  ).split(',');

  // 19.1.2.14 / 15.2.3.14 Object.keys(O)



  var _objectKeys = Object.keys || function keys(O) {
    return _objectKeysInternal(O, _enumBugKeys);
  };

  // most Object methods by ES6 should accept primitives



  var _objectSap = function (KEY, exec) {
    var fn = (_core.Object || {})[KEY] || Object[KEY];
    var exp = {};
    exp[KEY] = exec(fn);
    _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
  };

  // 19.1.2.14 Object.keys(O)



  _objectSap('keys', function () {
    return function keys(it) {
      return _objectKeys(_toObject(it));
    };
  });

  var keys = _core.Object.keys;

  var keys$1 = keys;

  function q(v){return "\""+v+"\""}function json2html(json){var child="";json.child&&(child=json.child.map(function(c){return json2html(c)}).join(""));var attr="";if(json.attr&&(attr=keys$1(json.attr).map(function(key){var value=json.attr[key];return isArray$1(value)&&(value=value.join(" ")),key+"="+q(value)}).join(" "),""!==attr&&(attr=" "+attr)),"element"===json.node){var tag=json.tag;if(-1<["area","base","basefont","br","col","frame","hr","img","input","isindex","link","meta","param","embed"].indexOf(tag))return "<"+json.tag+attr+"/>";var open="<"+json.tag+attr+">",close="</"+json.tag+">";return open+child+close}return "text"===json.node?json.text:"comment"===json.node?"<!--"+json.text+"-->":"root"===json.node?child:void 0}

  function getEncodingHeight(encoding,options){return options.height+(options.displayValue&&0<encoding.text.length?options.fontSize+options.textMargin:0)+options.marginTop+options.marginBottom}function getBarcodePadding(textWidth,barcodeWidth,options){if(options.displayValue&&barcodeWidth<textWidth){if("center"==options.textAlign)return Math.floor((textWidth-barcodeWidth)/2);if("left"==options.textAlign)return 0;if("right"==options.textAlign)return Math.floor(textWidth-barcodeWidth)}return 0}function calculateEncodingAttributes(encodings,barcodeOptions,context){for(var i=0;i<encodings.length;i++){var textWidth,encoding=encodings[i],options=merge(barcodeOptions,encoding.options);textWidth=options.displayValue?messureText(encoding.text,options,context):0;var barcodeWidth=encoding.data.length*options.width;encoding.width=Math.ceil(Math.max(textWidth,barcodeWidth)),encoding.height=getEncodingHeight(encoding,options),encoding.barcodePadding=getBarcodePadding(textWidth,barcodeWidth,options);}}function getTotalWidthOfEncodings(encodings){for(var totalWidth=0,i=0;i<encodings.length;i++)totalWidth+=encodings[i].width;return totalWidth}function getMaximumHeightOfEncodings(encodings){for(var maxHeight=0,i=0;i<encodings.length;i++)encodings[i].height>maxHeight&&(maxHeight=encodings[i].height);return maxHeight}function messureText(string,options,context){var ctx;if(context)ctx=context;else if("undefined"!=typeof document)ctx=document.createElement("canvas").getContext("2d");else return 0;ctx.font="".concat(options.fontOptions," ").concat(options.fontSize,"px ").concat(options.font);var size=ctx.measureText(string).width;return size}

  var svgns="http://www.w3.org/2000/svg",SVGRenderer=function(){function SVGRenderer(encodings,options){classCallCheck(this,SVGRenderer),this.svgJson={node:"element",tag:"svg",attr:{style:""},child:[]},this.barCode="",this.encodings=encodings,this.options=options;}return createClass(SVGRenderer,[{key:"render",value:function render(){var currentX=this.options.marginLeft;this.prepareSVG();for(var i=0;i<this.encodings.length;i++){var encoding=this.encodings[i],encodingOptions=merge(this.options,encoding.options),group=this.createGroup(currentX,encodingOptions.marginTop,this.options.useTranslate);this.setGroupOptions(group,encodingOptions),this.drawSvgBarcode(group,encodingOptions,encoding),this.drawSVGText(group,encodingOptions,encoding),this.svgJson.child.push(group),currentX+=encoding.width;}this.barCode=json2html(this.svgJson);}},{key:"prepareSVG",value:function prepareSVG(){for(;this.svgJson.child[0];)this.svgJson.child.shift();calculateEncodingAttributes(this.encodings,this.options);var totalWidth=getTotalWidthOfEncodings(this.encodings),maxHeight=getMaximumHeightOfEncodings(this.encodings),width=totalWidth;if(this.options.useTranslate&&(width=totalWidth+this.options.marginLeft+this.options.marginRight),this.setSvgAttributes(width,maxHeight),this.options.background){var rect=this.drawRect(0,0,width,maxHeight,this.svgJson);rect.attr.style=(rect.attr.style||"")+"fill:".concat(this.options.background,";");}}},{key:"drawSvgBarcode",value:function drawSvgBarcode(parent,options,encoding){var yFrom,binary=encoding.data;yFrom="top"==options.textPosition?options.fontSize+options.textMargin:0;for(var barWidth=0,x=0,b=0;b<binary.length;b++)x=b*options.width+encoding.barcodePadding,"1"===binary[b]?barWidth++:0<barWidth&&(this.drawRect(x-options.width*barWidth+parent.x,yFrom,options.width*barWidth,options.height,parent),barWidth=0);0<barWidth&&this.drawRect(x-options.width*(barWidth-1)+parent.x,yFrom,options.width*barWidth,options.height,parent);}},{key:"setSvgAttributes",value:function setSvgAttributes(width,height){var svg=this.svgJson;svg.attr.width="".concat(width,"px"),svg.attr.height="".concat(width,"px"),svg.attr.x="0px",svg.attr.y="0px",svg.attr.viewBox="0 0 ".concat(width," ").concat(height),svg.attr.xmlns=svgns,svg.attr.version="1.1";}},{key:"createGroup",value:function createGroup(x,y,useTranslate){return useTranslate?{node:"element",tag:"g",x:0,y:0,attr:{transform:"translate(".concat(x,", ").concat(y,")")},child:[]}:{node:"element",tag:"g",x:x,y:y,attr:{},child:[]}}},{key:"setGroupOptions",value:function setGroupOptions(group,options){group.attr||(group.attr={}),group.attr.style=(group.attr.style||"")+";fill:".concat(options.lineColor,";");}},{key:"drawRect",value:function drawRect(x,y,width,height,parent){var rect={node:"element",tag:"rect",attr:{style:""}};return rect.attr.x=x,rect.attr.y=y,rect.attr.width=width,rect.attr.height=height,Array.isArray(parent.child)&&parent.child.push(rect),rect}},{key:"drawSVGText",value:function drawSVGText(parent,options,encoding){var textElem={node:"element",tag:"text",attr:{style:""},text:"",child:[]};if(options.displayValue){var x,y;textElem.attr.style+=";font:".concat(options.fontOptions," ").concat(options.fontSize,"px ").concat(options.font,";"),y="top"==options.textPosition?options.fontSize-options.textMargin:options.height+options.textMargin+options.fontSize,"left"==options.textAlign||0<encoding.barcodePadding?(x=0,textElem.attr["text-anchor"]="start"):"right"==options.textAlign?(x=encoding.width-1,textElem.attr["text-anchor"]="end"):(x=encoding.width/2,textElem.attr["text-anchor"]="middle"),textElem.attr.x=x+parent.x,textElem.attr.y=y,textElem.child.push({node:"text",tag:"",text:encoding.text}),parent.child.push(textElem);}}}]),SVGRenderer}();

  var renderers = {SVGRenderer:SVGRenderer};

  function getRenderProperties(){var type=0<arguments.length&&arguments[0]!==void 0?arguments[0]:"svg";return {type:type,renderer:renderers.SVGRenderer}}

  function optionsFromStrings(options){var intOptions=["width","height","textMargin","fontSize","margin","marginTop","marginBottom","marginLeft","marginRight"];for(var intOption in intOptions)intOptions.hasOwnProperty(intOption)&&(intOption=intOptions[intOption],"string"==typeof options[intOption]&&(options[intOption]=parseInt(options[intOption],10)));return "string"==typeof options.displayValue&&(options.displayValue="false"!=options.displayValue),options}

  var ErrorHandler=function(){function ErrorHandler(api){classCallCheck(this,ErrorHandler),this.api=api;}return createClass(ErrorHandler,[{key:"handleCatch",value:function handleCatch(e){if("InvalidInputException"!==e.name)throw e;else if(this.api._options.valid!==this.api._defaults.valid)this.api._options.valid(!1);else throw e.message;this.api.render=function(){};}},{key:"wrapBarcodeCall",value:function wrapBarcodeCall(func){try{var result=func.apply(void 0,arguments);return this.api._options.valid(!0),result}catch(e){return this.handleCatch(e),this.api}}}]),ErrorHandler}();

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  var isNativeFunction = _isNativeFunction;

  var construct = createCommonjsModule(function (module) {
  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      module.exports = _construct = Reflect.construct;
    } else {
      module.exports = _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  module.exports = _construct;
  });

  var wrapNativeSuper = createCommonjsModule(function (module) {
  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return construct(Class, arguments, getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  module.exports = _wrapNativeSuper;
  });

  var InvalidInputException=function(_Error){function InvalidInputException(symbology,input){var _this;return classCallCheck(this,InvalidInputException),_this=possibleConstructorReturn(this,getPrototypeOf(InvalidInputException).call(this)),_this.name="InvalidInputException",_this.symbology=symbology,_this.input=input,_this.message="\"".concat(_this.input,"\" is not a valid input for ").concat(_this.symbology),_this}return inherits(InvalidInputException,_Error),InvalidInputException}(wrapNativeSuper(Error)),InvalidElementException=function(_Error2){function InvalidElementException(){var _this2;return classCallCheck(this,InvalidElementException),_this2=possibleConstructorReturn(this,getPrototypeOf(InvalidElementException).call(this)),_this2.name="InvalidElementException",_this2.message="Not supported type to render on",_this2}return inherits(InvalidElementException,_Error2),InvalidElementException}(wrapNativeSuper(Error)),NoElementException=function(_Error3){function NoElementException(){var _this3;return classCallCheck(this,NoElementException),_this3=possibleConstructorReturn(this,getPrototypeOf(NoElementException).call(this)),_this3.name="NoElementException",_this3.message="No element to render on.",_this3}return inherits(NoElementException,_Error3),NoElementException}(wrapNativeSuper(Error));

  var defaults={width:2,height:100,format:"auto",displayValue:!0,fontOptions:"",font:"monospace",text:void 0,textAlign:"center",textPosition:"bottom",textMargin:2,fontSize:20,background:"#ffffff",lineColor:"#000000",margin:10,marginTop:void 0,marginBottom:void 0,marginLeft:void 0,marginRight:void 0,valid:function valid(){}};

  var API=function(){},cnfBarcode=function(text,options){var api=new API;return api._renderProperties=getRenderProperties("svg"),api._encodings=[],api._options=defaults,api._errorHandler=new ErrorHandler(api),api.barCodes={},"undefined"!=typeof text&&(options=options||{},!options.format&&(options.format=autoSelectBarcode()),api.options(options)[options.format](text,options).render()),api};for(var name in barcodes)barcodes.hasOwnProperty(name)&&registerBarcode(barcodes,name);function registerBarcode(barcodes,name){API.prototype[name]=API.prototype[name.toUpperCase()]=API.prototype[name.toLowerCase()]=function(text,options){var api=this;return api._errorHandler.wrapBarcodeCall(function(){options.text="undefined"==typeof options.text?void 0:"".concat(options.text);var newOptions=merge(api._options,options);newOptions=optionsFromStrings(newOptions);var Encoder=barcodes[name],encoded=encode$1(text,Encoder,newOptions);return api._encodings.push(encoded),api})};}function encode$1(text,Encoder,options){text="".concat(text);var encoder=new Encoder(text,options);if(!encoder.valid())throw new InvalidInputException(encoder.constructor.name,text);var encoded=encoder.encode();encoded=linearizeEncodings(encoded);for(var i=0;i<encoded.length;i++)encoded[i].options=merge(options,encoded[i].options);return encoded}function autoSelectBarcode(){return barcodes.CODE128?"CODE128":Object.keys(barcodes)[0]}API.prototype.options=function(options){return this._options=merge(this._options,options),this},API.prototype.getSvg=function(){return this.barCodes.svg},API.prototype.getSvgDataURI=function(){return "data:image/svg+xml;utf8,".concat(encodeURIComponent(this.barCodes.svg))},API.prototype.blank=function(size){var zeroes=Array(size+1).join("0");return this._encodings.push({data:zeroes}),this},API.prototype.init=function(){if(this._renderProperties){Array.isArray(this._renderProperties)||(this._renderProperties=[this._renderProperties]);var renderProperty;for(var i in this._renderProperties){renderProperty=this._renderProperties[i];var options=merge(this._options,renderProperty.options);"auto"==options.format&&(options.format=autoSelectBarcode()),this._errorHandler.wrapBarcodeCall(function(){var text=options.value,Encoder=barcodes[options.format.toUpperCase()],encoded=encode$1(text,Encoder,options);render(renderProperty,encoded,options);});}}},API.prototype.render=function(){var _this=this;if(!this._renderProperties)throw new NoElementException;var barCodes={};return Array.isArray(this._renderProperties)?this._renderProperties.forEach(function(item){barCodes[item.type]=render(item,_this._encodings,_this._options);}):barCodes[this._renderProperties.type]=render(this._renderProperties,this._encodings,this._options),this.barCodes=barCodes,this},API.prototype._defaults=defaults;function render(renderProperties,encodings,options){encodings=linearizeEncodings(encodings);for(var i=0;i<encodings.length;i++)encodings[i].options=merge(options,encodings[i].options),fixOptions(encodings[i].options);fixOptions(options);var Renderer=renderProperties.renderer,renderer=new Renderer(encodings,options);return renderer.render(),renderProperties.afterRender&&renderProperties.afterRender(),renderer.barCode}

  return cnfBarcode;

}));
//# sourceMappingURL=svg-barcode.js.map
