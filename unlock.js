const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unlock')
    .setDescription('Kanalın kilidini aç')
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Neden')
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    const reason = interaction.options.getString('reason') || 'Belirtilmedi';

    try {
      await interaction.channel.permissionOverwrites.edit(interaction.guild.id, {
        SendMessages: null,
      });

      const embed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('🔓 Kanal Açıldı')
        .addFields(
          { name: 'Kanal', value: interaction.channel.name, inline: true },
          { name: 'Neden', value: reason, inline: true },
          { name: 'Moderatör', value: interaction.user.tag, inline: true }
        )
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (err) {
      await interaction.reply({ content: 'Kanal açılırken hata oluştu', ephemeral: true });
    }
  },
};
