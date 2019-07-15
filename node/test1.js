
// 观察者模式，nodejs自定义事件
const EventEmitter = require('events').EventEmitter;
const emitter1 = new EventEmitter()

// 监听 some 事件
emitter1.on('some', info => {
    console.log('f1', info);
})
emitter1.on('some', info => {
    console.log('f2', info);
})

// 触发 some 事件
emitter1.emit('some', 'xxxxx')


