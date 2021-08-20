import { Events, Listener, ListenerOptions, ListenerErrorPayload } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'
import { captureException } from '@sentry/minimal'

@ApplyOptions<ListenerOptions>({
  event: Events.ListenerError
})
export default class ErrorListener extends Listener {
  public async run(error: Error, { piece }: ListenerErrorPayload): Promise<unknown> {
    this.container.logger.fatal(`[LISTENER] ${piece.path}\n${error.stack || error.message}`)

    captureException(error, { tags: { name: piece.name } })

    return undefined
  }
}
