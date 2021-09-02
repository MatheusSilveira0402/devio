module.exports.getlogin = function(application, req, res){
    res.render("index");
}

module.exports.login =  function(application, req, res){
    res.send("login")
}

module.exports.cadastrar =  function(application, req, res){
    res.send("cadastrar");
}