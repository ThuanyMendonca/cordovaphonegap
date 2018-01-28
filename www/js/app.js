// Criando evento click para incrementar conforme clica no produto
$('.collection').on('click', '.collection-item', function(){
	// Criando um badge, se não existir
	var $badge = $('.badge', this);
	if($badge.length === 0){
		$badge = $('<span class="badge brown-text">0</span>').appendTo(this);
	}

	// Incrementando
	$badge.text(parseInt($badge.text()) + 1);

	var nomeProduto = this.firstChild.textContent;
	Materialize.toast(nomeProduto + ' adicionado', 1000);
});

// Iniciando o plugin dos modais
$('.modal-trigger').leanModal();

// Abre o blockquote com o resumo do pedido quando clicar no botão com o id confirmar
$('#confirmar').on('click', function(){
	var texto = "";

	$('.badge').parent().each(function(){
		texto += this.firstChild.textContent + ': ';
		texto += this.lastChild.textContent + ': ';
	});

	$('#resumo').empty().text(texto);
});

// Apagando se adicionado
$('.collection').on('click', '.badge', function(){
	$(this).remove();
	return false;
});

// Apagando todos os itens do pedido
$('.acao-limpar').on('click', function(){
	$('#numero-mesa').val('');
	$('.badge').remove();
});

// Lendo código de barras
$('.scan-qrcode').on('click', function(){
	cordova.plugins.barcodeScanner.scan(
		function(resultado){
			if(resultado.text){
				Materialize.toast('Mesa ' + resultado.text, 2000);
				$('#numero-mesa').val(resultado.text);
			}
		},
		function(error){
			Materialize.toast('Erro: ' + error, 3000, 'red-text');
		}
	);	
});

// Acessando a API via Ajax

// Pegando o click do botão
$('.acao-finalizar').on('click', function(){
	// Conectando na API
	$.ajax({
		url: 'http://cozinhapp.sergiolopes.org/novo-pedido',
		data: {
			mesa: $('#numero-mesa').val(),
			pedido: $('#resumo').text()
		},
		// Callback de sucesso e erro
		error: function(erro){
			Materialize.toast(erro.responseText,3000, 'red-text');
		},
		success: function(dados){
			Materialize.toast(dados, 2000);

			$('#numero-mesa').val('');
			$('.badge').remove();

		}
	});
});













