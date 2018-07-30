var app = require('./config/express')();

app.listen(3002, function(){
  console.log('Servidor rodando na porta 3002.');
});
