import { SigninButton } from "../signinButton";
import styles from "./styles.module.scss";

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src='/images/ig.news.svg' alt='ig.news-logo' />
                <nav>
                    <a className={styles.active}>Home</a>
                    <a>Posts</a>
                </nav>

                <SigninButton />
            </div>
        </header>
    )
}