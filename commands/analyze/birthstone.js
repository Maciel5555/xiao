const Command = require('../../structures/Command');
const { list, firstUpperCase } = require('../../util/Util');
const months = require('../../assets/json/month');
const stones = require('../../assets/json/birthstone');

module.exports = class BirthstoneCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'birthstone',
			group: 'analyze',
			memberName: 'birthstone',
			description: 'Responde com a pedra de nascimento de nascença em um mês',
			args: [
				{
					key: 'month',
					prompt: 'Para qual mês você quer obter a pedra de nascimento?',
					type: 'month'
				}
			]
		});
	}

	run(msg, { month }) {
		const stone = stones[month - 1];
		const alternate = stone.alternate ? ` Alternatively, you can also use ${list(stone.alternate, 'or')}.` : '';
		return msg.say(`A Pedra de nascimento para ${firstUpperCase(months[month - 1])} e ${stone.primary}.${alternate}`);
	}
};
