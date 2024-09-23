const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { Sequelize, DataTypes } = require('sequelize');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageTyping] });


const sequelize = new Sequelize('mekaido', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

const User = sequelize.define('discord_users', {
    discordId: { type: DataTypes.STRING, unique: true },
    profileLevel: { type: DataTypes.INTEGER, defaultValue: 1 },
    account1: { type: DataTypes.STRING },
    accountLevel1: { type: DataTypes.INTEGER, defaultValue: 1 },
    account2: { type: DataTypes.STRING },
    accountLevel2: { type: DataTypes.INTEGER, defaultValue: 1 },
    account3: { type: DataTypes.STRING },
    accountLevel3: { type: DataTypes.INTEGER, defaultValue: 1 },
});

sequelize.sync();

client.once('ready', () => {
    console.log('Bot is online!');
});

const classDetails = {
    warrior: {
        description: 'A strong melee fighter, excelling in strength and defense.',
        abilities: 'High physical damage and tanking abilities.',
        abilitiesCount: 3,
        skills: ['Shield Block', 'Power Strike', 'Charge'],
        baseStats: { strength: 15, agility: 5, intelligence: 3 },
        maxLevel: 100,
    },
    mage: {
        description: 'A master of spells, attacking enemies from a distance.',
        abilities: 'High magical damage and area control.',
        abilitiesCount: 3,
        skills: ['Fireball', 'Ice Shield', 'Arcane Explosion'],
        baseStats: { strength: 3, agility: 5, intelligence: 15 },
        maxLevel: 100,
    },
    rogue: {
        description: 'A master of stealth and agility.',
        abilities: 'High burst damage and evasion.',
        abilitiesCount: 3,
        skills: ['Backstab', 'Cloak', 'Poison Dagger'],
        baseStats: { strength: 5, agility: 15, intelligence: 5 },
        maxLevel: 100,
    },
    paladin: {
        description: 'A holy warrior that heals and protects.',
        abilities: 'Good balance of damage and healing.',
        abilitiesCount: 3,
        skills: ['Holy Light', 'Shield of Faith', 'Divine Strike'],
        baseStats: { strength: 10, agility: 5, intelligence: 10 },
        maxLevel: 100,
    },
    hunter: {
        description: 'A master of ranged weapons and precision.',
        abilities: 'Excellent at tracking and ranged damage.',
        skills: ['Aim Shot', 'Traps', 'Beast Mastery'],
        baseStats: { strength: 5, agility: 15, intelligence: 5 },
        maxLevel: 100,
    },
    berserker: {
        description: 'Unleashes rage for massive damage.',
        abilities: 'High damage output with self-damage mechanics.',
        abilitiesCount: 3,
        skills: ['Berserk', 'Frenzy', 'Rage'],
        baseStats: { strength: 20, agility: 5, intelligence: 1 },
        maxLevel: 100,
    },
    sorcerer: {
        description: 'Wields powerful elemental magic.',
        abilities: 'High magical damage with elemental effects.',
        abilitiesCount: 3,
        skills: ['Lightning Bolt', 'Frost Nova', 'Firestorm'],
        baseStats: { strength: 3, agility: 5, intelligence: 20 },
        maxLevel: 100,
    },
    samurai: {
        description: 'A master of swordsmanship, combining speed and precision.',
        abilities: 'High damage with quick strikes.',
        abilitiesCount: 3,
        skills: ['Blade Dance', 'Keen Eye', 'Shadow Slash'],
        baseStats: { strength: 15, agility: 15, intelligence: 5 },
        maxLevel: 100,
    },
};

client.once('ready', async () => {
    await sequelize.sync();
    console.log('Bot is online!');
});

client.on('messageCreate', async (message) => {
    if (message.content === '!createAccount') {
        const user = await User.findOne({ where: { discordId: message.author.id } });

        if (!user) {
            const introEmbed = new EmbedBuilder()
                .setColor(0xFFD700)
                .setTitle('Welcome to Mekaido RPG!')
                .setDescription('Embark on an adventure like no other in the world of **Mekaido**! 🌟')
                .addFields(
                    { name: '🎮 Fun Awaits!', value: 'Mekaido RPG is an exciting multiplayer experience where you can choose from multiple character classes and develop your skills.' },
                    { name: 'Let\'s Begin!', value: 'Now, let\'s get started by creating your first character. Choose your class wisely as it will shape your journey in Mekaido.' }
                )
                .setFooter({ text: 'You can create up to 3 characters.' });

            await message.reply({ embeds: [introEmbed] });

            setTimeout(async () => {
                const classEmbed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle('Choose Your RPG Class')
                    .setDescription('Select a class below to create an account. Each class has unique abilities:')
                    .setFooter({ text: 'You can create up to 3 accounts.' });

                const row = new ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId('selectClass')
                            .setPlaceholder('Select a Class')
                            .addOptions([
                                { label: 'Warrior', value: 'warrior', emoji: '⚔️' },
                                { label: 'Mage', value: 'mage', emoji: '🧙' },
                                { label: 'Rogue', value: 'rogue', emoji: '🛡️' },
                                { label: 'Paladin', value: 'paladin', emoji: '⚖️' },
                                { label: 'Hunter', value: 'hunter', emoji: '🏹', disabled: true },
                                { label: 'Berserker', value: 'berserker', emoji: '🩸', disabled: true },
                                { label: 'Sorcerer', value: 'sorcerer', emoji: '🌪️', disabled: true },
                                { label: 'Samurai', value: 'samurai', emoji: '🥷', disabled: true },
                            ]),
                    );

                await message.reply({ embeds: [classEmbed], components: [row] });
            }, 5000);
        } else {
            const classEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('Choose Your RPG Class')
                .setDescription('Select a class below to create an account. Each class has unique abilities:')
                .setFooter({ text: 'You can create up to 3 accounts.' });

            const row = new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('selectClass')
                        .setPlaceholder('Select a Class')
                        .addOptions([
                            { label: 'Warrior', value: 'warrior', emoji: '⚔️' },
                            { label: 'Mage', value: 'mage', emoji: '🧙' },
                            { label: 'Rogue', value: 'rogue', emoji: '🛡️' },
                            { label: 'Paladin', value: 'paladin', emoji: '⚖️' },
                            { label: 'Hunter', value: 'hunter', emoji: '🏹' },
                        ]),
            );

            if (user.profileLevel >= 10) {
                row.components[0].addOptions({ label: 'Hunter', value: 'hunter', emoji: '🏹' });
            }
            if (user.profileLevel >= 35) {
                row.components[0].addOptions({ label: 'Berserker', value: 'berserker', emoji: '🩸' });
            }
            if (user.profileLevel >= 60) {
                row.components[0].addOptions({ label: 'Sorcerer', value: 'sorcerer', emoji: '🌪️' });
            }
            if (user.profileLevel >= 100) {
                row.components[0].addOptions({ label: 'Samurai', value: 'samurai', emoji: '🥷' });
            }

            await message.reply({ embeds: [classEmbed], components: [row] });
        }
    }
});

