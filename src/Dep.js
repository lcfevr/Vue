export class Dep {

    constructor () {
        this.subs = []
    }

    addSub(sub){
        this.subs.push(sub)
    }


    notify(options){
        this.subs.forEach(v =>{
            v.update(options)
        })
    }
}