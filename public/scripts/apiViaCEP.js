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

const cepValido = cep => cep.length == 8;

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
      document.getElementById("cep-input").classList.add("error");
      erroFormat();
    } else {
      fillForm(addressObject);
      sucessFormat();
    }
  } else {
    erroFormat();
  }
};

const erroFormat = () => {
  address.classList.add("error"); 
  address_error.classList.add("error"); 
  address_error.innerHTML = "Inválido"; 

  bairro.classList.add("error");
  bairro_error.classList.add("error");
  bairro_error.innerHTML = "Inválido";

  city.classList.add("error");
  city_error.classList.add("error");
  city_error.innerHTML = "Inválido";
  
  state.classList.add("error");
  state_error.classList.add("error");
  state_error.innerHTML = "Inválido";
}

const sucessFormat = () => {
  address.classList.remove("error"); 
  address_error.classList.remove("error"); 
  address_error.innerHTML = ""; 

  bairro.classList.remove("error");
  bairro_error.classList.remove("error");
  bairro_error.innerHTML = "";
  
  city.classList.remove("error");
  city_error.classList.remove("error");
  city_error.innerHTML = "";
  
  state.classList.remove("error");
  state_error.classList.remove("error");
  state_error.innerHTML = "";
}

document.getElementById("cep-input").addEventListener("focusout", searchCEP);
