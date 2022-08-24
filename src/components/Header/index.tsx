import styles from './styles.module.scss'

const logoImg = new URL('../../assets/logo.svg', import.meta.url).href

export function Header() {
  return (
    <div className={styles.background}>
      <div>
        <img src={logoImg} alt="" />
      </div>
    </div>
  )
}
