// telegram-bot.js
// Bot simples para Telegram — estilo visual similar

const TelegramBot = require('node-telegram-bot-api');

// Substitua pelo token do seu bot do BotFather
const TOKEN = 'SEU_TOKEN_AQUI';
const bot = new TelegramBot(TOKEN, { polling: true });

// Confirma conexão
bot.on('polling_error', (error) => {
  console.log('❌ Erro no polling:', error);
});

bot.on('message', (msg) => {
  console.log('✅ Bot conectado ao Telegram!');
});

console.log('🤖 Bot do Telegram iniciado...');

// Função para simular delay (digitação)
const delay = ms => new Promise(res => setTimeout(res, ms));

// Quando recebe mensagem
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const texto = msg.text ? msg.text.toLowerCase() : '';
  
  // Exibe no console
  console.log(`💬 Mensagem de ${msg.from.first_name}: ${texto}`);

  // -----------------------
  // 🔹 1. Saudação
  if (texto.match(/^(oi|olá|ola|menu|bom dia|boa tarde|boa noite|\/start)$/)) {
    await delay(1000);
    
    // Simula "digitando..."
    await bot.sendChatAction(chatId, 'typing');
    await delay(2000);

    const menuMessage = `👋 Olá! Seja bem-vindo(a)!\n\nEu sou o *BotSimples*.\n\nEscolha uma opção:\n1️⃣ Ver horário\n2️⃣ Ver promoções\n3️⃣ Falar com atendente`;
    
    // Envia o menu com botões inline
    bot.sendMessage(chatId, menuMessage, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '1️⃣ Horário', callback_data: 'horario' },
            { text: '2️⃣ Promoções', callback_data: 'promocoes' }
          ],
          [
            { text: '3️⃣ Atendente', callback_data: 'atendente' }
          ]
        ]
      }
    });
  }

  // -----------------------
  // 🔹 2. Horário
  else if (texto.includes('1') || texto.includes('horário')) {
    await bot.sendChatAction(chatId, 'typing');
    await delay(1500);
    bot.sendMessage(chatId, '🕒 Nosso horário é de segunda a sexta, das 9h às 18h!');
  }

  // -----------------------
  // 🔹 3. Promoções
  else if (texto.includes('2') || texto.includes('promo')) {
    await bot.sendChatAction(chatId, 'typing');
    await delay(1500);
    bot.sendMessage(chatId, '🎉 Hoje temos 10% de desconto em todos os serviços! Aproveite!');
  }

  // -----------------------
  // 🔹 4. Atendente
  else if (texto.includes('3') || texto.includes('atendente')) {
    await bot.sendChatAction(chatId, 'typing');
    await delay(1500);
    bot.sendMessage(chatId, '👩‍💼 Um atendente entrará em contato em breve. Por favor, aguarde!');
  }

  // -----------------------
  // 🔹 5. Agradecimento
  else if (texto.includes('obrigado') || texto.includes('valeu')) {
    await bot.sendChatAction(chatId, 'typing');
    await delay(1000);
    bot.sendMessage(chatId, '😄 Por nada! Se precisar, é só chamar.');
  }

  // -----------------------
  // 🔹 6. Fallback (não entendeu)
  else if (texto && !texto.startsWith('/')) {
    await bot.sendChatAction(chatId, 'typing');
    await delay(1500);
    bot.sendMessage(chatId, '🤔 Desculpe, não entendi. Digite *menu* para ver as opções.', {
      parse_mode: 'Markdown'
    });
  }
});

// Manipula cliques nos botões inline
bot.on('callback_query', async (callbackQuery) => {
  const msg = callbackQuery.message;
  const data = callbackQuery.data;
  
  await bot.answerCallbackQuery(callbackQuery.id);
  
  await bot.sendChatAction(msg.chat.id, 'typing');
  await delay(1000);

  switch (data) {
    case 'horario':
      bot.sendMessage(msg.chat.id, '🕒 Nosso horário é de segunda a sexta, das 9h às 18h!');
      break;
    case 'promocoes':
      bot.sendMessage(msg.chat.id, '🎉 Hoje temos 10% de desconto em todos os serviços! Aproveite!');
      break;
    case 'atendente':
      bot.sendMessage(msg.chat.id, '👩‍💼 Um atendente entrará em contato em breve. Por favor, aguarde!');
      break;
  }
});

// Comando /start personalizado
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const welcomeMessage = `👋 Olá! Seja bem-vindo(a)!\n\nEu sou o *BotSimples*.\n\nEscolha uma opção:\n1️⃣ Ver horário\n2️⃣ Ver promoções\n3️⃣ Falar com atendente`;
  
  bot.sendMessage(chatId, welcomeMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '1️⃣ Horário', callback_data: 'horario' },
          { text: '2️⃣ Promoções', callback_data: 'promocoes' }
        ],
        [
          { text: '3️⃣ Atendente', callback_data: 'atendente' }
        ]
      ]
    }
  });
});