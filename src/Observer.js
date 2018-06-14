import Dep from './Dep.js'
export class Observer {

    constructor (data){
        this.data = data

        this.observer(data)
    }


    observer(data){

        if (!data && typeof data !== 'object') {
            return
        }


        this.defineReactiveObject(data)
    }


    defineReactiveObject(data){

        Object.keys(data).forEach(k =>{
            let dep = new Dep()
            Object.defineProperty(data,k,{
                enumerable:true,
                configurable:false,
                get(){
                    Dep.target && dep.addSub(Dep.target)
                    return val
                },
                set(newVal){

                    if (val === newVal) return

                    val = newVal

                    if (Array.isArray(newVal)) {
                        this.observeArray(newVal,dep)
                    } else {
                        this.observer(newVal)
                    }

                    dep.notify()
                }
            })
        })

    }

    observeArray(array,dep){
        array.__proto__ = this.defineReactiveArray(dep)
        array.forEach((arr) =>{
            this.observer(arr)
        })
    }


    defineReactiveArray(dep){
        const methods = ['push','splice','shift','pop','sort','unshift','reverse']
        let arrProperty = Array.prototype
        let arrMethods = Object.create(arrProperty)


        Object.keys(methods).forEach(method =>{
            let original = arrProperty[method]
            Object.defineProperty(arrMethods,method,{
                value:()=>{

                    let args = Array.from(arguments)
                    let result = original.apply(this,args)
                    dep.notify({methods,args})

                    return result
                }
            })
        })


        return arrMethods
    }
}