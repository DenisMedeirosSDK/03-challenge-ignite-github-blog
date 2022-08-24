import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export function dateFormatDistanceToNow(date: Date) {
  const dateFormat = formatDistanceToNow(date, {
    locale: ptBR,
  })

  return dateFormat
}
