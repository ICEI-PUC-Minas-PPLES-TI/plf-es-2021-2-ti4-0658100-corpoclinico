import { Op } from "sequelize";
import AppError from "../errors/AppError";
import Arquivo, { IAtributosArquivoCriacao } from "../models/Arquivo";
import Candidatura from "../models/Candidatura";
import Equipe from "../models/Equipe";
import MedicoEspecialidade from "../models/MedicoEspecialidade";
import CandidaturaService from "./CandidaturaService";
import EquipeService from "./EquipeService";
import MedicoEspecialidadeService from "./MedicoEspecialidadeService";

export default class ArquivoService {

  async create(arquivos: any, medico_id: number, especialidades: any, candidatura_id: number) {
    const arqString = JSON.stringify(arquivos).replace("[Object: null prototype] ", "");
    const arquivosObj = JSON.parse(arqString);
    const arquivosCriados: any = [];

    if (arquivosObj.doc_rg)
      for (const rgFields of arquivosObj.doc_rg) {
        try {
          const nome_arquivo = rgFields.filename;
          const tipo = 'RG';
          const rg = await this.gerar({ nome_arquivo, tipo, medico_id });
          arquivosCriados.push(rg);
        } catch (erro) {
          throw new AppError("Arquivo não criado!" + erro, 500);
        }
      }

    if (arquivosObj.doc_cpf)
      for (const cpfFields of arquivosObj.doc_cpf) {
        try {
          const nome_arquivo = cpfFields.filename;
          const tipo = 'CPF';
          const cpf = await this.gerar({ nome_arquivo, tipo, medico_id });
          arquivosCriados.push(cpf);
        } catch (erro) {
          throw new AppError("Arquivo não criado!" + erro, 500);
        }
      }

    if (arquivosObj.doc_foto_txq)
      for (const fotoTpQFields of arquivosObj.doc_foto_txq) {
        try {
          const nome_arquivo = fotoTpQFields.filename;
          const tipo = 'FOTO';
          const fotoTpQ = await this.gerar({ nome_arquivo, tipo, medico_id });
          arquivosCriados.push(fotoTpQ);
        } catch (erro) {
          throw new AppError("Arquivo não criado!" + erro, 500);
        }
      }

    if (arquivosObj.doc_comp_ender)
      for (const compEnderFields of arquivosObj.doc_comp_ender) {
        try {
          const nome_arquivo = compEnderFields.filename;
          const tipo = 'CENDER';
          const compEnder = await this.gerar({ nome_arquivo, tipo, medico_id });
          arquivosCriados.push(compEnder);
        } catch (erro) {
          throw new AppError("Arquivo não criado!" + erro, 500);
        }
      }

    if (arquivosObj.doc_crm)
      for (const crmFields of arquivosObj.doc_crm) {
        try {
          const nome_arquivo = crmFields.filename;
          const tipo = 'CRM';
          const crm = await this.gerar({ nome_arquivo, tipo, medico_id });
          arquivosCriados.push(crm);
        } catch (erro) {
          throw new AppError("Arquivo não criado!" + erro, 500);
        }
      }

    if (arquivosObj.doc_cert_quit_crmmg)
      for (const certQuitCRMMGFields of arquivosObj.doc_cert_quit_crmmg) {
        try {
          const nome_arquivo = certQuitCRMMGFields.filename;
          const tipo = 'CERTQ';
          const certQuitCRMMG = await this.gerar({ nome_arquivo, tipo, medico_id });
          arquivosCriados.push(certQuitCRMMG);
        } catch (erro) {
          throw new AppError("Arquivo não criado!" + erro, 500);
        }
      }

    if (arquivosObj.doc_term_vigi)
      for (const termVigiFields of arquivosObj.doc_term_vigi) {
        try {
          const nome_arquivo = termVigiFields.filename;
          const tipo = 'TVIGI';
          const termVigi = await this.gerar({ nome_arquivo, tipo, medico_id });
          arquivosCriados.push(termVigi);
        } catch (erro) {
          throw new AppError("Arquivo não criado!" + erro, 500);
        }
      }

    if (arquivosObj.doc_term_compr)
      for (const termCompFields of arquivosObj.doc_term_compr) {
        try {
          const nome_arquivo = termCompFields.filename;
          const tipo = 'TSAIR';
          const termComp = await this.gerar({ nome_arquivo, tipo, medico_id });
          arquivosCriados.push(termComp);
        } catch (erro) {
          throw new AppError("Arquivo não criado!" + erro, 500);
        }
      }

    if (arquivosObj.docs_cert_form)
      for (const certFormFields of arquivosObj.docs_cert_form) {
        try {
          const nome_arquivo = certFormFields.filename;
          const tipo = 'FORM';
          const certForm = await this.gerar({ nome_arquivo, tipo, medico_id });
          await arquivosCriados.push(certForm);
        } catch (erro) {
          throw new AppError("Arquivo não criado!" + erro, 500);
        }
      }

    if (arquivosObj.docs_cert_espec) {
      let rqeIndex = 0;
      for (const certEspecFields of arquivosObj.docs_cert_espec) {
        try {
          const nome_arquivo = certEspecFields.filename;
          const tipo = 'RQE';
          const certEspec = await this.gerar({ nome_arquivo, tipo, medico_id });
          arquivosCriados.push(certEspec);

          const candidatura = await Candidatura.findByPk(candidatura_id)
            .catch(erro => {
              throw new AppError("Erro interno no servidor!", 500, erro);
            })
          const equipe = await Equipe.findByPk(candidatura?.get().equipe_id)
          especialidades[rqeIndex].medico_id = medico_id;
          especialidades[rqeIndex].especialidade_id = equipe?.get().especialidade_id;
          especialidades[rqeIndex].arquivo_id = certEspec.id;
          const medicoEspecialidadeService = new MedicoEspecialidadeService();
          await medicoEspecialidadeService.create(especialidades[rqeIndex]);
          rqeIndex++;
        } catch (erro) {
          throw new AppError("Arquivo não criado!" + erro, 500);
        }
      }
    }

    return arquivosCriados;
  }

