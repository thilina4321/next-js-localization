import { useRouter } from "next/router";
import React, { useState } from "react";
import { useTranslations } from "next-intl";

const Home = () => {
  const tra = useTranslations("Main");
  const router = useRouter();
  const [lang, setLang] = useState("en");

  const clickHandlet = () => {
    const locale = lang == "en" ? "sn" : "en";
    setLang(locale);
    router.push("/", "/", { locale });
  };

  return (
    <div className="section">
      <h1>{tra("title")}</h1>
      <button onClick={clickHandlet}>
        {`Turn to ${lang == "en" ? "sn" : "en"}`}
      </button>
    </div>
  );
};

export default Home;

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      title: require(`../locales/${locale}.json`),
    },
  };
};
