document.addEventListener('DOMContentLoaded', function() {
    const formCadastro = document.getElementById('formCadastro');
    const listaUsuarios = document.getElementById('listaUsuarios');
    const limparCamposBtn = document.getElementById('limparCampos');
    const excluirTodosBtn = document.getElementById('excluirTodos');
    const pesquisarInput = document.getElementById('pesquisarInput');

    // Função para obter a data atual no formato "dd/mm/yyyy"
    function getDataAtual() {
        const data = new Date();
        const dia = data.getDate().toString().padStart(2, '0');
        const mes = (data.getMonth() + 1).toString().padStart(2, '0');
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    // Função para limpar os campos do formulário
    function limparCampos() {
        document.getElementById('nomeUsuario').value = '';
        document.getElementById('emailUsuario').value = '';
    }

    // Função para adicionar um novo usuário à lista e ao Local Storage
    function cadastrarUsuario(nome, email) {
        const dataAtual = getDataAtual();
        const novoUsuario = { nome, email, data: dataAtual };

        // Adicionar ao Local Storage
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Verificar se o e-mail já está cadastrado
        const emailJaCadastrado = usuarios.some(usuario => usuario.email === email);
        if (emailJaCadastrado) {
            alert('E-mail já cadastrado.');
            return;
        }

        usuarios.push(novoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        // Atualizar a lista na interface
        exibirUsuarios();
    }

    // Função para exibir os usuários na lista
    function exibirUsuarios() {
        listaUsuarios.innerHTML = ''; // Limpar a lista antes de atualizar

        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Filtrar usuários com base na pesquisa
        const termoPesquisa = pesquisarInput.value.trim().toLowerCase();
        usuarios = usuarios.filter(usuario =>
            usuario.nome.toLowerCase().includes(termoPesquisa) ||
            usuario.email.toLowerCase().includes(termoPesquisa)
        );

        usuarios.forEach(usuario => {
            const li = document.createElement('li');
            li.innerHTML = `${usuario.nome} - ${usuario.email} (${usuario.data}) `;
            
            // Botão para excluir o usuário
            const btnExcluir = document.createElement('button');
            btnExcluir.textContent = 'Excluir';
            btnExcluir.classList.add('meu-botao');
            btnExcluir.addEventListener('click', () => {
                // Remover do Local Storage
                usuarios = usuarios.filter(u => u.email !== usuario.email);
                localStorage.setItem('usuarios', JSON.stringify(usuarios));

                // Atualizar a lista na interface
                exibirUsuarios();
            });

            li.appendChild(btnExcluir);
            listaUsuarios.appendChild(li);
        });
    }

    // Evento de envio do formulário
    formCadastro.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar o comportamento padrão de enviar o formulário

        const nome = document.getElementById('nomeUsuario').value;
        const email = document.getElementById('emailUsuario').value;

        if (nome && email) {
            cadastrarUsuario(nome, email);
            limparCampos();
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    // Evento para limpar os campos do formulário
    limparCamposBtn.addEventListener('click', limparCampos);

    // Evento para excluir todos os itens da lista e do Local Storage
    excluirTodosBtn.addEventListener('click', function() {
        localStorage.removeItem('usuarios');
        exibirUsuarios(); // Atualizar a lista vazia na interface
    });

    // Evento de digitação no campo de pesquisa
    pesquisarInput.addEventListener('input', exibirUsuarios);

    // Exibir os usuários ao carregar a página
    exibirUsuarios();

    // Ouvir mudanças no localStorage e atualizar a lista em tempo real
    window.addEventListener('storage', function(event) {
        if (event.key === 'usuarios') {
            exibirUsuarios();
        }
    });
});
