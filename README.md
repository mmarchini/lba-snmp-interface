# TwinEngine+SNMP [ Interface ]

Esse é um projeto para a disciplina de [INF01015] Gerência e Aplicação em Redes do curso de Ciência da 
ComutaçãoUniversidade Federal do Rio Grande do Sul. 

O objetivo do projeto é extender um agente SNMP (nesse caso, o Net-SNMP) para disponibilizar uma MIB
customizada que permita acessar e alterar os dados de um jogo. Para tal, foi escolhido o projeto open-source
TwinEngine, que é uma re-implementação do jogo Little Big Adventure, desenvolvido pela Adeline Software 
International em 1994. 
Meu objetivo é possibilitar manipulação do jogo através de uma Interface Web, que se comunica com um Web-Server
que também exerce o papel de Gerente SNMP, se comunicando com o Agente responsável pela comunicação com o jogo. 

O código presente nesse repositório é a implementação em Nodejs do Gerente SNMP que disponibilizará uma interface
web para o jogador poder acessar e altearar os dados do jogo. 



