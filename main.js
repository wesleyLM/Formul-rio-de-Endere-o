var  pesquisar = document.getElementById('btn')
var inputCep =  document.querySelector('input[name = cep]')
pesquisar.addEventListener('click', ()=>{
    pesquisacep(inputCep.value)
})

function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.querySelector('input[name = endereco]').value = ("");
    document.querySelector('input[name = bairro]').value = ("");
    document.querySelector('input[name = cidade]').value = ("");
    document.querySelector('input[name = estado]').value = ("");
    document.querySelector('input[name = complemento]').value = ("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.querySelector('input[name = endereco]').value = (conteudo.logradouro);
        document.querySelector('input[name = bairro').value = (conteudo.bairro);
        document.querySelector('input[name = cidade]').value = (conteudo.localidade);
        document.querySelector('input[name = estado]').value = (conteudo.uf);     
        document.querySelector('input[name = complemento]').value = (conteudo.complemento);
        console.log(conteudo)
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.querySelector('input[name = endereco]').value = "...";
            document.querySelector('input[name = bairro]').value = "...";
            document.querySelector('input[name = cidade]').value = "...";
            document.querySelector('input[name = estado]').value = "...";
            document.querySelector('input[name = complemento]').value = "...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};
