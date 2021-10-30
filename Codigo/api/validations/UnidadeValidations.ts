import * as yup from 'yup'
import { cepRegEx } from './Regex';

export const unidadeCreateValidationScheme = yup.object().shape({
    nome: yup.string().max(80),
    cep: yup.string().matches(cepRegEx).max(8),
    cidade: yup.string().max(100),
    bairro: yup.string().max(45),
    numero: yup.number()
});