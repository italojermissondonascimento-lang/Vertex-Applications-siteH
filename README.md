# VERTEX APPLICATIONS 🪽

Portal inicial responsivo para apresentação e contratação de hospedagem Discord, com identidade visual branca e a logo VX enviada.

## Executar no computador

1. Instale Node.js 18 ou superior.
2. Extraia o ZIP.
3. Abra um terminal nesta pasta e execute:

   ```bash
   npm install
   cp .env.example .env
   npm start
   ```

4. Acesse `http://localhost:3000`.

## O que já está incluído

- Página inicial branca com a imagem VX.
- Planos mensal (R$ 4,00 / 30 dias), trimestral (R$ 10,00 / 90 dias) e anual (R$ 30,00 / 365 dias).
- Janela de contratação com nome e contato.
- API inicial para listar planos e receber pedidos.

## O que ainda precisa ser integrado antes de vender

Este é um **protótipo funcional da interface**, não uma hospedagem de bots pronta para produção. A rota de pedidos retorna HTTP 501 intencionalmente até configurar um provedor de pagamento. Para operar de verdade, será necessário:

1. Integrar um provedor PIX/checkout adequado e validar webhooks assinados no servidor.
2. Criar autenticação administrativa, banco de dados e histórico de pedidos.
3. Provisionar instâncias isoladas por cliente em um servidor de hospedagem.
4. Criar um cofre de segredos para tokens; nunca guardar tokens em HTML, JavaScript do navegador, repositório ou mensagens.
5. Definir limites de CPU/memória, logs, backups, suspensão e expiração de cada plano.
6. Testar segurança, privacidade e recuperação antes de publicar.

O código do bot enviado anteriormente **não foi incorporado**: precisa de adaptação para múltiplas instâncias e revisão das configurações. Não reutilize tokens que já tenham sido expostos; gere novos no portal oficial do Discord. Para pagamentos e dados financeiros, peça a um responsável para supervisionar a configuração e a conta de recebimento.
