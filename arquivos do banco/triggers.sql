CREATE TRIGGER [adega].[impedir_menor]
ON [adega].[Funcionario]
FOR INSERT, UPDATE AS
BEGIN
	DECLARE @DataHoje DATETIME = GETDATE();
	DECLARE @Anos INT

	SELECT @Anos = DATEDIFF(YEAR, dataNascimento, @DataHoje)
	FROM inserted

	IF @Anos < 18
	BEGIN
		PRINT 'Não é possivel inserir, pois é menor de 18 anos';
		ROLLBACK;
	END
END

INSERT INTO adega.Funcionario VALUES (111111, 'Gabriel Antonio','Presidente','Brasileiro','2023-01-23')




