module.exports.getHome = function(application, req, res){
    
    const dadoForm = req.body;
    
    var connection = application.config.connectiondb;

    var PedidosDAO = new application.app.models.PedidosDAO(connection);

    PedidosDAO.getCards(dadoForm, res);

    
}


module.exports.cadastrarPedidos = function(application, req, res){
    res.send("cadastrar pedidos")
}