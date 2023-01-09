// Initial Data
let currentQuestion = 0; //questao atual
let correctAnswers = 0; //contagem de quantas questoes acertou
showQuestion(); //mostra primeira pergunta

// Events
document.querySelector('.scoreArea button').addEventListener('click', resetEvent); //botao de reset

// Functions
function showQuestion() { //funcao que mostra a questao atual
    if(questions[currentQuestion]) { //se existir questao faça
        let q = questions[currentQuestion]; // pega a questao atual

        let pct = Math.floor((currentQuestion / questions.length) * 100); //porcentagem de quantos % ja vai
        document.querySelector('.progress--bar').style.width = `${pct}%`; //coloca no visual da barra de porcentagem

        document.querySelector('.scoreArea').style.display = 'none'; //score none enquanto tiver questao
        document.querySelector('.questionArea').style.display = 'block'; //question block enquanto tiver questao

        document.querySelector('.question').innerHTML = '<span>Pergunta:</span> ' + q.question; //mostrar pergunta
        let optionsHtml = ''; // variavel que coloca as respostas da pergunta
        for(let i in q.options) {
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span> ${q.options[i]}</div>`; //acresenta todas as respostas de x pergunta em optionsHTML
        }
        document.querySelector('.options').innerHTML = optionsHtml; //coloca no HTML

        document.querySelectorAll('.options .option').forEach(item => { //para cada div que existir dentro de options add um click 
            item.addEventListener('click', optionClickEvent); //quando clicar acione a tal funcao
        });
    } else { //caso nao exista mais questao acabe e mostre o score
        finishQuiz(); //com essa funcao
    }
}

function optionClickEvent(e) { //funcao que pega qual questao foi clicada
    let clickedOption = parseInt(e.target.getAttribute('data-op')); //passe para inteiro o atributo pego dentro do elemento clicado com nome data-op

    if(questions[currentQuestion].answer === clickedOption) { //se a opcao clicado for igual a resposta certa
        correctAnswers++; //resposta correta recebe ++
    }

    currentQuestion++; //para pra proxima pergunta
    showQuestion(); //mostra proxima pergunta
}

function finishQuiz() { //funcao de quando acabar as questoes
    let points = Math.floor((correctAnswers / questions.length) * 100); // percentual vai pra 100

    if(points <= 30) { //se acertou menos de 30
        document.querySelector('.scoreText1').innerHTML = 'Que porra é essa?';
        document.querySelector('.scorePct').style.color = '#FF0000';
        document.querySelector('.scoreArea img').src = "triste.png";
    } else if(points > 30 && points < 70) { //se acertou no meio
        document.querySelector('.scoreText1').innerHTML = 'Foi mais ou menos!';
        document.querySelector('.scorePct').style.color = '#FFFF00';
        document.querySelector('.scoreArea img').src = "mais ou menos.png";
    } else if(points >= 70) { //se acertou mais de 70%
        document.querySelector('.scoreText1').innerHTML = 'Aewwwwww';
        document.querySelector('.scorePct').style.color = '#00FF00';
        document.querySelector('.scoreArea img').src = "feliz.png";
    }

    document.querySelector('.scorePct').innerHTML = `Acertou <br/><span>${points}%</span>`; //coloca no score quanto acertou
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`;
    document.querySelector('.scoreArea').style.display = 'block'; //mostra o score
    document.querySelector('.questionArea').style.display = 'none'; //div questoes none
    document.querySelector('.progress--bar').style.width = '100%'; //progresso 100%
}




function resetEvent() { //funcao de resetar o jogo
    correctAnswers = 0; //quantas questao acertou vai pra 0
    currentQuestion = 0; //questao atual vai pra 0
    showQuestion(); //mostra de novo a questao
}