CREATE PROCEDURE Adega.ApagaProjeto
	@Projeto INT
	AS 
	BEGIN
		DELETE FROM Adega.Pedido
		WHERE id_pedido = @Projeto;
	END
