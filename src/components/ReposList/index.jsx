import { useState, useEffect } from "react";
import styles from './ReposList.module.css'

const ReposList = ({ nomeUsuario }) => {
    const [repos, setRepos] = useState([]);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        setloading(true)
        fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
            .then(res => res.json())
            .then(resJson => {
                setTimeout(() => {
                    setloading(false)
                    setRepos(resJson)
                }, 3000)
            })
    }, [nomeUsuario])


    return (
        <div className="container">
            {loading ? (
                <h1>Carregando...</h1>
            ) : (
                <ul className={styles.list}>
                    {repos.map(({ id, name, language, html_url }) => (
                        <li className={styles.listItem} key={id}>
                            <div className={styles.itemName}>
                                <b>Nome: </b> {name}
                            </div>
                            <div className={styles.itemLanguage}>
                                <b>Linguagem: </b> {language}
                            </div>
                            <a className={styles.itemLink} target="_blank" href={html_url}>Visitar repositório</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default ReposList