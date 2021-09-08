const Command = require('../../structures/Command');

module.exports = class AgeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'age',
			group: 'analyze',
			memberName: 'age',
			description: 'Responde qual a idade de alguem.',
			args: [
				{
					key: 'year',
					prompt: 'Para qual ano você gostaria de receber a idade?',
					type: 'integer',
					min: 1
				}
			]
		});
	}

	run(msg, { year }) {
		const currentYear = new Date().getFullYear();
		const age = currentYear - year;
		if (age < 0) return msg.say(`Alguem nascido em ${year} teria hoje ${Math.abs(age)} anos.`);
		return msg.say(`Alguem nascido em ${year} teria hoje ${age} anos.`);
	}
};
