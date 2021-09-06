function PedidosDAO(connection){
    this._connection = connection();
}

PedidosDAO.prototype.getCards = function(dadoForm, res){
    this._connection.open( function(err, mongoclient){
        mongoclient.collection("pedidos", function(err, collection){
        
            collection.find().toArray(function(err, result){
                this._dados = result;
            });
        });
        mongoclient.collection("montepedidos", function(err, collection){
        
            collection.find().toArray(function(err, result){
                this._dadosMonte = result;
                
                if(this._dados){
                    res.render("restaurante", { dadoCard : this._dados, dadoCardMonte : this._dadosMonte, validacao : {}, pedido: {}})
                }

            });
        }); 
    });
}

PedidosDAO.prototype.cadastroPedidos = function(dadosform, res, req){
    this._connection.open( function(err, mongoclient){
        mongoclient.collection("montepedidos", function(err, collection){
            req.assert('principal','Principla é campo obrigatório').notEmpty();
            req.assert('acompanhamento','Acompanhamento é campo obrigatório').notEmpty();
            req.assert('fritas','fritas é campo obrigatório').notEmpty();

            var erros = req.validationErrors();

            if(erros){
                res.render("restaurante", {validacao : erros, dadoCard : this._dados, dadoCardMonte : this._dadosMonte, pedido : {}})
                return;
            } else {
                console.log(dadosform)
                collection.insert(dadosform);
                res.redirect("home");
                for(var i=0; i < 3; i++){
                    console.log(i)
                    if(i == 3){
                        collection.drop(function(err, result){
                            if(result){
                                console.log("deu")
                            }else{
                                console.log("não deu")
                            }
                        });
                        const principal = "pedido feito retirar no restaurante"
                        collection.insert(principal);
                    }
                }
            }
            
            
        });
    });
}


module.exports = function(){
    return PedidosDAO;
}