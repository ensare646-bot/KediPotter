const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Bir kullanıcıyı sustur')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Susturulacak kişi')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option.setName('duration')
        .setDescription('Kaç dakika susturulsun')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Neden')
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const duration = interaction.options.getInteger('duration');
    const reason = interaction.options.getString('reason') || 'Belirtilmedi';
    const member = await interaction.guild.members.fetch(user.id);

    if (!member) {
      await interaction.reply({ content: 'Kullanıcı bulunamadı', ephemeral: true });
      return;
    }

    if (!member.moderatable) {
      await interaction.reply({ content: 'Bu kişiyi susturamam', ephemeral: true });
      return;
    }

    const muteTime = duration * 60 * 1000;

    try {
      await member.timeout(muteTime, reason);

      const embed = new EmbedBuilder()
        .setColor('#FFA500')
        .setTitle('🔇 Kullanıcı Susturuldu')
        .addFields(
          { name: 'Kişi', value: user.tag, inline: true },
          { name: 'Süre', value: `${duration} dakika`, inline: true },
          { name: 'Neden', value: reason, inline: true },
          { name: 'Moderatör', value: interaction.user.tag, inline: true }
        )
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (err) {
      await interaction.reply({ content: 'Hata oluştu', ephemeral: true });
    }
  },
};
