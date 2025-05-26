CREATE DATABASE biblioteca_banco;
USE biblioteca_banco;

CREATE TABLE usuarios (
  id BIGINT AUTO_INCREMENT,
  cpf VARCHAR(11) NOT NULL,
  nome VARCHAR(255) NOT NULL,
  data_nascimento DATE NOT NULL,
  telefone VARCHAR(15) NOT NULL,
  email VARCHAR(255) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  cep VARCHAR(9) NOT NULL,
  endereco TEXT,
  tipo_usuario ENUM('administrador', 'estudante', 'professor', 'publico') NOT NULL,
  bloqueado BOOLEAN NOT NULL,
  ativo BOOLEAN NOT NULL,
  primeiro_acesso BOOLEAN NOT NULL,
  data_criacao TIMESTAMP NOT NULL,
  data_alteracao TIMESTAMP NULL,
  CONSTRAINT pk_usuarios PRIMARY KEY (id),
  CONSTRAINT uk_usuarios_cpf UNIQUE (cpf),
  CONSTRAINT uk_usuarios_email UNIQUE (email)
);

CREATE TABLE infracoes (
  id BIGINT AUTO_INCREMENT,
  usuario_id BIGINT NOT NULL,
  tipo_infracao ENUM('atraso', 'dano', 'extravio', 'comportamento', 'acesso_indevido', 'configuracao', 'regras') NOT NULL,
  grau_infracao ENUM('leve', 'moderado', 'grave') NOT NULL,
  status ENUM('pendente', 'regularizada') NOT NULL,
  motivo TEXT,
  data_inicio DATE NOT NULL,
  data_fim DATE,
  data_criacao TIMESTAMP NOT NULL,
  data_alteracao TIMESTAMP NULL,
  CONSTRAINT pk_infracoes PRIMARY KEY (id)
);

CREATE TABLE generos (
  id BIGINT AUTO_INCREMENT,
  descricao VARCHAR(255) NOT NULL,
  ativo BOOLEAN NOT NULL,
  data_criacao TIMESTAMP NOT NULL,
  data_alteracao TIMESTAMP NULL,
  CONSTRAINT pk_generos PRIMARY KEY (id)
);

CREATE TABLE fornecedores (
  id BIGINT AUTO_INCREMENT,
  cnpj VARCHAR(14) NOT NULL,
  razao_social VARCHAR(255) NOT NULL,
  telefone VARCHAR(15) NOT NULL,
  email VARCHAR(255) NOT NULL,
  endereco TEXT,
  inscricao_estadual VARCHAR(20),
  representante VARCHAR(255),
  ativo BOOLEAN NOT NULL,
  data_criacao TIMESTAMP NOT NULL,
  data_alteracao TIMESTAMP NULL,
  CONSTRAINT pk_fornecedores PRIMARY KEY (id),
  CONSTRAINT uk_fornecedores_cnpj UNIQUE (cnpj)
);

CREATE TABLE metodos_pagamentos (
  id BIGINT AUTO_INCREMENT,
  fornecedor_id BIGINT NOT NULL,
  tipo_pagamento ENUM('boleto', 'cartao', 'pix') NOT NULL,
  prazo INT,
  parcela_maxima INT,
  chave_pix VARCHAR(255),
  tipo_desconto ENUM('volume', 'antecipacao'),
  data_criacao TIMESTAMP NOT NULL,
  data_alteracao TIMESTAMP NULL,
  CONSTRAINT pk_metodos_pagamentos PRIMARY KEY (id)
);

CREATE TABLE fornecedores_generos (
  fornecedor_id BIGINT NOT NULL,
  genero_id BIGINT NOT NULL,
  CONSTRAINT pk_fornecedores_generos PRIMARY KEY (fornecedor_id, genero_id)
);

CREATE TABLE categorias (
  id BIGINT AUTO_INCREMENT,
  descricao VARCHAR(255) NOT NULL,
  ativo BOOLEAN NOT NULL,
  data_criacao TIMESTAMP NOT NULL,
  data_alteracao TIMESTAMP NULL,
  CONSTRAINT pk_categorias PRIMARY KEY (id)
);

CREATE TABLE autores (
  id BIGINT AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL,
  nacionalidade VARCHAR(50) NOT NULL,
  data_nascimento DATE NOT NULL,
  biografia TEXT,
  ativo BOOLEAN NOT NULL,
  data_criacao TIMESTAMP NOT NULL,
  data_alteracao TIMESTAMP NULL,
  CONSTRAINT pk_autores PRIMARY KEY (id)
);

