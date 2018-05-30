class Vue {

    constructor(options){
        this.$data = options.data || {}
        this.$computed = options.computed || {}
        this.$watch = options.watch || {}
        this.$el = typeof options.el === 'string' ? document.querySelector(el) : options.el || document.body
        this.$options = Object.assign({},{computed:{},methods:{},watch:{}},options)
        this.window = window


        this.definePropertyToVm(this.$options.data)
        this.definePropertyToVm(this.$options.computed)
        this.defineMethodsToVm(this.$options)
    }

    observe(data){
        if (!data || typeof data !== 'object') {
            return
        }

        Object.keys(data).forEach(v=>{
            this.definePropertyToVm(data,v,data[v])
        })
    }

    definePropertyToVm(data,key,value){
        this.observe(data)
        Object.defineProperty(data,key,{
            enumerable: false,
            configurable: true,
            get(){
                return value
            },
            set(newVal){
                value = newVal
            }
        })
    }


    defineMethodsToVm(options){

        let methods = options.methods
        Object.keys(methods).forEach(m =>{
            this[m] = this.$options.methods[m]
        })
    }


}