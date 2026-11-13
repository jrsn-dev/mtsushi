# MT Sushi Arte

Landing page em Next.js com App Router, TypeScript e animações GSAP ScrollTrigger. O cardápio digital em `/cardapio` apresenta produtos por categoria com fotos ilustrativas, preços e carrinho persistente. O fechamento inclui sacola, entrega, pagamento e revisão, com envio do resumo para WhatsApp ou Direct.

## Desenvolvimento

Use Node.js 24 e rode `npm ci` e `npm run dev`. Acesse [localhost:3000](http://localhost:3000).

`npm run build` gera o build de produção. `npm start` serve esse build localmente.

## Vercel

Importe o repositório `jrsn-dev/mtsushi` e selecione o preset **Next.js**. Use a raiz do repositório, com o diretório de saída no padrão do framework. Para ativar pedidos pelo WhatsApp, adicione `NEXT_PUBLIC_WHATSAPP` às variáveis de ambiente e gere um novo deploy. O site usa o Direct da loja quando o número está ausente ou inválido. A antiga variável `VITE_WHATSAPP` também é aceita durante a migração.

## Créditos

A animação de entrada dos títulos usa [AnimatedContent do React Bits](https://github.com/DavidHDev/react-bits/blob/9d9c687dc4f55b23539aa5417b703078047efa74/src/ts-default/Animations/AnimatedContent/AnimatedContent.tsx), com a licença incluída junto ao componente.

As fotos ilustrativas de [porções](https://unsplash.com/photos/klTf2RN37Ts) e [bebidas](https://unsplash.com/photos/8fS1ByfREpw) são de Mikey Frost e Vin Jack, respectivamente, no Unsplash. Os arquivos WebP ficam em `public/images`, sem dependência de imagens remotas durante a navegação.

### Fotos do cardápio

Os itens usam imagens locais em WebP por tipo de prato; variações compartilham fotos ilustrativas. Os nomes, preços, porções e ingredientes do catálogo original foram preservados.

- Salada de pepino: [Alex Bayev / Pexels](https://www.pexels.com/photo/asian-cucumber-salad-12077975/).
- Hot roll: [Natan Machado / Pexels](https://www.pexels.com/photo/close-up-shot-of-hot-roll-sushis-11064614/).
- Ceviche: [Jose Ruales / Unsplash](https://unsplash.com/photos/ceviche-on-white-bowl-XVWtfPzjNpI).
- Rolinho de sobremesa: [dion armadi / Unsplash](https://unsplash.com/photos/crispy-spring-rolls-served-with-fresh-strawberries-and-herbs-XjPpx084iPQ).
- Porções e bebidas da versão anterior: [Mikey Frost](https://unsplash.com/photos/klTf2RN37Ts) e [Vin Jack](https://unsplash.com/photos/8fS1ByfREpw), no Unsplash.
