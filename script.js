// Aguarda o carregamento completo do conteúdo da página
document.addEventListener('DOMContentLoaded', function() {

    // Array contendo os nomes dos arquivos JSON dos vendedores
    const npcFiles = ['arnaldo.json', 'lucia.json', 'boris.json'];

    // Mapeia cada nome de arquivo JSON para uma promessa que carrega o conteúdo do arquivo
    const npcPromises = npcFiles.map(file => fetch(file).then(response => response.json()));

    // Aguarda que todas as promessas sejam resolvidas (ou rejeitadas)
    Promise.all(npcPromises).then(npcData => {

        // Adiciona um ouvinte de eventos para o campo de entrada de texto
        document.getElementById('itemInput').addEventListener('input', function() {
            
            // Obtém o valor digitado pelo usuário e converte para minúsculas
            const query = this.value.toLowerCase();
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = '';

            // Verifica se há algum texto digitado pelo usuário
            if (query) {
                const results = [];

                // Itera sobre os dados de cada NPC
                npcData.forEach(npc => {

                    // Itera sobre os itens que cada NPC tem à venda
                    npc.items_for_sale.forEach(item => {

                        // Verifica se o nome do item inclui o texto digitado pelo usuário
                        if (item.item_name.toLowerCase().includes(query)) {
                            results.push({
                                npc_name: npc.npc_name,
                                item_name: item.item_name,
                                item_price: item.item_price
                            });
                        }
                    });
                });

                // Verifica se foram encontrados resultados
                if (results.length > 0) {
                    
                    // Itera sobre os resultados e cria elementos HTML para exibí-los
                    results.forEach(result => {
                        const resultElement = document.createElement('div');
                        resultElement.textContent = `${result.item_name} é vendido por ${result.npc_name} por ${result.item_price} moedas.`;
                        resultsContainer.appendChild(resultElement);
                    });
                } else {
                    // Exibe uma mensagem se nenhum item foi encontrado
                    resultsContainer.textContent = 'Item não encontrado.';
                }
            }
        });
    }).catch(error => console.error('Erro ao carregar os arquivos JSON:', error));
});
