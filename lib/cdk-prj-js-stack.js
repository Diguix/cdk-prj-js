const cdk = require('aws-cdk-lib');
const s3 = require('aws-cdk-lib/aws-s3');

/** 
 * @Bucket: O balde é a primeira construção que vimos, por isso vamos dar uma vista de olhos mais atenta. Como todas as construções, a classe Bucket tem três parâmetros.
 * @scope: Diz ao balde que a pilha é o seu pai: é definida dentro do âmbito da pilha. Pode definir construções dentro das construções, criando uma hierarquia (árvore). Aqui, e na maioria dos casos, o âmbito é este (auto em Python), o que significa a construção que contém o balde: a pilha.
 * @id: A identificação lógica do balde dentro da sua aplicação AWS CDK. Este (mais um hash baseado na localização do balde dentro da pilha) identifica de forma única o balde através das implantações, para que o AWS CDK possa actualizá-lo se alterar a forma como é definido na sua aplicação. Aqui está o "MyFirstBucket". Os baldes também podem ter um nome, que é separado desta identificação (é a propriedade BucketName).
 * @props: Um conjunto de valores que definem as propriedades do balde. Aqui definimos apenas uma propriedade: versioned, que permite o versionamento dos ficheiros do balde.
*/
class HelloCdkStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    /** 
    * @versioned: o parametro true, indica que existirá controle de versao
    * NOTE: as propriedades abaixo sao executadas sempre que ocorrer uma alteracao no app
    * @removalPolicy: após deletar os objetos no bucket, destroi o mesmo
    * @autoDeleteObject: o parametro true, indica que será deletado os objetos dentro do bucket    
    */
    new s3.Bucket(this, 'MyFirstBucket', {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true
    });
  }
}

module.exports = { HelloCdkStack }