// 判断变量是否是函数
const isFunction = fn => typeof fn === 'function'

// 定义Bromise的三种状态
const PENDING = 'PENDING'
const FULILLED = 'FULILLED'
const REJECTED = 'REJECTED'

class Bromise {
    constructor( handle ) {
        debugger
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
    _resolve( val ) {
        if ( this._status !== PENDING ) return
        // 依次执行成功队列中的函数，并清空队列
        const run = () => {
            this._status = FULILLED
            this._value = val
            let cb;
            while(cb = this._fulfilledQueues.shift()) {
                cb(val)
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
                case FULILLED:
                    fulfilled(_value)
                    break;
                case REJECTED:
                    rejected(_value)
                    break;
            }
        })
    }
}

export default Bromise