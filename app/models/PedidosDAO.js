function PedidosDAO(connection){
    this._connection = connection();
}

PedidosDAO.prototype.getCards = function(dadoForm, res){
    const sql = "SELECT * FROM pedidos";
    this._connection.query(sql, function(err, results){
        results.forEach( row => {
            this._cards = [row]
        });

        if(this._cards){
            res.send(this._cards)
        } else {
            res.send("não deu");
        }
    })
}


module.exports = function(){
    return PedidosDAO;
}