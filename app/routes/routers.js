module.exports = function(application){
   
    //routas  para login, cadastrado e iniciar a pagina com as duas funções funcionando
    application.get('/', function(req, res){
        application.app.controllers.index.getlogin(application, req, res)
    })

    application.post('/login', function(req, res){
        application.app.controllers.index.login(application, req, res)
    })

    application.post('/cadastrar', function(req, res){
        application.app.controllers.index.cadastrar(application, req, res)
    })

    //routa para pagina home onde terar o catalgo com todos os produtos e para cadastrar o produto;
    application.get('/home', function(req, res){
        application.app.controllers.produtos.gethome(application, req, res)
    })
    
    application.post('/produtos', function(req, res){
        application.app.controllers.produtos.cadastrarProdutos(application, req, res)
    });


}