const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unmute')
    .setDescription('Bir kullanıcının susturmasını kaldır')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Susturması kaldırılacak kişi')
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
    const reason = interaction.options.getString('reason') || 'Belirtilmedi';
    const member = await interaction.guild.members.fetch(user.id);

    if (!member) {
      await interaction.reply({ content: 'Kullanıcı bulunamadı', ephemeral: true });
      return;
    }

    try {
      await member.timeout(null, reason);

      const embed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('🔊 Susturma Kaldırıldı')
        .addFields(
          { name: 'Kişi', value: user.tag, inline: true },
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
