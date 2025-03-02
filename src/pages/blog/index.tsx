import Head from "next/head";
import contentfulService from "@/presentation/services/contentful-pages";
import { AboutMe, Header, PostList } from "@/design-system/components";
import styles from "./blog.module.scss";
import { PageHome } from "@/domain/models";
import { Footer } from "@/design-system/components/Footer";

export default function Blog({ title, sections, posts, footer }: PageHome) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <main className={styles.main}>
        {sections.length > 0 && <AboutMe {...sections[0]} />}
        <PostList posts={posts} />
      </main>
      <Footer description={footer?.description} />
    </>
  );
}

export async function getStaticProps() {
  const posts = await contentfulService.getPosts();
  const footer = await contentfulService.getFooter();
  const { title, sections } = await contentfulService.getHomePage();

  if (!title) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      title,
      sections: sections ?? [],
      posts,
      footer,
    },
    revalidate: 60,
  };
}
