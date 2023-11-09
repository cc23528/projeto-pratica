CREATE OR ALTER VIEW Brasileiro AS
SELECT nacionalidade
FROM Adega.Funcionario
WHERE brasileiro != nacionalidade_funcionario 

