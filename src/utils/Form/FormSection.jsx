import styles from "../../styles/utils.module.css";

const FormSection = ({children,cls}) => {
  return (
    <div className={`${styles.form_section} ${cls}`}>
        {children}
    </div>
  )
}

export default FormSection