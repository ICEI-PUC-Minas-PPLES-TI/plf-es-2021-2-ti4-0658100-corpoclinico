import * as yup from 'yup'

export const retornoCreateScheme = yup.object().shape({
    avaliador_id: yup.number().required(),
    candidatura_id: yup.number().required(),
    comentario: yup.string(),
    status: yup.mixed().oneOf(['P', 'R', 'A'])
});

export const retornoUpdateScheme = yup.object().shape({
    avaliador_id: yup.number().required(),
    candidatura_id: yup.number().required(),
    comentario: yup.string(),
    status: yup.mixed().oneOf(['P', 'R', 'A'])
});