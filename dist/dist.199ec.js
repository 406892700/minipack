
    (function(modules) {
      // 注意，这里require方法是require一个id, 但是我们已经知道了path -> id的映射关系
      function require(id) {
        var currentModule = modules[id]
        var fn = currentModule[0]
        var mapping = currentModule[1]

        // 内部require方法
        function innerRequire(path) {
          return require(mapping[path]) // 调用require方法
        }

        var module = { exports: {} }

        fn(innerRequire, module, module.exports)

        return module.exports
      }

      // 入口文件id必定为0
      require(60)
    })({
      60: [
        function(require, module, exports) {
          "use strict";

var _greet = require("./greet/greet.js");

var _greet2 = _interopRequireDefault(_greet);

require("./index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _greet2.default)();
var doc = document;
doc.querySelector('#clickBtn').addEventListener('click', function () {
  doc.querySelector('#dialog').style.display = 'block';
});

doc.querySelector('#closeBtn').addEventListener('click', function () {
  doc.querySelector('#dialog').style.display = 'none';
});

console.log('刷新2222');
document.write('徐怀远');
        }, 
        {"./greet/greet.js":61,"./index.less":62}
      ],
    
      61: [
        function(require, module, exports) {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helloWorld = require("../helloWorld.js");

var _helloWorld2 = _interopRequireDefault(_helloWorld);

require("./greet.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  console.log(_helloWorld2.default);
};
        }, 
        {"../helloWorld.js":63,"./greet.less":64}
      ],
    
      62: [
        function(require, module, exports) {
          "use strict";

var content = "html {\n  font-size: 20px;\n}\nhtml body {\n  color: #D00000;\n}\n.mask {\n  display: none;\n  position: fixed;\n  background-color: rgba(0, 0, 0, 0.5);\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 99;\n}\n.mask .content {\n  position: fixed;\n  width: 300px;\n  height: 250px;\n  background-color: #fff;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 9999;\n  padding: 20px 20px 0 20px;\n  text-align: center;\n}\n.mask .content .btn-area {\n  position: absolute;\n  width: 100%;\n  height: 60px;\n  line-height: 60px;\n  bottom: 0;\n  left: 0;\n}\n.mask .content .btn-area button {\n  background-color: #D00000;\n  color: #fff;\n  width: 100px;\n  height: 30px;\n  line-height: 30px;\n  border: none;\n}\n";
var doc = document;
var $style = doc.createElement('style');
$style.type = 'text/css';
$style.innerHTML = content;
doc.getElementsByTagName('head')[0].appendChild($style);
        }, 
        {}
      ],
    
      63: [
        function(require, module, exports) {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = '社会主义好，真善美好';
        }, 
        {}
      ],
    
      64: [
        function(require, module, exports) {
          "use strict";

var content = "body {\n  color: #d00000 !important;\n  font-size: 123px;\n}\n";
var doc = document;
var $style = doc.createElement('style');
$style.type = 'text/css';
$style.innerHTML = content;
doc.getElementsByTagName('head')[0].appendChild($style);
        }, 
        {}
      ],
    })
  