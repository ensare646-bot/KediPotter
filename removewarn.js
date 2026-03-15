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
    .setName('removewarn')
    .setDescription('Bir uyarıyı sil')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Uyarısı silinecek kişi')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option.setName('warnid')
        .setDescription('Silinecek uyarı numarası')
        .setMinValue(1)
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const warnId = interaction.options.getInteger('warnid') - 1;
    const warns = getWarns();

    if (!warns[user.id] || warns[user.id].length === 0) {
      await interaction.reply({ content: 'Bu kişinin uyarısı yok', ephemeral: true });
      return;
    }

    if (warnId < 0 || warnId >= warns[user.id].length) {
      await interaction.reply({ content: 'Geçersiz uyarı numarası', ephemeral: true });
      return;
    }

    const removed = warns[user.id][warnId];
    warns[user.id].splice(warnId, 1);

    if (warns[user.id].length === 0) delete warns[user.id];

    saveWarns(warns);

    const embed = new EmbedBuilder()
      .setColor('#00FF00')
      .setTitle('✅ Uyarı Silindi')
      .addFields(
        { name: 'Kişi', value: user.tag, inline: true },
        { name: 'Silinen Uyarı', value: removed.reason, inline: true },
        { name: 'Moderatör', value: interaction.user.tag, inline: true }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
