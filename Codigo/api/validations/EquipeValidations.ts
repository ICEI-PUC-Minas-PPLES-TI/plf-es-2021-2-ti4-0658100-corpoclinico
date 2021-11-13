import * as yup from 'yup'

export const equipeCreateValidationScheme = yup.object().shape({
    nome: yup.string().max(50).required("nome obrigatório!"),
    especialidade_id: yup.number().required("especialidade_id obrigatório!"),
    usuario_id: yup.number().required("'usuario_id' obrigatŕotio")
});

export const equipeUpdateValidationScheme = yup.object().shape({
    nome: yup.string().max(50),
    especialidade_id: yup.number(),
    usuario_id: yup.number()
})