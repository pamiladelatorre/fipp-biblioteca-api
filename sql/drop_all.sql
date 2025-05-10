-- DROP todas as tabelas em ordem de dependência reversa (evita erros com FKs)

DROP TABLE IF EXISTS baixas_exemplares;
DROP TABLE IF EXISTS movimentacoes_exemplares;
DROP TABLE IF EXISTS exemplares;
DROP TABLE IF EXISTS entradas_acervos;
DROP TABLE IF EXISTS compras_itens;
DROP TABLE IF EXISTS compras;
DROP TABLE IF EXISTS motivos_baixas;
DROP TABLE IF EXISTS doadores;
DROP TABLE IF EXISTS assinaturas;
DROP TABLE IF EXISTS acervos;
DROP TABLE IF EXISTS autores;
DROP TABLE IF EXISTS categorias;
DROP TABLE IF EXISTS fornecedores_generos;
DROP TABLE IF EXISTS metodos_pagamentos;
DROP TABLE IF EXISTS fornecedores;
DROP TABLE IF EXISTS generos;
DROP TABLE IF EXISTS infracoes;
DROP TABLE IF EXISTS usuarios;