module.exports = function (app) {
  app.get('/pagamentos', function (req, res) {
    console.log('Recebida requisicao de teste.')
    res.send('OK.');
  });

  app.post('/pagamentos/pagamento', function (req, res) {

    req.assert("forma_pagamento", "Forma de pagamento é obrigatoria").notEmpty();
    req.assert("valor", "Valor é obrigatorio").notEmpty().isFloat();

    var erros = req.validationErrors();

    if(erros){
      console.log("Erros de validação.");
      res.status(400).send(erros);
      return;
    }

    var pagamento = req.body;
    
    console.log("Processando novo pagamento");

    pagamento.status = "CRIADO";
    pagamento.data = new Date();

    var connection = app.config.database();
    var pagamentoDao = new app.DAO.pagamentosDAO(connection);

    pagamentoDao.salvar(pagamento, function(err, result){
      if(!err){
        console.log('Pagamento criado');
        res.location('/pagamentos/pagamento/' + result.insertId);
        res.status(201).json(pagamento);
      } else {
        console.log(err);
        res.status(400).send(err);
      }
      
    });

  });
}
