import { createContext, ReactNode, useEffect, useState } from 'react'
import slugify from 'slugify'
import { api } from '../lib/axios'

interface PostsProviderProps {
  children: ReactNode
}

interface Post {
  id: number
  slug: string
  title: string
  body: string
  html_url: string
  comments: number
  user: {
    login: string
  }
  created_at: string
}
interface PostAPI {
  id: number
  title: string
  body: string
  html_url: string
  comments: number
  user: {
    login: string
  }
  created_at: string
}

interface ResponseAPI {
  total_count: number
  items: PostAPI[]
}

interface PostContextProps {
  posts: Post[]
  totalPublished: number | undefined
}

export const PostsContext = createContext({} as PostContextProps)

export function PostsProvider({ children }: PostsProviderProps) {
  const [posts, setPosts] = useState<Post[]>([])

  const totalPublished = posts.length

  async function fetchIssues() {
    // const response: ResponseAPI = {
    //   total_count: 1,
    //   items: [
    //     {
    //       id: 1,
    //       title: 'Typescript',
    //       body: 'Dev hoje vamos falar sobre como o typescript pode a ajudar no seu desenvolvimento',
    //       comments: 3,
    //       created_at: '2022-08-17T19:09:17.175Z',
    //       html_url: 'https://google.com',
    //       user: {
    //         login: 'DenisMedeirosSDK',
    //       },
    //     },
    //     {
    //       id: 2,
    //       title: 'Javascript',
    //       body: 'Dev hoje vamos falar sobre como o javascript pode a ajudar no seu desenvolvimento',
    //       comments: 3,
    //       created_at: '2022-08-17T19:09:17.175Z',
    //       html_url: 'https://google.com',
    //       user: {
    //         login: 'DenisMedeirosSDK',
    //       },
    //     },
    //   ],
    // };

    // const mapped = response.items.map(item => ({
    //   ...item,
    //   slug: slugify(item.title, { lower: true }),
    // }));

    try {
      const response = await api.get<ResponseAPI>(
        'search/issues?q=""repo:DenisMedeirosSDK/03-challenge-ignite-github-blog',
      )

      const mapped = response.data.items.map((item) => ({
        ...item,
        slug: slugify(item.title, { lower: true }),
      }))

      setPosts(mapped)
    } catch (error) {
      console.log('Fail api')
      setPosts([])
    }
  }

  useEffect(() => {
    fetchIssues()
  }, [])

  return (
    <PostsContext.Provider value={{ posts, totalPublished }}>
      {children}
    </PostsContext.Provider>
  )
}
