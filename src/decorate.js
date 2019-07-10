// 增加100防御力
const decorateArmour = (target, key, des) => {
    let moreDef = 100;
    let ret;
    const method = des.value;
    des.value = (...args) => {
        // console.log(args);
        args[0] += moreDef;
        ret = method.apply(target, args)
        return ret
    }
    return des
}
// 增加50攻击力
const decorateLight = (target, key, des) => {
    let moreAtk = 50;
    let ret;
    const method = des.value;
    des.value = (...args) => {
        args[1] += moreAtk;
        ret = method.apply(target, args)
        return ret
    }
    return des
}
// 增加飞行能力
const addFly = canFly => target => {
    target.canFly = canFly;
    let extra = canFly? '技能加点：飞行能力': '';
    const method = target.prototype.toString;
    target.prototype.toString = (...args) => method.apply(target.prototype, args) + extra;
    return target;
}

// 普通人
@addFly(true)   //装饰类
class Man {
    constructor(def = 2, atk = 3, hp = 3){
        this.init(def, atk, hp)
    }
    // 可以对某个方法进行叠加使用，对原类的侵入性非常小
    @decorateLight
    @decorateArmour
    init(def, atk, hp){
        this.def = def;
        this.atk = atk;
        this.hp = hp;
    }
    toString(){
        return `防御力:${this.def},攻击力:${this.atk},血量:${this.hp},`
    }
}

const man = new Man()
console.log(man.toString());


// 作用在方法上的 decorator 接收的第一个参数（target ）是类的 prototype；如果把一个 decorator 作用到类上，则它的第一个参数 target 是 类本身。



