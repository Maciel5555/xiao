const Command = require('../../structures/Command');

module.exports = class ShipCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ship',
            group: 'random-res',
            memberName: 'ship',
            description: 'Ships things/people together.',
            args: [
                {
                    key: 'things',
                    prompt: 'What do you want to ship together?',
                    type: 'string',
                    infinite: true
                }
            ]
        });
    }

    run(msg, args) {
        const { things } = args;
        const rating = Math.floor(Math.random() * 100) + 1;
        return msg.say(`I'd give ${things.join(' and ')} a ${rating}%!`);
    }
};
