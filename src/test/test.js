const obj = {
    a() {
        console.log( this );
    }
}

function a() {

}
delete obj.a
a.mycall( obj, b, c )