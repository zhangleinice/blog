var myname = "极客时间"
function showName(){ 
    console.log(myname); 
    if(0){ 
        var myname = "极客邦" 
    } 
    console.log(myname);
}
// showName()
function foo(){ 
    var a = 1 
    let b = 2 
    { 
        let b = 3 
        // console.log(c);
        var c = 4 
        // console.log(d);
        let d = 5 
        console.log(a) 
        console.log(b) 
    } 
    console.log(b) 
    console.log(c) 
    console.log(d)
} 
// foo()

let name= '极客时间'
{ 
    console.log(name) 
    let name= '极客邦'
}