# Capítulo 9 - Regular Expressions

> "Some people, when confronted with a problem, think ‘I know, I’ll use regular expressions.’ Now they have two problems." - Jamie Zawinski

## A classe Date

No Javascript a classe Date é utilizada para representar datas ou pontos no tempo. Instanciar ela sem parâmetros cria um objeto com a data e hora atuais. Instanciar com um parâmetro cria um objeto com essa quantidade de milissegundos após a data base da classe.
Por algum motivo obscuro, os meses de uma instância de Date começam em 0 e vão até 11. É necessário cuidado com essa decisão duvidosa de arquitetura.
Um objeto Date também armaze um timestamp representado pelos milissegundos desde o começo de 1970. Para datas anteriores a esse ano, são usados milissegundos negativos.

## Limites de string e palavra

Quando é necessário assegurar o tamanho e o formato da string ou garantir que ela comece ou termine segundo formato, os caractéres _^_ e _$_ garantem que, respectivamente, o começo e o final sejam como o formato.
Agora, quando é desejado encontrar o format no começo ou final de uma palavra, mas não necessáriamente da string, o marcador _\b_ assegura esse comportamento.

## Padrões de escolha

Em algumas situações, assim como são com enumeradores, é desejado que o padrão seja um conjunto de possibilidades específicas. No regex, esse conjunto pode ser feito caractér _|_.

## Os mecanismos de correspondência

Para buscar a correspondência de um formato em uma string, o regex passa por todos os caractéres da esquerda para a direita e retornando o resultado se todas as exigências forem atendidas.

## Backtracking

Durante o processo de correspondência, quando há múltiplas possibilidades de correspondência, o mecanismo é capaz de abordar a análize de uma delas caso ela saia do padrão esperado, mas isso sem abortar o processo, apenas retorando e mudando a análize para a próxima prossibilidade.

## Método Replace

String possuem um método chamado Replace para substituir partes de uma string por outros.
É possível usar regex para achar as partes a serem substituídas. Normalmente, só o primeiro caso de correspondência é substituido, mas a opção _g_ dentro do regex substitui globalmente, ou seja, todas as correspondências.
O real poder de utilizar o regex no replace é a capacidade de utilizar os grupos individualmente através de _$n_.
Também é possível passar uma função ao invés de uma string substituta. A função receberá será chamada para cada correspondência com os grupos do regex como parâmetro e o retorno dela substituirá o trecho.

## Ambição

TODO

## Criação dinâmica de objetos RegExp

Em alguns casos, não se tem conhecimento prévio do padrão que é buscado. Em um jogo onde o jogador digita seu nome, o padrão depende do valor inserido pelo usuário. Qualquer comparação que perecise desse nome irá resgatar o valor original inserido dinamicamente criando um objeto RegExp.
Usando o mesmo cenário do jogo, se o nome inserido possuisse caractéres especiais como "." ou "+" seria necessário tratar o valor antes de contruir o RegExp, substituindo esses caractéres especiais por suas versões comuns, geralmente com "/".

## O método search

Strings possuem o método indexOf para encontrar a posição na string em que um trecho aparece, mas esse método não aceita RegExp como parâmetro, por isso existe o método search, retornar a posição da primeira correspondência com o padrão. Diferentemente do indexOf o search não permite mudar o início da busca.

## A propriedade lastIndex

O método exec não possui um meio conveniente de indicar o início da busca. Objetos RegExp ainda são objetos e como tal possuem propriedades como a propriedade source que contém a string com o padrão de busca. Outra propriedade é a lastIndex que de certa forma controla p próximo caractér a ser analisado. Para que isso aconteça a objeto deve estar em modo global (g) ou grudento/sticky (y) e o método exec deve ser utilizado.

Se houver correspondência, o método define lastIndex como o ponto seguinte a correspondência. Se não houver correspondência, ele redefine a propriedade como 0, assim como seu construtor.

A diferença entre o modo grudento e o global é que o grudento só correponde se a partir do lastIndex houver correspondência enquanto o global busca do lastIndex em diante.
