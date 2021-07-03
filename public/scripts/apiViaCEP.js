"use strict";

// Trazendo elementos para serem preenchidos do HTML
const address = document.getElementById("address-input");
const bairro = document.getElementById("bairro-input");
const city = document.getElementById("city-input");
const state = document.getElementById("uf-input");

// P CEP Error
const cep_error = document.getElementById("cep-error");
const address_error = document.getElementById("address-error");
const bairro_error = document.getElementById("bairro-error");
const city_error = document.getElementById("city-error");
const state_error = document.getElementById("uf-error");

// Função de preencher formulário
const fillForm = (addressObject) => {
  address.value = addressObject.logradouro;
  bairro.value = addressObject.bairro;
  city.value = addressObject.localidade;
  state.value = addressObject.uf;
};

const cepValido = (cep) => cep.length == 8;

const searchCEP = async () => {
  address.value = "";
  bairro.value = "";
  city.value = "";
  state.value = "";

  // Buscando os dados da API ViaCEP
  const cep = document
    .getElementById("cep-input")
    .value.replace(".", "")
    .replace("-", "");

  const url = `https://viacep.com.br/ws/${cep}/json/`;

  // Verificando se o CEP é válido
  if (cepValido(cep)) {
    const dataPromisse = await fetch(url);
    const addressObject = await dataPromisse.json();
    if (addressObject.hasOwnProperty("erro")) {
      cep_error.innerHTML = "CEP não encontrado";
      cep_error.classList.add("error");
      address.value = "Não encontrado";
      document.getElementById("cep-input").classList.add("error");
    } else {
      fillForm(addressObject);
      cep_error.innerHTML = "";
      cep_error.classList.remove("error");
      document.getElementById("cep-input").classList.remove("error");
    }
  } else {
    address.value = "Não encontrado";
    cep_error.innerHTML = "CEP Inválido";
    cep_error.classList.add("error");
    document.getElementById("cep-input").classList.add("error");
  }
};

document.getElementById("cep-input").addEventListener("focusout", searchCEP);
