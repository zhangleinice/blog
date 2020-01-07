import Bromise from '../js/promise';

// new Bromise(resolve => {
//     setTimeout(() => {
//         resolve()
//     }, 1000)
// }).then(res => {
//     console.log('object');
//     return '这里返回一个普通值'
// }).then(res => {
//     console.log(res);
// })


// Promise.allSettled test   还有问题
const allSettled = Bromise.allSettled([
    new Bromise(resolve=> {
        setTimeout(() => {
            console.log(1);
            resolve(1)
        }, 1000)
    }),
    new Bromise(((resolve, reject) => {
        setTimeout(() => {
            console.log(2);
            resolve(2)
        }, 3000)
    }))
])
allSettled.then(val => console.log(val))    // [{status: "fulfilled", value: 1}, {status: "rejected", value: 2}]


// Promise.all  test
/**
 * all 必须等所有状态都为fulfilled才会返回
 */
// Bromise.all([new Bromise(resolve => {
//     setTimeout(() => {
//         console.log(1);
//         resolve(1)
//     }, 1000)
// }), new Bromise((resolve,reject) => {
//     setTimeout(() => {
//         console.log(2)
//         resolve(2)
//     }, 3000)
// })]).then(arr => {
//     console.log(arr);  // [1, 2]
// }).catch(err => {
//     console.log(err);  // 2
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