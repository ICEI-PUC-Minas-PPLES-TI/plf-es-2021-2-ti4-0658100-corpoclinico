/*
  /^
    (?=.*\d)          // deve ter no mínimo 1 número
    (?=.*[a-z])       // deve ter no mínimo 1 letra minúscula
    (?=.*[A-Z])       // deve ter no mínimo 1 letra maiúscula
    [a-zA-Z0-9]{8,}   // deve ter no mínimo 8 caracteres alfanuméricos
    (?=.*[|!"$%&\/\(\)\?\^\'\\\+\-\*]))^.* // deve ter no mínimo um caractere espcial - DESATIVADO
  $/
*/
const senhaRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

const celularRegEx = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const rgRegEx = /(^\d{1,2}).?(\d{3}).?(\d{3})-?(\d{1}|X|x$)/;

const cpfRegEx = /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)/;

const cepRegEx = /(^[0-9]{5})-?([0-9]{3}$)/;

export {
  senhaRegEx,
  celularRegEx,
  rgRegEx,
  cpfRegEx,
  cepRegEx,
}
