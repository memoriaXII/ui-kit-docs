import { HelpCenterArticle, HelpCenterArticleList } from "@boxo/api/lounge";
import { Body1, Loading, Markdown, Title1 } from "@appboxo/ui-kit";
import { HELP_REVALIDATE } from "@boxo/esim-util";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Layout } from "@/components/layout/layout";
import { getHelpCenterArticle, getHelpCenterList } from "@/lib/help-center-api";

import styles from "./index.module.css";

export async function getStaticPaths() {
  const data = await getHelpCenterList();

  const questions = data
    ?.reduce((pre, cur) => {
      return pre.concat(cur.articles);
    }, [] as HelpCenterArticleList[])
    .map((article) => ({
      params: { id: article.id },
    }));

  return {
    paths: questions ?? [],
    fallback: "blocking",
  };
}

export const getStaticProps = (async ({ locale = "en", params }) => {
  const article = await getHelpCenterArticle(
    (params?.id as string) || "",
    locale,
  );

  if (!article) {
    return { notFound: true };
  }

  return {
    props: { article, ...(await serverSideTranslations(locale)) },
    revalidate: HELP_REVALIDATE,
  };
}) satisfies GetStaticProps<{
  article: HelpCenterArticle;
}>;

const HelpArticle = ({
  article,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const isLoading = !article;

  return (
    <Layout
      navBar={{ title: "" }}
      contentClassName={styles.content}
      screenState={{
        isLoading,
      }}
      loadingNode={
        <Loading type="circle" radius={15} className={styles.loading} />
      }
    >
      {article && (
        <>
          <Title1 weight="semibold">{article.title || ""}</Title1>
          <Body1 className="regular mt-[16px] mb-[80px]">
            <Markdown
              content={article?.content || ""}
              componentClass={{ ul: styles.markdownUl }}
            />
          </Body1>
        </>
      )}
    </Layout>
  );
};

export default HelpArticle;
