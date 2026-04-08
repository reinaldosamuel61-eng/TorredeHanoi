document.addEventListener('DOMContentLoaded', () => {
    const numDisksInput = document.getElementById('numDisks');
    const btnSolve = document.getElementById('btnSolve');
    const btnReset = document.getElementById('btnReset');
    
    // Referências para a área de discos de cada torre
    const towers = {
        'A': document.querySelector('#tower-A .disks'),
        'B': document.querySelector('#tower-B .disks'),
        'C': document.querySelector('#tower-C .disks')
    };

    let moves = [];
    let isSolving = false;

    // Inicializa o jogo criando os discos na Torre A
    function initGame() {
        if (isSolving) return;
        
        // Limpa todas as torres
        towers['A'].innerHTML = '';
        towers['B'].innerHTML = '';
        towers['C'].innerHTML = '';
        moves = [];

        const numDisks = parseInt(numDisksInput.value);
        
        // Cria os discos (do maior para o menor)
        for (let i = numDisks; i >= 1; i--) {
            const disk = document.createElement('div');
            disk.classList.add('disk');
            // O tamanho do disco varia de acordo com o seu número
            disk.style.width = `${i * 15 + 20}px`; 
            // Uma cor ligeiramente diferente para cada tamanho
            disk.style.backgroundColor = `hsl(${i * 40}, 70%, 60%)`;
            disk.dataset.size = i;
            disk.id = `disk-${i}`;
            
            // Adiciona na torre A (como usamos column-reverse no CSS, a ordem de append visualmente faz sentido)
            towers['A'].appendChild(disk);
        }
    }

    // O Algoritmo Recursivo da Torre de Hanói
    function hanoi(n, source, auxiliary, target) {
        if (n === 1) {
            moves.push({ from: source, to: target });
            return;
        }
        hanoi(n - 1, source, target, auxiliary);
        moves.push({ from: source, to: target });
        hanoi(n - 1, auxiliary, source, target);
    }

    // Função para animar os movimentos calculados
    function playMoves() {
        if (moves.length === 0) {
            isSolving = false;
            btnSolve.disabled = false;
            btnReset.disabled = false;
            numDisksInput.disabled = false;
            return;
        }

        const move = moves.shift(); // Pega o primeiro movimento da fila
        const sourceTower = towers[move.from];
        const targetTower = towers[move.to];

        // Pega o disco do topo da torre de origem (último elemento do DOM daquela torre)
        const diskToMove = sourceTower.lastElementChild;
        
        if (diskToMove) {
            // Move o elemento HTML de uma torre para a outra
            targetTower.appendChild(diskToMove);
        }

        // Chama o próximo movimento após 500 milissegundos
        setTimeout(playMoves, 500);
    }

    // Eventos dos Botões
    btnSolve.addEventListener('click', () => {
        const numDisks = parseInt(numDisksInput.value);
        
        // Bloqueia os botões enquanto resolve
        isSolving = true;
        btnSolve.disabled = true;
        btnReset.disabled = true;
        numDisksInput.disabled = true;

        // Calcula os movimentos e guarda no array 'moves'
        hanoi(numDisks, 'A', 'B', 'C');
        
        // Inicia a animação visual
        playMoves();
    });

    btnReset.addEventListener('click', initGame);
    numDisksInput.addEventListener('change', initGame);

    // Inicia o jogo pela primeira vez
    initGame();
});