	// 变量的没有被销毁，闭包延长了变量的生命周期
	var func = function() {
	    var a = 1;
	    return function() {
	        a++;
	        alert( a );
	    }
	};
	var f = func();
	f(); // 输出：2
	f(); // 输出：3
	f(); // 输出：4
	f(); // 输出：5

	// onclick是异步触发，当点击的时候，for早就循环完了, 可以用闭包保存变量
	var nodes = document.getElementsByTagName( 'div' );
	for ( var i = 0, len = nodes.length; i < len; i++ ) {
	    nodes[ i ].onclick = function() {
	        console.log( i ); //  5,5,5,5,5
	    }
	}
	for ( var i = 0, len = nodes.length; i < len; i++ ) {
	    ( function( i ) {
	        nodes[ i ].onclick = function() {
	            console.log( i ); //  1, 2, 3, 4, 5
	        }
	    } )( i )
	}

	// 封装变量
	var mult = ( function() {
	    var cache = {};
	    var calculate = function() { // 封闭calculate 函数
	        var a = 1;
	        for ( var i = 0, l = arguments.length; i < l; i++ ) {
	            a = a * arguments[ i ];
	        }
	        return a;
	    };

	    return function() {
	        var args = Array.prototype.join.call( arguments, ',' );
	        if ( args in cache ) {
	            return cache[ args ];
	        }

	        return cache[ args ] = calculate.apply( null, arguments );
	    }

	} )();

	// 2. 延续变量声明周期
	//img 对象经常用于进行数据上报，如下所示：
	var report = function( src ) {
	    var img = new Image();
	    img.src = src;
	};
	report( 'http://xxx.com/getUserInfo' );

	// report函数并不是每次都发起了http请求。丢失原因是img是局部变量，当函数调用结束后，img局部变量随即被销毁，可以用闭包延长变量的生命周期

	//现在我们把img 变量用闭包封闭起来，便能解决请求丢失的问题：
	var report = ( function() {
	    var imgs = [];
	    return function( src ) {
	        var img = new Image();
	        imgs.push( img );
	        img.src = src;
	    }
	} )();