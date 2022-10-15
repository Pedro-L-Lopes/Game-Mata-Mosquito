//Dimensões do palco do jogo
let altura = 0
let largura = 0
let vidas = 1
let tempo = 16
let criaMosquitoTempo = 1500
let nivel = window.location.search
nivel = nivel.replace('?', '')

if(nivel === 'normal'){
	criaMosquitoTempo = 1500
}else if(nivel === 'dificil'){
	criaMosquitoTempo = 1000
}else if(nivel === 'claraBraba'){
	criaMosquitoTempo = 500
}

function ajustaTamanhoPalcoJogo(){
	altura = window.innerHeight 
	largura = window.innerWidth
	console.log(altura, largura)
}

ajustaTamanhoPalcoJogo()

let cronometro = setInterval(() => {

	tempo -= 1

	if(tempo < 0){
		clearInterval(cronometro)
		clearInterval(criaMosquito)
		window.location.href = 'vitoria.html'
	}else{
		document.getElementById("cronometro").innerHTML = tempo
	}
	
}, 1000)

//Gerando numero randomicos com base no tamanho da tela
function posicaoRamdomica(){

	//Remover mosquito anterior(caso exista)
	if(document.getElementById('mosquito')){
		document.getElementById('mosquito').remove()

		if(vidas > 3){
			window.location.href = 'fim_de_jogo.html'
		}else{
			document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png"
		}
		vidas++
	}

	let posicaoX = Math.floor(Math.random() * largura) - 90 //Pegando o tamanho da tela e multiplicando
	let posicaoY = Math.floor(Math.random() * altura) - 90

	posicaoX = posicaoX < 0 ? 0 : posicaoX
	posicaoY = posicaoY < 0 ? 0 : posicaoY

	console.log(posicaoX, posicaoY)

	//Criar elemento html
	let mosquito = document.createElement('img')
	mosquito.src = 'imagens/mosquito.png'
	mosquito.className = tamanhoAleatorio() + ' ' +  ladoAleatorio()
	mosquito.style.left = posicaoX + 'px'
	mosquito.style.top = posicaoY + 'px'
	mosquito.style.position = 'absolute'
	mosquito.id = 'mosquito'
	//clicar no elemento
	mosquito.onclick = function(){
		this.remove()
	}

	document.body.appendChild(mosquito)


}
//Chamando a função com base em um intervalo de tempo
let criaMosquito = setInterval(() =>{
	posicaoRamdomica()
}, criaMosquitoTempo)



//Tamanho do mosquito de forma aleatoria
function tamanhoAleatorio(){
	let classe = Math.floor(Math.random() * 3)

	switch(classe){
		case 0:
			return 'mosquito1'
		case 1:
			return 'mosquito2'
		case 2:
			return 'mosquito3'
	}
}

function ladoAleatorio(){
	let classe = Math.floor(Math.random() * 2)

	switch(classe){
		case 0:
			return 'ladoA'
		case 1:
			return 'ladoB'
	}
}

