module.exports.getHome = function(application, req, res){
    res.render("restaurante")
}


module.exports.cadastrarProdutos = function(application, req, res){
    res.send("cadastrar produtos")
}