// chatbot.js
// Bot simples para WhatsApp — estilo visual igual ao do seu print

const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js');

// Cria o cliente WhatsApp
const client = new Client({
  puppeteer: { headless: true } // muda para false se quiser ver o navegador abrindo
});

// Gera o QR Code no terminal
client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

// Confirma conexão
client.on('ready', () => {
  console.log('✅ Tudo certo! WhatsApp conectado com sucesso!');
});

client.initialize();

// Função para delay entre mensagens (simulando digitação)
const delay = ms => new Promise(res => setTimeout(res, ms));

// Quando recebe mensagem
client.on('message', async msg => {
  const texto = msg.body.toLowerCase();
  const chat = await msg.getChat();

  // Exibe no console
  console.log(`💬 Mensagem de ${msg.from}: ${texto}`);

  // -----------------------
  // 🔹 1. Saudação
  if (texto.match(/^(oi|olá|ola|menu|bom dia|boa tarde|boa noite)$/)) {
    await delay(1000);
    await chat.sendStateTyping();
    await delay(2000);

    msg.reply(
      `👋 Olá! Seja bem-vindo(a)!\n\nEu sou o *BotSimples*.\n\nEscolha uma opção:\n1️⃣ Ver horário\n2️⃣ Ver promoções\n3️⃣ Falar com atendente`
    );
  }

  // -----------------------
  // 🔹 2. Horário
  else if (texto.includes('1') || texto.includes('horário')) {
    await chat.sendStateTyping();
    await delay(1500);
    msg.reply('🕒 Nosso horário é de segunda a sexta, das 9h às 18h!');
  }

  // -----------------------
  // 🔹 3. Promoções
  else if (texto.includes('2') || texto.includes('promo')) {
    await chat.sendStateTyping();
    await delay(1500);
    msg.reply('🎉 Hoje temos 10% de desconto em todos os serviços! Aproveite!');
  }

  // -----------------------
  // 🔹 4. Atendente
  else if (texto.includes('3') || texto.includes('atendente')) {
    await chat.sendStateTyping();
    await delay(1500);
    msg.reply('👩‍💼 Um atendente entrará em contato em breve. Por favor, aguarde!');
  }

  // -----------------------
  // 🔹 5. Agradecimento
  else if (texto.includes('obrigado') || texto.includes('valeu')) {
    await chat.sendStateTyping();
    await delay(1000);
    msg.reply('😄 Por nada! Se precisar, é só chamar.');
  }

  // -----------------------
  // 🔹 6. Fallback (não entendeu)
  else if (!texto.startsWith('!')) {
    await chat.sendStateTyping();
    await delay(1500);
    msg.reply('🤔 Desculpe, não entendi. Digite *menu* para ver as opções.');
  }
});
