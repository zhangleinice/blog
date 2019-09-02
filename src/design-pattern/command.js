/** 接收者 */
class Receiver {
    excu() {
        console.log( '执行命令' );
    }
}
/** 命令对象 */
class Command {
    constructor( receiver ) {
        this.receiver = receiver
    }
    cmd() {
        console.log( '触发命令' );
        this.receiver.excu()
    }
}
/** 发送者 */
class Sender {
    constructor( command ) {
        this.command = command
    }
    send() {
        console.log( '开始' );
        this.command.cmd()
    }
}
/** 士兵 */
const receiver = new Receiver()
/** 小号手 */
const command = new Command( receiver )
/** 将军 */
const sender = new Sender( command )
sender.send()


/**
 *  js中的命令模式
 */
// var setCommand = function( button, func ) {
//     button.onclick = function() {
//         func();
//     }
// };
// var MenuBar = {
//     refresh: function() {
//         console.log( '刷新菜单界面' );
//     }
// };
// var RefreshMenuBarCommand = function( receiver ) {
//     return function() {
//         receiver.refresh();
//     }
// };
// var refreshMenuBarCommand = RefreshMenuBarCommand( MenuBar );
// setCommand( button1, refreshMenuBarCommand );


/**
 * 撤销和重做
 */
var Ryu = {
    attack: function() {
        console.log( '攻击' );
    },
    defense: function() {
        console.log( '防御' );
    },
    jump: function() {
        console.log( '跳跃' );
    },
    crouch: function() {
        console.log( '蹲下' );
    }
};

var makeCommand = function( receiver, state ) { // 创建命令
    return function() {
        receiver[ state ]();
    }
};
var commands = {
    "119": "jump", // W
    "115": "crouch", // S
    "97": "defense", // A
    "100": "attack" // D
};

var commandStack = []; // 保存命令的堆栈
document.onkeypress = function( ev ) {
    var keyCode = ev.keyCode,
        command = makeCommand( Ryu, commands[ keyCode ] );
    if ( command ) {
        command(); // 执行命令
        commandStack.push( command ); // 将刚刚执行过的命令保存进堆栈
    }
};

document.body.onclick = function() { // 点击播放录像
    var command;
    while ( command = commandStack.shift() ) { // 从堆栈里依次取出命令并执行
        command();
    }
};

/**
 * 宏命令
 * 一次执行一批命令
 */
var closeDoorCommand = {
    execute: function() {
        console.log( '关门' );
    }
};
var openPcCommand = {
    execute: function() {
        console.log( '开电脑' );
    }
};

var openQQCommand = {
    execute: function() {
        console.log( '登录QQ' );
    }
};

var MacroCommand = function() {
    return {
        commandsList: [],
        add: function( command ) {
            this.commandsList.push( command );
        },
        execute: function() {
            for ( var i = 0, command; command = this.commandsList[ i++ ]; ) {
                command.execute();
            }
        }
    }
};
var macroCommand = MacroCommand();
macroCommand.add( closeDoorCommand );
macroCommand.add( openPcCommand );
macroCommand.add( openQQCommand );
macroCommand.execute();