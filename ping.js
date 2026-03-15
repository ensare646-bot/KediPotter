const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Bot pingi kontrol et'),

  async execute(interaction) {
    const sent = await interaction.deferReply({ fetchReply: true });
    const latency = sent.createdTimestamp - interaction.createdTimestamp;
    const wsLatency = interaction.client.ws.ping;

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('🏓 Pong!')
      .addFields(
        { name: 'Bot Pingi', value: `${latency}ms`, inline: true },
        { name: 'WebSocket Pingi', value: `${wsLatency}ms`, inline: true }
      )
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  }
};
