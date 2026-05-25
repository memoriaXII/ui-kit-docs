import { Body1, Title1 } from "@appboxo/ui-kit";
import { Layout } from "@/components/layout/layout";
import { getServerSideTranslations } from "@/lib/getServerSideTranslations";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";

import SuccessIcon from "@/assets/icons/success.svg";
import { useAnimationVariants } from "@/hooks/use-animation-variants";

import styles from "./index.module.css";

const PurchaseCompletePage = () => {
  const { t } = useTranslation();
  const { query } = useRouter();
  const { epass_id } = query as { epass_id?: string };

  const { containerRef, containerVariants, itemVariants } =
    useAnimationVariants();

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 18,
      },
    },
  };

  return (
    <Layout
      navBar={{
        title: "",
        enableAnimation: false,
        hideBack: true,
      }}
      footer={{
        primaryButton: {
          text: t("View details"),
          href: {
            pathname: "/passes/detail",
            query: { pass_id: epass_id, goBack: "/passes" },
          },
        },
        secondaryButton: {
          text: t("Back to home"),
          href: "/passes",
        },
      }}
      noPaddingX
    >
      <motion.div
        variants={containerVariants}
        ref={containerRef}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.pageWrapper}>
          <motion.div
            variants={iconVariants}
            className={styles.animationContainer}
          >
            <SuccessIcon width={110} height={110} />
          </motion.div>
          <motion.div variants={itemVariants} className={styles.textWrapper}>
            <Title1 weight="bold" className={`${styles.title} text-text-5`}>
              {t("Successful Purchase")}
            </Title1>
            <Body1 className="text-text-4">
              {t(
                "Your fast track access pass was added to your account. You'll need to show your QR code at the fast-track lane during your selected time window.",
              )}
            </Body1>
          </motion.div>
        </div>
      </motion.div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = getServerSideTranslations;

export default PurchaseCompletePage;
