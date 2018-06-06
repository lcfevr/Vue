let $uid = 0
import Dep from './Dep.js'
import { deepCopy } from './utils.js'
export class Watcher {

    constructor (exp, scope, callback){

        this.exp = exp
        this.scope = scope
        this.callback = callback
        this.value = null
        this.uid = $uid++

    }


    get() {
        Dep.target = this;
        this.compressionExp(this.exp,this.scope)
        Dep.target = null
    }

    update(options) {
        let newVal = this.get()
        if (!JSON.stringify(newVal) === JSON.stringify(this.value)) {
            this.callback && this.callback(newVal,this.scope,options)
            this.value = deepCopy(newVal)
        }
    }

    compressionExp(exp,scope){
        try {
            with(scope){
                return eval(exp)
            }
        } catch (e) {
            console.log('编译失败')
        }


    }
}