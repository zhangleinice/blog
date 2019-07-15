// 定义一个主题，触发所有的观察者更新
class Subject {
    constructor() {
        this.state = 0;
        this.obsevers = []
    }
    getState() {
        return this.state
    }
    setState(state) {
        this.state = state;
        // 更新之后，触发所有的观察者
        this.notifyAllObservers()
    }
    notifyAllObservers() {
        this.obsevers.forEach(observer => observer.update())
    }
    attach(obsever) {
        this.obsevers.push(obsever)
    }
}
// 观察者
class Observer {
    constructor(name, subject) {
        this.name = name;
        this.subject = subject
        // 订阅主题
        this.subject.attach(this)
    }
    update() {
        console.log(`${this.name} updata, state: ${this.subject.getState()}`);
    }
}

const subject = new Subject()
// 多个观察者
const o1 = new Observer('o1', subject)
const o2 = new Observer('o2', subject)
const o3 = new Observer('o3', subject)

// 更新state，触发所有观察者
subject.setState(1)
subject.setState(2)




