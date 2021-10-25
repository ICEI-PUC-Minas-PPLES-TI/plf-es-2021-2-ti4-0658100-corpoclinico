import * as yup from 'yup'

export const unidadeCreateValidationScheme = yup.object().shape({
    nome: yup.string().max(80),
    cep: yup.string().max(8),
    cidade: yup.string().max(100),
    bairro: yup.string().max(45),
    numero: yup.number()
});