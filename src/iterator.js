{
class Iterator {
    constructor(containner) {
        this.list = containner.list;
        this.index = 0
    }
    next() {
        if(this.hasNext()){
            return this.list[this.index++]
        }
        return null
    }
    hasNext() {
        if(this.index >= this.list.length){
            return false
        }
        return true
    }
}

class Containner {
    constructor(list){
        this.list = list
    }
    getIterator() {
        return new Iterator(this)
    }
}

const containner = new Containner([1, 2, 3, 4, 5])
const iterator = containner.getIterator()
while(iterator.hasNext()){
    console.log(iterator.next());
}

}

{

var it = makeIterator(['a', 'b']);

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }

function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  };
}
}

{
    function each(data) {
        // 生成一个迭代器
        let iterator = data[Symbol.iterator]()
        let item = {done: false}
        while(!item.done){
            item = iterator.next();
            if(!item.done){
                console.log(item.value);
            }
        }
    }
    each([1,2,3])
    let m = new Map()
    m.set('a', 100);
    m.set('b', 200)
    each(m)
}