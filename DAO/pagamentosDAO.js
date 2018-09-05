function pagamentosDAO(connection) {
    this._connection = connection;
}

pagamentosDAO.prototype.listar = function(callback) {
    this._connection.query("select * from pagamentos", callback);
}

pagamentosDAO.prototype.salvar = function(pagamento, callback) {
    this._connection.query("insert into pagamentos set ?", pagamento, callback);
}

pagamentosDAO.prototype.buscaPorId = function(pagamentoId, callback) {
    this._connection.query("select * from pagamentos where id = ?", pagamentoId, callback);
}

module.exports = function() {
    return pagamentosDAO;
}