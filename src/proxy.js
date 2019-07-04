var multAdd = function() {
    console.log(arguments);
	var res = 0;
	for (var i = 0, l = arguments.length; i < l; i++) {
		res = res + arguments[i]
	}
	return res;
};

var proxyAdd = (function() {
    var cache = {};
    console.log(arguments);
	return function() {
        var args = Array.prototype.join.call(arguments, ',');
        console.log(args);
		if(args in cache) {
			return cache[args];
        }
        console.log(arguments);
		return caches[args] = multAdd.apply(this, arguments);
	}
})();

proxyAdd(1, 2, 3); // 6
proxyAdd(1, 2, 3); // 6


var handler = {
    get: function(target, name) {
      if (name === 'prototype') {
        return Object.prototype;
      }
      return 'Hello, ' + name;
    },
  
    apply: function(target, thisBinding, args) {
      return args[0];
    },
  
    construct: function(target, args) {
      return {value: args[1]};
    }
  };
  
  var fproxy = new Proxy(function(x, y) {
    return x + y;
  }, handler);
  
  fproxy(1, 2) // 1
//   new fproxy(1, 2) // {value: 2}
//   fproxy.prototype === Object.prototype // true
//   fproxy.foo === "Hello, foo" // true
