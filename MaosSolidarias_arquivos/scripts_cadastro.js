document.addEventListener('DOMContentLoaded', function() {
    const formCadastro = document.querySelector('form');

    // Função para obter a data atual no formato "dd/mm/yyyy"
    function getDataAtual() {
        const data = new Date();
        const dia = data.getDate().toString().padStart(2, '0');
        const mes = (data.getMonth() + 1).toString().padStart(2, '0');
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    formCadastro.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar o comportamento padrão de enviar o formulário

        const nome = document.getElementById('nomeUsuario').value;
        const email = document.getElementById('emailUsuario').value;

        if (nome && email) {
            let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

            // Verificar se o e-mail já está cadastrado
            const emailJaCadastrado = usuarios.some(usuario => usuario.email === email);
            if (emailJaCadastrado) {
                alert('E-mail já cadastrado.');
                return;
            }

            const dataAtual = getDataAtual();
            const novoUsuario = { nome, email, data: dataAtual };

            // Adicionar ao Local Storage
            usuarios.push(novoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            window.location.href = 'login.html'; // Redirecionar para login.html
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });
});
