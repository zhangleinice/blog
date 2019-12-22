// 判断变量是否是函数
const isFunction = fn => typeof fn === 'function'

// 定义Bromise的三种状态
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class Bromise {
    constructor( handle ) {
        if ( !isFunction( handle ) ) {
            throw new Error( 'Bromie must accept a function as a params' )
        }

        // 初始化状态
        this._status = PENDING
        this._value = undefined

        /**
         *  then 方法支持多次调用，我们维护两个数组，将每次then方法注册时的回调函数添加到数组中
         *  添加成功，失败回调函数队列
         */
        this._fulfilledQueues = []
        this._rejectedQueues = []

        // 执行handle
        try {
            handle( this._resolve.bind( this ), this._reject.bind( this ) )
        } catch ( error ) {
            this._reject( error )
        }
    }
    _resolve(val) {
        if ( this._status !== PENDING ) return
        const run = () => {
            // 依次执行成功队列中的函数，并清空队列
            const runFulfilled = val => {
                let cb;
                while(cb = this._fulfilledQueues.shift()) {
                    cb(val)
                }
            }
            const runRejected = err => {
                let cb;
                while(cb = this._fulfilledQueues.shift()) {
                    cb(err)
                }
            }
            // 就是当 resolve 方法传入的参数为一个 Promise 对象时，则该 Promise 对象状态决定当前 Promise 对象的状态
            if(val instanceof Bromise) {
                val.then(resolve => {
                    this._status = FULFILLED
                    this._value = val
                    runFulfilled(resolve)
                }, err => {
                    this._status = REJECTED
                    this._value = err
                    runRejected(err)
                }) 
            }else{
                this._status = FULFILLED
                this._value = val
                runFulfilled(val)
            }
        }
        // 支持同步promise,采用异步调用
        setTimeout(() => run(), 0)
    }
    _reject(err) {
        if ( this._status !== PENDING ) return
        const run = () => {
            this._status = REJECTED
            this._value = err
            let cb;
            while(cb = this._rejectedQueues.shift()) {
                cb(err)
            }
        }
        setTimeout(() => run(), 0)
    }
    then(onFulfilled, onRejected) {
        const { _status, _value } = this
        // 返回一个新的Bromise对象
        return new Bromise((onFulfilledNext, onRejectedNext) => {
            // 成功执行的函数
            const fulfilled = value => {
                try {
                    if(!isFunction(onFulfilled)){
                        onFulfilledNext(value)
                    }else{
                        let res = onFulfilled(value)
                        if(res instanceof Bromise){
                            res.then(onFulfilledNext, onRejectedNext)
                        }else{
                            onRejectedNext(res)
                        }
                    }
                } catch (error) {
                    // 如果函数执行出错，新的Promise对象的状态为失败
                    onRejectedNext(error)
                }
            }
            // 失败执行的函数
            const rejected = err => {
                try {
                    if(!isFunction(onRejected)){
                        onRejectedNext(err)
                    }else{
                        let res = onRejected(err)
                        if(res instanceof Bromise) {
                            res.then(onFulfilledNext, onRejectedNext)
                        }else{
                            onFulfilledNext(res)
                        }
                    }
                } catch (error) {
                    onRejectedNext(error)
                }
            }

            switch(_status) {
                // 当状态为pending时，将then方法回调函数加入执行队列中
                case PENDING:
                    this._fulfilledQueues.push(onFulfilled)
                    this._rejectedQueues.push(onRejected)
                    break;
                // 当状态已经改变，立即执行对应的回调
                case FULFILLED:
                    fulfilled(_value)
                    break;
                case REJECTED:
                    rejected(_value)
                    break;
            }
        })
    }
    // 相当于调用 then 方法, 但只传入 Rejected 状态的回调函数
    catch(onRejected){
        return this.then(undefined, onRejected)
    } 

    // 静态方法。不能在类的实例上调用静态方法，而应该通过类本身调用
    // Promise.resolve方法
    static resolve(val) {
        if(val instanceof Bromise){
            return val
        }
        return new Bromise(resolve => resolve(val))
    } 
    static rejected(err) {
        return new Promise((resolve, rejected) => rejected(err))
    }
    static all(list) {
        return new Bromise((resolve, rejected) => {
            let values = []
            let count = 0
            for( let [key, val] of list.entries()){
                this.resolve(val).then((res => {
                    count ++
                    values[key] = res
                    // 所有状态都返回 FULFILLED 时，新返回的Promise状态变为 FULFILLED
                    if(count === list.length) resolve(values)
                }), err => {
                    rejected(err)
                })
            }
        })
    }
    // 返回先执行完的promise
    static race(list) {
        return new Bromise((resolve, rejected) => {
            for(let val of list) {
                // 只要有一个实例率先改变状态，新的MyPromise的状态就跟着改变
                this.resolve(val).then((value => {
                    resolve(value)
                }), err => {
                    rejected(err)
                })
            }
        })
    }
    // finally 方法用于指定不管 Promise 对象最后状态如何，都会执行的操作
    finally(cb) {
        return this.then(val => {
            return Bromise.resolve(cb()).then(() => val)
        }, err => {
            return Bromise.resolve(cb()).then(() => {throw err})
        })
    }
}

export default Bromise

