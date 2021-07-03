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

const allDataUser = JSON.parse(localStorage.getItem("list_users")) || [];

function renderTable() {
  const table = document.getElementById("table");
  if (allDataUser.length > 0) {
    const div_table = document.getElementById("table-div");
    div_table.innerHTML = "<h1>Dados registrados no formulário</h1>";
    table.innerHTML =
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
      "</tr>";
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

function addUser() {
  allDataUser.push(dataUser());
  renderTable();
  save();
}

function save() {
  localStorage.setItem("list_users", JSON.stringify(allDataUser));
}

const verifierPassword = () => {
  const password = document.getElementById("password-input");
  const p_password = document.getElementById("password-error");
  const regex = {
    number: /[0-9]/,
    lowerCase: /[a-z]/,
    upperCase: /[A-Z]/,
  };
  var passwordBoolean = password.value.length >= 6;
  if (
    passwordBoolean &&
    regex.number.test(password.value) &&
    (regex.lowerCase.test(password.value) ||
      regex.upperCase.test(password.value))
  ) {
    password.classList.remove("error");
    p_password.classList.remove("error");
    p_password.innerHTML = "";
    return true;
  } else {
    password.classList.add("error");
    p_password.classList.add("error");
    p_password.innerHTML = "Mínimo 1 letra, 1 número e 6 caracteres";
    return false;
  }
};

const verifierEmail = () => {
  const at = email.value.indexOf("@");
  const firstDot = email.value.indexOf(".");

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
  if (firstDot == -1) {
    emailError.innerHTML = 'Email inválido! Caracter "." não encontrado!';
  }
  for (var i = at; i < email.value.length; i++) {
    if (
      ("." == email.value[i] && "." == email.value[i + 1]) ||
      email.value.lastIndexOf(".") == email.value.length - 1 ||
      firstDot == at + 1
    ) {
      emailError.innerHTML =
        'Email inválido! Insira o caracter "." na posição correta!';
      return false;
    }
  }

  // Verificação se o E-mail já foi cadastrado
  for (var i = 0; i < allDataUser.length; i++) {
    if (dataUser().emailAddress == allDataUser[i].emailAddress) {
      emailError.innerHTML = "Email já cadastrado";
      return false;
    }
  }

  // E-mail passou por todas as verificações
  email.classList.remove("error");
  emailError.classList.remove("error");
  emailError.innerHTML = "";
  return true;
};

const addClassErrorEmail = () => {
  if (!verifierEmail()) {
    email.classList.add("error");
    emailError.classList.add("error");
    return false;
  }
  return true;
};

const addClassError = (inputError, pError) => {
  inputError.classList.add("error");
  pError.classList.add("error");
};

const clearInput = () => {
  console.log("Chegou aqui irmão");
  var cont = 0;
  var inputs = document.querySelectorAll("input");
  var boolean = true;
  for (key in dataUser()) {
    if (dataUser()[key] == "") {
      const parent = inputs[cont].parentNode;
      addClassError(parent.querySelector("input"), parent.querySelector("p"));
      parent.querySelector("p").innerHTML = "Campo Vazio";
      boolean = false;
    }
    cont++;
  }
  return boolean;
};

function validation() {
  var send = clearInput() && addClassErrorEmail() && verifierPassword();
  if (send) {
    addUser();
  }
}

const events = () => {
  document
    .getElementById("password-input")
    .addEventListener("focusout", verifierPassword);
  document
    .getElementById("email-input")
    .addEventListener("focusout", addClassErrorEmail);
  document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
  });
  const fields = document.querySelectorAll("[required]");
  for (field of fields) {
    field.addEventListener("invalid", (event) => {
      event.preventDefault();
    });
  }
};

const email = document.getElementById("email-input");
const emailError = email.parentNode.querySelector("p");

events();

renderTable();
