import Bromise from '../js/promise';

new Bromise(resolve => {
    debugger
    setTimeout(() => {
        resolve()
    }, 1000)
}).then(res => {
    return '这里返回一个普通值'
}).then(res => {
    console.log(res);
})