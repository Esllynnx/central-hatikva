// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoonvuDg2GxZ7DYQnjw9sEINlsQN_p04U",
  authDomain: "central-hatikva.firebaseapp.com",
  projectId: "central-hatikva",
  storageBucket: "central-hatikva.firebasestorage.app",
  messagingSenderId: "331445537816",
  appId: "1:331445537816:web:886c15fe32586aebe0c76d",
  measurementId: "G-C04HB7D8D4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = firebase.auth();
const db = firebase.database();

const loginSection = document.getElementById('login-section');
const postSection = document.getElementById('post-section');
const postsContainer = document.getElementById('posts');

// Login
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            loginSection.style.display = 'none';
            postSection.style.display = 'block';
            loadPosts();
        })
        .catch(err => alert(err.message));
}

// Cadastro
function signup() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.createUserWithEmailAndPassword(email, password)
        .then(() => alert('Usuário cadastrado!'))
        .catch(err => alert(err.message));
}

// Logout
function logout() {
    auth.signOut().then(() => {
        loginSection.style.display = 'block';
        postSection.style.display = 'none';
    });
}

// Carregar posts
function loadPosts() {
    db.ref('posts').on('value', snapshot => {
        postsContainer.innerHTML = '';
        const posts = snapshot.val();
        for (const id in posts) {
            const post = posts[id];
            const postDiv = document.createElement('div');
            postDiv.className = 'post';
            postDiv.innerHTML = `<strong>${post.username}:</strong> <p>${post.content}</p>`;
            postsContainer.appendChild(postDiv);
        }
    });
}

// Criar post
function createPost() {
    const content = document.getElementById('content').value;
    const user = auth.currentUser;
    if (user) {
        db.ref('posts').push({
            username: user.email,
            content
        });
        document.getElementById('content').value = '';
    } else {
        alert('Você precisa estar logado!');
    }
}
