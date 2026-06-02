//Seleção dos elementos HTML
const nomePokemon = document.querySelector('.nome_pokemon')
const numeroPokemon = document.querySelector('.numero_pokemon')
const imagemPokemon = document.querySelector('.imagem_pokemon')
const formulario = document.querySelector('.formulario')
const campoBusca = document.querySelector('.campo_busca')
const botaoAnterior = document.querySelector('.botao_anterior')
const botaoProximo = document.querySelector('.botao_proximo')

let pokemonAtual = 1

//Função para buscar os dados do Pokémon na API
async function buscarPokemon(pokemon) {
    //Para pegar os dados, precisamos encontrar o arquivo onde os pokémon estão
    const respostaAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    //Se a resposta for bem sucedida(ou seja, status 200)
    if(respostaAPI.status === 200){
        const dados = await respostaAPI.json()
        return dados
    }
}

//Função para renderizar os dados do Pokémon na tela
async function exibirPokemon(pokemon) {
    //Mostra carregando enquanto os dados são buscados
    nomePokemon.innerHTML = 'Carregando...'
    numeroPokemon.innerHTML = ''

    //Busca os dados do pokemons
    const dados = await buscarPokemon(pokemon)

    //Verifica se os dados foram encontrados
    if(dados){
        imagemPokemon.style.display = 'block'
        nomePokemon.innerHTML = dados.name
        numeroPokemon.innerHTML = dados.id
        imagemPokemon.src = dados.sprites.versions['generation-v']['black-white'].animated.front_default

        campoBusca.value = '' //Limpa o campo de busca
        pokemonAtual = dados.id //Atualiza o pokémon atual
    } else {
        //Exibe mensagem de erro se o pokémon não for encontrado
        imagemPokemon.style.display = 'none'
        nomePokemon.innerHTML = 'Não encontrado!'
        numeroPokemon.innerHTML = ''
    }
}

//Evento de submissão do formulário para buscar o Pokémon
formulario.addEventListener('submit', function (evento){
    evento.preventDefault(); //Evita recarregar a pagina
    exibirPokemon(campoBusca.value.toLowerCase())
})

//Evento para mostrar o Pokémon anterior
botaoAnterior.addEventListener('click', function(){
    if(pokemonAtual > 1){
        pokemonAtual -= 1
        exibirPokemon(pokemonAtual)
    }
})

//Evento para mostrar o próximo pokémon
botaoProximo.addEventListener('click', function(){
    if(pokemonAtual > 1){
        pokemonAtual += 1
        exibirPokemon(pokemonAtual)
    }
})

//Exibe o pokémon inicial ao carregar a página
exibirPokemon(pokemonAtual)