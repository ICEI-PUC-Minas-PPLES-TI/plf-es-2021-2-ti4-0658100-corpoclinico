import * as yup from 'yup'

export const especialidadeCreateValidationScheme = yup.object().shape({
    identificacao: yup.string().max(60).required("identificacao obrigatório!")
});

export const especialidadeUpdateValidationScheme = yup.object().shape({
    especialidade: yup.string().max(60)
})