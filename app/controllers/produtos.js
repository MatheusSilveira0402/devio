module.exports.getHome = function(application, req, res){
    res.render("restaurante")
}


module.exports.cadastrarPedidos = function(application, req, res){
    res.send("cadastrar pedidos")
}