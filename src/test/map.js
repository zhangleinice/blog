const myMap = new Map()
  .set(true, 7)
  .set({foo: 3}, ['abc']);

console.log(myMap);
// 转数组
console.log([...myMap]);

// 数组转map
const a = new Map([
    [true, 7],
    [{foo: 3}, ['abc']]
])
console.log(a);

// map转对象
function mapToObj(map) {
    /**
     * Object.create(null)创建的空对象，没有__proto属性
     * 没有继承Object上的方法，egg: toString,hasOwnProperty等
     * 
     * 使用场景
     * 1. 你需要一个非常干净且高度可定制的对象当作数据字典的时候；
     * 2. 想节省hasOwnProperty带来的一丢丢性能损失并且可以偷懒少些一点代码的时候；
     * 3. 使用for..in循环的时候会遍历对象原型链上的属性，使用create(null)就不必再对属性进行检查了
     * 
     * 使用for in通常配合使用hasOwnProperty，如果是for in遍历Object.create(null)对象时，则不用hasOwnProperty
     */
    let obj = Object.create(null)
    for( let [k, v] of map.entries()) {
        obj[k] = v
    }
    return obj
}

const aMap = new Map()
  .set('yes', true)
  .set('no', false);
  
console.log(mapToObj(aMap));




