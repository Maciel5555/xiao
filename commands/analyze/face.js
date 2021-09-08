const Command = require('../../structures/Command');
const request = require('node-superfetch');
const { oneLine } = require('common-tags');
const { base64 } = require('../../util/Util');
const { FACEPLUSPLUS_KEY, FACEPLUSPLUS_SECRET } = process.env;
const emotions = ['anger', 'disgust', 'fear', 'happiness', 'neutral', 'sadness', 'surprise'];
const emotionResponse = ['angry', 'disgusted', 'afraid', 'happy', 'uncaring', 'sad', 'surprised'];

module.exports = class FaceCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'face',
			group: 'analyze',
			memberName: 'face',
			description: 'Determina raça, idade e sexo por imagem.',
			throttling: {
				usages: 1,
				duration: 30
			},
			credit: [
				{
					name: 'Face++ Cognitive Services',
					url: 'https://www.faceplusplus.com/',
					reason: 'Face Detection API',
					reasonURL: 'https://www.faceplusplus.com/face-detection/'
				}
			],
			args: [
				{
					key: 'image',
					prompt: 'Qual rosto você gostaria de escanear?',
					type: 'image'
				}
			]
		});
	}

	async run(msg, { image }) {
		try {
			const face = await this.detect(image);
			if (!face) return msg.reply('Não ha rostos dessa imagem!');
			if (face === 'size') return msg.reply('Essa imagem e muito grande.');
			const pronoun = face.gender.value === 'Masculino' ? 'Ele' : 'Ela';
			const emotion = emotionResponse[emotions.indexOf(
				emotions.slice(0).sort((a, b) => face.emotion[b] - face.emotion[a])[0]
			)];
			const smile = face.smile.value > face.smile.threshold;
			const beautyScore = face.gender.value === 'Masculino' ? face.beauty.female_score : face.beauty.male_score;
			return msg.reply(oneLine` Acho que essa imagem tem
				${face.age.value} anos ${face.gender.value.toLowerCase()}.
				${pronoun} appears to be ${emotion}, and is ${smile ? 'smiling' : 'not smiling'}. I give this
				face a ${Math.round(beautyScore)} on the 1-100 beauty scale.
				${beautyScore > 50 ? beautyScore > 70 ? beautyScore > 90 ? 'Hot!' : 'Not bad.' : 'Not _too_ ugly.' : 'Uggggly!'}
			`);
		} catch (err) {
			if (err.status === 400) return msg.reply('There are no faces in this image.');
			if (err.status === 403) return msg.reply('Hold your horses! The command is overloaded! Try again soon.');
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}

	async detect(image) {
		const imgData = await request.get(image);
		if (Buffer.byteLength(imgData.body) >= 2e+6) return 'size';
		const { body } = await request
			.post('https://api-us.faceplusplus.com/facepp/v3/detect')
			.attach('image_base64', base64(imgData.body))
			.query({
				api_key: FACEPLUSPLUS_KEY,
				api_secret: FACEPLUSPLUS_SECRET,
				return_attributes: 'gender,age,smiling,emotion,ethnicity,beauty'
			});
		if (!body.faces || !body.faces.length) return null;
		return body.faces[0].attributes;
	}
};
