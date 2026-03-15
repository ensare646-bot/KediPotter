const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Bir kullanıcı hakkında bilgi göster')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Bilgi gösterilecek kişi')
        .setRequired(false)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const member = await interaction.guild.members.fetch(user.id);

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`${user.tag} Bilgileri`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: 'Kullanıcı ID', value: user.id, inline: true },
        { name: 'Hesap Oluşturma', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`, inline: true },
        { name: 'Sunucuya Katılma', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`, inline: true },
        { name: 'Rol Sayısı', value: `${member.roles.cache.size - 1}`, inline: true },
        { name: 'Bot mu?', value: user.bot ? 'Evet' : 'Hayır', inline: true },
        { name: 'Durum', value: member.presence?.status || 'Bilinmiyor', inline: true }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
