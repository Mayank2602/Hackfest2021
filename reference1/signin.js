$("#loginBtn").show();
$("#logoutBtn").hide();
$('#profileBtn').hide();
$(".emailVerifyBox").hide();


var n;
var addTitle = document.getElementById("notetitle");
var addTxt = document.getElementById("notecontent");
const accountdetails = document.querySelector('.profileModalBody');
var user = firebase.auth().currentUser;
var addBtn = document.getElementById("addBtn");

//listener for auth state changes
firebase.auth().onAuthStateChanged(user => {
    console.log(user);
    t = user.email;
    // console.log(user.email);
    // console.log(currentUserEmail);
    if (user) {
        db.collection(user.email).get()
            .then(snapshot => {
                // console.log(snapshot.size)
                // n = snapshot.size
                // console.log(n);
            });
        setui(user);
        addBtn.addEventListener("click", function (e) {
            // console.log(user.email, addTitle.value, addTxt.value);
            db.collection(user.email).doc(addTitle.value).set({
                title: addTitle.value,
                text: addTxt.value
            })
            alert("Successfully added, Reload to see changes.");
            addTitle.value = "";
            addTxt.value = "";
        });

        const setupNotes = (data) => {
            var index = 0
            if (data.length) {
                let html = '';
                data.forEach(doc => {
                    const note = doc.data();
                    const div =
                        `
              <div class="notelistitem border" id="notecard${note.title}">
                <div class="d-flex" >
                  <button class="my-1 btn btn-default deleteBtn " type="submit" id="${note.title}" onclick="deleteNote(this.id)"><i class="fas fa-trash"></i></button>
                  <div id="note${note.title}" class="noteCardWritten" onclick="grabNotes(this.id.substr(4))">
                    <div class="notelisttitle" id="title${index}">${note.title}</div>
                    <div class="notelisttext" id="text${index}">${note.text} </div>
                  </div>
                  <button class="my-1 btn btn-default deleteBtn " type="submit" id="e${note.title}" onclick="editNote(this.id.substr(1))"><i class="fas fa-edit"></i></button>
                </div>
              </div> 
              `;
                    html += div;
                    index++;
                });
                noteList.innerHTML = html;
                //check if email is verified or not
                var a = user.emailVerified;
                // console.log(a);
                if (a == false) {
                    $(".main-page").hide();
                    $(".emailVerifyBox").show();
                }
                else {
                    $(".main-page").show();
                    $(".emailVerifyBox").hide();
                }
                $("#sendVerificationLinkBtn").click(function () {
                    var user = firebase.auth().currentUser;
                    user.sendEmailVerification().then(function () {
                        // Email sent.
                        alert("An email with the verification link has been sent to you");
                    }).catch(function (error) {
                        // An error happened.
                    });
                });
            } else {
                noteList.innerHTML =
                    ` 
            <div class="container-fluid text-center py-2 my-2">
            Empty here
            </div>
            `
            }
        }
        db.collection(user.email).get().then(snapshot => {
            setupNotes(snapshot.docs);
        });


    }
    else {
        setui();
    }
});
const noteList = document.querySelector(".notelist");
noteList.innerHTML =
    ` 
<div class="container-fluid text-center py-2 my-2">
Some free space here ...
</div>
`;

//change on user login logout
const setui = (user) => {
    if (user) {
        db.collection('users').doc(user.uid).get().then(doc => {
            // const html = `<div>Logged in as ${doc.data().name} </div><div>${user.email}</div>`;
            // accountdetails.innerHTML = html;
            $(".profileName").html(doc.data().name)
            $(".profileEmail").html(user.email)
        });
        $("#loginBtn").hide();
        $("#logoutBtn").show();
        $('#profileBtn').show();


    } else {
        accountdetails.innerHTML = '';
        $("#loginBtn").show();
        $("#logoutBtn").hide();
        $('#profileBtn').hide();
    }
}



//sign up
const registerForm = document.querySelector('#registerForm');
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //get user info
    var email = registerForm['userRegisterEmail'].value;
    var password = registerForm['userRegisterPassword'].value;
    // console.log(email, password);
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        $("#closeModal").click();
        return db.collection('users').doc(cred.user.uid).set({
            name: registerForm['userRegisterName'].value,
        }).catch(error => {   
            alert(error.message);
         });
    });
});


//sign in 
const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //get user info
    var email = loginForm['userLoginEmail'].value;
    var password = loginForm['userLoginPassword'].value;
    // console.log(email, password);
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        // console.log(cred.user);
        $("#closeModal").click();
        loginForm.reset();
    }).catch(error => {   
        alert(error.message);
     });
});


//logout
const logout = document.querySelector('#logoutBtn');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        // console.log("user logged out");
        // $("#closeModal").click();
        location.reload();
    }).catch(error => {   
        alert(error.message);
     });
})