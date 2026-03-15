const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Kanal mesajlarını sil')
    .addIntegerOption(option =>
      option.setName('amount')
        .setDescription('Kaç mesaj silinsin')
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const amount = interaction.options.getInteger('amount');

    try {
      const deleted = await interaction.channel.bulkDelete(amount, true);

      const embed = new EmbedBuilder()
        .setColor('#4169E1')
        .setTitle('🗑️ Mesajlar Silindi')
        .addFields(
          { name: 'Silinen Mesaj Sayısı', value: `${deleted.size}`, inline: true },
          { name: 'Kanal', value: interaction.channel.name, inline: true },
          { name: 'Moderatör', value: interaction.user.tag, inline: true }
        )
        .setTimestamp();

      await interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (err) {
      await interaction.reply({ content: 'Mesajlar silinirken hata oluştu', ephemeral: true });
    }
  },
};
