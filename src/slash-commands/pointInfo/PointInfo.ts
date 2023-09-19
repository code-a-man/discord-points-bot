import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonInteraction,
    ButtonStyle,
    ComponentType,
    EmbedBuilder,
    Message,
    SlashCommandBuilder,
  } from 'discord.js';
  import i18next from 'i18next';

  export const PointInfo: DiscordType.ISlashCommand = {
    data: new SlashCommandBuilder().setName('point').setDescription('Puan Kazanma testi menüsünü açar.'),
    execute: async ({ client, interaction, lang }) => {
      const row = new ActionRowBuilder<ButtonBuilder>({
        components: [
          new ButtonBuilder({
            custom_id: 'okey',
            label: i18next.t('common.accept', { lng: lang }),
            style: ButtonStyle.Success,
          }),
          new ButtonBuilder({
            custom_id: 'cancel',
            label: i18next.t('common.decline', { lng: lang }),
            style: ButtonStyle.Danger,
          }),
        ],
      });
  
      const question = await interaction.reply({
        components: [row],
      });
  
      const collector = question.createMessageComponentCollector({
        time: 1000 * 30,
        componentType: ComponentType.Button,
      });
  
      collector.on('collect', async (btn: ButtonInteraction) => {
        try {
     
          if (btn.customId === 'okey') {
            question.edit({
              content: `Bu bir test mesajıdır`,
              embeds: [new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(i18next.t('point.name', { lng: lang }))
                // .setURL('https://discord.js.org/')
                .setAuthor({ name:i18next.t('point.title', { lng: lang }), iconURL: client.user.displayAvatarURL(), url: 'https://discord.js.org' })
                .setDescription('Kanallardan Mesaj Atarak 5 PUAN Kazanabilirsin!\n\nSohbet baslatmak ve topluluk üyelerimizin arasındaki etkileşimin artması en önemli önceliklerimizden biri! Belirli sartlara uyan her mesaj icin puan kazanacaksın!')
                .setThumbnail(interaction.member.avatar || client.user.displayAvatarURL())
                .setImage('https://cdn.discordapp.com/attachments/1151088830254940170/1153778083598442548/image.png')],
                // .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' })],
              components: [],
            });
          } else {
            question.edit({
              content: `Bu bir test mesajıdır`,
              embeds: [new EmbedBuilder().setDescription('test cancel')],
              components: [],
            });
          }
          collector.stop('SUCCESS');
        } catch (error) {
          client.logger.error(error);
        }
      });
  
      collector.on('end', (_, reason) => {
        if (reason !== 'SUCCESS') {
          question.delete();
        }
      });
    },
  };
  