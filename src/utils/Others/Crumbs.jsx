import { BreadCrumb } from 'primereact/breadcrumb';

export default function Crumbs({homeLink,crumbs}) {
    const home = { icon: 'pi pi-home', url: `/${homeLink}` }

    return (
        <BreadCrumb model={[...crumbs]} home={home} className='mt-2'/>
    )
}
