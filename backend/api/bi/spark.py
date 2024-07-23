from pyspark.sql import SparkSession
spark = SparkSession.builder.appName("meu_etl_job").config("spark.driver.extraClassPath", "caminho/para/o/driver/postgresql.jar").getOrCreate()


df = spark.read.jdbc(url="jdbc:postgresql://localhost:5432/seu_banco", table="nome_da_tabela", properties={"user": "seu_usuario", "password": "sua_senha"})


