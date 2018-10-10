// cliente

const net = require('net');
  
const client = new net.Socket();
client.connect(9999, 'localhost', function() {
});

client.on('data', function(data) {
	console.log('dados recebidos...');
        var resposta = data.toString();
        // UNMARSHALLING
        var obj = JSON.parse(resposta);
        console.log("Filmes...");
        for (var i = 0; i < obj.length; i++) {
          var f = obj[i];
          var relIds = f.tres_filmes_mais_relacionados.map(function(a,b,c,d){ return a.FilmeID; }).join(", ");
          console.log(`ID: ${f.FilmeID}, Titulo: ${f.titulo}, Relacionados: ${relIds}`);
        }
	client.destroy();
});

client.on('close', function() {
});
