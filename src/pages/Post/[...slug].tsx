import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

import {
  FaCalendar,
  FaChevronLeft,
  FaComment,
  FaExternalLinkAlt,
  FaGithub,
} from 'react-icons/fa'

import { PostsContext } from '../../contexts/PostsContext'
import { dateFormatDistanceToNow } from '../../utils/formatter'

import styles from './styles.module.scss'

export function Post() {
  const { posts } = useContext(PostsContext)
  const { slug } = useParams<{ slug: string }>()

  const post = posts.find((post) => post.slug === slug)

  if (post !== undefined) {
    return (
      <div>
        <div className={styles.card}>
          <div className={styles.header}>
            <a href="/">
              <FaChevronLeft size={12} />
              <span>VOLTAR</span>
            </a>
            <a href={post?.html_url}>
              <span>VER NO GITHUB</span> <FaExternalLinkAlt size={12} />
            </a>
          </div>

          <h1>{post?.title}</h1>

          <div className={styles.infos}>
            <span>
              <FaGithub /> {post?.user.login}
            </span>
            <span>
              <FaCalendar />
              {post?.created_at &&
                dateFormatDistanceToNow(new Date(post?.created_at))}
            </span>
            <span>
              <FaComment /> {post?.comments} comentários
            </span>
          </div>
        </div>
        <div className={styles.content}>
          <ReactMarkdown children={post?.body as string} />
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <h1>Publicação não encontrada</h1>
      </div>
    )
  }
}
