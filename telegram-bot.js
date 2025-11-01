// telegram-bot.js
// Bot de atendimento para serviços de TI

const TelegramBot = require('node-telegram-bot-api');

// Substitua pelo token do seu bot do BotFather
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(TOKEN, { polling: true });

// Confirma conexão
bot.on('polling_error', (error) => {
  console.log('❌ Erro no polling:', error);
});

console.log('🤖 Bot de TI iniciado... Aguardando mensagens...');

// Função para simular delay (digitação)
const delay = ms => new Promise(res => setTimeout(res, ms));

// Quando recebe mensagem
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const texto = msg.text ? msg.text.toLowerCase() : '';
  
  // Exibe no console
  console.log(`💬 Mensagem de ${msg.from.first_name}: ${texto}`);

  // -----------------------
  // 🔹 1. Saudação e Menu Principal
  if (texto.match(/^(oi|olá|ola|menu|bom dia|boa tarde|boa noite|\/start|iniciar)$/)) {
    await delay(1000);
    
    // Simula "digitando..."
    await bot.sendChatAction(chatId, 'typing');
    await delay(2000);

    const menuMessage = `🛠️ *Bem-vindo ao Suporte de TI!*\n\nOlá ${msg.from.first_name}! Eu sou o *Assistente Virtual de TI*.\n\n*Como posso ajudá-lo hoje?*\n\n🕒 1️⃣ - Horários de Atendimento\n💻 2️⃣ - Serviços de TI\n🌐 3️⃣ - Redes Sociais\n👨‍💼 4️⃣ - Falar com Atendente\n📞 5️⃣ - Contato Urgente`;
    
    // Envia o menu com botões inline
    bot.sendMessage(chatId, menuMessage, {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '🕒 Horários', callback_data: 'horarios' },
            { text: '💻 Serviços', callback_data: 'servicos' }
          ],
          [
            { text: '🌐 Redes Sociais', callback_data: 'redes_sociais' },
            { text: '👨‍💼 Atendente', callback_data: 'atendente' }
          ],
          [
            { text: '📞 Contato Urgente', callback_data: 'contato_urgente' }
          ]
        ]
      }
    });
  }

  // -----------------------
  // 🔹 2. Horários de Atendimento
  else if (texto.includes('1') || texto.includes('horário') || texto.includes('horario')) {
    await bot.sendChatAction(chatId, 'typing');
    await delay(1500);
    
    const horariosMessage = `🕒 *Horários de Atendimento*\n\n*Atendimento Padrão:*\n📍 Segunda a Sexta: 8h às 18h\n📍 Sábado: 8h às 12h\n📍 Domingo: Fechado\n\n*Plantão de Emergência:*\n🚨 24h para casos críticos\n📞 (11) 9999-9999\n\n*Tipos de Suporte:*\n✅ Suporte Remoto: 8h-18h\n✅ Visita Técnica: 9h-17h\n✅ Urgências: 24h/7d`;
    
    bot.sendMessage(chatId, horariosMessage, {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [{ text: '📞 Falar com Plantão', callback_data: 'plantao' }],
          [{ text: '↩️ Voltar ao Menu', callback_data: 'voltar_menu' }]
        ]
      }
    });
  }

  // -----------------------
  // 🔹 3. Serviços de TI
  else if (texto.includes('2') || texto.includes('serviço') || texto.includes('servico')) {
    await bot.sendChatAction(chatId, 'typing');
    await delay(1500);
    
    const servicosMessage = `💻 *Nossos Serviços de TI*\n\n*🔧 Suporte Técnico:*\n✅ Manutenção de Computadores\n✅ Instalação de Software\n✅ Configuração de Redes\n✅ Backup de Dados\n✅ Remoção de Vírus\n\n*🌐 Infraestrutura:*\n✅ Servidores e Cloud\n✅ Redes Corporativas\n✅ Firewall e Segurança\n✅ Wi-Fi Empresarial\n\n*🚀 Desenvolvimento:*\n✅ Sites e Sistemas Web\n✅ Aplicativos Mobile\n✅ Banco de Dados\n✅ Automação\n\n*Valores a partir de R$ 99,90/mês*`;
    
    bot.sendMessage(chatId, servicosMessage, {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '💰 Orçamento', callback_data: 'orcamento' },
            { text: '📋 Detalhes', callback_data: 'detalhes_servicos' }
          ],
          [{ text: '↩️ Voltar ao Menu', callback_data: 'voltar_menu' }]
        ]
      }
    });
  }

  // -----------------------
  // 🔹 4. Redes Sociais
  else if (texto.includes('3') || texto.includes('rede') || texto.includes('social')) {
    await bot.sendChatAction(chatId, 'typing');
    await delay(1500);
    
    const redesMessage = `🌐 *Nossas Redes Sociais*\n\n*Acompanhe nosso trabalho:*\n\n📘 *Facebook:*\nfacebook.com/suporteti\n\n📷 *Instagram:*\n@suporteti.oficial\n\n💼 *LinkedIn:*\nlinkedin.com/company/suporteti\n\n🐦 *Twitter:*\n@suporteti\n\n📹 *YouTube:*\nyoutube.com/suporteti\n\n💻 *Site Oficial:*\nwww.suporteti.com.br`;
    
    bot.sendMessage(chatId, redesMessage, {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '📘 Facebook', url: 'https://facebook.com' },
            { text: '📷 Instagram', url: 'https://instagram.com' }
          ],
          [
            { text: '💼 LinkedIn', url: 'https://linkedin.com' },
            { text: '🐦 Twitter', url: 'https://twitter.com' }
          ],
          [
            { text: '📹 YouTube', url: 'https://youtube.com' },
            { text: '🌐 Site', url: 'https://www.exemplo.com' }
          ],
          [{ text: '↩️ Voltar ao Menu', callback_data: 'voltar_menu' }]
        ]
      }
    });
  }

  // -----------------------
  // 🔹 5. Falar com Atendente
  else if (texto.includes('4') || texto.includes('atendente') || texto.includes('humano')) {
    await bot.sendChatAction(chatId, 'typing');
    await delay(1500);
    
    const atendenteMessage = `👨‍💼 *Falar com Atendente*\n\nUm dos nossos especialistas entrará em contato em breve!\n\n*Informações para contato:*\n📞 Telefone: (11) 3333-4444\n📧 Email: contato@suporteti.com.br\n💬 WhatsApp: (11) 99999-8888\n\n*Tempo médio de resposta:*\n✅ Online: 2-5 minutos\n✅ Email: 1-2 horas\n✅ Telefone: Imediato\n\nDeseja que entremos em contato agora?`;
    
    bot.sendMessage(chatId, atendenteMessage, {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '✅ Sim, me ligue!', callback_data: 'ligar_agora' },
            { text: '📧 Enviar Email', callback_data: 'enviar_email' }
          ],
          [
            { text: '💬 WhatsApp', url: 'https://wa.me/5511999998888' },
            { text: '📞 Ligar Agora', callback_data: 'ligar_agora' }
          ],
          [{ text: '↩️ Voltar ao Menu', callback_data: 'voltar_menu' }]
        ]
      }
    });
  }

  // -----------------------
  // 🔹 6. Contato Urgente
  else if (texto.includes('5') || texto.includes('urgente') || texto.includes('emergencia')) {
    await bot.sendChatAction(chatId, 'typing');
    await delay(1000);
    
    const urgenteMessage = `🚨 *CONTATO DE EMERGÊNCIA*\n\n*Para atendimento IMEDIATO:*\n\n📞 *Plantão 24h:* (11) 9999-9999\n💬 *WhatsApp Urgente:* (11) 8888-7777\n🆘 *Email Crítico:* emergencia@suporteti.com.br\n\n*Casos para Emergência:*\n🔴 Servidor Fora do Ar\n🔴 Rede Totalmente Inoperante\n🔴 Perda Crítica de Dados\n🔴 Ataque Cibernético\n🔴 Sistema Principal Inacessível\n\n*Taxa de emergência: R$ 200,00*`;
    
    bot.sendMessage(chatId, urgenteMessage, {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '📞 Ligar Plantão', callback_data: 'ligar_plantao' },
            { text: '💬 WhatsApp Urgente', url: 'https://wa.me/551188887777' }
          ],
          [{ text: '↩️ Voltar ao Menu', callback_data: 'voltar_menu' }]
        ]
      }
    });
  }

  // -----------------------
  // 🔹 7. Agradecimento
  else if (texto.includes('obrigado') || texto.includes('obrigada') || texto.includes('valeu') || texto.includes('grato')) {
    await bot.sendChatAction(chatId, 'typing');
    await delay(1000);
    
    const agradecimentoMessage = `😊 *Obrigado pelo contato!*\n\nFicamos felizes em ajudar! Se tiver mais alguma dúvida sobre nossos serviços de TI, é só chamar.\n\n*Equipe Suporte TI* 🛠️`;
    
    bot.sendMessage(chatId, agradecimentoMessage, {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [{ text: '🔄 Novo Atendimento', callback_data: 'voltar_menu' }]
        ]
      }
    });
  }

  // -----------------------
  // 🔹 8. Fallback (não entendeu)
  else if (texto && !texto.startsWith('/')) {
    await bot.sendChatAction(chatId, 'typing');
    await delay(1500);
    
    const fallbackMessage = `🤔 *Desculpe, não entendi completamente.*\n\nVocê pode digitar *menu* para ver todas as opções ou escolher uma das opções abaixo:`;
    
    bot.sendMessage(chatId, fallbackMessage, {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '🕒 Horários', callback_data: 'horarios' },
            { text: '💻 Serviços', callback_data: 'servicos' }
          ],
          [
            { text: '🌐 Redes Sociais', callback_data: 'redes_sociais' },
            { text: '👨‍💼 Atendente', callback_data: 'atendente' }
          ],
          [{ text: '📞 Emergência', callback_data: 'contato_urgente' }]
        ]
      }
    });
  }
});

