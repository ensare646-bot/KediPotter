const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nick')
    .setDescription('Birinin sunucudaki adını değiştir')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Kişi')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('nickname')
        .setDescription('Yeni ad')
        .setRequired(true)
        .setMaxLength(32)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const nick = interaction.options.getString('nickname');
    const member = await interaction.guild.members.fetch(user.id);

    try {
      await member.setNickname(nick);
      const embed = new EmbedBuilder()
        .setColor('#9370DB')
        .setTitle('✅ Ad Değiştirildi')
        .addFields(
          { name: 'Kişi', value: user.tag, inline: true },
          { name: 'Yeni Ad', value: nick, inline: true }
        )
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    } catch (err) {
      await interaction.reply({ content: 'Ad değiştirilemedi', ephemeral: true });
    }
  },
};
