# Motion — MTSUSHI Arte

Referência: https://github.com/emilkowalski/skills (emil-design-eng, animate, animation-performance, review-animations/STANDARDS.md).

- Conteúdo e marca visíveis antes da hidratação; nenhum preloader bloqueante.
- Feedback de pressão: scale(.97), 160ms, ease-out oficial.
- Interações frequentes: 150–220ms; painéis: 200–280ms; toast: 400ms ease.
- Movimentação decorativa da faixa ligada à rolagem, sem loop JS em repouso.
- Manter geometria, cores, proporções e logos estáticas originais.
- Redução de movimento e hover restrito a dispositivos com ponteiro preciso.
- Não animar propriedades de layout, não reintroduzir estados que escondem a home.

Validação: testar desktop e mobile, abrir e fechar carrinho/menu/busca, navegar por teclado e testar prefers-reduced-motion. Conferir primeiro carregamento sem JavaScript e com CPU limitada. Medir desempenho em dispositivo real antes de afirmar ganhos quantitativos.
