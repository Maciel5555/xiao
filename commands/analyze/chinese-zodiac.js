const Command = require('../../structures/Command');
const signs = require('../../assets/json/chinese-zodiac');

module.exports = class ChineseZodiacCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'chinese-zodiac',
			aliases: ['chinese-zodiac-sign'],
			group: 'analyze',
			memberName: 'chinese-zodiac',
			description: 'Responde com o signo zodíaco chinês determinado pelo ano que você dizer.',
			args: [
				{
					key: 'year',
					prompt: 'Em qual ano você deseja obter o signo zodíaco chinês?',
					type: 'integer',
					min: 1
				}
			]
		});
	}

	run(msg, { year }) {
		return msg.say(`O Signo do zodíaco chinês para ${year} e ${signs[year % signs.length]}.`);
	}
};
