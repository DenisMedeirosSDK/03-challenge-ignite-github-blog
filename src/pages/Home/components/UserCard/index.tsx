import { useEffect, useState } from 'react'
import {
  FaGithub,
  FaBuilding,
  FaUserFriends,
  FaExternalLinkAlt,
} from 'react-icons/fa'
import { api } from '../../../../lib/axios'

import styles from './styles.module.scss'

interface UserInfo {
  name: string
  login: string
  company?: string
  bio: string
  followers: number
  avatar_url: string
}

export function UserCard() {
  const [user, setUser] = useState<UserInfo>()

  async function fetchUserInfo() {
    const response = await api.get('/users/DenisMedeirosSDK')
    setUser(response.data)
  }

  useEffect(() => {
    fetchUserInfo()
  }, [])

  if (user) {
    return (
      <div className={styles.container}>
        <img src={user.avatar_url} alt="" />
        <div className={styles.info}>
          <div>
            <p>{user.name}</p>
            <a
              href={`https://github.com/${user.login}`}
              target="_blank"
              rel="noreferrer"
            >
              Github <FaExternalLinkAlt />{' '}
            </a>
          </div>
          <p>{user.bio}</p>
          <ul>
            <li>
              <FaGithub size={18} /> {user.login}
            </li>
            {user.company && (
              <li>
                <FaBuilding size={18} />
                {user.company}
              </li>
            )}
            <li>
              <FaUserFriends size={18} /> {user.followers} seguidores
            </li>
          </ul>
        </div>
      </div>
    )
  } else {
    return <div className={styles.container} />
  }
}
