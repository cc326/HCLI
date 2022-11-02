function toLower(name){
    return name.replace(/([A-Z])/g,"-$1").toLowerCase()
}

module.exports=toLower