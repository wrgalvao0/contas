// modulos externos
import inquirer from 'inquirer';
import chalk from 'chalk';
// modulos internos
import fs, { existsSync } from 'fs';
import { error } from 'console';

operacoes()

function operacoes() {
    inquirer.prompt([{
        type: 'list',
        name: 'acao',
        message: 'Qual operação você deseja realizar?',
        choices: ['Criar conta', 'Consultar saldo', 'Depositar', 'Saque', 'Sair']
    }]).then((answer => {
        let acao = answer.acao
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
    inquirer.prompt([{
        type: 'input',
        name: 'nomeConta',
        message: 'Digite o nome da conta que deseja consultar'
    }]).then(answer => {
        let nomeConta = answer.nomeConta
        if (existsSync(`contas/${nomeConta}.json`)) {
            let conta = JSON.parse(fs.readFileSync(`contas/${nomeConta}.json`))
            console.log(chalk.bgBlue.black(`O saldo da conta e: R$ ${conta.saldo}`))
            operacoes()
        }
        else{
            console.log(chalk.red('Conta nao encontrada, tente uma conta valida!'))
            consultarSaldo()
        }
    }).catch((error) => {
        console.log(chalk.red(`Erro ao consultar o saldo: ${error}`))
    })
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
    inquirer.prompt([{
        type: 'input',
        name: 'nomeConta',
        message: 'Digite o nome da conta que deseja depositar'
    }]).then(answer => {
        let nomeConta = answer.nomeConta
        if (fs.existsSync(`contas/${nomeConta}.json`)) {
            let conta = JSON.parse(fs.readFileSync(`contas/${nomeConta}.json`))
            inquirer.prompt([{
                type: 'input',
                name: 'valorDeposito',
                message: 'Digite o valor que deseja depositar'
            }]).then((answer) => {
                if (answer.valorDeposito <= 0) {
                    console.log(chalk.red('Valor de desposito invalido, tente um valor acima de R$ 0,00 !'))
                    depositar()
                }
                else {
                    let valorDeposito = parseFloat(answer.valorDeposito)
                    conta.saldo = conta.saldo + valorDeposito
                    let contaJSON = JSON.stringify(conta)
                    fs.writeFileSync(`contas/${nomeConta}.json`, contaJSON, (error) => { console.log(chalk.red('Erro ao depositar: ' + error)) })
                    operacoes()
                }
            })
        }
        else {
            console.log(chalk.red('Conta nao encontrada, tente novamente!'))
            depositar()
        }
    }).catch((error) => {
        console.log(chalk.red(`Erro ao depositar: ${error}`))
    })
}
function sacar() {

}