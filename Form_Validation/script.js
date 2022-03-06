console.log("Bloody hell you are here!..");
let name1 = document.getElementById("name");
let email = document.getElementById("email");
let uname = document.getElementById("username");
let pass = document.getElementById("pass");
let cpass = document.getElementById("cpass");
let validname = false;
let validemail = false;
let validuname = false;
let validpass = false;
let validcpass = false;
// Validation for name
name1.addEventListener("blur", () => {
  let regex = /(([^0-9])([a-zA-Z]{3,9}$))/;
  let str = name1.value;
  // console.log(regex,str);
  if (regex.test(str)) {
    name1.classList.remove("is-invalid");
    validname = true;
  } else {
    name1.classList.add("is-invalid");
    validname = false;
  }
});

email.addEventListener("blur", () => {
  let regex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
  let str = email.value;
  // console.log(regex,str);
  if (regex.test(str)) {
    email.classList.remove("is-invalid");
    validemail = true;
  } else {
    email.classList.add("is-invalid");
    validemail = false;
  }
});
uname.addEventListener("blur", () => {
  let regex = /([_a-zA-Z]){2,10}$/;
  let str = uname.value;
  // console.log(regex,str);
  if (regex.test(str)) {
    uname.classList.remove("is-invalid");
    validuname = true;
  } else {
    uname.classList.add("is-invalid");
    validuname = false;
  }
});
pass.addEventListener("blur", () => {
  let regex = /^([_\-\.0-9a-zA-Z]+)([_\-\.0-9a-zA-Z]+){3,14}$/;
  let str = pass.value;
  // console.log(regex,str);
  if (regex.test(str)) {
    pass.classList.remove("is-invalid");
    validpass = true;
  } else {
    pass.classList.add("is-invalid");
    validpass = false;
  }
});
cpass.addEventListener("blur", () => {
  let regex = pass.value;
  let str = cpass.value;
  // console.log(regex,str);
  if (str == regex) {
    cpass.classList.remove("is-invalid");
    validcpass = true;
  } else {
    cpass.classList.add("is-invalid");
    validcpass = false;
  }
});
function msg(type, message) {
  let Message = document.getElementById("msg");
  let html = ` <div class="alert alert-${type} alert-dismissible fade show" role="alert">
          <strong>${type}!..</strong>${message}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
     </div>`;
  Message.innerHTML = html;
  setTimeout(() => {
    Message.innerHTML = "";
  }, 3000);
}
function reset() {
  let form_data = document.getElementById("form");
  form_data.reset();
}
class User {
  constructor(nameF, emailF, userF, passF) {
    this.name = nameF;
    this.email = emailF;
    this.user = userF;
    this.pass = passF;
  }
}
// Setting localStorage

function addUserToLocalStorage(user) {
  let LocalData = localStorage.getItem("User");
  if (LocalData == null) {
    userObj = [];
  } else if (JSON.parse(LocalData).length > 1) {
    alert("Admin Already registered you can't register as a admin");
    reset();
  } else {
    userObj = JSON.parse(LocalData);
  }
  userObj.push(user);
  localStorage.setItem("User", JSON.stringify(userObj));
}
//Here is event listener on submit button

let submitBtn = document.getElementById("SubBtn");
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let namef = name1.value;
  let emailf = email.value;
  let userf = uname.value;
  let passf = pass.value;
  let user = new User(namef, emailf, userf, passf);

  if (validname && validemail && validuname && validpass && validcpass) {
    msg("success", " Your Form Have Been Submitted Successfully!");
    //function run for local storage
    addUserToLocalStorage(user);
    setTimeout(() => {
      reset();
    }, 1000);
  } else {
    msg("danger", " Your form Has not Submitted!");
  }
});

async function fetchApi() {
  console.log("You have clicked");
  // let data = document.getElementById("fetch");
  const res = await fetch('https://fakestoreapi.com/products');
  const data=await res.json()
  data.forEach(element => {
    console.log(element.id, element.category);
  });
}

// fetch Api for booklist
let fetchBtn = document.getElementById("fetchbtn");
fetchBtn.addEventListener("click", fetchApi);