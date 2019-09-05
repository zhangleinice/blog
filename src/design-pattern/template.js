/**
 * js模板方法模式
 */
var Beverage = function() {};
Beverage.prototype.boilWater = function() {
    console.log( '把水煮沸' );
};
Beverage.prototype.brew = function() {
    throw new Error( '子类必须重写brew 方法' );
};
Beverage.prototype.pourInCup = function() {
    throw new Error( '子类必须重写pourInCup 方法' );
};
Beverage.prototype.addCondiments = function() {
    throw new Error( '子类必须重写addCondiments 方法' );
};
Beverage.prototype.customerWantsCondiments = function() {
    return true; // 默认需要调料
};
Beverage.prototype.init = function() {
    this.boilWater();
    this.brew();
    this.pourInCup();
    if ( this.customerWantsCondiments() ) { // 如果挂钩返回true，则需要调料
        this.addCondiments();
    }
};

var Coffee = function() {};
Coffee.prototype = new Beverage();

Coffee.prototype.brew = function() {
    console.log( '用沸水冲泡咖啡' );
};
Coffee.prototype.pourInCup = function() {
    console.log( '把咖啡倒进杯子' );

};
Coffee.prototype.addCondiments = function() {
    console.log( '加糖和牛奶' );
};
var Coffee = new Coffee();
Coffee.init();


var Tea = function() {};
Tea.prototype = new Beverage();
Tea.prototype.brew = function() {
    console.log( '用沸水浸泡茶叶' );
};
Tea.prototype.pourInCup = function() {
    console.log( '把茶倒进杯子' );
};
Tea.prototype.addCondiments = function() {
    console.log( '加柠檬' );
};
/**
 * java中
 */
// public abstract class CaffeineBeverage {
// 	public final void prepareRecipe() {
// 		boilWater();
// 		brew();
// 		pourInCup();
// 		if(customerWantsCondiments()) {
// 			addCondiments();
// 		}
// 	}

// 	public void boilWater() {
// 		System.out.println("把水煮沸");
// 	}

// 	public void pourInCup() {
// 		System.out.println("倒进杯子");
// 	}

// 	public abstract void brew();

// 	public abstract void addCondiments();

// 	public boolean customerWantsCondiments() {
// 		return true;
// 	}	
// }
/**
 * js真的需要继承吗
 * 函数式
 */
var Beverage = function( param ) {
    var boilWater = function() {
        console.log( '把水煮沸' );
    };
    var brew = param.brew || function() {
        throw new Error( '必须传递brew 方法' );
    };
    var pourInCup = param.pourInCup || function() {
        throw new Error( '必须传递pourInCup 方法' );
    };
    var addCondiments = param.addCondiments || function() {
        throw new Error( '必须传递addCondiments 方法' );
    };
    var F = function() {};
    F.prototype.init = function() {
        boilWater();
        brew();
        pourInCup();
        addCondiments();
    };
    return F;
};
var Coffee = Beverage( {
    brew: function() {
        console.log( '用沸水冲泡咖啡' );
    },
    pourInCup: function() {
        console.log( '把咖啡倒进杯子' );
    },
    addCondiments: function() {
        console.log( '加糖和牛奶' );
    }
} );

var Tea = Beverage( {
    brew: function() {
        console.log( '用沸水浸泡茶叶' );
    },
    pourInCup: function() {
        console.log( '把茶倒进杯子' );
    },
    addCondiments: function() {
        console.log( '加柠檬' );
    }
} );
var coffee = new Coffee();
coffee.init();
var tea = new Tea();
tea.init();