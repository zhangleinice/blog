// 对象代理，数据保护

// es3，闭包
{

var Person = function() {
  var data = {
    name: 'es3',
    sex: 'male',
    age: 15
  }
  this.get = function(key){
    return data[key]
  }
  this.set = function(key, value) {
    if(key !== 'sex'){
      data[key] = value
    }
  }
}

var person = new Person()
// 读取
console.table({name: person.get('name'), sex: person.get('sex'), age: person.get('age')});
// 设置
person.set('sex', 'female');
console.table({name: person.get('name'), sex: person.get('sex'), age: person.get('age')});

person.set('age', 16);
console.table({name: person.get('name'), sex: person.get('sex'), age: person.get('age')});

}
// es5,definedProperty
{

var Person = {
  name: 'es5',
  sex: 'male',
  age: 18
}
Object.defineProperty(Person, 'sex', {
  writable: false,
  value: 'male'
})
// 读取
console.table({name: Person.name, sex: Person.sex, age: Person.age});
// 设置
Person.sex = 'female';
console.table({name: Person.name, sex: Person.sex, age: Person.age});
Person.age = 20;
console.table({name: Person.name, sex: Person.sex, age: Person.age});

}

// es6, Proxy
{

let Person = {
  name: 'es6',
  sex: 'male',
  age: 20
}
let proxy = new Proxy(Person, {
  get: (target, key) => target[key],
  set(target, key, value) {
    if(key !== 'sex'){
      target[key] = value
    }
  }
})
// 读取
console.table({name: proxy.name, sex: proxy.sex, age: proxy.age});
// 设置
proxy.sex = 'female';
console.table({name: proxy.name, sex: proxy.sex, age: proxy.age});
proxy.age = 22;
console.table({name: proxy.name, sex: proxy.sex, age: proxy.age});

}


// 明星、经纪人

{

  // 明星
let star = {
  name: '张XX',
  age: 25,
  phone: '13910733521'
}

// 经纪人
let agent = new Proxy(star, {
  get: function (target, key) {
      if (key === 'phone') {
          // 返回经纪人自己的手机号
          return '18611112222'
      }
      if (key === 'price') {
          // 明星不报价，经纪人报价
          return 120000
      }
      return target[key]
  },
  set: function (target, key, val) {
      if (key === 'customPrice') {
          if (val < 100000) {
              // 最低 10w
              throw new Error('价格太低')
          } else {
              target[key] = val
              return true
          }
      }
  }
})

// 主办方
console.log(agent.name)
console.log(agent.age)
console.log(agent.phone)
console.log(agent.price)

// 想自己提供报价（砍价，或者高价争抢）
agent.customPrice = 150000
// agent.customPrice = 90000  // 报错：价格太低
console.log('customPrice', agent.customPrice)

}





















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

// proxyAdd(1, 2, 3); // 6
// proxyAdd(1, 2, 3); // 6


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
  
  // fproxy(1, 2) // 1
//   new fproxy(1, 2) // {value: 2}
//   fproxy.prototype === Object.prototype // true
//   fproxy.foo === "Hello, foo" // true
