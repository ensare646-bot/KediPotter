const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Bota mesaj yazdır')
    .addStringOption(option =>
      option.setName('message')
        .setDescription('Yazılacak mesaj')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const msg = interaction.options.getString('message');
    
    await interaction.deferReply();
    await interaction.channel.send(msg);
    await interaction.editReply({
      content: '✅ Mesaj gönderildi',
      ephemeral: true
    });
  }
};
