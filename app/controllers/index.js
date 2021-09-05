module.exports.getlogin = function(application, req, res){
    res.render("index", {validacao : {}});
}

module.exports.login =  function(application, req, res){
    
    const dadosform = req.body;

    const connection = application.config.connectiondb;

    var UsuariosDAO = new application.app.models.UsuarioDAO(connection);
	
	UsuariosDAO.autenticar(dadosform, res, req);

}

module.exports.cadastrar =  function(application, req, res){
    
    
    
    const dadosform = req.body;

    req.assert('email','Email é campo obrigatório').notEmpty();
    req.assert('pass',' senha é campo obrigatório').notEmpty();

    var erros = req.validationErrors();

	if(erros){
		res.render("index", {validacao : erros})
		return;
	}

    const connection = application.config.connectiondb;

    var UsuariosDAO = new application.app.models.UsuarioDAO(connection);
	
	UsuariosDAO.inserirUsuario(dadosform, res, req);

}