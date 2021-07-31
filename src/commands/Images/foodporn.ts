import { AstraeaCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'
import { RedditImage } from '@aero/ksoft'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'foodporn',
	aliases: ['food'],
	description: 'Returns a Image from r/foodporn',
	cooldownLimit: 3,
	cooldownDelay: 2000
})
export default class Food extends AstraeaCommand {
	public async run (message: Message): Promise<Message> {
		const { post, url }: RedditImage = await this.container.client.ksoft.images.reddit('foodporn', { removeNSFW: true, span: 'day' })
		const embed = new MessageEmbed()
			.setTitle(post.title)
			.setFooter(`Powered by api.ksoft.si ${post.author} | Upvotes: ${post.upvotes} | Downvotes ${post.downvotes}`)
			.setURL(post.link)
			.setTimestamp()
			.setImage(url)
			.setColor('ORANGE')
		return await message.channel.send(embed)
	}
}
