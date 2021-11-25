import * as yup from 'yup'

export const retornoUpdateScheme = yup.object().shape({
    comentario: yup.string(),
    status: yup.mixed().oneOf(['P', 'R', 'A']).required()
});