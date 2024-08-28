const titulo = document.querySelector("#titulo");
const autor = document.querySelector("#autor");
const ano = document.querySelector("#ano");
const genero = document.querySelector("#genero");

const formulario = document.querySelector("#formulario");

const todos_os_livros = document.querySelector("#todos_os_livros");

const busca = document.querySelector("#busca"); // Seleciona o campo de busca

const lista_de_livros = JSON.parse(localStorage.getItem("biblioteca")) || [];

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const objeto_livro_criado = {
    titulo: titulo.value,
    autor: autor.value,
    ano: Number(ano.value),
    genero: genero.value,
  };

  lista_de_livros.push(objeto_livro_criado);

  localStorage.setItem("biblioteca", JSON.stringify(lista_de_livros));

  formulario.reset();
  titulo.focus();

  montar_livros_na_tela();
});


busca.addEventListener("input", montar_livros_na_tela); 
function montar_livros_na_tela() {

  todos_os_livros.innerHTML = ""; 

  const termo_de_busca = busca.value.toLowerCase();

  const livros_filtrados = lista_de_livros.filter(livro => 
    livro.titulo.toLowerCase().includes(termo_de_busca) ||
    livro.autor.toLowerCase().includes(termo_de_busca)
  );


  if (livros_filtrados.length === 0) {
    todos_os_livros.innerHTML = "<p>Nenhum livro encontrado</p>";
    return;
  }

  livros_filtrados.forEach((livro_da_vez, index) => {
    const novo_card = document.createElement("div");
    novo_card.className = "card"; 
    const novo_titulo = document.createElement("h2");
    novo_titulo.textContent = livro_da_vez.titulo;

    const novo_autor = document.createElement("p");
    novo_autor.textContent = livro_da_vez.autor;

    const novo_ano = document.createElement("p");
    novo_ano.textContent = livro_da_vez.ano;

    const novo_genero = document.createElement("p");
    novo_genero.textContent = livro_da_vez.genero;

    novo_card.append(novo_titulo, novo_autor, novo_ano, novo_genero);
    todos_os_livros.appendChild(novo_card);
  });
}

  localStorage.setItem("biblioteca", JSON.stringify(lista_de_livros)); // Atualiza o localStorage
  montar_livros_na_tela(); // Recarrega a lista de livros na tela

montar_livros_na_tela();