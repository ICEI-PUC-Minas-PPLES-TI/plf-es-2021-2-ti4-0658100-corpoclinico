import * as yup from 'yup'

export const videoCreateValidationScheme = yup.object().shape({
    link: yup.string().url().max(250).required(),
});

export const videoUpdateValidationScheme = yup.object().shape({
    link: yup.string().url().max(250),
    prioridade: yup.number().max(127),
    ativo: yup.bool()
});
