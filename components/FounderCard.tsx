import styles from '@components/FounderCard.module.scss';

export default function FounderCard({ name, imageUrl }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt="Founder Image" />
      </div>
      <div className={styles.content}>
        <h2 className={styles.name}>{name}</h2>
      </div>
    </div>
  );
}
