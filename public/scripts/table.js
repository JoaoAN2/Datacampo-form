// Dados do formulário.
const dataUser = () => {
  return {
    name: document.getElementById("name").value,
    lastName: document.getElementById("lastName").value,
    emailAddress: document.getElementById("email-input").value,
    password: document.getElementById("password-input").value,
    cep: document.getElementById("cep-input").value,
    numberHouse: document.getElementById("number-input").value,
    address: document.getElementById("address-input").value,
    bairro: document.getElementById("bairro-input").value,
    city: document.getElementById("city-input").value,
    uf: document.getElementById("uf-input").value,
    birthday: document.getElementById("birthday-input").value,
  };
};

// Declarando o array que vai conter todos os usuários.
const allDataUser = JSON.parse(localStorage.getItem("list_users")) || [];

// Renderizando a tabela de usuários.
function renderTable() {
  const table = document.getElementById("table");
  if (allDataUser.length > 0) {
    const title_table = document.getElementById("title-table");
    title_table.innerHTML = "Dados registrados no formulário";
    table.innerHTML =
      "<thead>" +
      "<tr>" +
      "<th scope=col>Nome</th>" +
      "<th scope=col>Sobrenome</th>" +
      "<th scope=col>E-mail</th>" +
      "<th scope=col>Senha</th>" +
      "<th scope=col>CEP</th>" +
      "<th scope=col>N°</th>" +
      "<th scope=col>Endereço</th>" +
      "<th scope=col>Bairro</th>" +
      "<th scope=col>Cidade</th>" +
      "<th scope=col>UF</th>" +
      "<th scope=col>Data de Nascimento</th>" +
      "</tr>" +
      "</thead>";
  }
  for (const data of allDataUser) {
    const newLineTable = document.createElement("tr");
    for (const key in data) {
      const elementInLineTable = document.createElement("td");
      const textElement = document.createTextNode(data[key]);
      elementInLineTable.appendChild(textElement);
      newLineTable.appendChild(elementInLineTable);
    }
    table.appendChild(newLineTable);
  }
}

// Adicionando o usuário no array.
function addUser() {
  allDataUser.push(dataUser());
  renderTable();
  save();
}

// Salvando o array.
function save() {
  localStorage.setItem("list_users", JSON.stringify(allDataUser));
}

// Verificação da senha.
const checkPassword = () => {
  const password = document.getElementById("password-input");
  const p_password = document.getElementById("password-error");

  const regex = {
    number: /[0-9]/,
    lowerCase: /[a-z]/,
    upperCase: /[A-Z]/,
  };

  // Senha possui o tamanho mínimo adequado
  var passwordBoolean = password.value.length >= 6;

  // Senha válida
  if (
    passwordBoolean &&
    regex.number.test(password.value) &&
    (regex.lowerCase.test(password.value) ||
      regex.upperCase.test(password.value))
  ) {
    removeClassError(password, p_password);
    p_password.innerHTML = "";
    return true;
  }

  // Senha inválida
  else {
    addClassError(password, p_password);
    p_password.innerHTML = "Mínimo 1 letra, 1 número e 6 caracteres";
    return false;
  }
};

// Verificação do campo de Email.
const checkEmail = () => {
  const email = document.getElementById("email-input");
  const emailError = email.parentNode.querySelector("p");
  const at = email.value.indexOf("@");

  // Verificação de espaços
  if (email.value.indexOf(" ") != -1) {
    emailError.innerHTML = "Email inválido! Caracteres inválidos!";
    return false;
  }

  // Verificação do caracter @
  if (at == -1) {
    emailError.innerHTML = 'Email inválido! Caracter "@" não encontrado!';
    return false;
  } else if (at != email.value.lastIndexOf("@")) {
    emailError.innerHTML = 'Email inválido! Possui mais de um "@"!';
    return false;
  } else if (!(at > 0 && at != email.value.length)) {
    emailError.innerHTML =
      'Email inválido! Insira o caracter "@" na posição correta!';
    return false;
  }

  // Verificação do caracter .
  const domain = email.value.slice(email.value.indexOf("@"));
  const dot = domain.indexOf(".");
  if (
    dot <= 1 ||
    domain.lastIndexOf(".") == domain.length - 1 ||
    domain.indexOf("..") != -1
  ) {
    emailError.innerHTML =
      'Email inválido! Insira o caracter "." na posição correta!';
    return false;
  }

  // Verificação se o E-mail já foi cadastrado.
  for (var i = 0; i < allDataUser.length; i++) {
    if (dataUser().emailAddress == allDataUser[i].emailAddress) {
      addClassError(email, emailError);
      emailError.innerHTML = "Email já cadastrado";
      return false;
    }
  }

  // E-mail passou por todas as verificações.
  emailError.innerHTML = "";
  return true;
};

