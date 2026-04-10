import { Question as QuestionType } from '@/types';
import styles from './Question.module.css';

interface Props {
  question: QuestionType;
  index: number;
  selectedValue: number | undefined;
  showDim: boolean;
  dimLabel: string;
  onChange: (id: string, value: number) => void;
}

const OPTION_CODES = ['A', 'B', 'C', 'D'];

export default function Question({
  question,
  index,
  selectedValue,
  showDim,
  dimLabel,
  onChange,
}: Props) {
  return (
    <article className={styles.question}>
      <div className={styles.questionMeta}>
        <div className="badge">第 {index + 1} 题</div>
        <div>{showDim ? dimLabel : '维度已隐藏'}</div>
      </div>
      <div className={styles.questionTitle}>{question.text}</div>
      <div className={styles.options}>
        {question.options.map((opt, i) => {
          const code = OPTION_CODES[i] || String(i + 1);
          return (
            <label key={opt.value} className={styles.option}>
              <input
                type="radio"
                name={question.id}
                value={opt.value}
                checked={selectedValue === opt.value}
                onChange={() => onChange(question.id, opt.value)}
              />
              <div className={styles.optionCode}>{code}</div>
              <div>{opt.label}</div>
            </label>
          );
        })}
      </div>
    </article>
  );
}
