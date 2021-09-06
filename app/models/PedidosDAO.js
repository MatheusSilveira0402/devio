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
            var date = new Date();
            var momento_atual = date.getTime();
            console.log(momento_atual)
            collection.find({terminaem:{$gt:momento_atual}}).toArray(function(err, result){
                this._dadosMonte = result;
                console.log(this._dadosMonte);
                
                if(this._dadosMonte){
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

            var date = new Date();
            dadosform.terminaem = date.getTime() + 1 * 6 * 6000;

            console.log(dadosform.terminaem)
            var erros = req.validationErrors();

            if(erros){
                res.render("restaurante", {validacao : erros, dadoCard : this._dados, dadoCardMonte : this._dadosMonte, pedido : {}})
                return;
            } else {
                collection.insert(dadosform);
                res.redirect("/home")
            }
            
            
        });
    });
}


module.exports = function(){
    return PedidosDAO;
}