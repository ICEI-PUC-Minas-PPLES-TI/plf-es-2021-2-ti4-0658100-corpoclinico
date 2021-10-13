const documentosCriarMedico = [
  { name: 'doc_rg', maxCount: 1 },
  { name: 'doc_cpf', maxCount: 1 },
  { name: 'doc_foto_txq', maxCount: 1 },
  { name: 'doc_comp_ender', maxCount: 1 },
  { name: 'doc_crm', maxCount: 1 },
  { name: 'doc_cert_quit_crmmg', maxCount: 1 },
  { name: 'doc_term_vigi', maxCount: 1 },
  { name: 'doc_term_compr', maxCount: 1 },
  { name: 'docs_cert_form', maxCount: 25 },
  { name: 'docs_cert_espec', maxCount: 50 }
];

const extensoesPermitidas = [
  '.png',
  '.jpg',
  '.gif',
  '.jpeg',
  '.pdf',
  '.pdax',
  '.doc',
  '.docx',
  '.dot',
  '.dotx',
  '.docm',
  '.gdoc',
  '.odm',
  '.odoc',
  '.odt',
  '.ott',
  '.omm',
  '.sdw',
  '.stw',
  '.sxw',
  '.wpd',
  '.wps',
  '.wpt',
  '.wrd',
  '.wri',
]

export {
  documentosCriarMedico,
  extensoesPermitidas
}
