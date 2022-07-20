import s from '../styles/error.module.css'
import Link from 'next/dist/client/link'


const ErrorComponent: React.FC = () => {
    return (
        <div className={s.errorPage}>
          <div className={s.errorPage__text}>
                This page is unavailable or in developing

                <div className={s.errorPage__button}><Link href='/' passHref> Return back </Link></div>
          </div>
        </div>
    )
}

export default ErrorComponent
