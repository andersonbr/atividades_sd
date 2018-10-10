const net = require('net');

function randRelacionados(filmes) {
  var rand = Math.floor(Math.random() * 1000);
  var ret = [];
  for (var i = 0; i < 3; i++) {
    var f = filmes[(rand + i) % 10];
    var c = Object.assign({}, f);
    c.tres_filmes_mais_relacionados = []
    ret.push(c);
  }
  return ret;
}

const server = net.createServer((c) => {
  // 'connection' listener
  console.log('client connected');
  c.on('end', () => {
    console.log('client disconnected');
  });
  c.on('error', (err) => {});

  // leitura de filmes
  var filmes = [];
  // gerar 10 filmes ficticios
  for (var i = 0; i < 10; i++) {
    var id = Math.floor(Math.random() * 1000);
    var ano = 2000 + Math.floor(Math.random() * 18);
    var imdb = 3 + Math.floor(Math.random() * 2);
    var f = {
      FilmeID: id,
      titulo: `Filme de id ${id}`,
      ano: ano,
      Avaliacao_IMDB: imdb,
      tres_filmes_mais_relacionados: [],
      linkparaTrailerNoYoutube: `http://filmes.com/filme/${id}`
    }
    filmes.push(f);
  }
  // definir filmes relacionados
  for (var i = 0; i < 10; i++) {
    filmes[i].tres_filmes_mais_relacionados = randRelacionados(filmes);
  }
  // MARSHALLING
  c.write(JSON.stringify(filmes));
  c.pipe(c);
});
server.on('error', (err) => {
//  throw err;
});
server.listen(9999, () => {
  console.log('server bound');
});
