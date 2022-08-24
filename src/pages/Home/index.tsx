import { useContext, useState } from 'react'
import { Card } from '../../components/Card'
import { PostsContext } from '../../contexts/PostsContext'
import { UserCard } from './components/UserCard'

import styles from './styles.module.scss'

export function Home() {
  const [search, setSearch] = useState('')

  const { posts, totalPublished } = useContext(PostsContext)

  const filteredPost =
    search.length > 0
      ? posts?.filter((post) => post.title.includes(search))
      : []

  return (
    <div>
      <UserCard />
      <main className={styles.content}>
        <div className={styles.header}>
          <p>Publicações</p>
          <span>{totalPublished} publicações</span>
        </div>
        <input
          type="text"
          placeholder="Buscar conteúdo"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />

        <section>
          {search.length > 0 ? (
            <ul className={styles.list}>
              {filteredPost.map((post) => {
                const data = {
                  title: post.title,
                  slug: post.slug,
                  body: post.body,
                  created_at: post.created_at,
                }
                return (
                  <li key={post.id}>
                    <Card data={data} />
                  </li>
                )
              })}
            </ul>
          ) : (
            <ul className={styles.list}>
              {posts.map((post) => {
                const data = {
                  title: post.title,
                  slug: post.slug,
                  body: post.body,
                  created_at: post.created_at,
                }
                return (
                  <li key={post.id}>
                    <Card data={data} />
                  </li>
                )
              })}
            </ul>
          )}
        </section>
      </main>
    </div>
  )
}
