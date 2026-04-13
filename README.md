🗼 Torre de Hanói - Visualizador de Algoritmo

Um projeto simples, interativo e visual para demonstrar a resolução do clássico quebra-cabeça matemático da Torre de Hanói, construído puramente com HTML, CSS e Vanilla JavaScript.

📋 Sobre o Projeto

A Torre de Hanói é um quebra-cabeça que consiste em três pinos e um número de discos de tamanhos diferentes, que podem deslizar para qualquer pino. O objetivo do jogo é mover toda a pilha para outro pino, obedecendo às seguintes regras simples:

Apenas um disco pode ser movido de cada vez.

Cada movimento consiste em pegar o disco superior de uma das pilhas e colocá-lo no topo de outra pilha.

Nenhum disco pode ser colocado sobre um disco menor.

Este projeto utiliza um algoritmo recursivo em JavaScript para calcular todos os movimentos necessários e anima a solução passo a passo diretamente no navegador.

✨ Funcionalidades

Controle de Discos: Permite ao utilizador escolher entre 3 a 7 discos para a simulação.

Resolução Automática: Calcula e executa a solução perfeita automaticamente de forma visual.

Contador de Passos: Acompanha em tempo real a quantidade de movimentos realizados. O número mínimo de movimentos para resolver a Torre de Hanói é de $2^n - 1$, onde $n$ é o número de discos.

Design Minimalista: Interface limpa focada no funcionamento do algoritmo.

Zero Dependências: Funciona inteiramente no navegador sem a necessidade de instalar bibliotecas, frameworks ou servidores locais.

🚀 Como Executar

Como é um projeto puramente front-end (HTML, CSS e JS), a execução é imediata:

Faça o clone deste repositório:

git clone [https://github.com/seu-usuario/torre-de-hanoi.git](https://github.com/seu-usuario/torre-de-hanoi.git)


Navegue até a pasta do projeto.

Dê um duplo clique no ficheiro index.html para abri-lo no seu navegador web preferido (Chrome, Firefox, Safari, Edge, etc.).

Alternativa: Pode testar o projeto online através do GitHub Pages se ativar essa funcionalidade no seu repositório.

🧠 Como funciona a Lógica (Recursão)

O "segredo" para resolver a Torre de Hanói no código está na função recursiva. O algoritmo segue a seguinte lógica base para $n$ discos:

Mover $n-1$ discos do pino de Origem para o pino Auxiliar.

Mover o disco $n$ (o maior) do pino de Origem para o pino de Destino.

Mover os $n-1$ discos do pino Auxiliar para o pino de Destino.

No código, isso traduz-se de forma muito elegante:

function hanoi(n, source, auxiliary, target) {
    if (n === 1) {
        moves.push({ from: source, to: target });
        return;
    }
    hanoi(n - 1, source, target, auxiliary); // Passo 1
    moves.push({ from: source, to: target }); // Passo 2
    hanoi(n - 1, auxiliary, source, target); // Passo 3
}


🛠️ Tecnologias Utilizadas

HTML5: Estruturação semântica.

CSS3: Estilização, layout em Flexbox e transições suaves (transition: transform 0.3s ease).

JavaScript (ES6): Manipulação da DOM (appendChild), controle de eventos, lógica recursiva e uso de setTimeout para o loop de animação.
