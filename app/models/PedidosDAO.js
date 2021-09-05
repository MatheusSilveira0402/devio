function PedidosDAO(connection){
    this._connection = connection();
}

PedidosDAO.prototype.getCards = function(dadoForm, res){
    this._connection.open( function(err, mongoclient){
        mongoclient.collection("pedidos", function(err, collection){
        
            collection.find().toArray(function(err, result){
                if(result){
                res.render("restaurante", {dadoCard: result})

                }else {
                    res.render("restaurante", {dadoCard: {}});
                }
            });
        });
    });
    
}


module.exports = function(){
    return PedidosDAO;
}