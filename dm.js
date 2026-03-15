const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dm')
    .setDescription('Birine özel mesaj gönder')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Kişi')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('message')
        .setDescription('Mesaj')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const msg = interaction.options.getString('message');

    try {
      const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('📨 Sunucudan Mesaj')
        .setDescription(msg)
        .setFooter({ text: `Gönderen: ${interaction.user.tag}` })
        .setTimestamp();

      await user.send({ embeds: [embed] });
      await interaction.reply({
        content: `✅ Mesaj ${user.tag} kişisine gönderildi`,
        ephemeral: true
      });
    } catch (err) {
      await interaction.reply({
        content: 'Mesaj gönderilemedi',
        ephemeral: true
      });
    }
  }
};