const getAge = birthday => {
  const today = [
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
  ];
  const birthdayArray = birthday.split("-");
  var age = today[0] - birthdayArray[0];
  if (
    today[1] < birthdayArray[1] ||
    (today[1] == birthdayArray[1] && today[2] < birthdayArray[2])
  ) {
    age--;
  }
  return age;
}

// Verificação maior de idade (18 anos)
const checkAge = () => {
  const birthdayInput = document.getElementById("birthday-input");
  const birthdayError = document.getElementById("birthday-error");
  const age = getAge(birthdayInput.value);
  if(age < 18){
    addClassError(birthdayInput, birthdayError);
    birthdayError.innerHTML = "Menor de idade";
    return false;
  } else {
    removeClassError(birthdayInput, birthdayError);
    birthdayError.innerHTML = "";
    return true;
  }
};

// Adicionar formatação de erro no campo inválido.
const addClassError = (inputError, pError) => {
  inputError.classList.add("error");
  pError.classList.add("error");
};

// Remover formatação de erro no campo válido.
const removeClassError = (inputError, pError) => {
  inputError.classList.remove("error");
  pError.classList.remove("error");
};

// Verificação se possui campos vazios antes de enviar o formulário.
const clearInput = () => {
  var cont = 0;
  var inputs = document.querySelectorAll("input");
  var boolean = true;
  for (key in dataUser()) {
    if (dataUser()[key] == "" && cont < 6) {
      const parent = inputs[cont].parentNode;
      addClassError(parent.querySelector("input"), parent.querySelector("p"));
      parent.querySelector("p").innerHTML = "Campo Vazio";
      boolean = false;
    }
    cont++;
  }
  return boolean;
};

const clear = () => {
  const inputs = document.querySelectorAll("input");
  for(key of inputs) {
    key.value = "";
  }
}

// Validação do formulário antes de adicionar o usuário
function validation() {
  var send = clearInput() && checkEmail() && checkPassword() && checkAge();
  const messageDiv = document.getElementById("send-div");
  const message = document.getElementById("send-message");
  if (send) {
    messageDiv.classList.remove("failed");
    message.classList.remove("failed");
    messageDiv.classList.add("sucess");
    message.classList.add("success");
    message.innerHTML = "Formulário enviado com sucesso";
    addUser();
    clear();
  } else {
    messageDiv.classList.remove("sucess");
    message.classList.remove("sucess");
    messageDiv.classList.add("failed");
    message.classList.add("failed");
    message.innerHTML = "Erro! dados incorretos!"
  }
}

const events = () => {
  // Evento verificação de senha
  document
    .getElementById("password-input")
    .addEventListener("focusout", checkPassword);

  // Evento verificação de Email
  document.getElementById("email-input").addEventListener("focusout", () => {
    if (!checkEmail()) {
      addClassError(
        document.getElementById("email-input"),
        document.getElementById("email-error")
      );
    } else {
      removeClassError(
        document.getElementById("email-input"),
        document.getElementById("email-error")
      );
    }
  });

  // Evento verificar idade
  document
    .getElementById("birthday-input")
    .addEventListener("focusout", checkAge);

  // Evento "Não enviar o formulário"
  document.querySelector("form").addEventListener("submit", event => {
    event.preventDefault();
  });

  // Evento de validação dos campos
  const fields = document.querySelectorAll("[required]");

  for (field of fields) {
    field.addEventListener("focusout", event => {
      const errorText = event.target.parentNode.querySelector("p");
      if (event.target.value == "") {
        addClassError(event.target, errorText);
        errorText.innerHTML = "Campo Vazio!";
      } else {
        removeClassError(event.target, errorText);
        errorText.innerHTML = "";
      }
    });

    // Remover o Bubble
    field.addEventListener("invalid", event => {
      event.preventDefault();
    });
  }
};

events();
renderTable();
