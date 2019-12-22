import Bromise from '../js/promise';

new Bromise(resolve => {
    setTimeout(() => {
        resolve()
    }, 1000)
}).then(res => {
    console.log('object');
    return '这里返回一个普通值'
}).then(res => {
    console.log(res);
})


// Promise.all  test
// Bromise.all([new Bromise(resolve => {
//     setTimeout(() => {
//         console.log(1);
//         resolve(1)
//     }, 1000)
// }), new Bromise(resolve => {
//     setTimeout(() => {
//         console.log(2)
//         resolve(2)
//     }, 5000)
// })]).then(arr => {
//     console.log(arr);  // [1, 2]
// })

// Promise.race  test
// Bromise.race([new Bromise(resolve => {
//     setTimeout(() => {
//         console.log(1);
//         resolve(1)
//     }, 1000)
// }), new Bromise(resolve => {
//     setTimeout(() => {
//         console.log(2)
//         resolve(2)
//     }, 5000)
// })]).then(arr => {
//     console.log(arr);   // 1
// })