CREATE TABLE acervos (
  id BIGINT AUTO_INCREMENT,
  autor_id BIGINT NOT NULL,
  genero_id BIGINT NOT NULL,
  categoria_id BIGINT NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  numero_edicao INT NOT NULL,
  editora VARCHAR(255) NOT NULL,
  data_publicacao DATE NOT NULL,
  numero_pagina INT NOT NULL,
  isbn VARCHAR(255) NOT NULL,
  ativo BOOLEAN NOT NULL,
  data_criacao TIMESTAMP NOT NULL,
  data_alteracao TIMESTAMP NULL,
  CONSTRAINT pk_acervos PRIMARY KEY (id)
);

CREATE TABLE assinaturas (
  id BIGINT AUTO_INCREMENT,
  fornecedor_id BIGINT NOT NULL,
  descricao VARCHAR(255) NOT NULL,
  periodicidade ENUM('semanal', 'mensal', 'anual') NOT NULL,
  numero_contrato VARCHAR(255),
  valor DECIMAL NOT NULL,
  data_inicio DATE NOT NULL,
  data_fim DATE,
  ativo BOOLEAN NOT NULL,
  data_criacao TIMESTAMP NOT NULL,
  data_alteracao TIMESTAMP NULL,
  CONSTRAINT pk_assinaturas PRIMARY KEY (id)
);

CREATE TABLE doadores (
  id BIGINT AUTO_INCREMENT,
  tipo_pessoa ENUM('pf', 'pj') NOT NULL,
  nome VARCHAR(255) NOT NULL,
  documento VARCHAR(18) NOT NULL,
  email VARCHAR(255),
  telefone VARCHAR(15),
  endereco TEXT,
  ativo BOOLEAN NOT NULL,
  data_criacao TIMESTAMP NOT NULL,
  data_alteracao TIMESTAMP NULL,
  CONSTRAINT pk_doadores PRIMARY KEY (id),
  CONSTRAINT uk_doadores_documento UNIQUE (documento)
);

CREATE TABLE motivos_baixas (
  id BIGINT AUTO_INCREMENT,
  descricao VARCHAR(255) NOT NULL,
  ativo BOOLEAN NOT NULL,
  data_criacao TIMESTAMP NOT NULL,
  data_alteracao TIMESTAMP NULL,
  CONSTRAINT pk_motivos_baixas PRIMARY KEY (id)
);

CREATE TABLE compras (
  id BIGINT AUTO_INCREMENT,
  fornecedor_id BIGINT NOT NULL,
  metodo_pagamento_id BIGINT NOT NULL,
  tipo_produto ENUM('acervo', 'material', 'equipamento') NOT NULL,
  numero_empenho VARCHAR(255) NOT NULL,
  status ENUM('em_andamento', 'finalizada', 'cancelada', 'reprovada') NOT NULL,
  data_criacao TIMESTAMP NOT NULL,
  data_alteracao TIMESTAMP NULL,
  CONSTRAINT pk_compras PRIMARY KEY (id),
  CONSTRAINT uk_compras_numero_empenho UNIQUE (numero_empenho)
);

CREATE TABLE compras_itens (
  id BIGINT AUTO_INCREMENT,
  compra_id BIGINT NOT NULL,
  acervo_id BIGINT,
  quantidade INT NOT NULL,
  valor_unitario DECIMAL NOT NULL,
  data_criacao TIMESTAMP NOT NULL,
  CONSTRAINT pk_compras_itens PRIMARY KEY (id)
);

CREATE TABLE entradas_acervos (
  id BIGINT AUTO_INCREMENT,
  acervo_id BIGINT NOT NULL,
  tipo_origem ENUM('compra', 'assinatura', 'doacao') NOT NULL,
  origem_id BIGINT NOT NULL,
  quantidade INT NOT NULL,
  data_entrada DATE NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_alteracao TIMESTAMP NULL,
  CONSTRAINT pk_entradas_acervos PRIMARY KEY (id)
);

CREATE TABLE exemplares (
  id BIGINT AUTO_INCREMENT,
  acervo_id BIGINT NOT NULL,
  entrada_acervo_id BIGINT NOT NULL,
  tombo VARCHAR(255) NOT NULL,
  status ENUM('disponivel', 'emprestado', 'reservado', 'baixado') NOT NULL,
  estado ENUM('novo', 'usado', 'danificado') NOT NULL,
  data_criacao TIMESTAMP NOT NULL,
  data_alteracao TIMESTAMP NULL,
  CONSTRAINT pk_exemplares PRIMARY KEY (id),
  CONSTRAINT uk_exemplares_tombo UNIQUE (tombo)
);

