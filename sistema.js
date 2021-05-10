const sprites = new Image();
sprites.src = 'sprites.png';

let frames = 0;
const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const somdehit = new Audio();
somdehit.src = 'A_priori.mp3'

const priori = new Audio();
priori.src = 'priori.mp3'

const estado = new Audio();
estado.src = 'estado.mp3'

function fazcolisao(maeda, chão) {
    const maedaY = maeda.y + maeda.altura
    const chãoY = chão.y
    if (maedaY >= chãoY ) {
        return true; //sistema de colisão
    }
    return false;
}

function criacanos () {
    const canos = {
        largura: 48,
        altura: 398,
        chão: {
            spriteX: 39,
            spriteY: 205,
        },
        ceu: {
            spriteX: 113,
            spriteY: 204,
        },
        espaço: 100,
        desenha() {
            canos.pares.forEach(function(par){
            const yrandom = par.y;
            const espaçamentoentrecanos = 90;
            const canosceux = par.x;
            const canosceuy = yrandom;

            
                 //cano do céu
            contexto.drawImage(
                sprites,
                canos.ceu.spriteX,canos.ceu.spriteY,
                canos.largura,canos.altura,
                canosceux,canosceuy,
                canos.largura,canos.altura
            )
            //cano do chão
            const canoschaox = par.x;
            const canoschaoy = canos.altura + espaçamentoentrecanos + yrandom;
            contexto.drawImage(
                sprites,
                canos.chão.spriteX,canos.chão.spriteY,
                canos.largura,canos.altura,
                canoschaox,canoschaoy,
                canos.largura, canos.altura
            )
            par.canoceu = {
                x: canosceux,
                y: canos.altura + canosceuy
            }
            par.canochao = {
                x: canoschaox,
                y: canoschaoy
            }
            } )
    }, 
    temcolisaocomopassaro(par) {
        const cabeçadopassaro = globais.maeda.y;
        const pedopassaro = globais.maeda.y + globais.maeda.altura

        if (globais.maeda.x >= par.x) {
            //console.log('inavadiu')
            if (cabeçadopassaro <= par.canoceu.y) {
                
                priori.play();
                
                return true;

            }
            if (pedopassaro >= par.canochao.y) {
                
                estado.play();
                
                return true;
            }
            
        }

        return false;
    }, 
    pares: [],
        atualiza() {
            const passou100frames = frames % 100 === 0;
            if (passou100frames) {
                console.log('passou 100 frames')
                canos.pares.push({
                    x: canvas.width,
                    //y:-350,
                    y:-150 * (Math.random() + 1),
                })
            }
            canos.pares.forEach(function(par) {
                par.x = par.x - 2;

                if(canos.temcolisaocomopassaro(par)) {
                    console.log('você perdeu')
                    mudaparatela(telas.gameover)
                };

                if(par.x + canos.largura <= 0) {
                    canos.pares.shift();
                } 
            });
        }
    }
    return canos;
    }
function criamaeda( ) {
    const maeda = {
        spriteX: 72,
        spriteY: 104,
        largura: 45,
        altura: 31,
        x: 10,
        y: 50,
        gravidade: 0.25,
        velocidade:0,
        pulo: 4.6, 
        Pula() {
            maeda.velocidade = - maeda.pulo;
        },
        atualiza() {
            if (fazcolisao(maeda, globais.chão)) {
                console.log('Fez colisão')
                priori.play();
                    mudaparatela(telas.gameover); //som de hit
                return;
            }
            maeda.velocidade = maeda.velocidade + maeda.gravidade;
            maeda.y = maeda.y + maeda.velocidade;  
        },
        desenhar() {
            contexto.drawImage(
                sprites,
                maeda.spriteX,maeda.spriteY,
                maeda.largura, maeda.altura,
                maeda.x,maeda.y,
                maeda.largura,maeda.altura,
            );
        }
        
    };
    return maeda;
}


