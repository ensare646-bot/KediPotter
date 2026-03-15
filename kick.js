const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Bir kullanıcıyı sunucudan at')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Atılacak kullanıcı')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Atılma nedeni')
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'Belirtilmedi';
    const member = await interaction.guild.members.fetch(user.id);

    if (!member) {
      await interaction.reply({ content: 'Kullanıcı bulunamadı', ephemeral: true });
      return;
    }

    if (!member.kickable) {
      await interaction.reply({ content: 'Bu kullanıcıyı atamazsınız', ephemeral: true });
      return;
    }

    await member.kick(reason);

    const embed = new EmbedBuilder()
      .setColor('#FF0000')
      .setTitle('👢 Kullanıcı Atıldı')
      .addFields(
        { name: 'Kullanıcı', value: user.tag, inline: true },
        { name: 'Neden', value: reason, inline: true },
        { name: 'Moderatör', value: interaction.user.tag, inline: true }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
