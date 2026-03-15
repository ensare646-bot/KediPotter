const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Komutları göster'),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('📚 Komutlar')
      .setDescription('Tüm komutlar aşağıda listelenmiştir')
      .addFields(
        { 
          name: '🔨 Moderasyon', 
          value: '/kick\n/ban\n/unban\n/mute\n/unmute\n/warn\n/warns\n/removewarn', 
          inline: true 
        },
        { 
          name: '📝 Kanal Yönetimi', 
          value: '/clear\n/slowmode\n/lock\n/unlock', 
          inline: true 
        },
        { 
          name: 'ℹ️ Bilgi', 
          value: '/userinfo\n/serverinfo', 
          inline: true 
        },
        { 
          name: '🎮 Eğlence', 
          value: '/say\n/avatar\n/ping', 
          inline: true 
        },
        { 
          name: '⚙️ Yönetim', 
          value: '/role\n/nick\n/dm', 
          inline: true 
        }
      )
      .setFooter({ text: 'Moderasyon Botu' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};
