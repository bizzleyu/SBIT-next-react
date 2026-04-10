'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { Question } from '@/types';
import { computeResult } from '@/lib/scoring';
import { TYPE_IMAGES } from '@/data/types';
import { dimensionMeta, DIM_EXPLANATIONS, dimensionOrder } from '@/data/dimensions';
import styles from './ResultScreen.module.css';

interface Props {
  answers: Record<string, number>;
  shuffledQuestions: Question[];
  onRestart: () => void;
  onHome: () => void;
}

export default function ResultScreen({ answers, shuffledQuestions, onRestart, onHome }: Props) {
  const [authorOpen, setAuthorOpen] = useState(false);

  const result = useMemo(
    () => computeResult(answers, shuffledQuestions),
    [answers, shuffledQuestions]
  );

  const type = result.finalType;
  const imageSrc = TYPE_IMAGES[type.code];

  const funNote = result.special
    ? '本测试仅供娱乐。隐藏人格和傻乐兜底都属于作者故意埋的损招，请勿把它当成医学、心理学、相学、命理学或灵异学依据。'
    : '本测试仅供娱乐，别拿它当诊断、面试、相亲、分手、招魂、算命或人生判决书。你可以笑，但别太当真。';

  return (
    <section>
      <div className={`${styles.resultWrap} card`}>
        <div className={styles.resultLayout}>
          <div className={styles.resultTop}>
            <div className={`${styles.posterBox} ${!imageSrc ? styles.noImage : ''}`}>
              {imageSrc && (
                <Image
                  src={imageSrc}
                  alt={`${type.code}（${type.cn}）`}
                  className={styles.posterImage}
                  width={400}
                  height={400}
                  style={{ objectFit: 'contain' }}
                  unoptimized
                />
              )}
              <div className={styles.posterCaption}>{type.intro}</div>
            </div>

            <div className={styles.typeBox}>
              <div className={styles.typeKicker}>{result.modeKicker}</div>
              <div className={styles.typeName}>{type.code}（{type.cn}）</div>
              <div className={styles.matchBadge}>{result.badge}</div>
              <div className={styles.typeSubname}>{result.sub}</div>
            </div>
          </div>

          <div className={styles.analysisBox}>
            <h3>该人格的简单解读</h3>
            <p>{type.desc}</p>
          </div>

          <div className={styles.dimBox}>
            <h3>十五维度评分</h3>
            <div className={styles.dimList}>
              {dimensionOrder.map(dim => {
                const level = result.levels[dim];
                const explanation = DIM_EXPLANATIONS[dim][level];
                return (
                  <div key={dim} className={styles.dimItem}>
                    <div className={styles.dimItemTop}>
                      <div className={styles.dimItemName}>{dimensionMeta[dim].name}</div>
                      <div className={styles.dimItemScore}>{level} / {result.rawScores[dim]}分</div>
                    </div>
                    <p>{explanation}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.noteBox}>
            <h3>友情提示</h3>
            <p>{funNote}</p>
          </div>

          <div className={styles.authorBox}>
            <button
              className={styles.authorSummary}
              onClick={() => setAuthorOpen(o => !o)}
              aria-expanded={authorOpen}
            >
              <span>作者的话</span>
              <span className={styles.authorToggle}>{authorOpen ? '收起' : '展开'}</span>
            </button>
            {authorOpen && (
              <div className={styles.authorContent}>
                <p>本测试首发于b站up主蛆肉儿串儿（UID417038183），初衷是劝诫一位爱喝酒的朋友戒酒。</p>
                <p>由于作者的人格是SHIT愤世者，所以平等的攻击了各位，在此抱歉！！不过我是一个绝世大美女，你们一定会原谅我，有B站的朋友们也可以关注我。</p>
                <p>关于这个测试，我没法很好的平衡娱乐和专业性，因此对于一些人格的阐释较为模糊或完全不准（如屌丝可能并非真的屌丝），如有冒犯非常抱歉！！</p>
                <p>再鉴于时间精力有限，就随便搞了一个先这样玩玩，后续会慢慢完善修改的，总之好玩为主，还请不要用于盈利呀。</p>
              </div>
            )}
          </div>
        </div>

        <div className={styles.resultActions}>
          <div className={styles.btnGroup}>
            <button className="btn-secondary" onClick={onRestart}>重新测试</button>
            <button className="btn-primary" onClick={onHome}>回到首页</button>
          </div>
        </div>
      </div>
    </section>
  );
}
