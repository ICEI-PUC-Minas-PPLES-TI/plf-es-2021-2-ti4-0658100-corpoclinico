import * as yup from 'yup'

export const equipeCreateValidationScheme = yup.object().shape({
    nome: yup.string().max(50).required("nome obrigatório!"),
    especialidade: yup.string().max(60).required("especialidade obrigatório!")
});

export const equipeUpdateValidationScheme = yup.object().shape({
    nome: yup.string().max(50),
    especialidade: yup.string().max(60)
})