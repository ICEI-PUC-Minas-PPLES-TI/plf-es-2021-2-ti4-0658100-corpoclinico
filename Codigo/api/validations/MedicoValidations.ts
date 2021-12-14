import * as yup from "yup";
import { estados } from "../helpers/Siglas";
import { celularRegEx, cpfRegEx, cepRegEx } from "./Regex";

const categorias = ["C", "E", "T"];
const escolaridades = ["BACHA", "ESPE", "MESTRE", "DOUTOR"];

export const medicoCreateValidationScheme = yup.object().shape({
  // * Campos de Usuario
  nome: yup
    .string()
    .required("Nome obrigatório!")
    .max(120, "Nome deve ter no máximo 120 caracteres!"),
  email: yup
    .string()
    .email()
    .required("Email obrigatório!")
    .max(100, "Nome deve ter no máximo 100 caracteres!"),
  senha: yup
    .string()
    .required("'senha' obrigatória!")
    .min(8, "'senha' deve ter no mínimo 8 caracteres!")
    .max(64, "'senha' deve ter no máximo 64 caracteres!"),

  // * Campos de médico
  crm: yup
    .string()
    .required("'crm' obrigatório!")
    .max(20, "'crm' tamanho máximo de 20 caracteres!"),

  regiao: yup
    .mixed()
    .oneOf(estados, `'regiao' deve ser algum destes valores: ${estados}!`)
    .required("'regiao' obrigatório!"),

  dt_inscricao_crm: yup.date().required("'dt_inscricao_crm' obrigatório!"),

  celular: yup
    .string()
    .matches(celularRegEx, "'celular' inválido!")
    .required("'celular' obrigatório!")
    .max(14, "'celular' tamanho máximo de 14 caracteres!"),

  cartao_sus: yup
    .string()
    .nullable()
    .max(25, "'cartao_sus' tamanho máximo de 25 caracteres!"),

  categoria: yup
    .mixed()
    .oneOf(
      categorias,
      `'categoria' deve ser algum destes valores: ${categorias}.`
    )
    .required("'categoria' obrigatório!"),

  rg: yup
    .string()
    .nullable()
    .max(14, "'rg' tamanho máximo de 14 caracteres!"),

  rg_orgao_emissor: yup
    .string()
    .nullable()
    .max(30, "'rg_orgao_emissor' tamanho máximo de 30 caracteres!"),

  rg_data_emissao: yup
    .date()
    .nullable()
    .default(undefined)
    .transform((curr, orig) =>
      orig === "" || orig === undefined || orig === null ? null : curr
    ),

  dt_nascimento: yup
    .date()
    .nullable()
    .default(undefined)
    .transform((curr, orig) =>
      orig === "" || orig === undefined || orig === null ? null : curr
    ),

  cpf: yup
    .string()
    .nullable()
    .matches(cpfRegEx, "'cpf' inválido!")
    .max(14, "'cpf' tamanho máximo de 14 caracteres!"),

  titulo_eleitoral: yup
    .string()
    .nullable()
    .max(12, "'titulo_eleitoral' tamanho máximo de 12 caracteres!"),

  zona: yup
    .string()
    .nullable()
    .max(3, "'zona' tamanho máximo de 3 caracteres!"),

  secao: yup
    .string()
    .nullable()
    .max(4, "'secao' tamanho máximo de 4 caracteres!"),

  logradouro: yup
    .string()
    .required("'logradouro' obrigatório!")
    .max(100, "'logradouro' tamanho máximo de 100 caracteres!"),

  numero: yup.number().required("'numero' obrigatório!"),

  complemento: yup
    .string()
    .nullable()
    .max(20, "'complemento' tamanho máximo de 20 caracteres!"),

  bairro: yup
    .string()
    .required("'bairro' obrigatório!")
    .max(45, "'bairro' tamanho máximo de 45 caracteres!"),

  cidade: yup
    .string()
    .required("'cidade' obrigatório!")
    .max(100, "'cidade' tamanho máximo de 100 caracteres!"),

  estado: yup
    .mixed()
    .oneOf(estados, `'estado' deve ser algum destes valores: ${estados}!`)
    .required("'estado' obrigatório!"),

  cep: yup
    .string()
    .required("'cep' obrigatório!")
    .matches(cepRegEx, "'cep' inválido!")
    .max(9, "'cep' tamanho máximo de 9 caracteres!"),

  sociedade_cientifica: yup
    .string()
    .nullable()
    .max(100, "'sociedade_cientifica' tamanho máximo de 100 caracteres!"),

  escolaridade_max: yup
    .mixed()
    .oneOf(
      escolaridades,
      `'escolaridade_max' deve ser algum destes valores: ${escolaridades}!`
    )
    .required("'escolaridade_max' obrigatório!"),

  // campos da candidatura
  candidaturas: yup
    .array(yup.object().shape({
      equipe_id: yup
        .number()
        .nullable(),
      faturamento: yup
        .mixed()
        .oneOf(['PJ', 'C'])
        .required('candidatura.faturamento é obrigatório'),
      unidade_id: yup
        .number()
        .nullable(),
      cnpj: yup
        .string()
        .max(14)
        .nullable(),
    })).min(1).required('"candidaturas" é obrigatório'),

  especialidades: yup
  .string()
  .required('"especialidades" é obrigatório'),
});

