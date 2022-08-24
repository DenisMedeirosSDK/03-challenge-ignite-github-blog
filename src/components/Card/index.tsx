import { dateFormatDistanceToNow } from '../../utils/formatter'

import styles from './styles.module.scss'

interface CardProps {
  data: {
    slug: string
    title: string
    body: string
    created_at: string
  }
}

export function Card({ data }: CardProps) {
  return (
    <a
      href={`http://localhost:5173/post/${data.slug}`}
      className={styles.container}
    >
      <div className={styles.header}>
        <p>{data.title}</p>
        <span>
          {dateFormatDistanceToNow(new Date(data.created_at as string))}
        </span>
      </div>

      <p className={styles.description}>{data.body}</p>
    </a>
  )
}
