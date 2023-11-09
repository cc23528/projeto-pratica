create schema Adega

create table Adega.Produto(
   id_produto int identity primary key,
   nome_produto varchar(50) not null,
   tipo varchar(50) not null ,
   quantidade bigint not null,
   preco float not null,
   preco_com_desconto float,
   id_fornecedor int foreign key references adega.fornecedor(id_fornecedor) not null,
)

create table Adega.Pedido(
   id_pedido int identity primary key not null,
   dia date not null,
   situacao varchar(20) not null,
   dia_retirada_entrega date not null,
   id_produto int foreign key references adega.produto(id_produto) not null,
   placa varchar(50) foreign key references adega.veiculo(placa) not null,
   cpf_funcionario bigint foreign key references adega.funcionario(cpf_funcionario) not null,
   cpf_cliente bigint foreign key references adega.cliente(cpf_cliente) not null,
)

create table Adega.Fornecedor(
   id_fornecedor int identity primary key,
   cpf_fornecedor bigint not null,
   nome_fornecedor varchar(50) not null ,
   endereco varchar(50) not null,
   telefone bigint not null,
   email varchar(50) not null,
)

create table Adega.Funcionario(
   cpf_funcionario bigint primary key not null,
   nome_funcionario varchar(50) not null,
   cargo varchar(20) not null,
   nacionalidade_funcionario char(50),
   dataNascimento date not null,
)

create table Adega.Veiculo(
   placa varchar(50) primary key not null,
   condutor char(50) not null,
   capacidade int not null,
   medida varchar(20) not null,
   cpf_condutor bigint foreign key references adega.condutor(cpf_condutor) not null,
)

create table Adega.Condutor(
   cpf_condutor bigint primary key not null,
   id_carteira int foreign key references adega.carteira(id_carteira),
   nome_condutor varchar(50) not null,
   nacionalidade_condutor varchar(50),
)

create table Adega.carteira(
	id_carteira int identity primary key,
	categoria varchar(10) not null,
)

create table Adega.cliente(
	cpf_cliente bigint identity primary key,
	nome_cliente varchar(50) not null,
	nome_estabelecimento_do_cliente varchar(50), 
	telefone_cliente bigint not null,
	email_cliente varchar(50) not null,
	endereco_cliente varchar(50) not null,
)
insert into Adega.carteira (categoria)
values ('B');

insert into Adega.carteira (categoria)
values ('C')

insert into Adega.carteira (categoria)
values ('D')

insert into Adega.carteira(categoria)
values ('E')

select * from carteira


insert into Condutor (cpf_condutor, id_carteira, nome_condutor, nacionalidade_condutor)
values ('1234567899',2 , 'gabriel antonio', 'brasileiro')

select * from condutor

insert into Veiculo(placa, condutor, capacidade, medida, cpf_condutor)
values (1548754, 'gabriel antonio', 1000, 'Kg', 1234567899)

select * from Funcionario
