console.log("bloody hell you are right !");

ShowBook();

class Book {
  constructor(name, book_name, auther, type) {
    this.name = name;
    this.book_name = book_name;
    this.auther = auther;
    this.type = type;
  }
}

// adding books to websites data
function ShowBook() {
  //console.log("running show book");
  let local_data = localStorage.getItem("Entry");
  let t_body = document.getElementById("tableBody");
  let uistring = "";
  if (local_data == null) {
    localObj = [];
  } else {
    localObj = JSON.parse(local_data);
  }
  localObj.forEach((element, index) => {
    // return_book(this.id) -> this will automatically pass the id of the current button to the function
    uistring += `<tr class="Student_data">
                   <td>${index + 1}</td>
                   <td>${element.name}</td>
                   <td class="searchBookName">${element.book_name}</td>
                   <td>${element.auther}</td>
                   <td>${element.type}</td>
                   <td>${element.issue_date}</td>
                   <td>
                      <div class="col-sm-10">
                        <button type="submit" id=${index} onClick=return_book(this.id) class="btn btn-danger">Return</button>
                      </div>
                   </td>
                  </tr>`;
  });
  if (localObj.length == 0) {
    // add class to this and enhance the look
    t_body.innerHTML = "<h2>NO BOOKS TO SHOW</h2>";
  } else {
    t_body.innerHTML = uistring;
  }
}

//fuction to create return book entry
function return_book(index) {
 // console.log("deleting an book of index", index);
  let bookObj;
  let local_data = localStorage.getItem("Entry");
  if (local_data == null) {
    bookObj = [];
  } else {
    bookObj = JSON.parse(local_data);
  }
  bookObj.splice(index, 1);
  localStorage.setItem("Entry", JSON.stringify(bookObj));
  ShowBook();
}

//function to search
function search_Book(value) {
  let searchVal = value.toLowerCase().trim();
  let bookNames = document.getElementsByClassName("searchBookName");

  Array.from(bookNames).forEach((book) => {
    let td = book;
    let bookName = td.innerHTML.toLowerCase().trim();
    let tr = td.parentElement;

    if (bookName.indexOf(searchVal) >= 0) {
      tr.style.display = "table-row";
    } else {
      tr.style.display = "none";
    }
  });
}

class Display {
  // checking validation given data is validate or not
  validate_form(book) {
    if (book.name.length<2 || book.auther.length<2 || book.book_name.length<2) {
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
    }, 4000);
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
    display.msg("success ! ", `your book entry is added successfully !`);
  } else {
    display.msg("danger ", ` Book entry failed check your input field `);
  }
  display.reset_form();
});
