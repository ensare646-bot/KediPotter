const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const warnsFile = path.join(__dirname, '../data/warns.json');

function getWarns() {
  if (!fs.existsSync(warnsFile)) return {};
  return JSON.parse(fs.readFileSync(warnsFile, 'utf8'));
}

function saveWarns(warns) {
  const dir = path.dirname(warnsFile);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(warnsFile, JSON.stringify(warns, null, 2));
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Bir kullanıcıya uyarı ver')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Uyarı verilecek kişi')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Uyarı nedeni')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason');
    const warns = getWarns();

    if (!warns[user.id]) warns[user.id] = [];

    warns[user.id].push({
      reason,
      moderator: interaction.user.tag,
      date: new Date().toLocaleString('tr-TR'),
    });

    saveWarns(warns);
    const warnCount = warns[user.id].length;

    const embed = new EmbedBuilder()
      .setColor('#FFFF00')
      .setTitle('⚠️ Uyarı Verildi')
      .addFields(
        { name: 'Kişi', value: user.tag, inline: true },
        { name: 'Uyarı Sayısı', value: `${warnCount}`, inline: true },
        { name: 'Neden', value: reason, inline: true },
        { name: 'Moderatör', value: interaction.user.tag, inline: true }
      )
      .setTimestamp();

    if (warnCount >= 3) {
      embed.addFields({ name: '⚠️ Uyarı', value: '3 uyarıya ulaştı!' });
    }

    await interaction.reply({ embeds: [embed] });
  },
};
