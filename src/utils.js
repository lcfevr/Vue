export default {
    deepCopy(obj){
        if (!typeof obj === 'object') {
            return;
        }

        let newObj = Array.isArray(obj) ? [] : {}
        for (o in obj) {
            if (obj.hasOwnProperty(o)) {
                if (typeof obj[o] === 'object') {
                    newObj[o] = this.deepCopy(obj[o])
                } else {
                    newObj[o] = obj[o]
                }
            }
        }

        return newObj
    },

}