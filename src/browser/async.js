
async function foo() {
    console.log('foo')
}
async function bar() {
    console.log('bar start')
    await foo()                 // mic
    console.log('bar end')
}
console.log('script start')

setTimeout(function () {
    console.log('setTimeout')
}, 0)

bar();

new Promise(function (resolve) {
    console.log('promise executor')
    resolve();
}).then(function () {
    console.log('promise then')   // mic
})

console.log('script end')

/**
 *      script start
 *      bat start
 *         foo
 *      promise executor    
 *      script  end
            bar end
 *      promise then
 *      settimeot
 */