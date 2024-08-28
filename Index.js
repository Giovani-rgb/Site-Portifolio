import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, collection, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyByW5jI_AI0iGZkKeM_DHCTdkGGN-taMNg",
  authDomain: "portifolio-8074b.firebaseapp.com",
  projectId: "portifolio-8074b",
  storageBucket: "portifolio-8074b.appspot.com",
  messagingSenderId: "604342540423",
  appId: "1:604342540423:web:d0c508924da4959935c022",
  measurementId: "G-S63XB3BTVB"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');

  form.addEventListener('submit', async function(event) {
    event.preventDefault(); // Evitar o envio padrão do formulário

    // Validação dos campos
    let valid = true;

    // Nome
    const name = form.querySelector('#name');
    if (!name.value.trim()) {
      name.classList.add('is-invalid');
      valid = false;
    } else {
      name.classList.remove('is-invalid');
    }

    // E-mail
    const email = form.querySelector('#email');
    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      email.classList.add('is-invalid');
      valid = false;
    } else {
      email.classList.remove('is-invalid');
    }

    // Assunto
    const subject = form.querySelector('#subject');
    if (!subject.value.trim()) {
      subject.classList.add('is-invalid');
      valid = false;
    } else {
      subject.classList.remove('is-invalid');
    }

    // Mensagem
    const message = form.querySelector('#message');
    if (!message.value.trim()) {
      message.classList.add('is-invalid');
      valid = false;
    } else {
      message.classList.remove('is-invalid');
    }

    // Se todos os campos forem válidos, envie os dados
    if (valid) {
      const data = {
        name: name.value,
        email: email.value,
        subject: subject.value,
        message: message.value,
        timestamp: Timestamp.fromDate(new Date()) // Adiciona a data e hora atual
      };

      try {
        await addDoc(collection(db, 'contatos'), data);
        document.getElementById('feedback').innerHTML = '<div class="alert alert-success">Mensagem enviada com sucesso!</div>';
        form.reset(); // Limpa o formulário após envio
      } catch (error) {
        document.getElementById('feedback').innerHTML = '<div class="alert alert-danger">Erro ao enviar a mensagem. Tente novamente mais tarde.</div>';
        console.error('Erro:', error);
      }
    }
  });
});
