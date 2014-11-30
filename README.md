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

## Dependências

Essa aplicação tem como dependência:

* NodeJS
* NPM
* Bower

Caso ainda não tenha eles instalados, siga os passos abaixo para
instalá-los:

### Ubuntu

```bash
sudo apt-get install nodejs npm
sudo npm install -g bower
```

## Instalação

Para instalar o servidor, siga os passos descritos abaixo dentro
da pasta do projeto:

```bash
npm install
bower install
```

## Rodando

```
./index.js --help

  Usage: index [options]

  Options:

    -h, --help                    output usage information
    -V, --version                 output the version number
    -p, --snmp-port <n>           Porta SNMP
    -h, --snmp-host <n>           Host SNMP
    -c, --snmp-community [value]  Comunidade read-write SNMP
    -l, --listening-port [value]  Porta do servidor
```

