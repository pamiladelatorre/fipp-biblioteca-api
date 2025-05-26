--Tabela usuarios
INSERT INTO usuarios (cpf, nome, data_nascimento, telefone, email, senha, cep, endereco, tipo_usuario, bloqueado, ativo, primeiro_acesso, data_criacao, data_alteracao) 
VALUES
('12345678901', 'Ana Silva', '1990-05-10', '11912345678', 'ana.silva@email.com', '$2b$10$gOccyHcp3lS0KA8Ks/AHz.QtghE1PN8kEBWwyWbD3V/usrDNksPAS', '01001000', 'Rua das Flores, 123, São Paulo - SP', 'estudante', false, true, true, CURRENT_TIMESTAMP, NULL),
('23456789012', 'Bruno Costa', '1985-08-22', '21998765432', 'bruno.costa@email.com', '$2b$10$gOccyHcp3lS0KA8Ks/AHz.h5E3.qQmO34MqpztcuhR5RsjxhYy29i', '20040002', 'Av. Brasil, 456, Rio de Janeiro - RJ', 'professor', false, true, false, CURRENT_TIMESTAMP, NULL),
('34567890123', 'Carla Souza', '1992-03-15', '31987654321', 'carla.souza@email.com', '$2b$10$gOccyHcp3lS0KA8Ks/AHz.nLI0IqrT5ZXtIGFbVjaadbUTE9DdRgy', '30130000', 'Rua Minas Gerais, 789, Belo Horizonte - MG', 'administrador', false, true, false, CURRENT_TIMESTAMP, NULL),
('92947675070', 'João Silva', '1990-05-10', '11987654321', 'joao.silva@exemplo.com', '$2b$10$OFwwKkZEfEajpGTyTYbhxOe5UpXnsD7ZdJYD4G.q0C7JPF5DwpL6m', '01001001', 'Rua A, 123', 'estudante', false, true, true, CURRENT_TIMESTAMP, NULL),
('58046364053', 'Maria Souza', '1985-09-22', '11987654322', 'maria.souza@exemplo.com', '$2b$10$fFReorCY8vv0fJZvtJLVSuG60BrBmRs9R0QPd1emcFvVuFjl12Z8u','02002002', 'Avenida B, 456', 'professor', false, true, true, CURRENT_TIMESTAMP, NULL);

