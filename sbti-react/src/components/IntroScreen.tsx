import styles from './IntroScreen.module.css';

interface Props {
  onStart: () => void;
}

export default function IntroScreen({ onStart }: Props) {
  return (
    <section>
      <div className={`hero card ${styles.heroMinimal}`}>
        <h1>MBTI已经过时，SBTI来了。</h1>
        <div className={`${styles.heroActions} ${styles.heroActionsSingle}`}>
          <button className="btn-primary" onClick={onStart}>开始测试</button>
        </div>
      </div>
    </section>
  );
}
