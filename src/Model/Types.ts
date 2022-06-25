export abstract class Usuario {
    protected turma_id:string = 'K2dRx6'
    constructor (
        protected id:string,  protected nome:string, protected email:string, protected data_nasc:string
        ) {}
}

export enum EspecificidadesEnum  {
    JS = 'JS',
    CSS = 'CSS',
    React = "React",
    TypeScript = 'TypeScript',
    POO = 'POO'
}

export enum Modulo {
    'zero' = 0,
    'um' = 1,
    'dois' = 2,
    'tres' = 3,
    'quatro' = 4,
    'cinco' = 5,
    'seis' = 6
}

export type Student = {
    id: string,
    nome: string,
    email: string,
    data_nasc: string,
    turma_id: string
}

export type hobby = {
    id: string,
    nome: string
}

export type Estudante_Hobby = {
    id: string,
    estudante_id : string,
    hobby_id : string
}

export type Especialidade = {
    id:string,
    // nome:EspecificidadesEnum VER ISSO DEPOIS
    nome: string
}

export type Docente_Especialidade = {
    id: string,
    docente_id : string,
    especialidade_id : string
}

export type Teacher = {
    id: string,
    nome: string,
    email: string,
    data_nasc: string,
    turma_id: string
}

export type Turma= {
    id:string,
    nome:string,
    modulo:number

}

export interface Especialidades  {
    especialidades: Especialidade[]
}

export interface Hobbys {
    hobbys: hobby[]
}