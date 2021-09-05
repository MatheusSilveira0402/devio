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
                    res.render("restaurante", { dadoCard : this._dados, dadoCardMonte : this._dadosMonte, validacao : {} })
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
                res.render("restaurante", {validacao : erros, dadoCard : this._dados, dadoCardMonte : this._dadosMonte})
                return;
            } else {
                console.log(dadosform)
                collection.insert(dadosform);
                res.redirect("home");
            }
            
            
        });
    });
}  


module.exports = function(){
    return PedidosDAO;
}