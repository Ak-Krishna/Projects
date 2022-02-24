console.log("bloody hell you are right !");
ShowBook();
function Book(name, book_name, auther, type) {
  this.name = name;
  this.book_name = book_name;
  this.auther = auther;
  this.type = type;
}
// adding books to websites data

function ShowBook() {
  let local_data = localStorage.getItem("Entry");
  let t_body = document.getElementById("tableBody");
  let uistring = "";
  if (local_data == null) {
    localObj = [];
  } else {
    localObj = JSON.parse(local_data);
  }
  localObj.forEach((element, index) => {
    uistring += `<tr class="Student_data">
                   <td >${index + 1}</td>
                   <td >${element.name}</td>
                   <td>${element.book_name}</td>
                   <td>${element.auther}</td>
                   <td>${element.type}</td>
                   <td>${element.issue_date}</td>
                   <td>
                   <div class="col-sm-10">
                    <button type="submit" id="retbtn" class="btn btn-danger">Return</button>
                  </div>
                       </td>
                       </tr>`;
  });
  t_body.innerHTML = uistring;
}

//fuction to create return book entry
function return_book(index){
  let local_data = localStorage.getItem("Entry");
  if (local_data == null) {
    localObj = [];
  } else {
    localObj = JSON.parse(local_data);
  }
  localObj.splice(index,1);
  localStorage.setItem("Entry", JSON.stringify(localObj));
  ShowBook();
}
//function to search exact book entry

function searchBook() {
  console.log("your searching something!");
  let search_text = document.getElementById("searchTxt");
  let input = search_text.value.toLowerCase();
  let Student_data = document.getElementById("tableBody");
  console.log(Student_data);
  // Array.from(Student_data).forEach(element => {
  //   console.log(Student_data);
  //   let name_txt = element.getElementsByTagName("td")[0].innerText;
  //   if(name_txt.includes(input)){
  //     element.style.display="block";
  //   }
  //   else{
  //     element.style.display="none"
  //   }
  // });
}
// creating one function to clear and validate given data

class Display {
  // checking validation given data is validate or not
  validate_form(book) {
    if (book.name == "" && book.auther == "") {
      return false;
    } else {
      return true;
    }
  }
  //reset form after successfully pass the entry
  reset_form() {
    let library_Form = document.getElementById("libraryForm");
    library_Form.reset();
  }
  msg(type, mesage) {
    let message = document.getElementById("message");
    let bold_msg;
    if (type === "success") {
      bold_msg = type;
    } else if (type === "error") {
      bold_msg = type;
    }
    message.innerHTML = `<div class="alert alert-${type}" role="alert">
                         ${type}, ${mesage}
                          </div>`;
    setTimeout(() => {
      message.innerHTML = "";
    }, 3000);
  }
}

let addbtn = document.getElementById("addbtn");
addbtn.addEventListener("click", function (e) {
  e.preventDefault();
  let name = document.getElementById("S_name").value;
  let book_name = document.getElementById("bookName").value;
  let auther = document.getElementById("author").value;
  let date = new Date();
  let buss = document.getElementById("Bussiness");
  let bio = document.getElementById("Biography");
  let self = document.getElementById("self_mot");
  let local_data = localStorage.getItem("Entry");
  let type;
  if (buss.checked) {
    type = buss.value;
  } else if (bio.checked) {
    type = bio.value;
  } else if (self.checked) {
    type = self.value;
  }
  // setting up date and time for update
  var month = date.getUTCMonth() + 1; //months from 1-12
  var day = date.getUTCDate();
  var year = date.getUTCFullYear();
  let newdate = year + "/" + month + "/" + day;

  // Creating a constructor object to access method
  let book = new Book(name, book_name, auther, type);
  let display = new Display(book);
  if (display.validate_form(book)) {
    //setting Local Storage data
    if (local_data == null) {
      localObj = [];
    } else {
      localObj = JSON.parse(local_data);
    }
    Student_data = {
      name: name,
      book_name: book_name,
      auther: auther,
      type: type,
      issue_date: newdate,
    };
    localObj.push(Student_data);
    localStorage.setItem("Entry", JSON.stringify(localObj));
    // running showbook function
    ShowBook();
    // showing message to inserting successfully data
    display.msg("success", `your book entry is added successfully !`);
  } else {
    display.msg("danger", `something wents wrong check your book entry`);
  }
  display.reset_form();
});

//creating a search book entry function
let search = document.getElementById("searchTxt");
search.addEventListener("click", function (e) {
  e.preventDefault();
  searchBook();
});

//creating a return book entry function
let return_btn = document.getElementById("retbtn");
return_btn.addEventListener("click", function (e){
  e.preventDefault();
  return_book()
});