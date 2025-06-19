// modulos externos
import inquirer from 'inquirer';
import chalk from 'chalk';
// modulos internos
import fs from 'fs';
import { error } from 'console';

operacoes()

function operacoes(){
    inquirer.prompt([{
        type: 'list',
        name: 'acao',
        message: 'Qual operação você deseja realizar?',
        choices: ['Criar conta', 'Consultar saldo', 'Depositar', 'Saque', 'Sair']
    }]).then((answer => {
        let acao = answer['acao']
        console.log(acao)
    })).catch((error) => console.log(error))
}