  async update(arquivos: any, medico_id: number, especialidades: any, candidatura_id: number) {
    const arqString = JSON.stringify(arquivos).replace("[Object: null prototype] ", "");
    const arquivosObj = JSON.parse(arqString);
    let arquivosAtualizados: any = [];

    if (arquivosObj.doc_rg)
      for (const rgFields of arquivosObj.doc_rg) {
        try {
          const nome_arquivo = rgFields.filename;
          const tipo = 'RG';
          await this.deleteByTipo(tipo, medico_id);
          const rg = await this.gerar({ nome_arquivo, tipo, medico_id });
          arquivosAtualizados.push(rg);
        } catch (erro) {
          throw new AppError("Arquivo não criado!" + erro, 500);
        }
      }

    if (arquivosObj.doc_cpf)
      for (const cpfFields of arquivosObj.doc_cpf) {
        try {
          const nome_arquivo = cpfFields.filename;
          const tipo = 'CPF';
          await this.deleteByTipo(tipo, medico_id);
          const cpf = await this.gerar({ nome_arquivo, tipo, medico_id });
          arquivosAtualizados.push(cpf);
        } catch (erro) {
          throw new AppError("Arquivo não criado!" + erro, 500);
        }
      }

    if (arquivosObj.doc_foto_txq)
      for (const fotoTpQFields of arquivosObj.doc_foto_txq) {
        try {
          const nome_arquivo = fotoTpQFields.filename;
          const tipo = 'FOTO';
          await this.deleteByTipo(tipo, medico_id);
          const fotoTpQ = await this.gerar({ nome_arquivo, tipo, medico_id });
          arquivosAtualizados.push(fotoTpQ);
        } catch (erro) {
          throw new AppError("Arquivo não criado!" + erro, 500);
        }
      }

    if (arquivosObj.doc_comp_ender)
      for (const compEnderFields of arquivosObj.doc_comp_ender) {
        try {
          const nome_arquivo = compEnderFields.filename;
          const tipo = 'CENDER';
          await this.deleteByTipo(tipo, medico_id);
          const compEnder = await this.gerar({ nome_arquivo, tipo, medico_id });
          arquivosAtualizados.push(compEnder);
        } catch (erro) {
          throw new AppError("Arquivo não criado!" + erro, 500);
        }
      }

    if (arquivosObj.doc_crm)
      for (const crmFields of arquivosObj.doc_crm) {
        try {
          const nome_arquivo = crmFields.filename;
          const tipo = 'CRM';
          await this.deleteByTipo(tipo, medico_id);
          const crm = await this.gerar({ nome_arquivo, tipo, medico_id });
          arquivosAtualizados.push(crm);
        } catch (erro) {
          throw new AppError("Arquivo não criado!" + erro, 500);
        }
      }

    if (arquivosObj.doc_cert_quit_crmmg)
      for (const certQuitCRMMGFields of arquivosObj.doc_cert_quit_crmmg) {
        try {
          const nome_arquivo = certQuitCRMMGFields.filename;
          const tipo = 'CERTQ';
          await this.deleteByTipo(tipo, medico_id);
          const certQuitCRMMG = await this.gerar({ nome_arquivo, tipo, medico_id });
          arquivosAtualizados.push(certQuitCRMMG);
        } catch (erro) {
          throw new AppError("Arquivo não criado!" + erro, 500);
        }
      }

    if (arquivosObj.doc_term_vigi)
      for (const termVigiFields of arquivosObj.doc_term_vigi) {
        try {
          const nome_arquivo = termVigiFields.filename;
          const tipo = 'TVIGI';
          await this.deleteByTipo(tipo, medico_id);
          const termVigi = await this.gerar({ nome_arquivo, tipo, medico_id });
          arquivosAtualizados.push(termVigi);
        } catch (erro) {
          throw new AppError("Arquivo não criado!" + erro, 500);
        }
      }

    if (arquivosObj.doc_term_compr)
      for (const termCompFields of arquivosObj.doc_term_compr) {
        try {
          const nome_arquivo = termCompFields.filename;
          const tipo = 'TSAIR';
          await this.deleteByTipo(tipo, medico_id);
          const termComp = await this.gerar({ nome_arquivo, tipo, medico_id });
          arquivosAtualizados.push(termComp);
        } catch (erro) {
          throw new AppError("Arquivo não criado!" + erro, 500);
        }
      }

    if (arquivosObj.docs_cert_form)
      for (const certFormFields of arquivosObj.docs_cert_form) {
        try {
          const nome_arquivo = certFormFields.filename;
          const tipo = 'FORM';
          const certForm = await this.gerar({ nome_arquivo, tipo, medico_id });
          await arquivosAtualizados.push(certForm);
        } catch (erro) {
          throw new AppError("Arquivo não criado!" + erro, 500);
        }
      }

    let especialidadesId: number[] = [];
    let index = 0;
    for (const especialidade of especialidades) {
      try {
        const candidatura = await Candidatura.findByPk(candidatura_id)
          .catch(erro => {
            throw new AppError("Erro interno no servidor!", 500, erro);
          })
        const equipe = await Equipe.findByPk(candidatura?.get().equipe_id)
        const especialidadeId = equipe?.get().especialidade_id; // Captura o id da especialidade candidatada

        const medicoEspecialidadeService = new MedicoEspecialidadeService();
        let espec: any;

        // Verificar se vai atualizar uma especialidade para caso não, criar outra.
        try {
          espec = await medicoEspecialidadeService.getById(especialidade.id);
        } catch (error) {
          espec = null;
        }

        let arquivoApagar: number = 0;

        // Se o "arquivo_id" for null quer dizer que vai ter arquivo novo e precisa do arquivoApagar para apagar o antigo
        if (especialidade.arquivo_id == null) {

          // Captura o id do antigo arquivo da especialidade, para apagar
          if (espec)
            arquivoApagar = espec?.get().arquivo_id;

          // Já que o arquivo_id é null, criar um novo arquivo para a especialidade
          const nome_arquivo = arquivosObj.docs_cert_espec[index].filename;
          const tipo = 'RQE';
          const certEspec = await this.gerar({ nome_arquivo, tipo, medico_id });
          arquivosAtualizados.push(certEspec);
          especialidade.arquivo_id = certEspec.id; // Atualiza o id do novo arquivo enviado
        }

        // Caso for atualizar criando uma especialidade nova
        if (!espec) {
          especialidade.medico_id = medico_id;
          especialidade.especialidade_id = especialidadeId;
          await medicoEspecialidadeService.create(especialidade);
          especialidadesId.push(especialidade.id);
        } else { // Caso seja atualizar uma existente
          especialidade.medico_id = medico_id;
          especialidade.especialidade_id = especialidadeId;
          especialidadesId.push(especialidade.id);
          await medicoEspecialidadeService.update(especialidade);
        }

        if (arquivoApagar != 0) {
          if (!arquivoApagar)
            throw new AppError("Erro ao deletar artigo arquivo.", 500);
          await this.deleteById(arquivoApagar);
        }

        index++;
      } catch (error) {
        throw new AppError("Arquivo não criado!" + error, 500);
      }
    }
    // Deletar todas as especialidades do médico que não estiverem nas especialidadesId atualizadas
    await MedicoEspecialidade.destroy({
      where: {
        [Op.and]: [
          { medico_id: medico_id },
          {
            id: {
              [Op.notIn]: especialidadesId
            }
          }
        ]
      }
    })

    return arquivosAtualizados;
  }

  async deleteById(id: number) {
    try {
      await Arquivo.destroy({
        where: {
          id: id
        },
        force: true
      });
    } catch (erro) {
      throw new AppError("Arquivo não criado! " + erro, 404);
    }
  }

  // TODO @Lucas-Angelo problema aqui irá apagar todas as especialidades quando atualizar uma, tem que criar formacao
  async deleteByTipo(tipo: string, medico_id: number) {
    if (tipo != "FORM")
      try {
        const arquivo = await Arquivo.findOne({
          where: {
            tipo: tipo,
            medico_id: medico_id
          }
        });
        await Arquivo.destroy({
          where: {
            id: arquivo?.get().id
          },
          force: true
        });
      } catch (erro) {
        throw new AppError("Arquivo não criado! " + erro, 404);
      }
  }

  async gerar(arquivo: IAtributosArquivoCriacao) {
    try {
      return Arquivo.create(arquivo);
    } catch (erro) {
      throw new AppError("Arquivo não criado!", 500, erro);
    }
  }

}
