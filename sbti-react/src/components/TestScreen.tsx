'use client';

import { useMemo } from 'react';
import { Question as QuestionType } from '@/types';
import { getVisibleQuestions } from '@/lib/scoring';
import { dimensionMeta } from '@/data/dimensions';
import Question from './Question';
import styles from './TestScreen.module.css';

interface Props {
  shuffledQuestions: QuestionType[];
  answers: Record<string, number>;
  onAnswerChange: (id: string, value: number) => void;
  onAnswersChange: (answers: Record<string, number>) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export default function TestScreen({
  shuffledQuestions,
  answers,
  onAnswerChange,
  onAnswersChange,
  onSubmit,
  onBack,
}: Props) {
  const visibleQuestions = useMemo(
    () => getVisibleQuestions(shuffledQuestions, answers),
    [shuffledQuestions, answers]
  );

  const total = visibleQuestions.length;
  const done = visibleQuestions.filter(q => answers[q.id] !== undefined).length;
  const percent = total ? (done / total) * 100 : 0;
  const complete = done === total && total > 0;

  function handleChange(id: string, value: number) {
    if (id === 'drink_gate_q1' && value !== 3) {
      const next: Record<string, number> = { ...answers, [id]: value };
      delete next['drink_gate_q2'];
      onAnswersChange(next);
    } else {
      onAnswerChange(id, value);
    }
  }

  function getDimLabel(q: QuestionType): string {
    if (q.special) return '补充题';
    return q.dim ? dimensionMeta[q.dim]?.name ?? '' : '';
  }

  return (
    <section>
      <div className={`${styles.testWrap} card`}>
        <div className={styles.topbar}>
          <div className={styles.progress}>
            <span style={{ width: `${percent}%` }} />
          </div>
          <div className={styles.progressText}>{done} / {total}</div>
        </div>

        <div className={styles.questionList}>
          {visibleQuestions.map((q, index) => (
            <Question
              key={q.id}
              question={q}
              index={index}
              selectedValue={answers[q.id]}
              showDim={false}
              dimLabel={getDimLabel(q)}
              onChange={handleChange}
            />
          ))}
        </div>

        <div className={styles.actionsBottom}>
          <div className={styles.hint}>
            {complete
              ? '都做完了。现在可以把你的电子魂魄交给结果页审判。'
              : '全选完才会放行。世界已经够乱了，起码把题做完整。'}
          </div>
          <div className={styles.btnGroup}>
            <button className="btn-secondary" onClick={onBack}>返回首页</button>
            <button className="btn-primary" disabled={!complete} onClick={onSubmit}>
              提交并查看结果
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
