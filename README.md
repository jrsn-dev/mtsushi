# MT Sushi Arte

Landing page em Next.js com App Router, TypeScript e animações GSAP ScrollTrigger. O cardápio apresenta as categorias e encaminha as consultas e os pedidos ao contato da loja.

## Desenvolvimento

Use Node.js 24 e rode `npm ci` e `npm run dev`. Acesse [localhost:3000](http://localhost:3000).

`npm run build` gera o build de produção. `npm start` serve esse build localmente.

## Vercel

Importe o repositório `jrsn-dev/mtsushi` e selecione o preset **Next.js**. Use a raiz do repositório, com o diretório de saída no padrão do framework. Para ativar pedidos pelo WhatsApp, adicione `NEXT_PUBLIC_WHATSAPP` às variáveis de ambiente e gere um novo deploy. O site usa o Direct da loja quando o número está ausente ou inválido. A antiga variável `VITE_WHATSAPP` também é aceita durante a migração.

## Créditos

A animação de entrada dos títulos usa [AnimatedContent do React Bits](https://github.com/DavidHDev/react-bits/blob/9d9c687dc4f55b23539aa5417b703078047efa74/src/ts-default/Animations/AnimatedContent/AnimatedContent.tsx), com a licença incluída junto ao componente.

As fotos ilustrativas de [porções](https://unsplash.com/photos/klTf2RN37Ts) e [bebidas](https://unsplash.com/photos/8fS1ByfREpw) são de Mikey Frost e Vin Jack, respectivamente, no Unsplash. Os arquivos WebP ficam em `public/images`, sem dependência de imagens remotas durante a navegação.
