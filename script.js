let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menu.onclick = () => {
	menu.classList.toggle('bx-x');
	navlist.classList.toggle('open');
};

window.onscroll = () => {
	menu.classList.remove('bx-x');
	navlist.classList.remove('open');
};

const list = document.querySelectorAll('[name="nav-a"]')

function activeLink(){
	list.forEach((item) =>
	item.classList.remove('active'))
	this.classList.add('active')
}

list.forEach((item) =>
item.addEventListener('click', activeLink))

function toggleMode(){
  const html = document.documentElement

  html.classList.toggle('light')
}
let selectedRating = 0;
        
// Adiciona evento de clique para selecionar estrelas
document.querySelectorAll('.star').forEach(star => {
	star.addEventListener('click', function() {
		selectedRating = this.getAttribute('data-value');
		document.querySelectorAll('.star').forEach(s => s.classList.remove('selected'));
		this.classList.add('selected');
	});
});

document.addEventListener("DOMContentLoaded", function() {
  const stars = document.querySelectorAll('.star');
  let ratingValue = 0; // Variável para armazenar a avaliação

  // Função para selecionar estrelas
  stars.forEach(star => {
    star.addEventListener('click', function() {
      ratingValue = this.getAttribute('data-value'); // Obtém o valor da estrela clicada
      stars.forEach(s => s.classList.remove('selected')); // Remove seleção de todas as estrelas
      for (let i = 0; i < ratingValue; i++) {
        stars[i].classList.add('selected'); // Adiciona a classe de seleção até a estrela clicada
      }
    });
  });

  // Função para adicionar o comentário
  window.addComment = function() {
    const nameInput = document.getElementById("name");
    const commentInput = document.getElementById("comment");

    if (!nameInput || !commentInput) {
      console.error("Elementos 'name' ou 'comment' não encontrados.");
      return;
    }

    const name = nameInput.value.trim();
    const comment = commentInput.value.trim();

    if (name === "" || comment === "") {
      alert("Por favor, preencha seu nome e comentário.");
    } else {
      const commentObject = {
        name: name,
        comment: comment,
        rating: ratingValue,
        id: Date.now() // Usando o timestamp como ID único para cada comentário
      };

      // Recupera os comentários armazenados no localStorage
      let comments = JSON.parse(localStorage.getItem("comments")) || [];

      // Adiciona o novo comentário à lista
      comments.push(commentObject);

      // Armazena os comentários no localStorage
      localStorage.setItem("comments", JSON.stringify(comments));

      // Exibe os comentários
      displayComments();

      // Limpa os campos após o envio
      nameInput.value = '';
      commentInput.value = '';
      ratingValue = 0; // Reseta a avaliação
      stars.forEach(star => star.classList.remove('selected')); // Reseta as estrelas
    }
  };

  // Função para exibir os comentários
  function displayComments() {
    const commentsContainer = document.getElementById("comments");
    commentsContainer.innerHTML = ""; // Limpa os comentários existentes

    // Recupera os comentários armazenados
    let comments = JSON.parse(localStorage.getItem("comments")) || [];

    // Ordena os comentários por ID (timestamp) para garantir que os mais recentes apareçam por último
    comments.sort((a, b) => a.id - b.id);

    // Adiciona os comentários na lista
    comments.forEach((comment, index) => {
      const commentElement = document.createElement("li");
      commentElement.innerHTML = `
        <strong>${comment.name}:</strong> 
        <p>${comment.comment}</p> 
        <p>Avaliação: ${comment.rating} estrela(s)</p>
      `;
      commentsContainer.appendChild(commentElement);
    });
  }

  // Carrega os comentários quando a página é carregada
  displayComments();
});
document.getElementById('comment-form').addEventListener('submit', function(event) {
	event.preventDefault();
  
	const fullName = document.getElementById('full-name').value;
	const commentText = document.getElementById('comment').value;
	const rating = document.querySelector('input[name="rating"]:checked') ? document.querySelector('input[name="rating"]:checked').value : '0';
  
	if (fullName && commentText && rating) {
	  const commentList = document.getElementById('comments-list');
  
	  const newComment = document.createElement('div');
	  newComment.classList.add('comment-item');
	  
	  newComment.innerHTML = `
		<p><strong>${fullName}</strong> comentou:</p>
		<p>${commentText}</p>
		<div class="rating">${'★'.repeat(rating)}</div>
	  `;
  
	  commentList.appendChild(newComment);
	  
	  // Reset the form after submission
	  document.getElementById('full-name').value = '';
	  document.getElementById('comment').value = '';
	  document.querySelector('input[name="rating"]:checked').checked = false;
	}
  });
  document.addEventListener('DOMContentLoaded', function() {
	// Todo o seu código de JS aqui
	carregarComentarios();
  
	// Lógica para clicar nas estrelas e armazenar a avaliação
	document.querySelectorAll('#avaliacao span').forEach(star => {
	  star.addEventListener('click', function() {
		const value = this.getAttribute('data-value');
		document.querySelectorAll('#avaliacao span').forEach(star => {
		  star.classList.remove('selected');
		});
		this.classList.add('selected');
		document.getElementById('avaliacao').setAttribute('data-selected', value);
	  });
	});
  
	// Ouvir o envio do formulário e salvar o comentário
	document.getElementById('formComentario').addEventListener('submit', function(event) {
	  event.preventDefault();
	  
	  const nome = document.getElementById('nome').value;
	  const comentario = document.getElementById('comentario').value;
	  const avaliacao = document.getElementById('avaliacao').getAttribute('data-selected') || 0;
  
	  if (avaliacao == 0) {
		alert("Por favor, selecione uma avaliação.");
		return;
	  }
  
	  // Salvar no LocalStorage
	  salvarComentario(nome, comentario, avaliacao);
  
	  // Carregar os comentários atualizados
	  carregarComentarios();
  
	  // Limpar o formulário
	  document.getElementById('formComentario').reset();
	  document.querySelectorAll('#avaliacao span').forEach(star => {
		star.classList.remove('selected');
	  });
	  document.getElementById('avaliacao').removeAttribute('data-selected');
	});
  });
  
	