function executor(resolve, reject) {
    let rand = Math.random();
    console.log(1)
    console.log(rand)
    if (rand > 0.5)
        resolve()
    else
        reject()
}
new Promise(executor).then((value) => {
    console.log("succeed-1")
    return new Promise(executor)
}).then((value) => {
    console.log("succeed-2")
    return new Promise(executor)
}).then((value) => {
    console.log("succeed-3")
    return new Promise(executor)
}).catch((error) => {
    console.log("error")
})
console.log(2)