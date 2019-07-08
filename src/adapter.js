class Adapter {
    specificRequest() {
        return '德国标准插头'
    }
}

class Target {
    constructor() {
        this.adapter = new Adapter()
    }
    request() {
        let info = this.adapter.specificRequest()
        return `${info} - 转换器 - 中国标准插头`
    }
}

let target = new Target()
console.log(target.request());