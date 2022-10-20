const uri = 'http://localhost:5000/estacionamento/geral';
const lista = document.querySelector("#lista");
var data = [];

function carregar() {
    const options = { method: 'GET' };

    fetch(uri, options)
        .then(resp => resp.json())
        .then(resp => {
            data = resp;
            preecherTabela();
        })
        .catch(err => console.error(err));
}

function preecherTabela() {
    data.forEach(e => {
        let l = document.createElement("tr");
        let cpf = document.createElement("td");
        let nome = document.createElement("td");
        let telefone = document.createElement("td");
        cpf.innerHTML = e.cpf;
        nome.innerHTML = e.nome;
        telefone.innerHTML = e.telefone;
        l.appendChild(cpf);
        l.appendChild(nome);
        l.appendChild(telefone);
        lista.appendChild(l);
    });
}

