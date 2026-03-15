const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Birinin avatarını göster')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Avatar gösterilecek kişi')
        .setRequired(false)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const avatar = user.displayAvatarURL({ dynamic: true, size: 1024 });

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`${user.tag} Avatar`)
      .setImage(avatar)
      .setURL(avatar)
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};
