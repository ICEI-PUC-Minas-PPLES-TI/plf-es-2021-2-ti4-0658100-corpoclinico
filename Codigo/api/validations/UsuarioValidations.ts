import * as yup from 'yup';

const tipos = ["A", "M", "CC", "DC", "DT"];

export const usuarioCreateValidation = yup.object().shape({
    nome: yup.string().required("'nome' obrigatório!").max(120, "'nome' deve ter no máximo 120 caracteres!"),

    email: yup
      .string()
      .email()
      .required("'email' obrigatório!").max(100, "'email' deve ter no máximo 100 caracteres!"),
    senha: yup
      .string()
      .required("'senha' obrigatória!")
      .min(8, "'senha' deve ter no mínimo 8 caracteres!")
      .max(64, "'senha' deve ter no máximo 64 caracteres!")
});

export const usuarioUpdateValidation = yup.object().shape({
    nome: yup.string().max(120, "'nome' deve ter no máximo 120 caracteres!"),

    email: yup.string().email().max(100, "'email' deve ter no máximo 100 caracteres!"),
    senha: yup
        .string()
        .required("'senha' obrigatória!")
        .min(8, "'senha' deve ter no mínimo 8 caracteres!")
        .max(64, "'senha' deve ter no máximo 64 caracteres!"),

    tipo: yup.mixed().oneOf(tipos, `Tipo deve ser algum destes: ${tipos}.`)
})