const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('role')
    .setDescription('Birine rol ver veya al')
    .addSubcommand(sub =>
      sub.setName('add')
        .setDescription('Rol ver')
        .addUserOption(opt => opt.setName('user').setDescription('Kişi').setRequired(true))
        .addRoleOption(opt => opt.setName('role').setDescription('Rol').setRequired(true))
    )
    .addSubcommand(sub =>
      sub.setName('remove')
        .setDescription('Rolü al')
        .addUserOption(opt => opt.setName('user').setDescription('Kişi').setRequired(true))
        .addRoleOption(opt => opt.setName('role').setDescription('Rol').setRequired(true))
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();
    const user = interaction.options.getUser('user');
    const role = interaction.options.getRole('role');
    const member = await interaction.guild.members.fetch(user.id);

    if (subcommand === 'add') {
      try {
        await member.roles.add(role);
        const embed = new EmbedBuilder()
          .setColor('#00FF00')
          .setTitle('✅ Rol Verildi')
          .addFields(
            { name: 'Kişi', value: user.tag, inline: true },
            { name: 'Rol', value: role.name, inline: true }
          )
          .setTimestamp();
        await interaction.reply({ embeds: [embed] });
      } catch (err) {
        await interaction.reply({ content: 'Rol verilemedi', ephemeral: true });
      }
    } else if (subcommand === 'remove') {
      try {
        await member.roles.remove(role);
        const embed = new EmbedBuilder()
          .setColor('#FF0000')
          .setTitle('✅ Rol Alındı')
          .addFields(
            { name: 'Kişi', value: user.tag, inline: true },
            { name: 'Rol', value: role.name, inline: true }
          )
          .setTimestamp();
        await interaction.reply({ embeds: [embed] });
      } catch (err) {
        await interaction.reply({ content: 'Rol alınamadı', ephemeral: true });
      }
    }
  }
};