function criarchao() {
    const chão = {
        spriteX: 8,
        spriteY: 605,
        largura:315,
        altura:109,
        x: 0,
        y: canvas.height -109,
        atualiza() {
            const movimentodochao = 1;
            const repetechao = chão.largura / 1;
            const movimentaçao = chão.x = chão.x - movimentodochao;
    
            //console.log('[chão.x]',chão.x );
            //console.log('[repetechao]', repetechao);
            //console.log('movimentação',movimentaçao % repetechao);
    
    
            chão.x = movimentaçao % repetechao;
        },
        desenhar() {
            contexto.drawImage(
                sprites,
                chão.spriteX, chão.spriteY,
                chão.largura, chão.altura,
                chão.x, chão.y,
                chão.largura, chão.altura
            )
            contexto.drawImage(
                sprites,
                chão.spriteX, chão.spriteY,
                chão.largura, chão.altura,
                chão.x + chão.largura, chão.y,
                chão.largura, chão.altura
            )
        }
    };
    return chão;
 }
const background = {
    spriteX: 248,
    spriteY: 2,
    largura: 277,
    altura:202,
    x: 0,
    y: canvas.height - 202,
    desenhar () {
        contexto.fillStyle = '#639bff'
        contexto.fillRect(0,0, canvas.width,canvas.height)

        contexto.drawImage(
            sprites,
            background.spriteX, background.spriteY,
            background.largura, background.altura,
            background.x, background.y,
            background.largura, background.altura 
        )
        contexto.drawImage(
            sprites,
            background.spriteX, background.spriteY,
            background.largura, background.altura,
            background.x + background.largura, background.y,
            background.largura, background.altura 
        )
    }
    
}
 const inicio = {
    spriteX: 265,
    spriteY:262,
    largura:174,
    altura: 152,
    x: (canvas.width/2)-174/ 2,
    y: 58,
    desenhar() {
        contexto.drawImage(
            sprites,
            inicio.spriteX, inicio.spriteY,
            inicio.largura, inicio.altura,
            inicio.x, inicio.y,
            inicio.largura, inicio.altura
        )
    }
 } 
 const gameover = {
    spriteX: 326,
    spriteY:443,
    largura:227,
    altura: 197,
    x: (canvas.width/2)-227/ 2,
    y: 58,
    desenhar() {
        contexto.drawImage(
            sprites,
            gameover.spriteX, gameover.spriteY,
            gameover.largura, gameover.altura,
            gameover.x, gameover.y,
            gameover.largura, gameover.altura
        )
    }
 }
function criaplacar() {
    const placar = {
        pontuaçao: 0,
        desenhar() {
            contexto.font = '35px "VT323"';
            contexto.fillStyle = 'white'
            contexto.textAlign = 'right'
            contexto.fillText(`${placar.pontuaçao}`, canvas.width - 10 ,35)
            placar.pontuaçao
        },
        atualiza() {
            const intervalodeframes = 20;
            const passouointervalo = frames % intervalodeframes === 0;
            if (passouointervalo) {
                placar.pontuaçao = placar.pontuaçao + 1
            }
            
        }
    }
    return placar;
}
 const globais = {};
 let telaativa = {};
 function mudaparatela(novatela) {
     telaativa = novatela;
 
     if (telaativa.inicializa) {
        telaativa.inicializa();
     }
 }
const telas = {
    começo: {
        inicializa() {
            globais.maeda = criamaeda();
            globais.canos = criacanos();
            globais.chão = criarchao();
            globais.placar = criaplacar();  
        },
        desenhar() {
            background.desenhar();
            globais.maeda.desenhar();

            globais.chão.desenhar();

            inicio.desenhar();
        },
        click() {
            mudaparatela(telas.jogo)
        },
        atualiza() {
            globais.chão.atualiza();
        }
    }
}
telas.jogo = {
    inicializa() {
        globais.placar = criaplacar();
    },
    desenhar() {
        background.desenhar();
        globais.canos.desenha();
        globais.chão.desenhar();
        globais.maeda.desenhar();
        globais.placar.desenhar();
    },
    click() {
        globais.maeda.Pula();
    },
    atualiza() {
        globais.chão.atualiza();
        globais.maeda.atualiza();
        globais.canos.atualiza();
        globais.placar.atualiza();
    }
}
function loop() {
    telaativa.desenhar();
    telaativa.atualiza();

    frames = frames + 1
    requestAnimationFrame(loop)
}
telas.gameover = {
    desenhar() {
        gameover.desenhar();
    },
    atualiza() {

    },
    click() {
        mudaparatela(telas.começo)
    }
}
window.addEventListener('click', function()  { //função para perceber o click
    if (telaativa.click) {
        telaativa.click();
    }
}),

mudaparatela(telas.começo),
loop();
