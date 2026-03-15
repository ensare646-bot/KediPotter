const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('slowmode')
    .setDescription('Kanal yavaş modu ayarla')
    .addIntegerOption(option =>
      option.setName('seconds')
        .setDescription('Kaç saniye (0 = kapat)')
        .setMinValue(0)
        .setMaxValue(21600)
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    const seconds = interaction.options.getInteger('seconds');

    try {
      await interaction.channel.setRateLimitPerUser(seconds);

      let status = seconds === 0 ? 'Kapatıldı' : `${seconds} saniye`;

      const embed = new EmbedBuilder()
        .setColor('#9370DB')
        .setTitle('⏱️ Yavaş Mod Ayarlandı')
        .addFields(
          { name: 'Kanal', value: interaction.channel.name, inline: true },
          { name: 'Süre', value: status, inline: true },
          { name: 'Moderatör', value: interaction.user.tag, inline: true }
        )
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (err) {
      await interaction.reply({ content: 'Yavaş mod ayarlanırken hata oluştu', ephemeral: true });
    }
  },
};
