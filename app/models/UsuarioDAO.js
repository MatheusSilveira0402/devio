const crypto = require("crypto");
const { login } = require("../controllers");

function UsuarioDAO(connection){
    this._connection = connection();
}

UsuarioDAO.prototype.autenticar = function(dadosform, res, req){
    this._connection.open( function(err, mongoclient){
        mongoclient.collection("usuario", function(err, collection){
            const email = dadosform.email;
            const senha_criptografada = crypto.createHash("md5").update(dadosform.pass).digest("hex");

            dadosform.pass =  senha_criptografada;

            collection.find({email:{$eq:email}, pass:{$eq:dadosform.pass}}).toArray( function(err, result){
                if(result == 0){
                    req.assert('login','Login está incorreto').notEmpty();
                    var erros = req.validationErrors();
                
                    if(erros){
                        res.render("index", {validacao : erros})
                        return;
                    }
                    console.log(result);
                } else{
                    console.log(result);
                    res.redirect("/home");
                }
            })

        })
    })
}

UsuarioDAO.prototype.inserirUsuario = function(dadosform, res){
    this._connection.open( function(err, mongoclient){
        mongoclient.collection("usuario", function(err, collection){

            console.log("to aqui")
            
            const senha_criptografada = crypto.createHash("md5").update(dadosform.pass).digest("hex");

            dadosform.pass =  senha_criptografada;

            collection.insert(dadosform);
            res.redirect("restaurante");
        });
    });
}

module.exports = function(){
    return UsuarioDAO;
}