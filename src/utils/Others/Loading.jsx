import styles from '../../styles/utils.module.css'
const Loading = () => {
  return (
    <section className={`${styles.flex} ${styles.items_center}`}>
        <div className={`${styles.loader}`}></div>
    </section>
  )
}

export default Loading
