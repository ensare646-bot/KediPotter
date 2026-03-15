const { EmbedBuilder } = require('discord.js');

module.exports = (client) => {
  client.on('guildMemberAdd', async (member) => {
    try {
      const guild = member.guild;
      const channel = guild.channels.cache.get('1445865695694028950');
      
      if (!channel) return;

      const created = Math.floor(member.user.createdTimestamp / 1000);
      const joined = Math.floor(member.joinedTimestamp / 1000);

      const msg = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('👋 Yeni Üye')
        .setDescription(`${member.user.tag} katıldı`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .addFields(
          { name: 'Kullanıcı', value: member.user.tag, inline: true },
          { name: 'ID', value: member.user.id, inline: true },
          { name: 'Hesap', value: `<t:${created}:R>`, inline: true },
          { name: 'Katılma', value: `<t:${joined}:R>`, inline: true },
          { name: 'Üye Sayısı', value: `${guild.memberCount}`, inline: true },
          { name: 'Bot', value: member.user.bot ? 'Evet' : 'Hayır', inline: true }
        )
        .setTimestamp();

      await channel.send({ embeds: [msg] });
    } catch (e) {
      console.error(e);
    }
  });

  client.on('guildMemberRemove', async (member) => {
    try {
      const guild = member.guild;
      const channel = guild.channels.cache.get('1445865695694028950');
      
      if (!channel) return;

      const created = Math.floor(member.user.createdTimestamp / 1000);
      const joined = Math.floor(member.joinedTimestamp / 1000);
      const duration = Math.floor((Date.now() - member.joinedTimestamp) / 1000 / 60 / 60);

      const msg = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('👋 Üye Ayrıldı')
        .setDescription(`${member.user.tag} ayrıldı`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .addFields(
          { name: 'Kullanıcı', value: member.user.tag, inline: true },
          { name: 'ID', value: member.user.id, inline: true },
          { name: 'Hesap', value: `<t:${created}:R>`, inline: true },
          { name: 'Katılma', value: `<t:${joined}:R>`, inline: true },
          { name: 'Kalış', value: `${duration} saat`, inline: true },
          { name: 'Kalan Üye', value: `${guild.memberCount}`, inline: true }
        )
        .setTimestamp();

      await channel.send({ embeds: [msg] });
    } catch (e) {
      console.error(e);
    }
  });
};
