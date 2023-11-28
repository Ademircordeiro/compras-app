$(document).ready(function() {
// cria item e adiciona a lista de desejo
var btnEnvia = $('input[type=submit][name=envia-item]');
var btnConfirmaLista = $('input[type=submit][name=envia-lista]')
var btnNovoItem = $('input[type=submit][name=envia-novo-item]');

//Btn adicona itens a pre lista
btnEnvia.on('click', function() {    
    var nomeItem = $('input[type=text][name=nome-item]').val();
    var quantItem = parseInt($('input[type=number][name=quant-item]').val());
    var lista = $('#lista');       

    lista.append(`
    <li class="li-lista">
        <div class="card-list  d-flex justify-content-around row align-items-center">
            <span class="col-1 material-symbols-outlined">list</span>
            <span class="col-5 sp-nome">${nomeItem}</span>
            <span class="col-3 sp-quant">${quantItem}</span>
            <span class="col-2 row align-items-center sp-cb">
                <input id="" type="checkbox" class="form-check-input my-input-check">
            </span>
        </div>
    </li>`);
    
    var lista = $('#lista')
    //pega último item adicionado
    let ultimoItem = lista.find('li').last();
    //atribui id dinâmico
    let numberId = $('.li-lista').length;
    ultimoItem.attr('id', 'item' + numberId);

});

var btnCarrinho = $('#carrinho');

//Btn joga itens da pre lista para lista do carrinho
btnConfirmaLista.on('click', function() {
    var liItens = $('#lista').find('li');    
    console.log(liItens)
    //varre a lista linha a linha
    for (var i = 0; i < liItens.length; i++) {
        //pega os valores da li
        var nomeItem = liItens[i].children[0].children[1].textContent;
        var marcado = liItens[i].children[0].children[3].children[0].checked;
        var quantItem = liItens[i].children[0].children[2].innerText;
        console.log(nomeItem, marcado, quantItem)
        //verifica itens marcados para subir para carrinho
        if (marcado == true) {
        //monta carrinho
        btnCarrinho.append(`<li class="li-lista-carrinho">
                                <div class="card-list-carrinho  d-flex justify-content-around row align-items-center">
                                    <span class="col-3 sp-nome-carrinho">${nomeItem}</span>                                    
                                    <span class="input-preco-carrinho"></span>
                                    <input class="col-2 form-control input-carrinho-editavel input-preco-carrinho" id="preco${i}" type="number" value="">
                                    <span class="input-quant-carrinho"></span>
                                    <input class="col-1 form-control input-carrinho-editavel" id="quantFinal${i}" type="number" value="${quantItem}">
                                    <span class="col-1 material-symbols-outlined material-symbols-outlined-carrinho" id="remove${i}">variable_remove</span>
                                    <input class="col-1 my-input-check" id="checkB${i}" type="checkbox">
                                </div>
                            </li>`)



        };
    };

})

//Evento btn remover item
$('#carrinho').on('click', '[id^="remove"]', function(e) {    
    let paiBtnClicado = $(this).parent();
    removeElemento(paiBtnClicado);       
})

//Funcao remove item
function removeElemento(elemento) {
    elemento.remove();
};

// novo item
btnNovoItem.on('click', function() {    
    var nomeItem = $('input[type=text][name=nome-novo-item]').val();
    var quantItem = parseInt($('input[type=number][name=quant-novo-item]').val());
           
    //id dinâmico
    let numberId = $('#carrinho').length;
 
    var listaCarrinho = $('#carrinho');
    var quantItemsCarrinho = listaCarrinho.children().length; // Obtém a quantidade de itens no carrinho
    var idItemAdd = quantItemsCarrinho;
        
btnCarrinho.append(`<li class="li-lista-carrinho">
                                <div class="card-list-carrinho  d-flex justify-content-around row align-items-center">
                                    <span class="col-3 sp-nome-carrinho">${nomeItem}</span>                                    
                                    <span class="input-preco-carrinho"></span>
                                    <input class="col-2 form-control input-carrinho-editavel input-preco-carrinho" id="preco${idItemAdd}" type="number" value="">
                                    <span class="input-quant-carrinho"></span>
                                    <input class="col-1 form-control input-carrinho-editavel" id="quantFinal${idItemAdd}" type="number" value="${quantItem}">
                                    <span class="col-1 material-symbols-outlined material-symbols-outlined-carrinho" id="remove${idItemAdd}">variable_remove</span>
                                    <input class="col-1 my-input-check" id="checkB${idItemAdd}" type="checkbox">
                                </div>
                            </li>`
);

});


$('#carrinho').on('change', '[id^="preco"], [id^="quantFinal"]', function(e) {
    let soma = 0;

    $('[id^="preco"]').each(function() {
        let valor = parseFloat($(this).val()) || 0;
        let idNumber = this.id.replace('preco', ''); // Obtém o número do ID
        let valQuant = parseInt($(`#quantFinal${idNumber}`).val()) || 0;
        soma += valor * valQuant;
    });

    //pega elemento carrinho
    var meuCarrinho = $('#totalCarrinho');
    meuCarrinho.empty();
    meuCarrinho.append(`<div class="carrinho-compras">
                            <span class="material-symbols-outlined material-symbols-outlined-carrinho-compras">shopping_cart</span>
                            <span class="sp-carrinho">${soma}</span>
                        </div>`);
});

// toggle btn adicionar item ao carrinho
$('#btn-carrinho-add').on('click', function() {
    let carrinho = $('#form-carrinho');
    carrinho.toggleClass('form-carrinho-ligado');
});


//toggle inputs iniciais
$('#envia-lista').on('click', function() {
    let inputsEnviaLista = $('#inputs-inicial');
    inputsEnviaLista.addClass('desliga-inputs-inicial');

    let listaInicial = $('#listaInicial');
    listaInicial.addClass('desliga-inputs-inicial');
});

});




