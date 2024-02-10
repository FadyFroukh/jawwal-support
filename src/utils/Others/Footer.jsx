import { Typography } from "@mui/material"

const Footer = () => {
  return (
    <footer className="p-3 text-center">
      <section className="mb-3">
        <Typography>
            <strong>
                All rights reserved for Jawwal <span>&copy;</span> 2024
            </strong>
        </Typography>
      </section>
      <section>
        <Typography>
            <small className="text-muted"> 
                This site was made with <span>❤️</span> by <strong>Bisan Khateeb</strong>
            </small>
        </Typography>
      </section>
    </footer>
  )
}

export default Footer
