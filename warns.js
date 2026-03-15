const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const warnsFile = path.join(__dirname, '../data/warns.json');

function getWarns() {
  if (!fs.existsSync(warnsFile)) return {};
  return JSON.parse(fs.readFileSync(warnsFile, 'utf8'));
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warns')
    .setDescription('Bir kullanıcının uyarılarını göster')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Uyarıları gösterilecek kişi')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const warns = getWarns();

    if (!warns[user.id] || warns[user.id].length === 0) {
      await interaction.reply({ content: `${user.tag} hiç uyarısı yok`, ephemeral: true });
      return;
    }

    const userWarns = warns[user.id];
    let description = '';

    userWarns.forEach((warn, index) => {
      description += `**${index + 1}.** ${warn.reason}\n`;
      description += `Moderatör: ${warn.moderator} | Tarih: ${warn.date}\n\n`;
    });

    const embed = new EmbedBuilder()
      .setColor('#FF6347')
      .setTitle(`⚠️ ${user.tag} Uyarıları`)
      .setDescription(description)
      .setFooter({ text: `Toplam: ${userWarns.length} uyarı` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
