/*
 * @Author: 阿水 
 * @since: 2019-12-26 11:04:54
 *  
 * Set是一种叫做集合的数据结构
 * 主要的应用场景在于数组去重,字符串去重
 */


/**
 * 判断一个对象是否具有 Iterator 接口
 * egg：Array，Map，Set，String，arguments，NodeList 对象
 */
function isIterable(obj) {
    return typeof obj[Symbol.iterator] === 'function'
}

// 创建一个迭代器
export function createIterator(items) {
    let i = 0;
    return {
        next: function() {
            var done = i >= items.length;
            var value = !done ? items[i++] : undefined;

            return {
                done: done,
                value: value
            };
        }
    };
}

class Set {
    constructor(data){
        // if(!isIterable(data)){
        //     console.log(data+'is not iterable (cannot read property Symbol(Symbol.iterator))');
        // }
        this._values = []
        this.size = 0
        data && data.forEach(item => {
            this.add(item)
        });
        return this
    }
    add(val) {
        if(!this._values.includes(val)) {
            this._values.push(val)
            this.size++
        }
        return this
    }
    delete(val) {
        if(this._values.includes(val)) {
            this._values.splice(this._values.indexOf(val), 1)
            this.size--
            return true
        }
        return false
    }
    has(val) {
        return this._values.includes(val)
    }
    clear() {
        this._values = []
        this.size = 0
    }
    forEach(cb) {
        for(let i = 0; i < this._values.length; i++) {
            cb(this._values[i], i)
        }
    }
    keys() {
        return createIterator(this._values)
    }
    values() {
        return createIterator(this._values)
    }
}

Set.prototype[Symbol.iterator] = function() {
    return this.values()
}

export default Set