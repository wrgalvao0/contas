// modulos externos
import inquirer from 'inquirer';
import chalk from 'chalk';
// modulos internos
import fs from 'fs';
import { error } from 'console';

operacoes()

function operacoes() {
    inquirer.prompt([{
        type: 'list',
        name: 'acao',
        message: 'Qual operação você deseja realizar?',
        choices: ['Criar conta', 'Consultar saldo', 'Depositar', 'Saque', 'Sair']
    }]).then((answer => {
        let acao = answer['acao']
        console.log(acao)
        if (acao === 'Criar conta') {
            criarConta()
        }
        else if (acao === 'Consultar saldo') {
            consultarSaldo()
        }
        else if (acao === 'Depositar') {
            depositar()
        }
        else if (acao === 'Saque') {
            sacar()
        }
        else if (acao === 'Sair') {
            console.log(chalk.bgBlue.black('Obrigado por utilizar nosso banco!'))
            process.exit()
        }
    })).catch((error) => console.log(error))
}
function consultarSaldo() {
    if (saldo > 0) {
        console.log(chalk.green(`Seu saldo é: R$ ${saldo}`))
    }
    else if (saldo < 0) {
        console.log(chalk.red(`Seu saldo é negativo: R$ ${saldo}`))
    }
    else {
        console.log(chalk.yellow(`Seu salo e ${saldo}`))
    }
}

function criarConta() {
    buildConta()
    console.log(chalk.bgGreen.black('Obrigado por escolher nosso banco!'))
    console.log(chalk.green('Defina as opções de sua conta:'))
}

function buildConta() {
    inquirer.prompt([{
        name: 'nomeConta',
        message: 'Digite o nome da conta'
    }]).then((answer) => {
        let nomeConta = answer.nomeConta
        if (!fs.existsSync('contas')) {
            fs.mkdirSync('contas')
        }

        if (fs.existsSync(`contas/${nomeConta}.json`)) {
            console.log(chalk.red('Conta já existe, tente outro nome!'))
            buildConta()
            return
        }
        else {
            fs.writeFileSync(`contas/${nomeConta}.json`, '{"saldo": 0}', (error) => console.log(chalk.red('Erro ao criar conta: ' + error)))
            console.log(chalk.green('Conta criada com sucesso!'))
            operacoes()
        }
    }).catch((error) => {
        console.log(chalk.red('Erro ao criar conta: ' + error))
    })
}

function depositar() {

}

function sacar() {

}