import AppError from "../errors/AppError";
import Arquivo, { IAtributosArquivoCriacao } from "../models/Arquivo";
import MedicoFormacaoService from "./MedicoFormacaoService";

export default class ArquivoService {

  async create(arquivos: any, medico_id: number) {
    const arqString = JSON.stringify(arquivos).replace("[Object: null prototype] ", "");
    const arquivosObj = JSON.parse(arqString);

    arquivosObj.doc_rg?.forEach(async (rgFields: any) => {
      try {
        const nome_arquivo = rgFields.filename;
        const tipo = 'RG';
        const rg = await this.gerar({ nome_arquivo, tipo, medico_id });
        return rg;
      } catch (erro) {
        throw new AppError("Arquivo não criado!", 500);
      }
    });

    arquivosObj.doc_cpf?.forEach(async (cpfFields: any) => {
      try {
        const nome_arquivo = cpfFields.filename;
        const tipo = 'CPF';
        const cpf = await this.gerar({ nome_arquivo, tipo, medico_id });
        return cpf;
      } catch (erro) {
        throw new AppError("Arquivo não criado!", 500, erro);
      }
    });

    arquivosObj.doc_foto_txq?.forEach(async (fotoTpQFields: any) => {
      try {
        const nome_arquivo = fotoTpQFields.filename;
        const tipo = 'FOTO';
        const fotoTpQ = await this.gerar({ nome_arquivo, tipo, medico_id });
        return fotoTpQ;
      } catch (erro) {
        throw new AppError("Arquivo não criado!", 500, erro);
      }
    });

    arquivosObj.doc_comp_ender?.forEach(async (compEnderFields: any) => {
      try {
        const nome_arquivo = compEnderFields.filename;
        const tipo = 'CENDER';
        const compEnder = await this.gerar({ nome_arquivo, tipo, medico_id });
        return compEnder;
      } catch (erro) {
        throw new AppError("Arquivo não criado!", 500, erro);
      }
    });

    arquivosObj.doc_crm?.forEach(async (crmFields: any) => {
      try {
        const nome_arquivo = crmFields.filename;
        const tipo = 'CRM';
        const crm = await this.gerar({ nome_arquivo, tipo, medico_id });
        return crm;
      } catch (erro) {
        throw new AppError("Arquivo não criado!", 500, erro);
      }
    });

    arquivosObj.doc_cert_quit_crmmg?.forEach(async (certQuitCRMMGFields: any) => {
      try {
        const nome_arquivo = certQuitCRMMGFields.filename;
        const tipo = 'CERTQ';
        const certQuitCRMMG = await this.gerar({ nome_arquivo, tipo, medico_id });
        return certQuitCRMMG;
      } catch (erro) {
        throw new AppError("Arquivo não criado!", 500, erro);
      }
    });

    arquivosObj.doc_term_vigi?.forEach(async (termVigiFields: any) => {
      try {
        const nome_arquivo = termVigiFields.filename;
        const tipo = 'TVIGI';
        const termVigi = await this.gerar({ nome_arquivo, tipo, medico_id });
        return termVigi;
      } catch (erro) {
        throw new AppError("Arquivo não criado!", 500, erro);
      }
    });

    arquivosObj.doc_term_compr?.forEach(async (termCompFields: any) => {
      try {
        const nome_arquivo = termCompFields.filename;
        const tipo = 'TSAIR';
        const termComp = await this.gerar({ nome_arquivo, tipo, medico_id });
        return termComp;
      } catch (erro) {
        throw new AppError("Arquivo não criado!", 500, erro);
      }
    });

    arquivosObj.docs_cert_form?.forEach(async (certFormFields: any) => {
      try {
        const nome_arquivo = certFormFields.filename;
        const tipo = 'FORM';
        const certForm = await this.gerar({ nome_arquivo, tipo, medico_id });
        return certForm;
      } catch (erro) {
        throw new AppError("Arquivo não criado!", 500, erro);
      }
    });

    arquivosObj.docs_cert_espec?.forEach(async (certEspecFields: any) => {
      try {
        const nome_arquivo = certEspecFields.filename;
        const tipo = 'FORM'; // ! @guizombas quando acabar o médico especialidade tem que integrar nessa parte tipo assim
        const certEspec = await this.gerar({ nome_arquivo, tipo, medico_id });
        return certEspec;
      } catch (erro) {
        throw new AppError("Arquivo não criado!", 500, erro);
      }
    });

  }

