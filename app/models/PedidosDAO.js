function PedidosDAO(connection){
    this._connection = connection;
}

PedidosDAO.prototype.getCards = function(dadoForm, res){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("pedidos",function(err, collection){
            collection.find().toArray(function(err, result){
                result.forEach(row => {
                    this._cards = [row]
                });

                if(this._cards){
                    console.log(this._cards)
                } else{

                }

            });
        });
    });
}


module.exports = function(){
    return PedidosDAO;
}