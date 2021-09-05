function PedidosDAO(connection){
    this._connection = connection();
}

PedidosDAO.prototype.getCards = function(dadoForm, res){
    this._connection.open( function(err, mongoclient){
        mongoclient.collection("pedidos", function(err, collection){
        
            collection.find().toArray(function(err, result){
                const dados = result;
                console.log(dados)
                if(dados){
                res.render("restaurante", { dadoCard : dados})
                } 
            });
        });
    });
    
}


module.exports = function(){
    return PedidosDAO;
}