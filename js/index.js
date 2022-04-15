
// const {auth, createUserWithEmailAndPassword} = window;
// dom
const userName = document.getElementById('userName');
const email = document.getElementById('email');
const password = document.getElementById('password');

// authentication
const signup = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value).
    then((userCredential) => {
      const user = userCredential.user;
      updateProfile(user, {
        displayName: userName.value
      }).then(() => {
        sessionStorage.setItem('user', JSON.stringify(auth.currentUser));
        location.replace('../html/message.html')
      }).catch((error) => {
        alert(error)
      });
      mailUidPair(JSON.stringify(email.value), user.uid);
    }).catch((err)  => {
      alert(err);
    })
} 



const signin = () => {
  // console.log('tets', email, password)
  signInWithEmailAndPassword(auth, email.value, password.value).
    then((userCredential) => {
      const user = userCredential.user;
      sessionStorage.setItem('user', JSON.stringify(user));
      location.replace('../html/message.html')
    }).catch((err) => {
      alert(err)
    })
}

const mailUidPair = (mail, uid) => {
  console.log(mail, uid)
  set(ref(db, 'mailUidPair/' + mail), {
    email: uid
  });
}

const signout = () => {
  auth.signOut();
  sessionStorage.setItem('user', null);
  location.replace('../html/login.html');
}

// message 

  console.log("test = ", )
  const dpName = JSON.parse(sessionStorage.getItem('user')).displayName;
  userName.innerText = dpName;
