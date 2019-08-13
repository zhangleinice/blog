// #建造者模式 


// 抽象建造者
var Car = function (param) {
    // 速度
    this.speed = param && param.speed || '0';
    // 重量
    this.weight = param && param.weight || '0';
}

Car.prototype = {
    // 获取速度
    getSpeed: function () {
        return this.speed;
    },
    // 获取重量
    getWeight: function () {
        return this.weight
    }
}

// 轮胎部件类
var Tyre = function (type) {
    var that = this;
    // 构造器
    // 构造函数中通过传入的type类型设置相对应的轮胎尺寸
    (function (type,that) {
        switch (type) {
            case 'small':
            that.tyre = '小号轮胎';
            that.tyreIntro = '正在使用小号轮胎';
            break;
            case 'normal':
            that.tyre = '中号轮胎';
            that.tyreIntro = '正在使用中号轮胎';
            break;
            case 'big':
            that.tyre = '大号轮胎';
            that.tyreIntro = '正在使用大号轮胎';
            break;
        }
    })(type,this);
}


Tyre.prototype = {
    // 更换轮胎的方法
    changeType: function (type) {
        that.tyre = type;
        that.tyreIntro = '正在使用'+type;
    }
}

// 发动机部件类
var Engine = function (type) {
    var that = this;
    // 构造器
    // 构造函数中通过传入的type类型设置相对应的发动机类型
    (function (type,that) {
        switch (type) {
            case 'small':
            that.engine = '小号发动机';
            that.engineIntro = '正在使用小号发动机';
            break;
            case 'normal':
            that.engine = '中号发动机';
            that.engineIntro = '正在使用中号发动机';
            break;
            case 'big':
            that.engine = '大号发动机';
            that.engineIntro = '正在使用大号发动机';
            break;
        }
    })(type,this);
}


Engine.prototype = {
    // 更换发动机的方法
    changeType: function (type) {
        that.engine = type;
        that.engineIntro = '正在使用'+type;
    }
}

/**
 * 指挥者,建造一个奔驰车的类
 * @param {*轮胎类型 small normal big} tyre 
 * @param {*发动机类型 small normal big} engine 
 * @param {*车辆基本属性 param.speed:速度 param.weight: 重量} param 
 */
var BenChi = function (tyre,engine,param) {
    // 创建一个车辆缓存对象
    var _car = new Car(param);
    // 创建车辆的轮胎
    _car.tyreInfo = new Tyre(tyre);
    // 创建车辆的发动机
    _car.engineInfo = new Engine(engine);
    // 将创建的车辆对象返回
    return _car;
}

// 具体建造者 实例化奔驰车类
var benchi1 = new BenChi('small','big',{speed: 200,weight: '200'});
console.log(benchi1.speed);// 200
console.log(benchi1.weight);// 200
console.log(benchi1.tyreInfo.tyre);// 小号轮胎
console.log(benchi1.tyreInfo.tyreIntro);// 正在使用小号轮胎
console.log(benchi1.engineInfo.engine);// 大号发动机
console.log(benchi1.engineInfo.engineIntro);// 正在使用大号发动机
