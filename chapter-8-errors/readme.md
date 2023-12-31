# Capítulo 8 - Bugs and Erros

> _"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it." - Brian Kernighan and P.J. Plauger, The Elements of Programming Style_

Quando falhas acontecem elas são chamadas de _bugs_ [_inseto_ no inglês].

## A linguagem

Diversos erros podem ser detectados pelo computador se ele souber o suficiente do que o programador quiser fazer, mas o JavaScript é vago quando diz a respeito de _bindings_ e _properties_, só tendo informações concretas quando o programa realmente roda e ainda assim ele é muito tolerante a coisas sem sentido como `true * "monkey"`.

Algumas coisas ainda podem ser corrigidas no JavaScript. A gramática, por exemplo, pode ser imediatamenta avaliada pelo computador.

Ainda assim, ás vezes, alguma parte do programa pode resultar em `NaN` (_not a number_ ou _não numérico_) ou indefinido e alegremente continuar convencido de que está tudo certo. Esses resultados podem viajar por diversas funções e métodos antes finalmente parar o programa.

## Strict Mode

O JavaScript pode se tornar um pouco mais "restrito" se o _strict mode_ for ativado. Para isso, basta escrever `"use strict"` no topo do arquivo ou do corpo de uma função.

No modo restrito alguns comportamentos da linguagem são alterados. Abaixo estão alguns exemplos:

- Criação silenciosa de uma _binding_ no contexto global agora joga o erro de referência.

- A binding `this` é indefinida quando não é chamada de um método.

- Proibe a utilização da palavra-chave `with` (recomendação do autor: nunca use 😠)

Geralmente o modo restrito é mais útil do que um incômodo.

## Types

## Testing

## Debugging

## Error Propagating

## Exceptions

## After Exceptions

## Seletive Catching

## Assertions

## Exercícios

#### 1. Retry

Considerando uma função de multiplicação chamada _multiplicacaoPrimitiva_ que tem 80% de chance de falha e 20% de sucesso. Codifique uma função chamada _multiplicacaoGarantida_ que deve garantir que o resultado seja retornado a partir da função _multiplicacaoPrimitiva_.

#### 2. The Locked Box

Considerando o objeto _Caixa_ que pode ser trancada e destrancada. Desenvolva uma função que destranque a caixa, execute outra função passada como parâmetro e então garanta que a caixa esteja fechada.
