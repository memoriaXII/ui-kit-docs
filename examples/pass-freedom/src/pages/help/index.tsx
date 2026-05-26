import { cls } from "@arco-design/mobile-utils";
import { HelpCenterCategory } from "@boxo/api/lounge";
import { Body1, Cell, Title1, TouchCell } from "@appboxo/ui-kit";
import { HELP_REVALIDATE } from "@boxo/esim-util";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { motion } from "framer-motion";
import { useIntercom } from "react-use-intercom";

import ChevronRightIcon from "@/assets/icons/chevron-right.svg";
import { Layout } from "@/components/layout/layout";
import { useAnimationVariants } from "@/hooks/use-animation-variants";
import { getHelpCenterList } from "@/lib/help-center-api";
import { useScrollPosition } from "@/hooks/use-scroll-position";

import styles from "./index.module.css";

export const getStaticProps = (async ({ locale = "en" }) => {
  const data = await getHelpCenterList(locale);

  return {
    props: {
      data,
      ...(await serverSideTranslations(locale)),
    },
    revalidate: HELP_REVALIDATE,
  };
}) satisfies GetStaticProps<{
  data: HelpCenterCategory[];
}>;

const Help = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();
  const { showNewMessage } = useIntercom();
  useScrollPosition();

  const { containerRef, containerVariants, itemVariants } =
    useAnimationVariants({
      staggerChildren: 0.2,
      delayChildren: 0.1,
    });

  const QuestionsList = ({
    questionsList,
  }: {
    questionsList: HelpCenterCategory["articles"];
  }) => (
    <Cell.Group bordered={false} className={styles.questionsContainer}>
      {questionsList.map((question) => (
        <Link
          key={question.id}
          href={{
            pathname: `/help/${question.id}`,
          }}
        >
          <TouchCell
            className={cls("px-[16px]", styles.questionLink)}
            activeClass={styles.active!}
            label={
              <Body1 className="medium text-[--text-4]">{question.title}</Body1>
            }
            showArrow
            arrow={<ChevronRightIcon />}
            bordered={false}
          />
        </Link>
      ))}
    </Cell.Group>
  );

  const QuestionSection = ({ question }: { question: HelpCenterCategory }) => (
    <div className={styles.questionsSection}>
      <Title1
        className={cls(styles.questionTitle, "px-[16px]")}
        weight="semibold"
      >
        {question.title}
      </Title1>
      <QuestionsList questionsList={question.articles} />
    </div>
  );

  return (
    <Layout
      navBar={{ title: t("Help"), enableAnimation: true }}
      footer={{
        primaryButton: {
          text: t("Contact support"),
          onClick() {
            showNewMessage();
          },
        },
      }}
      noPaddingX
      contentClassName={styles.content}
    >
      <motion.div
        variants={containerVariants}
        ref={containerRef}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Title1 className="px-[16px]" weight="bold">
            {t("Help")}
          </Title1>
        </motion.div>
        {data?.map((question) => (
          <motion.div key={question.title} variants={itemVariants}>
            <QuestionSection question={question} />
          </motion.div>
        ))}
      </motion.div>
    </Layout>
  );
};

export default Help;
