"use server";
export const getExampleContent = async function getServerSideProps(relativeUrl: string) {
  const url = `${process.env.LOCAL_DOMAIN}${relativeUrl}`;
  const res = await fetch(url);
  return await res.text();
};
