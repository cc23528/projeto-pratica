create trigger [Adega].[desconto]
on [adega].[Produto]
FOR INSERT, UPDATE AS
Begin 
	declare @precoDesconto float 
	declare @NewprecoDesconto money
	declare @IdProdutoAtual int

	begin
	select @precoDesconto = preco*0.9,
	@IdProdutoAtual = id_produto
	from Inserted;
	update Adega.Produto
	set preco_com_desconto = @precoDesconto
	where @IdProdutoAtual = id_produto;
	end
end

insert into Adega.Produto values('AAA','BBB',2,100,NULL,1)