// Manipula cliques nos botões inline
bot.on('callback_query', async (callbackQuery) => {
  const msg = callbackQuery.message;
  const data = callbackQuery.data;
  const chatId = msg.chat.id;
  
  await bot.answerCallbackQuery(callbackQuery.id);
  await bot.sendChatAction(chatId, 'typing');
  await delay(1000);

  switch (data) {
    case 'horarios':
      const horariosMessage = `🕒 *Horários de Atendimento*\n\n*Atendimento Padrão:*\n📍 Segunda a Sexta: 8h às 18h\n📍 Sábado: 8h às 12h\n\n*Plantão 24h:*\n🚨 Para emergências técnicas\n📞 (11) 9999-9999`;
      bot.sendMessage(chatId, horariosMessage, {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [{ text: '📞 Plantão', callback_data: 'plantao' }],
            [{ text: '↩️ Voltar', callback_data: 'voltar_menu' }]
          ]
        }
      });
      break;
      
    case 'servicos':
      const servicosMessage = `💻 *Serviços de TI*\n\n• Manutenção de Computadores\n• Redes e Infraestrutura\n• Segurança Digital\n• Desenvolvimento\n• Cloud e Servidores\n\n*Valores: R$ 99,90/mês*`;
      bot.sendMessage(chatId, servicosMessage, {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [{ text: '💰 Orçamento', callback_data: 'orcamento' }],
            [{ text: '↩️ Voltar', callback_data: 'voltar_menu' }]
          ]
        }
      });
      break;
      
    case 'redes_sociais':
      const redesMessage = `🌐 *Siga-nos:*\n\n📘 Facebook\n📷 Instagram\n💼 LinkedIn\n🐦 Twitter\n📹 YouTube`;
      bot.sendMessage(chatId, redesMessage, {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [
              { text: '📘 Facebook', url: 'https://facebook.com' },
              { text: '📷 Instagram', url: 'https://instagram.com' }
            ],
            [{ text: '↩️ Voltar', callback_data: 'voltar_menu' }]
          ]
        }
      });
      break;
      
    case 'atendente':
      const atendenteMessage = `👨‍💼 *Atendimento Humano*\n\n📞 (11) 3333-4444\n📧 contato@suporteti.com.br\n💬 WhatsApp: (11) 99999-8888\n\n*Respondemos em até 5min!*`;
      bot.sendMessage(chatId, atendenteMessage, {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [{ text: '💬 WhatsApp', url: 'https://wa.me/5511999998888' }],
            [{ text: '↩️ Voltar', callback_data: 'voltar_menu' }]
          ]
        }
      });
      break;
      
    case 'contato_urgente':
      const urgenteMessage = `🚨 *EMERGÊNCIA*\n\n📞 (11) 9999-9999\n💬 (11) 8888-7777\n\n*Plantão 24 horas*`;
      bot.sendMessage(chatId, urgenteMessage, {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [{ text: '📞 Ligar Agora', callback_data: 'ligar_plantao' }],
            [{ text: '↩️ Voltar', callback_data: 'voltar_menu' }]
          ]
        }
      });
      break;
      
    case 'voltar_menu':
      const menuMessage = `🛠️ *Menu Principal - Suporte TI*\n\n*Escolha uma opção:*\n\n🕒 1️⃣ - Horários de Atendimento\n💻 2️⃣ - Serviços de TI\n🌐 3️⃣ - Redes Sociais\n👨‍💼 4️⃣ - Falar com Atendente\n📞 5️⃣ - Contato Urgente`;
      bot.sendMessage(chatId, menuMessage, {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [
              { text: '🕒 Horários', callback_data: 'horarios' },
              { text: '💻 Serviços', callback_data: 'servicos' }
            ],
            [
              { text: '🌐 Redes Sociais', callback_data: 'redes_sociais' },
              { text: '👨‍💼 Atendente', callback_data: 'atendente' }
            ],
            [
              { text: '📞 Contato Urgente', callback_data: 'contato_urgente' }
            ]
          ]
        }
      });
      break;
      
    case 'orcamento':
      bot.sendMessage(chatId, '📋 *Solicitar Orçamento*\n\nPor favor, nos envie uma mensagem descrevendo seu problema ou necessidade. Nossa equipe entrará em contato com um orçamento personalizado!\n\n📧 contato@suporteti.com.br\n💬 (11) 99999-8888', {
        parse_mode: 'Markdown'
      });
      break;
      
    case 'plantao':
    case 'ligar_plantao':
      bot.sendMessage(chatId, '📞 *Conectando com o Plantão...*\n\nLigue agora para: *(11) 9999-9999*\n\nNosso técnico de plantão está aguardando sua ligação!', {
        parse_mode: 'Markdown'
      });
      break;
  }
});

// Comando /start personalizado
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const welcomeMessage = `🛠️ *Bem-vindo ao Suporte de TI!*\n\nOlá ${msg.from.first_name}! Eu sou o *Assistente Virtual de TI*.\n\n*Como posso ajudá-lo hoje?*\n\n🕒 1️⃣ - Horários de Atendimento\n💻 2️⃣ - Serviços de TI\n🌐 3️⃣ - Redes Sociais\n👨‍💼 4️⃣ - Falar com Atendente\n📞 5️⃣ - Contato Urgente`;
  
  bot.sendMessage(chatId, welcomeMessage, {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [
          { text: '🕒 Horários', callback_data: 'horarios' },
          { text: '💻 Serviços', callback_data: 'servicos' }
        ],
        [
          { text: '🌐 Redes Sociais', callback_data: 'redes_sociais' },
          { text: '👨‍💼 Atendente', callback_data: 'atendente' }
        ],
        [
          { text: '📞 Contato Urgente', callback_data: 'contato_urgente' }
        ]
      ]
    }
  });
});

console.log('✅ Bot de TI configurado e pronto para uso!');
