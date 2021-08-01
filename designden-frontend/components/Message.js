import styles from "@/styles/Message.module.css";

export default function Message({ message, isError }) {
  if (message === null) {
    return null;
  }
  const messageStyle = isError ? styles.error : styles.success;
  return <div className={messageStyle}>{message}</div>;
}
