export const IsDemo = () => {
    return process.env.NEXT_PUBLIC_IS_LIVE === "0"
};