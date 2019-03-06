
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
      require(36)
    })({
      36: [
        function(require, module, exports) {
          "use strict";

var _greet = require("./greet/greet.js");

var _greet2 = _interopRequireDefault(_greet);

require("./index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _greet2.default)();

var $h2 = document.querySelector('h2');
$h2.className = '';
setTimeout(function () {
  $h2.className = 'rubberBand';
}, 300);

console.log('111333333');
        }, 
        {"./greet/greet.js":37,"./index.less":38}
      ],
    
      37: [
        function(require, module, exports) {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helloWorld = require("../helloWorld.js");

var _helloWorld2 = _interopRequireDefault(_helloWorld);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import './greet.less'

exports.default = function () {
  console.log(_helloWorld2.default);
};
        }, 
        {"../helloWorld.js":39}
      ],
    
      38: [
        function(require, module, exports) {
          "use strict";

var content = "html {\n  font-size: 19px;\n}\nhtml body {\n  color: #fff;\n  background-color: #fff;\n  text-align: center;\n}\nh2 {\n  font-size: 80px;\n  text-shadow: 0 0 1px #000;\n}\n.rubberBand {\n  animation: rubberBand 0.5s;\n}\n@keyframes rubberBand {\n  0% {\n    -webkit-transform: scaleX(1);\n    transform: scaleX(1);\n  }\n  30% {\n    -webkit-transform: scale3d(1.25, 0.75, 1);\n    transform: scale3d(1.25, 0.75, 1);\n  }\n  40% {\n    -webkit-transform: scale3d(0.75, 1.25, 1);\n    transform: scale3d(0.75, 1.25, 1);\n  }\n  50% {\n    -webkit-transform: scale3d(1.15, 0.85, 1);\n    transform: scale3d(1.15, 0.85, 1);\n  }\n  65% {\n    -webkit-transform: scale3d(0.95, 1.05, 1);\n    transform: scale3d(0.95, 1.05, 1);\n  }\n  75% {\n    -webkit-transform: scale3d(1.05, 0.95, 1);\n    transform: scale3d(1.05, 0.95, 1);\n  }\n  to {\n    -webkit-transform: scaleX(1);\n    transform: scaleX(1);\n  }\n}\n";
var doc = document;
var $style = doc.createElement('style');
$style.type = 'text/css';
$style.innerHTML = content;
doc.getElementsByTagName('head')[0].appendChild($style);
        }, 
        {}
      ],
    
      39: [
        function(require, module, exports) {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = '社会主义好，真善美好';
        }, 
        {}
      ],
    })
  