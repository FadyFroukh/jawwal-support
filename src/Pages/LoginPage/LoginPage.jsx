import LoginPageFeature from '../../Features/LoginPageFeature/LoginPageFeature'
import styles from '../../styles/utils.module.css'
const LoginPage = () => {
  return (
    <main 
      className={`${styles.h100} ${styles.items_center} ${styles.flex_col} ${styles.back_color}`}
    >
      <LoginPageFeature/>
    </main>
  )
}

export default LoginPage
