import * as yup from 'yup'
import { celularRegExp } from './Regex';

const categorias = ["E", "T", "C"];
export const medicoCreateValidationScheme = yup.object().shape({
    crm: yup.string().required("crm obrigatório!"),
    celular: yup.string().matches(celularRegExp, "celular inválido!"),
    categoria: yup
    .mixed()
    .oneOf(categorias, `categoria deve ser alguma destas: ${categorias}.`)
    .required("categoria obrigatório!"),
    rg: yup
    .string()
    .required("rg obrigatório!"), // TODO: RegEX de RG
    cpf: yup
    .string()
    .required("rg obrigatório!"), // TODO: RegEX de CPF,
    usuario_id: yup
    .number()
    .required('usuario_id obrigatório')
});

export const medicoUpdateValidationScheme = yup.object().shape({
    celular: yup.string().matches(celularRegExp, "celular inválido!"),
    categoria: yup
    .mixed()
    .oneOf(categorias, `categoria deve ser alguma destas: ${categorias}.`)
})