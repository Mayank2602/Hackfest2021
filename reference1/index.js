console.log("welcome to notera");
// showNotes();
// If user add note add it to local storage
// var addBtn = document.getElementById("addBtn");
// when user clicks save button
// addBtn.addEventListener("click", function (e) 
// {
//   //takes content out of text area and store them in variable
//    var addTxt = document.getElementById("notecontent");
//    var addTitle = document.getElementById("notetitle");
//    var notes = localStorage.getItem("savedNotes");
//    //makes a array of objects if notes are zero
//    if (notes == null) 
//    {
//     notesObj = [];
//    } 
//    // if notes are not zero 
//    else 
//    {
//     notesObj = JSON.parse(notes);
//    }

//    let myObj = {
//     title: addTitle.value,
//     text: addTxt.value
//   }
//   //pushing input to local storage
//   notesObj.push(myObj);
//   localStorage.setItem("savedNotes", JSON.stringify(notesObj));
//   //remove previous note inputs
//   addTxt.value = "";
//   addTitle.value = "";
//   // console.log(notesObj);
//   window.location.reload();
//   //input will reflect to note list
//   showNotes();
// });
// function to show elements from local storage
// function showNotes() 
// {
//   var notes = localStorage.getItem("savedNotes");
//   if (notes == null) 
//   {
//     notesObj = [];
//   } 
//   else 
//   {
//     notesObj = JSON.parse(notes);
//   }
//   var html = "";
//   notesObj.forEach(function (element, index) 
//   {
//     html += `
//           <div class="notelistitem border">
//           <div class="d-flex">
//           <button class="my-1 btn btn-default deleteBtn " type="submit" id="${index}" onclick="deleteNote(this.id)">
//             <i class="fas fa-trash"></i>
//           </button>
//           <div id="note${index}" class="noteCardWritten" onclick="grabNotes(this.id.substr(id.length - 1))">
//           <div class="notelisttitle" id="title${index}">${element.title}</div>
//           <div class="notelisttext" id="text${index}">${element.text} </div>
//           </div>
//           <button class="my-1 btn btn-default deleteBtn " type="submit" id="e${index}" onclick="editNote(this.id.substr(id.length - 1))">
//             <i class="fas fa-edit"></i>
//           </button>
//           </div>
//           </div>
//           `;
//     var notesElm = document.getElementById("notes");
//     if (notes.length != 0)
//     {
//       notesElm.innerHTML = html;
//     }else{
//       showNotes();
//     }
//   });
// }
// function to delete notes
// function deleteNote(index) 
// {
//   var notes = localStorage.getItem("savedNotes");
//   if (notes == null) 
//   {
//     notesObj = [];
//   } 
//   else 
//   {
//     notesObj = JSON.parse(notes);
//   }
//   notesObj.splice(index, 1);
//   localStorage.setItem("savedNotes", JSON.stringify(notesObj));
//   showNotes();
// }


let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value;
  let notelistitems = document.getElementsByClassName("notelistitem");
  Array.from(notelistitems).forEach(function (element) {
    let cardTxt = element.getElementsByClassName("notelisttext")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    }
    else {
      element.style.display = "none";
    }
  });
});
//when click on any note in list then this function runs
function grabNotes(index) {
  parent = document.getElementById("note" + index)
  childrenTitle = parent.children[0];
  childrenText = parent.children[1];
  document.getElementById("disableViewBtn").classList.remove("disabled");
  // console.log(` text${index} is title `+ childrenTitle.innerHTML);
  // console.log(` text${index} is text `+ childrenText.innerHTML);
  $("#notetitle").html(childrenTitle.innerHTML);
  $("#notecontent").html(childrenText.innerHTML);
  $("#disableViewBtn").css("display", "list-item");
  $("#addBtn").css("display", "none");
  $("#notetitle").prop("disabled", "true");
  $("#notecontent").prop("disabled", "true");
}
//when we click cross button this runs
function disableView() {
  $("#notetitle").html("");
  $("#notecontent").html("");
  $("#disableViewBtn").css("display", "none");
  $("#addBtn").css("display", "list-item");
  $("#notetitle").removeAttr("disabled");
  $("#notecontent").removeAttr("disabled");
  // window.location.reload();
}
function deleteNote(b) {
  if (firebase.auth().currentUser !== null) {
    var t = firebase.auth().currentUser.email;
    // console.log(t,b);
    db.collection(t).doc(b).delete().then(() => {
      var l = "notecard" + b;
      document.getElementById(l).style.display = "none";
      // alert("Reload to see changes");
      console.log('Document successfully deleted!');
    }).catch(error => {   
      alert(error.message);
   });
  }

}

function editNote(index) {
  console.log(index)
  parent = document.getElementById("note" + index)
  childrenTitle = parent.children[0];
  childrenText = parent.children[1];
  document.getElementById("disableViewBtn").classList.remove("disabled");
  $("#notetitle").html(childrenTitle.innerHTML);
  $("#notecontent").html(childrenText.innerHTML);
  $("#notetitle").removeAttr("disabled");
  $("#notecontent").removeAttr("disabled");
  deleteNote(index);
}

function toggleResetPswd(e) {
  e.preventDefault();
  $('#logreg-forms .form-signin').toggle() // display:block or none
  $('#logreg-forms .form-reset').toggle() // display:block or none
}

function toggleSignUp(e) {
  e.preventDefault();
  $('#logreg-forms .form-signin').toggle(); // display:block or none
  $('#logreg-forms .form-signup').toggle(); // display:block or none
}

$(() => {
  // Login Register Form
  $('#logreg-forms #forgot_pswd').click(toggleResetPswd);
  $('#logreg-forms #cancel_reset').click(toggleResetPswd);
  $('#logreg-forms #btn-signup').click(toggleSignUp);
  $('#logreg-forms #cancel_signup').click(toggleSignUp);
})