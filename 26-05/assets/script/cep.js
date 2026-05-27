const btn = document.getElementById("enviar")
const cepInput = document.getElementById("cep");
const cidadeInput = document.getElementById("cidade");
const bairroInput = document.getElementById("bairro");
const estadoInput = document.getElementById("estado");

cepInput.addEventListener("blur", async () => {
  let cep = cepInput.value.replace(/\D/g, "");

  if (cep.length !== 8) {
    alert("CEP inválido!");
    return;
  }

  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const dados = await resposta.json();

    cidadeInput.value = dados.localidade;
    bairroInput.value = dados.bairro;
    estadoInput.value = dados.uf;

  } catch (erro) {
    alert("Erro ao buscar o CEP!");
    console.error(erro);
  }
});