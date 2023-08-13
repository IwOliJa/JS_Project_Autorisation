const inputName = document.querySelector(".name");
const inputPhone = document.querySelector(".phone");
const inputEmail = document.querySelector(".email");
const inputPassword = document.querySelector(".password");
const signUpBtn = document.querySelector(".signUp");

const inputYourEmail = document.querySelector(".your_email");
const inputYourPassword = document.querySelector(".your_password");
const loginBtn = document.querySelector(".login");

//Тут мы создали параграф и добавили его в body.
// Теперь мы можем выводить в этом параграфе нужные сообщения.
const requiredMessage = document.createElement("p");
document.body.append(requiredMessage);

// let users=[];
//console.log(localStorage.getItem("users")); // Эта строчка нам нужна для теста. Так мы можем
//вытащить информацию о пользователе из localStorage; если он там есть.

// ___________________________________________
// if (localStorage.getItem("users")) {
//     let users = localStorage.getItem(users);
// } else {
//     let users = [];
// }
// при помощи if else мы проверяем local storage и в зависимости от этого,
// прописываем чему будет равенa переменная users.

// ___________________________________________

// Если localStoragе равен нулю(там пусто) , то let users равен пустому массиву
// Если же в localStoragе что то есть, то let users равен тому что мы из localStoragе вытащим
// предварительно распарсив.
let users =
  localStorage.getItem("users") === null
    ? []
    : JSON.parse(localStorage.getItem("users"));

function clearInputs() {
  inputName.value = "";
  inputPhone.value = "";
  inputEmail.value = "";
  inputPassword.value = "";
}
signUpBtn.addEventListener("click", () => {
  if (
    inputName.value === "" ||
    inputPhone.value === "" ||
    inputEmail.value === "" ||
    inputPassword.value === ""
  ) {
    //если выше написанное правда, то наполним нами созданный
    // ранее параграф текстом и выделим его красным цветом
    requiredMessage.innerText = "Please fill all the fileds ";
    requiredMessage.style.color = "red";
  } else {
    let isError = false;
    for (let i = 0; i < users.length; i++) {
      if (inputEmail.value === users[i].email) {
        isError = true;
      }
    }
    if (isError) {
      requiredMessage.innerText = "This email has already been";
      requiredMessage.style.color = "red";
    } else {
      // Вся логика что находится ниже не должна отрабатываться если хоть один инпут не заполнен,
      // поэтому прописываем выше условие if else.
      const userData = {
        name: inputName.value,
        phoneNumber: inputPhone.value,
        email: inputEmail.value,
        password: inputPassword.value,
      };

      users.push(userData);
      localStorage.setItem("users", JSON.stringify(users));

      clearInputs();
      requiredMessage.innerText = "You have been registred!";
      requiredMessage.style.color = "green";
    }
  }
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>LOGIN<<<<<<<<<<<<<<<<<<<<<<<<

function clearYourInputs() {
  inputYourEmail.value = "";
  inputYourPassword.value = "";
}

loginBtn.addEventListener("click", () => {
  const userLogData = {
    yourEmail: inputYourEmail.value,
    yourPassword: inputYourPassword.value,
  };

  for (let i = 0; i < users.length; i++) {
    if (
      inputYourEmail.value === users[i].email &&
      inputYourPassword.value === users[i].password
    ) {
      requiredMessage.innerText = "You have been authorized !";
      requiredMessage.style.color = "green";
      clearYourInputs();
      break;
    } else if (
      inputYourEmail.value != users[i].email &&
      inputYourPassword.value === users[i].password
    ) {
      requiredMessage.innerText = "Please enter the correct email!";
      requiredMessage.style.color = "red";
      clearYourInputs();
      break;
    } else if (
      inputYourEmail.value === users[i].email &&
      inputYourPassword.value != users[i].password
    ) {
      requiredMessage.innerText =
        "Please enter the correct password or follow the link >>Recover password!";
      requiredMessage.style.color = "red";
      clearYourInputs();
      break;
    } else if (
      inputYourEmail.value != users[i].email &&
      inputYourPassword.value != users[i].password
    ) {
      requiredMessage.innerText =
        "Your data is not correct. Try again or register!";
      requiredMessage.style.color = "red";
      clearYourInputs();
    }
    console.log(userLogData);
  }
});
