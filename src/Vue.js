class Vue {

    constructor(options){
        this.$data = options.data || {}
        this.$computed = options.computed || {}
        this.$el = typeof options.el === 'string' ? document.querySelector(el) : options.el || document.body
        this.$options = Object.assign({},{methods:{},computed:{}},options)
        this.window = window

        this._proxyData(options)

    }


    _proxyData(options){

        const props = ['data','methods']
        props.forEach(prop =>{
            Object.keys(options[prop]).forEach(v=> {
                Object.defineProperty(this,v,{
                    enumerable: false,
                    configurable: true,
                    get(){
                        if (this.$data.hasOwnProperty(v) && typeof this.$data[v] !== 'undefined') {
                            return this.$data[v]
                        } else if (this.$computed.hasOwnProperty(v) && typeof this.$computed[v] !== 'undefined' && typeof this.$computed[v] === 'function'){
                            return this.$computed[v].call(this)
                        } else {
                            return undefined
                        }
                    },
                    set(val){
                        if (this.$data.hasOwnProperty(v)) {
                            this.$data[v] = val
                        }
                    }
                })
            })
        })
    }

}