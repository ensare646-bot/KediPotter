const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('lock')
    .setDescription('Kanalı kilitle')
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
        SendMessages: false,
      });

      const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('🔒 Kanal Kilitlendi')
        .addFields(
          { name: 'Kanal', value: interaction.channel.name, inline: true },
          { name: 'Neden', value: reason, inline: true },
          { name: 'Moderatör', value: interaction.user.tag, inline: true }
        )
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (err) {
      await interaction.reply({ content: 'Kanal kilitlenirken hata oluştu', ephemeral: true });
    }
  },
};
