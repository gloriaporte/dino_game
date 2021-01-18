const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let estaPulando = false;
//Posição inicial do dinossauro
let position = 0;


//Ao pressionar a tecla, vamos identificar qual tecla a pessoa está pressionando
function pressionarTecla(event) {

    //Se pressionar a barra de espaço
    if (event.keyCode === 32){
        if (!estaPulando){
            pular();
        } 
    }
}

function pular() {

    estaPulando = true;

    //Intervalo a cada 20 milissegundos 
    let intervalo = setInterval(() => {
        if (position >= 150){
            
            //Fazer o intervalo parar
            clearInterval(intervalo);

            //Fazer o dino descer
            let descerDino = setInterval(() => {
                if (position <= 0) {
                    
                    //Limpar intervalo
                    clearInterval(descerDino);
                    estaPulando = false;
                } else {//Tirar 20
                position -= 20;
                //Mudar o "CSS" do dino
                dino.style.bottom = position + 'px';
                }
            }, 30);
        } else {
            //Faremos o dinossauro pular/subir
            position += 20;
            //Mudar o "CSS" do dinossauro
            dino.style.bottom = position + 'px';
        }
    }, 30);
}


//Função pra gerar os cactos
function gerarCactos() {

    const cactos = document.createElement('div');
    let posicaoDoCacto = 1000;
    let tempoAleatorio = Math.random() * 6000;

    cactos.style.left = 1000 + 'px';
    cactos.classList.add('cactos');
    background.appendChild(cactos);

    //Intevalo dos cactos se movendo
    let intervaloDeMovimento = setInterval(() => {
        //Se o cacto sair da tela
        if (posicaoDoCacto < -60) {
            //Parar de mover ele
            clearInterval(intervaloDeMovimento);
            //Tirar o cacto
            background.removeChild(cactos);
            //Nessa região é quando o dino pode se chocar com o cacto, então vamos verificar se eles vão se chocar    
        } else if (posicaoDoCacto > 0 && posicaoDoCacto < 60 && position < 60) {
            clearInterval(intervaloDeMovimento);
            document.body.innerHTML = '<h1 class="game over">Game Over</h1>';
        } else {
            posicaoDoCacto -= 10;
            cactos.style.left = posicaoDoCacto + "px";    
        }
    }, 20)

    //executar uma função depois de X tempo
    setTimeout(gerarCactos, tempoAleatorio);
}


gerarCactos();
document.addEventListener('keyup', pressionarTecla);