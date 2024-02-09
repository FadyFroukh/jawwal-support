import styles from "../../styles/utils.module.css";

const FormDiv = ({children,cls}) => {
  return (  
    <section className={`${styles.form_div} ${cls}`}>
        {children}
    </section>
  )
}

export default FormDiv