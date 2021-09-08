const Command = require('../../structures/Command');
const { formatNumber } = require('../../util/Util');

module.exports = class CharacterCountCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'character-count',
			aliases: ['characters', 'chars', 'contarletras', 'char-count'],
			group: 'analyze',
			memberName: 'character-count',
			description: 'Fala quantas letras tem sua mensagem.',
			args: [
				{
					key: 'text',
					prompt: 'De qual texto eu devo contas as letras?',
					type: 'string'
				}
			]
		});
	}

	run(msg, { text }) {
		return msg.reply(formatNumber(text.length));
	}
};
