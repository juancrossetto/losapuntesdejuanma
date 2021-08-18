import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import data from "../data.json";
import { Note } from "../types";

interface Props {
  note: Note;
}
const Home: NextPage<Props> = ({ note }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Los apuntes de Juanma | {note.title}</title>
        <meta name="description" content={note.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Apunte de {note.title}</h1>

        <p className={styles.description}>{note.description}</p>
        <iframe src={`${note.file}/preview`} width="640" height="480" allow="autoplay"></iframe>
        <a href={`${note.file}/view`} className={styles.card}>
          <h2>Descargar &rarr;</h2>
        </a>
      </main>
    </div>
  );
};

// export async function getServerSideProps() {
//   const joke = await fetch("https://api.chucknorris.io/jokes/random")
//     .then((res) => res.json())
//     .then((r) => r.value);
//   return {
//     props: { joke },
//   };
// }

export const getStaticProps: GetStaticProps<any, any> = async ({ params: { id } }) => {
  const note = data.find((node) => node.id === id);
  return {
    props: { note },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: data.map((note) => ({ params: { id: note.id } })),
    fallback: false,
  };
};

export default Home;
