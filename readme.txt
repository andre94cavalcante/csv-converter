Para executar o código do teste-1 é necessário ter instalado o Node.js.
Foi utilizada a versão 14.17.4 para o desenvolvimento do mesmo

Após a instalação, é preciso entrar no diretório "teste-1" executar:
"npm install"

Depois:
"node server.js"

Assim, o servidor será executado em http://localhost:3000/

Os comandos devem ser executados sem aspas.

Foi criada também uma função para importação dos dados dos arquivos CSVs para o banco de dados (remoto ou local).
Como padrão, o banco de dados remoto está selecionado e os dados já estão importados no mesmo.
Caso queira testar a função, utilize a rota "/clearDB" para apagar todas as coleções no banco de dados e utilize a rota "/readCSV" para ler os arquivos CSV e adicionar os dados dos mesmos ao banco de dados.

