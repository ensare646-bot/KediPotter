const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Sunucu hakkında bilgi göster'),

  async execute(interaction) {
    const guild = interaction.guild;

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`${guild.name} Bilgileri`)
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .addFields(
        { name: 'Sunucu ID', value: guild.id, inline: true },
        { name: 'Sahip', value: `<@${guild.ownerId}>`, inline: true },
        { name: 'Oluşturulma', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true },
        { name: 'Üye Sayısı', value: `${guild.memberCount}`, inline: true },
        { name: 'Kanal Sayısı', value: `${guild.channels.cache.size}`, inline: true },
        { name: 'Rol Sayısı', value: `${guild.roles.cache.size}`, inline: true }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