  async update(arquivos: any, medico_id: number) {
    const arqString = JSON.stringify(arquivos).replace("[Object: null prototype] ", "");
    const arquivosObj = JSON.parse(arqString);

    arquivosObj.doc_rg?.forEach(async (rgFields: any) => {
      try {
        const nome_arquivo = rgFields.filename;
        const tipo = 'RG';
        await this.deleteByTipo(tipo, medico_id);
        const rg = await this.gerar({ nome_arquivo, tipo, medico_id });
        return rg;
      } catch (erro) {
        throw new AppError("Arquivo não criado!" + erro, 500);
      }
    });

    arquivosObj.doc_cpf?.forEach(async (cpfFields: any) => {
      try {
        const nome_arquivo = cpfFields.filename;
        const tipo = 'CPF';
        await this.deleteByTipo(tipo, medico_id);
        const cpf = await this.gerar({ nome_arquivo, tipo, medico_id });
        return cpf;
      } catch (erro) {
        throw new AppError("Arquivo não criado!" + erro, 500);
      }
    });

    arquivosObj.doc_foto_txq?.forEach(async (fotoTpQFields: any) => {
      try {
        const nome_arquivo = fotoTpQFields.filename;
        const tipo = 'FOTO';
        await this.deleteByTipo(tipo, medico_id);
        const fotoTpQ = await this.gerar({ nome_arquivo, tipo, medico_id });
        return fotoTpQ;
      } catch (erro) {
        throw new AppError("Arquivo não criado!" + erro, 500);
      }
    });

    arquivosObj.doc_comp_ender?.forEach(async (compEnderFields: any) => {
      try {
        const nome_arquivo = compEnderFields.filename;
        const tipo = 'CENDER';
        await this.deleteByTipo(tipo, medico_id);
        const compEnder = await this.gerar({ nome_arquivo, tipo, medico_id });
        return compEnder;
      } catch (erro) {
        throw new AppError("Arquivo não criado!" + erro, 500);
      }
    });

    arquivosObj.doc_crm?.forEach(async (crmFields: any) => {
      try {
        const nome_arquivo = crmFields.filename;
        const tipo = 'CRM';
        await this.deleteByTipo(tipo, medico_id);
        const crm = await this.gerar({ nome_arquivo, tipo, medico_id });
        return crm;
      } catch (erro) {
        throw new AppError("Arquivo não criado!" + erro, 500);
      }
    });

    arquivosObj.doc_cert_quit_crmmg?.forEach(async (certQuitCRMMGFields: any) => {
      try {
        const nome_arquivo = certQuitCRMMGFields.filename;
        const tipo = 'CERTQ';
        await this.deleteByTipo(tipo, medico_id);
        const certQuitCRMMG = await this.gerar({ nome_arquivo, tipo, medico_id });
        return certQuitCRMMG;
      } catch (erro) {
        throw new AppError("Arquivo não criado!" + erro, 500);
      }
    });

    arquivosObj.doc_term_vigi?.forEach(async (termVigiFields: any) => {
      try {
        const nome_arquivo = termVigiFields.filename;
        const tipo = 'TVIGI';
        await this.deleteByTipo(tipo, medico_id);
        const termVigi = await this.gerar({ nome_arquivo, tipo, medico_id });
        return termVigi;
      } catch (erro) {
        throw new AppError("Arquivo não criado!" + erro, 500);
      }
    });

    arquivosObj.doc_term_compr?.forEach(async (termCompFields: any) => {
      try {
        const nome_arquivo = termCompFields.filename;
        const tipo = 'TSAIR';
        await this.deleteByTipo(tipo, medico_id);
        const termComp = await this.gerar({ nome_arquivo, tipo, medico_id });
        return termComp;
      } catch (erro) {
        throw new AppError("Arquivo não criado!" + erro, 500);
      }
    });

    arquivosObj.docs_cert_form?.forEach(async (certFormFields: any) => {
      try {
        const nome_arquivo = certFormFields.filename;
        const tipo = 'FORM';
        const certForm = await this.gerar({ nome_arquivo, tipo, medico_id });
        const medicoFormacaoService = new MedicoFormacaoService();
        // const medicoFormacao = medicoFormacaoService.create()
        return certForm;
      } catch (erro) {
        throw new AppError("Arquivo não criado!" + erro, 500);
      }
    });

    arquivosObj.docs_cert_espec?.forEach(async (certEspecFields: any) => {
      try {
        const nome_arquivo = certEspecFields.filename;
        const tipo = 'FORM'; // ! @guizombas quando acabar o médico especialidade tem que integrar nessa parte tipo assim
        const certEspec = await this.gerar({ nome_arquivo, tipo, medico_id });
        return certEspec;
      } catch (erro) {
        throw new AppError("Arquivo não criado!" + erro, 500);
      }
    });
  }

  async deleteById(id : number) {
    try {
      await Arquivo.destroy({
        where: {
          id: id
        },
        force: true
      });
      console.log(id)
    } catch (erro) {
      throw new AppError("Arquivo não criado! " + erro, 404);
    }
  }

  // TODO @Lucas-Angelo problema aqui irá apagar todas as especialidades quando atualizar uma, tem que criar formacao
  async deleteByTipo(tipo : string, medico_id : number) {
    if(tipo!="FORM")
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