CREATE TABLE movimentacoes_exemplares (
  id BIGINT AUTO_INCREMENT,
  exemplar_id BIGINT NOT NULL,
  usuario_id BIGINT NOT NULL,
  etapa ENUM('reserva', 'emprestimo', 'renovacao', 'devolucao') NOT NULL,
  status ENUM('ativa', 'finalizada', 'cancelada', 'expirada') NOT NULL,
  grupo_id BIGINT,
  referencia_id BIGINT,
  data_inicio TIMESTAMP NOT NULL,
  data_prevista TIMESTAMP NOT NULL,
  data_fim TIMESTAMP NULL,
  numero_renovacao INT DEFAULT 0,
  observacoes TEXT,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_atualizacao TIMESTAMP NULL,
  CONSTRAINT pk_movimentacoes_exemplares PRIMARY KEY (id)
);

CREATE TABLE baixas_exemplares (
  id BIGINT AUTO_INCREMENT,
  exemplar_id BIGINT NOT NULL,
  motivo_baixa_id BIGINT NOT NULL,
  observacoes TEXT,
  data_criacao TIMESTAMP NOT NULL,
  CONSTRAINT pk_baixas_exemplares PRIMARY KEY (id)
);

-- FOREIGN KEYS

ALTER TABLE infracoes ADD CONSTRAINT fk_infracoes_usuario_id FOREIGN KEY (usuario_id) REFERENCES usuarios(id);

ALTER TABLE metodos_pagamentos ADD CONSTRAINT fk_met_pag_fornecedor_id FOREIGN KEY (fornecedor_id) REFERENCES fornecedores(id);

ALTER TABLE fornecedores_generos ADD CONSTRAINT fk_forn_gen_fornecedor_id FOREIGN KEY (fornecedor_id) REFERENCES fornecedores(id);
ALTER TABLE fornecedores_generos ADD CONSTRAINT fk_forn_gen_genero_id FOREIGN KEY (genero_id) REFERENCES generos(id);

ALTER TABLE acervos ADD CONSTRAINT fk_acervos_categoria_id FOREIGN KEY (categoria_id) REFERENCES categorias(id);
ALTER TABLE acervos ADD CONSTRAINT fk_acervos_autor_id FOREIGN KEY (autor_id) REFERENCES autores(id);
ALTER TABLE acervos ADD CONSTRAINT fk_acervos_genero_id FOREIGN KEY (genero_id) REFERENCES generos(id);

ALTER TABLE assinaturas ADD CONSTRAINT fk_assinaturas_fornecedor_id FOREIGN KEY (fornecedor_id) REFERENCES fornecedores(id);

ALTER TABLE compras ADD CONSTRAINT fk_compras_fornecedor_id FOREIGN KEY (fornecedor_id) REFERENCES fornecedores(id);
ALTER TABLE compras ADD CONSTRAINT fk_compras_metodo_pagto_id FOREIGN KEY (metodo_pagamento_id) REFERENCES metodos_pagamentos(id);

ALTER TABLE compras_itens ADD CONSTRAINT fk_comp_itens_compra_id FOREIGN KEY (compra_id) REFERENCES compras(id);
ALTER TABLE compras_itens ADD CONSTRAINT fk_comp_itens_acervo_id FOREIGN KEY (acervo_id) REFERENCES acervos(id);

-- para entradas_acervos, o relacionamento com origem (compra, doacao ou assinatura) deve ser resolvido na aplicação

ALTER TABLE entradas_acervos ADD CONSTRAINT fk_entradas_acervo_id FOREIGN KEY (acervo_id) REFERENCES acervos(id);

ALTER TABLE exemplares ADD CONSTRAINT fk_exemplares_acervo_id FOREIGN KEY (acervo_id) REFERENCES acervos(id);
ALTER TABLE exemplares ADD CONSTRAINT fk_exemplares_entrada_id FOREIGN KEY (entrada_acervo_id) REFERENCES entradas_acervos(id);

ALTER TABLE movimentacoes_exemplares ADD CONSTRAINT fk_mov_exemp_exemplar_id FOREIGN KEY (exemplar_id) REFERENCES exemplares(id);
ALTER TABLE movimentacoes_exemplares ADD CONSTRAINT fk_mov_exemp_usuario_id FOREIGN KEY (usuario_id) REFERENCES usuarios(id);
ALTER TABLE movimentacoes_exemplares ADD CONSTRAINT fk_mov_exemp_grupo_id FOREIGN KEY (grupo_id) REFERENCES movimentacoes_exemplares(id);
ALTER TABLE movimentacoes_exemplares ADD CONSTRAINT fk_mov_exemp_ref_id FOREIGN KEY (referencia_id) REFERENCES movimentacoes_exemplares(id);

ALTER TABLE baixas_exemplares ADD CONSTRAINT fk_baixas_exemplar_id FOREIGN KEY (exemplar_id) REFERENCES exemplares(id);
ALTER TABLE baixas_exemplares ADD CONSTRAINT fk_baixas_motivo_id FOREIGN KEY (motivo_baixa_id) REFERENCES motivos_baixas(id);