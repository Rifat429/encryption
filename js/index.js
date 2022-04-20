
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
        // mailUidPair(JSON.stringify(email.value), user.uid);
      }).catch((error) => {
        alert(error)
      });
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
  console.log(mail)
  const mail_aes = CryptoJS.AES.encrypt(mail, uid).toString();
  console.log(mail_aes);

  set(ref(db, 'mailUidPair/' + mail_aes), {
    user: uid
  });
}

const signout = () => {
  auth.signOut();
  sessionStorage.setItem('user', null);
  location.replace('../html/login.html');
}

// message 

const dpName = JSON.parse(sessionStorage.getItem('user')).displayName;
userName.innerText = dpName;
const myMail = JSON.parse(sessionStorage.user).email;
let dataList = [];


const encrypt = (str, n) => {
  console.log("encrypt level - ", n, str)
  if(!n) return str;
  const data = CryptoJS.AES.encrypt(str, myMail).toString();
  return encrypt(data, n-1)
}

const decrypt = (str, n, key) => {
  console.log("decrypt level - ", n, str)
  if(!n) return str;
  const data = CryptoJS.AES.decrypt(str, key).toString(CryptoJS.enc.Utf8);
  return decrypt(data, n-1, key)
}

const sendMessage = (message, prev) => {

  const encMsg = encrypt(message, 3);
  const data = prev ?  [...prev,  {
    userName: dpName, 
    message: encMsg,
    email: myMail
  }] : [{
    userName: dpName, 
    message: encMsg, 
    email: myMail
  }]
  set(ref(db, 'groups/'+'dummy'), data)
}

const getList = async () => {
  const dbref = ref(db);
  try{
    const list = await get(child(dbref, 'groups/'+'dummy'));
    const data = list.val();
    return data
  }catch(err){
    console.error(err);
  }
}









// message dom
const form = document.querySelector('form');
const elMessageText = document.getElementById('message')
const elMessageList = document.getElementsByClassName('message-list')[0];


// 
const elMessageContainer = document.createElement('div');
const elAvatar = document.createElement('img');
const elMessage = document.createElement('div');
const elMsgAndAvatar = document.createElement('div');
const elName = document.createElement('div');


// avatar element
elAvatar.classList.add('user-logo');
elAvatar.classList.add('chip');
elAvatar.src = "https://cdn.onlinewebfonts.com/svg/img_56724.png";
elAvatar.alt = "person icon";

// message element
elMessage.classList.add('message')

elMsgAndAvatar.classList.add('msg-avatar')
elMsgAndAvatar.appendChild(elAvatar)
elMsgAndAvatar.appendChild(elMessage)

// message container element
elMessageContainer.classList.add('message-container');
elName.classList.add('name-container');
elMessageContainer.appendChild(elName);
elMessageContainer.appendChild(elMsgAndAvatar)


const loadMsg = (msgList) => {
  msgList.map((msg) =>{
    if(msg.email === myMail)elMessageContainer.classList.add('self');
    else elMessageContainer.classList.remove('self');
    // console.log(msg.message)
    elName.innerText = msg.userName;
    const dec = decrypt(msg.message,3, msg.email)
    elMessage.innerText = dec;
    elMessageList.appendChild(elMessageContainer.cloneNode(true));
  })
}


document.addEventListener('DOMContentLoaded', async () => {
  dataList = await getList();
  if(!dataList)return;
  console.log()
  loadMsg(dataList)
})





form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if(elMessageText.value==='')return;
  const list = await getList();
  dataList = list
  sendMessage(elMessageText.value, list);
  elName.innerText = dpName;
  elMessage.innerText = elMessageText.value;
  // elMessageContainer.classList.add('self')
  elMessageList.appendChild(elMessageContainer.cloneNode(true))
  elMessageText.value = '';
})

