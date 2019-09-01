// 定义一个主题，触发所有的观察者更新
class Subject {
    constructor() {
        this.state = 0;
        this.obsevers = []
    }
    getState() {
        return this.state
    }
    setState( state ) {
        this.state = state;
        // 更新之后，触发所有的观察者
        this.notifyAllObservers()
    }
    notifyAllObservers() {
        this.obsevers.forEach( observer => observer.update() )
    }
    attach( obsever ) {
        this.obsevers.push( obsever )
    }
}
// 观察者
class Observer {
    constructor( name, subject ) {
        this.name = name;
        this.subject = subject
        // 订阅主题
        this.subject.attach( this )
    }
    update() {
        console.log( `${this.name} updata, state: ${this.subject.getState()}` );
    }
}

const subject = new Subject()
// 多个观察者
const o1 = new Observer( 'o1', subject )
const o2 = new Observer( 'o2', subject )
const o3 = new Observer( 'o3', subject )

// 更新state，触发所有观察者
subject.setState( 1 )
subject.setState( 2 )




var Event = ( function() {
    var clientList = {},
        listen,
        trigger,
        remove;
    listen = function( key, fn ) {
        if ( !clientList[ key ] ) {
            clientList[ key ] = [];
        }
        clientList[ key ].push( fn );
    };
    trigger = function() {
        var key = Array.prototype.shift.call( arguments ),
            fns = clientList[ key ];
        if ( !fns || fns.length === 0 ) {
            return false;
        }
        for ( var i = 0, fn; fn = fns[ i++ ]; ) {
            fn.apply( this, arguments );
        }
    };
    remove = function( key, fn ) {
        var fns = clientList[ key ];
        if ( !fns ) {
            return false;
        }
        if ( !fn ) {
            fns && ( fns.length = 0 );
        } else {
            for ( var l = fns.length - 1; l >= 0; l-- ) {
                var _fn = fns[ l ];
                if ( _fn === fn ) {
                    fns.splice( l, 1 );
                }
            }
        }
    };
    return {
        listen: listen,
        trigger: trigger,
        remove: remove
    }
} )();

Event.listen( 'squareMeter88', function( price ) { // 小红订阅消息
    console.log( '价格= ' + price ); // 输出：'价格=2000000'
} );

Event.trigger( 'squareMeter88', 2000000 ); // 售楼处发布消息