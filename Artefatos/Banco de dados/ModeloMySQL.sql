-- MySQL Script generated by MySQL Workbench
-- Sat Nov 20 10:31:45 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema corpoclinico
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema corpoclinico
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `corpoclinico` DEFAULT CHARACTER SET utf8 ;
USE `corpoclinico` ;

-- -----------------------------------------------------
-- Table `corpoclinico`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `corpoclinico`.`usuario` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL,
  `senha` VARCHAR(64) NOT NULL,
  `nome` VARCHAR(120) NOT NULL,
  `tipo` ENUM('A', 'M', 'CC', 'DC', 'DT') NOT NULL COMMENT 'A: Admin\nM: Médico\nCC: Coordenador clínico\nDC: Diretor clínico\nDT: Diretor técnico',
  `data_excluido` TIMESTAMP NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `corpoclinico`.`medico`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `corpoclinico`.`medico` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `usuario_id` INT UNSIGNED NOT NULL,
  `crm` VARCHAR(20) NOT NULL,
  `regiao` CHAR(2) NOT NULL,
  `dt_inscricao_crm` DATE NOT NULL,
  `celular` VARCHAR(14) NOT NULL,
  `cartao_sus` VARCHAR(25) NULL,
  `categoria` ENUM('E', 'T', 'C') NULL COMMENT 'Efetivo, Temporario, Contratado',
  `rg` VARCHAR(14) NULL,
  `rg_orgao_emissor` VARCHAR(30) NULL,
  `rg_data_emissao` DATE NULL,
  `dt_nascimento` DATE NULL,
  `cpf` VARCHAR(14) NULL,
  `titulo_eleitoral` VARCHAR(12) NULL,
  `zona` CHAR(3) NULL COMMENT 'Zona Eleitoral',
  `secao` CHAR(4) NULL COMMENT 'Seção Eleitoral',
  `logradouro` VARCHAR(100) NOT NULL,
  `numero` SMALLINT NOT NULL,
  `complemento` VARCHAR(20) NULL,
  `bairro` VARCHAR(45) NOT NULL,
  `cidade` VARCHAR(100) NOT NULL,
  `estado` CHAR(2) NOT NULL,
  `cep` CHAR(8) NOT NULL,
  `sociedade_cientifica` VARCHAR(100) NULL,
  `escolaridade_max` ENUM('BACHA', 'ESPE', 'MESTRE', 'DOUTOR') NOT NULL COMMENT 'BACHA = bacharel\nESPE = especialista',
  `ativo` TINYINT(1) UNSIGNED NOT NULL COMMENT '0 = desativado\nOutro valor = ativo',
  `assistiu_videos` TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `cartao_sus_UNIQUE` (`cartao_sus` ASC) VISIBLE,
  UNIQUE INDEX `crm_UNIQUE` (`crm` ASC) VISIBLE,
  UNIQUE INDEX `rg_UNIQUE` (`rg` ASC) VISIBLE,
  UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC) VISIBLE,
  UNIQUE INDEX `titulo_eleitoral_UNIQUE` (`titulo_eleitoral` ASC) VISIBLE,
  CONSTRAINT `fk_medico_usuario`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `corpoclinico`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `corpoclinico`.`especialidade`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `corpoclinico`.`especialidade` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `identificacao` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `corpoclinico`.`equipe`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `corpoclinico`.`equipe` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(50) NOT NULL,
  `especialidade_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_equipe_especialidade1_idx` (`especialidade_id` ASC) VISIBLE,
  CONSTRAINT `fk_equipe_especialidade1`
    FOREIGN KEY (`especialidade_id`)
    REFERENCES `corpoclinico`.`especialidade` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `corpoclinico`.`unidade`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `corpoclinico`.`unidade` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(80) NULL,
  `cep` CHAR(8) NULL,
  `cidade` VARCHAR(100) NULL,
  `logradouro` VARCHAR(100) NULL,
  `bairro` VARCHAR(45) NULL,
  `numero` SMALLINT NULL,
  `ativo` TINYINT(1) UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `corpoclinico`.`candidatura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `corpoclinico`.`candidatura` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `medico_id` INT UNSIGNED NOT NULL,
  `faturamento` ENUM('PJ', 'C') NOT NULL COMMENT 'Pessoa Juridica\nCooperado',
  `cnpj` CHAR(14) NULL,
  `unidade_id` INT UNSIGNED NOT NULL,
  `equipe_id` INT UNSIGNED NOT NULL,
  `data_criado` DATE NOT NULL DEFAULT CURRENT_DATE,
  PRIMARY KEY (`id`),
  INDEX `fk_candidatura_medico1_idx` (`medico_id` ASC) VISIBLE,
  INDEX `fk_candidatura_unidade1_idx` (`unidade_id` ASC) VISIBLE,
  INDEX `fk_candidatura_equipe1_idx` (`equipe_id` ASC) VISIBLE,
  CONSTRAINT `fk_candidatura_medico1`
    FOREIGN KEY (`medico_id`)
    REFERENCES `corpoclinico`.`medico` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_candidatura_unidade1`
    FOREIGN KEY (`unidade_id`)
    REFERENCES `corpoclinico`.`unidade` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_candidatura_equipe1`
    FOREIGN KEY (`equipe_id`)
    REFERENCES `corpoclinico`.`equipe` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `corpoclinico`.`arquivos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `corpoclinico`.`arquivos` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome_arquivo` VARCHAR(64) NOT NULL,
  `tipo` ENUM('FOTO', 'RG', 'CPF', 'TITULO', 'CENDER', 'CRM', 'CERTQ', 'TVIGI', 'RQE', 'VACINA', 'FORM', 'TSAIR') NOT NULL COMMENT 'CENDER: Comprovante de endereço\nCERTQ: Certificado de quitação CRMMG\nTVIGI: Termo de Vigilância\nFORM: Certificado de formação/faculdade\nTSAIR: Termo de compromisso de saída do corpo clínico',
  `medico_id` INT UNSIGNED NOT NULL,
  UNIQUE INDEX `nome_arquivo_UNIQUE` (`nome_arquivo` ASC) VISIBLE,
  INDEX `fk_arquivos_medico1_idx` (`medico_id` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_arquivos_medico1`
    FOREIGN KEY (`medico_id`)
    REFERENCES `corpoclinico`.`medico` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `corpoclinico`.`medico_especialidade`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `corpoclinico`.`medico_especialidade` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `medico_id` INT UNSIGNED NOT NULL,
  `especialidade_id` INT UNSIGNED NOT NULL,
  `arquivo_id` INT UNSIGNED NOT NULL,
  `rqe` VARCHAR(20) NOT NULL,
  `instituicao` VARCHAR(60) NOT NULL,
  `ano_formatura` YEAR NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_medico_especialidade_especialidade1_idx` (`especialidade_id` ASC) VISIBLE,
  INDEX `fk_medico_especialidade_arquivos1_idx` (`arquivo_id` ASC) VISIBLE,
  CONSTRAINT `fk_medico_especialidade_medico1`
    FOREIGN KEY (`medico_id`)
    REFERENCES `corpoclinico`.`medico` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_medico_especialidade_especialidade1`
    FOREIGN KEY (`especialidade_id`)
    REFERENCES `corpoclinico`.`especialidade` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_medico_especialidade_arquivos1`
    FOREIGN KEY (`arquivo_id`)
    REFERENCES `corpoclinico`.`arquivos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `corpoclinico`.`retorno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `corpoclinico`.`retorno` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `avaliador_id` INT UNSIGNED NOT NULL,
  `candidatura_id` INT UNSIGNED NOT NULL,
  `comentario` TEXT NULL,
  `status` ENUM('P', 'R', 'A') NOT NULL DEFAULT 'P' COMMENT 'Pendente\nRecusado\nAprovado',
  PRIMARY KEY (`id`),
  INDEX `fk_retorno_usuario1_idx` (`avaliador_id` ASC) VISIBLE,
  INDEX `fk_retorno_candidatura1_idx` (`candidatura_id` ASC) VISIBLE,
  CONSTRAINT `fk_retorno_usuario1`
    FOREIGN KEY (`avaliador_id`)
    REFERENCES `corpoclinico`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_retorno_candidatura1`
    FOREIGN KEY (`candidatura_id`)
    REFERENCES `corpoclinico`.`candidatura` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `corpoclinico`.`medico_formacao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `corpoclinico`.`medico_formacao` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `medico_id` INT UNSIGNED NOT NULL,
  `arquivo_id` INT UNSIGNED NOT NULL,
  `faculdade_nome` VARCHAR(60) NULL,
  `faculdade_ano_formatura` YEAR NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_medico_formacao_medico1_idx` (`medico_id` ASC) VISIBLE,
  INDEX `fk_medico_formacao_arquivos1_idx` (`arquivo_id` ASC) VISIBLE,
  CONSTRAINT `fk_medico_formacao_medico1`
    FOREIGN KEY (`medico_id`)
    REFERENCES `corpoclinico`.`medico` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_medico_formacao_arquivos1`
    FOREIGN KEY (`arquivo_id`)
    REFERENCES `corpoclinico`.`arquivos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `corpoclinico`.`video`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `corpoclinico`.`video` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `link` VARCHAR(250) NOT NULL,
  `prioridade` TINYINT NOT NULL,
  `ativo` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
