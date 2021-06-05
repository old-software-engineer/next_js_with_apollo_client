import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Button from "react-bootstrap/Button";
import {useRouter} from "next/router";

const name = 'John Doe'
export const siteTitle = 'Posts'

// Layout for whole project, and the home props to condition the Home page of the project.
export default function Layout({children, home}) {
    const router = useRouter();
    return (
        <div className={styles.container}>
            <Head>
                <meta name="og:title" content={siteTitle}/>
            </Head>
            <header className={styles.header}>
                {home ? (
                    <>
                        <Image
                            priority
                            src="/images/profile.jpg"
                            className={utilStyles.borderCircle}
                            height={144}
                            width={144}
                            alt={name}
                        />
                        <h1 className={utilStyles.heading2Xl}>{name}</h1>
                    </>
                ) : (
                    <>
                        <Link href="/">
                            <a>
                                <Image
                                    priority
                                    src="/images/profile.jpg"
                                    className={utilStyles.borderCircle}
                                    height={108}
                                    width={108}
                                    alt={name}
                                />
                            </a>
                        </Link>
                        <h2 className={utilStyles.headingLg}>
                            <Link href="/">
                                <a className={utilStyles.colorInherit}>{name}</a>
                            </Link>
                        </h2>
                    </>
                )}
            </header>
            <main>{children}</main>
            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">
                        <Button variant={"dark"} onClick={() =>{
                            router.replace('/')
                        }}>
                            <a>← Back to home</a>
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    )
}