--Tabela infracoes
INSERT INTO infracoes (usuario_id, tipo_infracao, grau_infracao, status, motivo, data_inicio, data_fim, data_criacao, data_alteracao) 
VALUES
(1, 'atraso', 'leve', 'pendente', 'Entrega de relatório com 3 dias de atraso.', '2025-04-10', NULL, CURRENT_TIMESTAMP, NULL),
(2, 'dano', 'grave', 'regularizada', 'Equipamento danificado durante uso indevido.', '2025-03-20', '2025-04-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'comportamento', 'moderado', 'pendente', 'Conduta inadequada durante reunião.', '2025-04-15', NULL, CURRENT_TIMESTAMP, NULL),
(2, 'atraso', 'leve', 'pendente', 'Atraso na devolução do exemplar X', '2025-04-01', '2025-04-10',CURRENT_TIMESTAMP, NULL),
(3, 'dano', 'grave', 'regularizada', 'Dano causado no exemplar Y', '2025-03-01', '2025-03-10', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

--Tabela generos
INSERT INTO generos (descricao, ativo, data_criacao, data_alteracao) 
VALUES
('Ficção Científica', true, CURRENT_TIMESTAMP, NULL),
('Romance', true, CURRENT_TIMESTAMP, NULL),
('Terror', true, CURRENT_TIMESTAMP, NULL),
('História', true, CURRENT_TIMESTAMP, NULL),
('Biografia', false, CURRENT_TIMESTAMP, NULL),
('Fantasia', true, CURRENT_TIMESTAMP, NULL);

--Tabela fornecedores
INSERT INTO fornecedores (cnpj, razao_social, telefone, email, endereco, inscricao_estadual, representante, ativo, data_criacao, data_alteracao) 
VALUES
('12345678000195', 'Editora Alfa Ltda', '1131234567', 'contato@editoraalfa.com', 'Rua das Letras, 123 - São Paulo, SP', '1234567890', 'Carlos Silva', true, CURRENT_TIMESTAMP, NULL),
('98765432000188', 'Distribuidora Beta SA', '21998765432', 'vendas@betadistribuidora.com', 'Av. Central, 500 - Rio de Janeiro, RJ', '9876543210', 'Mariana Costa', true, CURRENT_TIMESTAMP, NULL),
('45612378000122', 'Gráfica Gama ME', '3133447788', 'suporte@grafica-gama.com', 'Rua Impressão, 88 - Belo Horizonte, MG', '4567891230', 'João Mendes', false, CURRENT_TIMESTAMP, '2025-04-10 10:00:00'),
('23742503000138', 'Fornecedora ABC LTDA', '1145678901', 'fornecedor@abc.com', 'Rua X, 789', '123456789', 'Bruno Silva', true, CURRENT_TIMESTAMP, NULL);

--Tabela metodos_pagamentos
INSERT INTO metodos_pagamentos (fornecedor_id, tipo_pagamento, prazo, parcela_maxima, chave_pix, tipo_desconto, data_criacao, data_alteracao) 
VALUES 
(1, 'pix', NULL, NULL, 'editora.alfa@pix.com', 'antecipacao', CURRENT_TIMESTAMP, NULL),
(2, 'boleto', 30, NULL, NULL, 'volume', CURRENT_TIMESTAMP, NULL),
(3, 'cartao', NULL, 6, NULL, NULL, CURRENT_TIMESTAMP, NULL),
(4, 'boleto', 60, NULL, NULL, NULL, CURRENT_TIMESTAMP, NULL);

--Tabela fornecedores_generos
INSERT INTO fornecedores_generos (fornecedor_id, genero_id) 
VALUES
(1, 1), (1, 2), (1, 6), -- Editora Alfa fornece Ficção Científica, Romance e Fantasia
(2, 3), (2, 4), (2, 5), -- Distribuidora Beta fornece Terror, História e Biografia
(3, 1), (3, 2), (3, 3), (3, 4), (3, 5), (3, 6), -- Gráfica Gama fornece todos os gêneros (impressão geral)
(4, 1), (4, 2);

--Tabela categorias
INSERT INTO categorias (descricao, ativo, data_criacao, data_alteracao) 
VALUES
('Didáticos', true, CURRENT_TIMESTAMP, NULL),
('Técnicos', true, CURRENT_TIMESTAMP, NULL),
('Religiosos', true, CURRENT_TIMESTAMP, NULL),
('Literários', true, CURRENT_TIMESTAMP, NULL),
('Científicos', false, CURRENT_TIMESTAMP, NULL),
('Literatura', true, CURRENT_TIMESTAMP, NULL),
('Tecnologia', true, CURRENT_TIMESTAMP, NULL);

--Tabela autores
INSERT INTO autores (nome, nacionalidade, data_nascimento, biografia, ativo, data_criacao, data_alteracao) 
VALUES 
('Laura Mendes', 'Brasileira', '1980-06-15', 'Laura Mendes é autora de romances contemporâneos e vencedora de diversos prêmios literários nacionais.', true, CURRENT_TIMESTAMP, NULL),
('Carlos A. Figueira', 'Português', '1972-09-03', 'Carlos é conhecido por sua escrita filosófica e obras de ficção científica com crítica social.', true, CURRENT_TIMESTAMP, NULL),
('Maya Ito', 'Japonesa', '1965-01-22', 'Maya Ito é uma autora premiada de contos poéticos e literatura infantojuvenil, traduzida em mais de 10 idiomas.', false, CURRENT_TIMESTAMP, NULL),
('J.K. Rowling', 'Britânica', '1965-07-31', 'Autora da série Harry Potter', true, CURRENT_TIMESTAMP, NULL),
('Isaac Asimov', 'Americano', '1920-01-02', 'Físico e autor de ficção científica', true, CURRENT_TIMESTAMP, NULL);

--Tabela acervos
INSERT INTO acervos (autor_id, genero_id, categoria_id, titulo, numero_edicao, editora, data_publicacao, numero_pagina, isbn, ativo, data_criacao, data_alteracao) 
VALUES 
(1, 2, 1, 'Amor em Meio ao Caos', 3, 'Editora Alfa Ltda', '2022-08-10', 284, '978-65-990000-1-0', true, CURRENT_TIMESTAMP, NULL),
(2, 1, 2, 'Horizontes da Consciência', 1, 'Distribuidora Beta SA', '2021-03-15', 336, '978-85-990000-2-7', true, CURRENT_TIMESTAMP, NULL),
(3, 6, 6, 'A Floresta dos Sussurros', 2, 'Gráfica Gama ME', '2019-11-01', 198, '978-65-990000-3-4', false, CURRENT_TIMESTAMP, NULL),
(4, 6, 1, 'Harry Potter e a Pedra Filosofal', 1, 'Rocco', '1997-06-26', 223, '9788532523488', TRUE, CURRENT_TIMESTAMP, NULL),
(5, 1, 2, 'Fundação', 1, 'Editora XYZ', '1951-06-01', 500, '9788532513588', TRUE, CURRENT_TIMESTAMP, NULL);

--Tabela assinaturas
INSERT INTO assinaturas (fornecedor_id, descricao, periodicidade, numero_contrato, valor, data_inicio, data_fim, ativo, data_criacao, data_alteracao) 
VALUES 
(1, 'Assinatura mensal de revistas educacionais', 'mensal', '2025001', 149.90, '2025-01-01', NULL, true, CURRENT_TIMESTAMP, NULL),
(2, 'Fornecimento anual de jornais e suplementos culturais', 'anual', '2025009', 1299.00, '2025-03-15', '2026-03-14', true, CURRENT_TIMESTAMP, NULL),
(3, 'Entrega semanal de materiais gráficos e informativos', 'semanal', '2024034', 89.50, '2024-05-10', '2025-03-10', false, CURRENT_TIMESTAMP, NULL),
(4, 'Assinatura para livros de ficção', 'mensal', '123456', 100.00, '2025-01-01', '2025-12-31', true, CURRENT_TIMESTAMP, NULL);

--Tabela doadores
INSERT INTO doadores (tipo_pessoa, nome, documento, email, telefone, endereco, ativo, data_criacao, data_alteracao) 
VALUES 
('pf', 'Mariana Costa', '12345678901', 'mariana.costa@email.com', '11998764321', 'Rua das Flores, 123 - São Paulo, SP', true, CURRENT_TIMESTAMP, NULL),
('pj', 'Livraria Mundo dos Livros LTDA', '12345678000199', 'contato@mundodoslivros.com.br', '2134567890', 'Av. Central, 1000 - Rio de Janeiro, RJ', true, CURRENT_TIMESTAMP, NULL),
('pf', 'Carlos Henrique Duarte', '98765432100', 'carlos.duarte@email.com', '31998881122', 'Rua das Palmeiras, 456 - Belo Horizonte, MG', false, CURRENT_TIMESTAMP, NULL),
('pf', 'Paulo Oliveira', '21288295006', 'paulo@exemplo.com', '11987654300', 'Rua C, 123', true, CURRENT_TIMESTAMP, NULL);

--Tabela motivos_baixas
INSERT INTO motivos_baixas (descricao, ativo, data_criacao, data_alteracao) 
VALUES 
('Livro danificado', true, CURRENT_TIMESTAMP, NULL),
('Obra desatualizada', true, CURRENT_TIMESTAMP, NULL),
('Exemplar extraviado', true, CURRENT_TIMESTAMP, NULL),
('Doação', true, CURRENT_TIMESTAMP, NULL),
('Roubo ou furto', false, CURRENT_TIMESTAMP, NULL),
('Dano irreparável', TRUE, CURRENT_TIMESTAMP, NULL);

-- Tabela compras
INSERT INTO compras (fornecedor_id, metodo_pagamento_id, tipo_produto, numero_empenho, status, data_criacao, data_alteracao)
VALUES
(1, 1, 'acervo', 'EM1234', 'finalizada', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Tabela compras_itens
INSERT INTO compras_itens (compra_id, acervo_id, quantidade, valor_unitario, data_criacao)
VALUES
(1, 1, 3, 50.00, CURRENT_TIMESTAMP);

-- Tabela entradas_acervos
INSERT INTO entradas_acervos (acervo_id, tipo_origem, origem_id, quantidade, data_entrada, data_criacao, data_alteracao)
VALUES
(1, 'compra', 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Tabela exemplares
INSERT INTO exemplares (acervo_id, entrada_acervo_id, tombo, status, estado, data_criacao, data_alteracao)
VALUES
(1, 1, 'TOMBO001', 'disponivel', 'novo', CURRENT_TIMESTAMP, NULL),
(1, 1, 'TOMBO002', 'reservado', 'novo', CURRENT_TIMESTAMP, NULL),
(1, 1, 'TOMBO003', 'baixado', 'danificado', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Tabela movimentacoes_exemplares
INSERT INTO movimentacoes_exemplares (exemplar_id, usuario_id, etapa, status, grupo_id, referencia_id, data_inicio, data_prevista, data_fim, numero_renovacao, observacoes) 
VALUES 
(1, 1, 'reserva', 'ativa', NULL, NULL, CURRENT_TIMESTAMP, DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 7 DAY), NULL, 0, 'Reserva do exemplar'),
(2, 2, 'emprestimo', 'ativa', NULL, NULL, CURRENT_TIMESTAMP, DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 7 DAY), NULL, 0, 'Primeiro empréstimo do usuário');

-- Tabela baixas_exemplares
INSERT INTO baixas_exemplares (exemplar_id, motivo_baixa_id, observacoes, data_criacao)
VALUES
(3, 1, 'Dano irreparável no exemplar', CURRENT_TIMESTAMP);


-- EX? movimentacoes_exemplares 

-- # Passo 1 – Reserva
-- INSERT INTO movimentacoes_exemplares (exemplar_id, usuario_id, etapa, status, data_inicio, data_fim, grupo_id)
-- VALUES (5001, 101, 'reserva', 'finalizada', '2025-05-01 10:00:00', '2025-05-02 10:00:00', NULL);

-- # Passo 2 – Empréstimo (iniciado após reserva)
-- Suponha que o ID da reserva inserida acima foi 201
-- INSERT INTO movimentacoes_exemplares (exemplar_id, usuario_id, etapa, status, data_inicio, data_fim, grupo_id, referencia_id)
-- VALUES (5001, 101, 'emprestimo', 'ativa', '2025-05-02 11:00:00', '2025-05-09 11:00:00', NULL, 201);

-- Agora, digamos que esse id gerado do empréstimo foi 202
-- Precisamos atualizar grupo_id da reserva e deste empréstimo para esse valor:
--UPDATE movimentacoes_exemplares SET grupo_id = 202 WHERE id IN (201, 202);

-- # Passo 3 – Renovação (do empréstimo)
-- Renovando empréstimo (original ID: 202)
-- INSERT INTO movimentacoes_exemplares (exemplar_id, usuario_id, etapa, status, data_inicio, data_fim, grupo_id, referencia_id, numero_renovacao)
-- VALUES (5001, 101, 'renovacao', 'ativa', '2025-05-09 11:00:00', '2025-05-16 11:00:00', 202, 202, 1);

-- # Passo 4 – Devolução
-- Suponha que a renovação teve ID 203
-- INSERT INTO movimentacoes_exemplares (exemplar_id, usuario_id, etapa, status, data_inicio, data_fim, grupo_id, referencia_id)
-- VALUES (5001, 101, 'devolucao', 'finalizada', '2025-05-16 09:00:00', '2025-05-16 09:00:00', 202, 203);

/*
| id  | etapa      | status     | grupo\_id | referencia\_id |
| --- | ---------- | ---------- | --------- | -------------- |
| 201 | reserva    | finalizada | 202       | NULL           |
| 202 | emprestimo | ativa      | 202       | 201            |
| 203 | renovacao  | ativa      | 202       | 202            |
| 204 | devolucao  | finalizada | 202       | 203            |
*/

1-devo manter estrutura como esta, pois esta otima para o sistema?
2-exemplares e entradas_acervos poderia ser a mesma tabela?
2-entradas_acervos deveria ter uma tabela de itens?

qual situacao e mais correta?