export class Observer {

    constructor (data){
        this.data = data
        this.observer(data)
    }


    observer(data){

        if (!data && typeof data !== 'object') {
            return
        }


        Object.keys(data).forEach(k =>{
            Object.defineProperty(data,k,{
                enumerable:true,
                configurable:false,
                get(){
                    //TODO add depend
                    return val
                },
                set(newVal){

                    if (val === newVal) return

                    val = newVal

                    if (Array.isArray(newVal)) {
                        //TODO watch Array
                    } else {
                        this.observer(newVal)
                    }

                    //TODO notify
                }
            })
        })
    }


    observeArray(){

    }
}