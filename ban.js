const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bir kullanıcıyı sunucudan yasakla')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Yasaklanacak kullanıcı')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Yasaklanma nedeni')
        .setRequired(false)
    )
    .addIntegerOption(option =>
      option.setName('days')
        .setDescription('Silinecek mesaj günü (0-7)')
        .setMinValue(0)
        .setMaxValue(7)
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'Belirtilmedi';
    const days = interaction.options.getInteger('days') || 0;

    try {
      await interaction.guild.members.ban(user, { reason, deleteMessageDays: days });

      const embed = new EmbedBuilder()
        .setColor('#8B0000')
        .setTitle('🔨 Kullanıcı Yasaklandı')
        .addFields(
          { name: 'Kullanıcı', value: user.tag, inline: true },
          { name: 'Neden', value: reason, inline: true },
          { name: 'Moderatör', value: interaction.user.tag, inline: true },
          { name: 'Silinen Mesajlar', value: `${days} gün`, inline: true }
        )
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      await interaction.reply({
        content: 'Kullanıcı yasaklanırken hata oluştu',
        ephemeral: true,
      });
    }
  },
};
