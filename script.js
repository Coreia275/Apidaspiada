async function inserirLog(metodo, resultado) {
    await fetch(`https://www.piway.com.br/unoesc/api/inserir/log/433496/icanhazdadjokeapi/${metodo}/${resultado}`)
        .then(resposta => resposta.json())
        .then(data => {
            console.log(data); 
            exibirLogs();
        })
        .catch(error => console.error('Erro ao inserir log:', error));
}

async function excluirLog(id) {
    await fetch(`https://www.piway.com.br/unoesc/api/excluir/log/${id}/aluno/433496`)
        .then(resposta => resposta.json())
        .then(data => {
            console.log(data);
            exibirLogs(); 
        })
        .catch(error => console.error('Erro ao excluir log:', error));
}

async function exibirLogs() {
    var res = await fetch(`https://www.piway.com.br/unoesc/api/logs/433496`)
        .then(resposta => resposta.json())
        .catch(error => console.error('Erro ao buscar logs:', error));

    var modal = document.getElementById('log-table-body');

    modal.innerHTML = ''; 
    for (let i = 0; i < res.length; i++) {
        modal.innerHTML += `<tr class="tr-table">
            <td>${res[i].idlog}</td>
            <td>${res[i].api}</td>
            <td>${res[i].metodo}</td>
            <td>${res[i].resultado}</td>
            <td><button id="btn-table" onclick="excluirLog(${res[i].idlog})">Excluir</button></td>
        </tr>`;
    }
}

async function fetchSearchJoke() {
    const jokeTerm = document.getElementById('search-joke').value;
    try {
        const response = await fetch(`https://icanhazdadjoke.com/search?term=${jokeTerm}`, {
            headers: {
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            const joke = data.results[0].joke; 
            document.getElementById('joke').innerText = joke;

            
            await inserirLog('GET', joke);
        } else {
            document.getElementById('joke').innerText = 'Nenhuma piada encontrada!';
        }

        
        document.getElementById('joke-length').innerText = `Tamanho da piada: ${data.results[0].joke.length} caracteres`;

    } catch (error) {
        console.error('Erro ao buscar piada:', error);
    }
}


async function fetchRandomJoke() {
    try {
        const response = await fetch('https://icanhazdadjoke.com', {
            headers: {
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        const joke = data.joke;

        
        document.getElementById('joke').innerText = joke;

        
        await inserirLog('GET', joke); 

        
        document.getElementById('joke-length').innerText = `Tamanho da piada: ${joke.length} caracteres`;

    } catch (error) {
        console.error('Erro ao buscar piada:', error);
    }
}

document.getElementById('fetch-search-joke').addEventListener('click', fetchSearchJoke);
document.getElementById('fetch-random-joke').addEventListener('click', fetchRandomJoke);
document.getElementById('fetch-logs').addEventListener('click', exibirLogs);
document.getElementById('delete-log').addEventListener('click', function() {
    const id = document.getElementById('idlog').value;
    excluirLog(id);
});
