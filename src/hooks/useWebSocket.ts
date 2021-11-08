type WebSocketParameters = ConstructorParameters<typeof WebSocket>

type WebSocketOptions<T> = {
  url: WebSocketParameters[0]
  protocols?: WebSocketParameters[1]
  data: Parameters<InstanceType<typeof WebSocket>['send']>[0]
  onMessage?: (ev: MessageEvent<T>) => void
  onError?: (ev: Event) => void
}

import { useEffect } from 'preact/hooks'

const useWebSocket = <T>(
  { url, protocols, data, onError, onMessage }: WebSocketOptions<T>,
  deps?: []
) => {
  useEffect(() => {
    const socket = new WebSocket(url, protocols)

    socket.addEventListener('open', () => {
      socket.send(data)
    })

    if (onMessage) {
      socket.addEventListener('message', onMessage)
    }
    if (onError) {
      socket.addEventListener('error', onError)
    }

    return () => {
      socket.close()
    }
  }, [onError, data])
}

export { useWebSocket }
