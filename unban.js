const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Bir kullanıcının yasağını kaldır')
    .addStringOption(option =>
      option.setName('userid')
        .setDescription('Yasaklı kullanıcının ID\'si')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Neden')
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const userId = interaction.options.getString('userid');
    const reason = interaction.options.getString('reason') || 'Belirtilmedi';

    try {
      const user = await interaction.client.users.fetch(userId);
      await interaction.guild.bans.remove(userId, reason);

      const embed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('✅ Yasak Kaldırıldı')
        .addFields(
          { name: 'Kullanıcı', value: user.tag, inline: true },
          { name: 'Neden', value: reason, inline: true },
          { name: 'Moderatör', value: interaction.user.tag, inline: true }
        )
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (err) {
      await interaction.reply({ content: 'Kullanıcı bulunamadı', ephemeral: true });
    }
  },
};