export const medicoUpdateValidationScheme = yup.object().shape({
  // * Campos de médico
  crm: yup.string().max(20, "'crm' tamanho máximo de 20 caracteres!"),

  regiao: yup
    .mixed()
    .oneOf(estados, `'regiao' deve ser algum destes valores: ${estados}!`),

  dt_inscricao_crm: yup.date(),

  celular: yup
    .string()
    .matches(celularRegEx, "'celular' inválido!")
    .max(14, "'celular' tamanho máximo de 14 caracteres!"),

  cartao_sus: yup
    .string()
    .nullable()
    .max(25, "'cartao_sus' tamanho máximo de 25 caracteres!"),

  categoria: yup
    .mixed()
    .oneOf(
      categorias,
      `'categoria' deve ser algum destes valores: ${categorias}.`
    ),

  rg: yup
    .string()
    .nullable()
    .max(14, "'rg' tamanho máximo de 14 caracteres!"),

  rg_orgao_emissor: yup
    .string()
    .nullable()
    .max(30, "'rg_orgao_emissor' tamanho máximo de 30 caracteres!"),

  rg_data_emissao: yup
    .date()
    .nullable()
    .default(undefined)
    .transform((curr, orig) =>
      orig === "" || orig === undefined || orig === null ? null : curr
    ),

  dt_nascimento: yup
    .date()
    .nullable()
    .default(undefined)
    .transform((curr, orig) =>
      orig === "" || orig === undefined || orig === null ? null : curr
    ),

  cpf: yup
    .string()
    .nullable()
    .matches(cpfRegEx, "'cpf' inválido!")
    .max(14, "'cpf' tamanho máximo de 14 caracteres!"),

  titulo_eleitoral: yup
    .string()
    .nullable()
    .max(12, "'titulo_eleitoral' tamanho máximo de 12 caracteres!"),

  zona: yup
    .string()
    .nullable()
    .max(3, "'zona' tamanho máximo de 3 caracteres!"),

  secao: yup
    .string()
    .nullable()
    .max(4, "'secao' tamanho máximo de 4 caracteres!"),

  logradouro: yup
    .string()
    .max(100, "'logradouro' tamanho máximo de 100 caracteres!"),

  numero: yup.number(),

  complemento: yup
    .string()
    .nullable()
    .max(20, "'complemento' tamanho máximo de 20 caracteres!"),

  bairro: yup.string().max(45, "'bairro' tamanho máximo de 45 caracteres!"),

  cidade: yup.string().max(100, "'cidade' tamanho máximo de 100 caracteres!"),

  estado: yup
    .mixed()
    .oneOf(estados, `'estado' deve ser algum destes valores: ${estados}!`),

  cep: yup
    .string()
    .matches(cepRegEx, "'cep' inválido!")
    .max(9, "'cep' tamanho máximo de 9 caracteres!"),

  sociedade_cientifica: yup
    .string()
    .nullable()
    .max(100, "'sociedade_cientifica' tamanho máximo de 100 caracteres!"),

  escolaridade_max: yup
    .mixed()
    .oneOf(
      escolaridades,
      `'escolaridade_max' deve ser algum destes valores: ${escolaridades}!`
    ),

    // campos de candidatura
    candidaturas: yup
    .array(yup.object().shape({
      id: yup
        .number()
        .nullable(),
      candidatura_id: yup
        .number()
        .nullable(),
      equipe_id: yup
        .number()
        .nullable(),
      faturamento: yup
        .mixed()
        .oneOf(['PJ', 'C'])
        .nullable(),
      unidade_id: yup
        .number()
        .nullable(),
      cnpj: yup
        .string()
        .max(14)
        .nullable()
    })).notRequired().nullable()
});
