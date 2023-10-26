create table Produto(
   id_produto int identity primary key,
   nome_produto varchar(50) not null,
   tipo varchar(50) not null ,
   preço float not null,
   quantidade int not null,
)

create table Pedido(
   id_pedido int identity primary key not null,
   dia date not null,
   situacao varchar(20) not null,
)

create table Fornecedor(
   id_fornecedor int identity primary key,
   nome_fornecedor varchar(50) not null ,
   endereco varchar(50) not null,
   telefone int not null,
   email varchar(50) not null,
)

create table Funcionario(
   cpf_funcionario int primary key,
   nome_funcionario varchar(50) not null,
   cargo varchar(20) not null,
   nacionalidade_funcionario char(50),
)

create table Veiculo(
   placa int primary key not null,
   condutor char(50) not null,
   capacidade int not null,
   medida varchar(20) not null,
)

create table Condutor(
   cpf_condutor int primary key not null,
   id_carteira int foreign key references carteira(id_carteira),
   nome_condutor varchar(50) not null,
   nacionalidade_condutor varchar(50),
)

create table carteira(
	id_carteira int identity primary key,
	categoria varchar(10) not null,
)


alter table pedido add id_produto int foreign key references produto(id_produto)

alter table pedido add placa int foreign key references veiculo(placa)

alter table pedido add cpf_funcionario int foreign key references funcionario(cpf_funcionario)

alter table veiculo add cpf_condutor int foreign key references condutor(cpf_condutor)

alter table produto add id_fornecedor int foreign key references fornecedor(id_fornecedor)

create table cliente(
	cpf_cliente int identity primary key,
	nome_cliente varchar(50) not null,
	telefone_cliente int not null,
	email_cliente varchar(50) not null,
	endereco_cliente varchar(50) not null,
)

alter table pedido add cpf_cliente int foreign key references cliente(cpf_cliente)

insert into carteira (categoria)
values ('B');

insert into carteira (categoria)
values ('C')

insert into carteira (categoria)
values ('D')

insert into carteira (categoria)
values ('E')

select * from carteira


insert into Condutor (cpf_condutor, id_carteira, nome_condutor, nacionalidade_condutor)
values ('1234567899',2 , 'gabriel antonio', 'baiano')

select * from condutor

insert into Veiculo(placa, condutor, capacidade, medida, cpf_condutor)
values (1548754, 'gabriel antonio', 1000, 'Kg', 1234567899)

select * from Veiculo

alter table pedido add dia_retirada_entrega date 
alter table cliente add nome_estabelecimento varchar(50) 