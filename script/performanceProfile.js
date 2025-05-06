const chart = document.getElementById('chart');
const labels = document.getElementById('labels');

// Exemplo de atividades por dia
const atividades = [
    { dia: '1', quantidade: 20 },
    { dia: '2', quantidade: 5 },
    { dia: '3', quantidade: 3 },
    { dia: '4', quantidade: 7 },
    { dia: '5', quantidade: 1 },
    { dia: '6', quantidade: 15 },
    { dia: '7', quantidade: 10 },
    { dia: '8', quantidade: 0 },
    { dia: '9', quantidade: 12 },
    { dia: '10', quantidade: 8 },
    { dia: '11', quantidade: 4 },
    { dia: '12', quantidade: 6 },
    { dia: '13', quantidade: 9 },
    { dia: '14', quantidade: 11 },
    { dia: '15', quantidade: 2 },
    { dia: '16', quantidade: 13 },
    { dia: '17', quantidade: 14 },
    { dia: '18', quantidade: 0 },
    { dia: '19', quantidade: 18 },
    { dia: '20', quantidade: 17 },
    { dia: '21', quantidade: 19 },
    { dia: '22', quantidade: 16 },
    { dia: '23', quantidade: 21 },
    { dia: '24', quantidade: 22 },
    { dia: '25', quantidade: 23 },
    { dia: '26', quantidade: 24 },
    { dia: '27', quantidade: 25 },
    { dia: '28', quantidade: 26 },
    { dia: '29', quantidade: 27 },
    { dia: '30', quantidade: 28 }
];

// Encontra o maior valor para escalar as barras
const maxAtividade = Math.max(...atividades.map(a => a.quantidade));

atividades.forEach(atividade => {
    const bar = document.createElement('div');
    bar.className = 'bar';

    // Altura proporcional (máx 100% da altura do gráfico)
    const alturaPercentual = (atividade.quantidade / maxAtividade) * 100;
    bar.style.height = `${alturaPercentual}%`;

    // Mostra o número na barra
    bar.textContent = atividade.quantidade > 0 ? atividade.quantidade : '';

    // Adiciona tooltip no hover
    bar.title = `Dia ${atividade.dia}: ${atividade.quantidade} atividades`;

    chart.appendChild(bar);

    // Cria rótulo do dia
    const label = document.createElement('div');
    label.className = 'day-label';
    label.textContent = atividade.dia;
    labels.appendChild(label);
});