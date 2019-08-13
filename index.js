// import proxy from './src/proxy';
// import adapter from './src/adapter';
// import decorate from './src/decorate';
// import observer from './src/observer';
// import iterator from './src/iterator';




import Function from './src/js/call';
// 测试一下
var value = 2;

var obj = {
    value: 1
}

function test( name, age ) {
    // console.log( this.value );
    return {
        value: this.value,
        name: name,
        age: age
    }
}

test.call2( null ); // 2

console.log( test.call2( obj, 'kevin', 18 ) );
// 1
// Object {
//    value: 1,
//    name: 'kevin',
//    age: 18
// }