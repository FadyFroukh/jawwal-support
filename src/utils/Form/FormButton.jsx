import { Button } from 'primereact/button';

const FormButton = ({txt,type,icon,backColor,color,func}) => {
  return (
    <Button
        type={type}
        icon={icon}
        style={{borderRadius:"9px",background:backColor,color,border:"none"}}
        onClick={func}
    >
        <strong style={{marginInlineStart:"5px"}}>
            {txt}
        </strong>
    </Button>
  )
}

export default FormButton
