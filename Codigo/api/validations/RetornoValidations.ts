import * as yup from 'yup'

export const retornoUpdateScheme = yup.object().shape({
    comentario: yup.string().nullable(),
    status: yup.mixed().oneOf(['P', 'R', 'A']).required()
});
