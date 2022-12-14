const uri = 'http://localhost:3000/read';
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
        let id = document.createElement("td");
        let tipo = document.createElement("td");
        let severidade = document.createElement("td");
        let descricao = document.createElement("td");
        let data = document.createElement("td");
        let hora = document.createElement("td");
        let hora_inicio = document.createElement("td");
        let hora_fim = document.createElement("td");
        let destino = document.createElement("td");
        id.innerHTML = e.id;
        tipo.innerHTML = e.tipo;
        severidade.innerHTML = e.severidade;
        descricao.innerHTML = e.descricao;
        data.innerHTML = e.data.toLocaleString('pt-BR', { timeZone: 'UTC' }).split("T")[0];
        hora.innerHTML = e.hora.toLocaleString('pt-BR', { timeZone: 'UTC' });
        hora_inicio.innerHTML = e.hora_inicio.toLocaleString('pt-BR', { timeZone: 'UTC' });
        hora_fim.innerHTML = e.hora_fim.toLocaleString('pt-BR', { timeZone: 'UTC' });
        destino.innerHTML = e.destino;
        excluir.innerHTML = `<img onclick = "Altera()" src='../../assets/troca.png' width='40px' height='40px' />`;
        excluir.innerHTML = `<img onclick = "preparaExclusao(${e.id})" src='../../assets/excluir.png' width='40px' height='40px' />`;
        l.appendChild(id);
        l.appendChild(tipo);
        l.appendChild(severidade);
        l.appendChild(descricao);
        l.appendChild(data);
        l.appendChild(hora);
        l.appendChild(hora_inicio);
        l.appendChild(hora_fim);
        l.appendChild(destino);
        lista.appendChild(l);
    });
}

function cadastrarChamado() {
    //Cria um objeto com os dados dos campos html <input>

    let tipo = document.querySelector("#tipo").value
    let severidade = document.querySelector("#severidade").value
    let descricao = document.querySelector("#descricao").value
    let destino = document.querySelector("#destino").value

    let corpo = {
        "tipo": tipo,
        "severidade": severidade,
        "descricao": descricao,
        "destino": destino
        
    }


    if (corpo.tipo.length > 0 && corpo.severidade.length > 0 && corpo.descricao.length > 0 && corpo.destino.length > 0) {
    fetch('http://localhost:3000/create', {
        "method": "POST",
        "headers":{
            "content-type": "application/json"
        },
        "body": JSON.stringify(corpo)
    }).then( res => { return res.json()})
    .then(resp => {
        if(resp != undefined){
            console.log("Deu certo");
        }else{
            console.log("Deu errado");
        }
    });
    window.location.reload();
    
}
}

function alerta(a) {
    document.querySelector('#modal2').setAttribute('style', 'display:flex;');
    document.querySelector('#alerta').setAttribute('style', 'display:flex;');
    document.querySelector('#msg').innerHTML = a;
}