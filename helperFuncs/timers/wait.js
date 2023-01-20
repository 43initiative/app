exports.waitACertainTime = async (timeAmount,handler) => {
    return new Promise((resolve,reject)=>{
        handler = setTimeout(()=>{
            return resolve('completed timing function')
        },timeAmount)
    })
}

exports.clearTimerHandler =  (handler) => {
    clearTimeout(handler)
}