client.on('interactionCreate', async (interaction) => {
    if (interaction.isStringSelectMenu()) {
        if (interaction.customId === 'selectClass') {
            const selectedClass = interaction.values[0];
            const details = classDetails[selectedClass];

            const detailEmbed = new EmbedBuilder()
                .setColor(0xffa500)
                .setTitle(`${selectedClass.charAt(0).toUpperCase() + selectedClass.slice(1)} Class - Base Stats`)
                .addFields(
                    { name: ' ', value: 'For more detailed information about a class use the `/lookup [class]`\ncommand. This is basic information.' },
                    { name: ' ', value: '**<:hp:1287462704004730960> Level 1 Health |** ▰▰▰▰▰▰\nLevel 1 health is at 150HP, and can be leveld up and crowned.' },
                    { name: ' ', value: '**<:axe:1287462702507364423> Level 3 Strength |** ▰▰▰▰▰▰\nLevel 3 strength is at 35STR, and can be leveld up and crowned.' },
                    { name: ' ', value: '**<:witchdust:1287462701244612638> Level 1 Wisdom |** ▰▰▰▰▰▰\nLevel 1 wisom is at 10WIS, and can be leveld up and crowned.' },
                    { name: ' ', value: '―――――――――――――――――――――――――――――――――'},
                    { name: ' ', value: `**<:powerstat:1287464791891382454> Abilities |** ▰▰▰\nThe ${selectedClass.charAt(0).toUpperCase() + selectedClass.slice(1)} class have ${details.abilitiesCount} abilites, and each ability can be maxed out by being crowned.` },
                )
                .setFooter({
                    text: 'Mekaido RPG | The class stats are subject to change.',
                    iconURL: 'https://media.discordapp.net/attachments/941989669892128778/1287464025797427240/Design_uden_navn_2.png?ex=66f1a3cf&is=66f0524f&hm=4df2140e7610d3f6b1d7749fafa05503142565586bd9f690cc4b393d5aea0043&=&format=webp&quality=lossless&width=350&height=350'
                });

            const confirmRow = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`createAccount_${selectedClass}`)
                        .setLabel('Create Account')
                        .setStyle(ButtonStyle.Primary)
                );

            const row = new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('selectNewClass')
                        .setPlaceholder('Showcase new Class')
                        .addOptions([
                            { label: 'Mage', value: 'mage', emoji: '🧙' },
                            { label: 'Rogue', value: 'rogue', emoji: '🛡️' },
                            { label: 'Paladin', value: 'paladin', emoji: '⚖️' },
                            { label: 'Hunter', value: 'hunter', emoji: '🏹' },
                        ]),
                );

            if (user.profileLevel >= 10) {
                row.components[0].addOptions({ label: 'Tier 1 Warrior', value: '1', emoji: '⚔️' });
            }
            if (user.profileLevel >= 35) {
                row.components[0].addOptions({ label: 'Tier 2 Warrior', value: '2', emoji: '⚔️' });
            }
            if (user.profileLevel >= 60) {
                row.components[0].addOptions({ label: 'Tier 3 Warrior', value: '3', emoji: '⚔️' });
            }
            if (user.profileLevel >= 100) {
                row.components[0].addOptions({ label: 'Tier 4 Warrior', value: '4', emoji: '⚔️' });
            }

            await interaction.reply({ embeds: [detailEmbed], components: [confirmRow, row] });
        }

        if (interaction.customId.startsWith('createAccount_')) {
            const selectedProfile = interaction.customId.split('_')[1];
            const user = await User.findOne({ where: { discordId: interaction.user.id } });

            if (!user) {
                await User.create({ discordId: interaction.user.id });
            }

            let accountSlot = null;
            let accountLevelField = null;

            if (!user.account1) {
                accountSlot = 'account1';
                accountLevelField = 'accountLevel1';
            } else if (!user.account2) {
                accountSlot = 'account2';
                accountLevelField = 'accountLevel2';
            } else if (!user.account3) {
                accountSlot = 'account3';
                accountLevelField = 'accountLevel3';
            } else {
                return interaction.reply('You already have 3 accounts!');
            }

            user[accountSlot] = selectedProfile;
            user[accountLevelField] = 1;
            await user.save();

            interaction.reply(`Account created with the **${selectedProfile.charAt(0).toUpperCase() + selectedProfile.slice(1)}** profile at level 1!`);
        }
    }
});



client.login('...');
