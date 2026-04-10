export type ScreenName = 'intro' | 'test' | 'result';
export type Level = 'L' | 'M' | 'H';

export interface Option {
  label: string;
  value: number;
}

export interface Question {
  id: string;
  dim?: string;
  text: string;
  options: Option[];
  special?: boolean;
  kind?: string;
}

export interface TypeDef {
  code: string;
  cn: string;
  intro: string;
  desc: string;
}

export interface NormalType {
  code: string;
  pattern: string;
}

export interface RankedType extends TypeDef, NormalType {
  distance: number;
  exact: number;
  similarity: number;
}

export interface ComputedResult {
  rawScores: Record<string, number>;
  levels: Record<string, Level>;
  ranked: RankedType[];
  bestNormal: RankedType;
  finalType: TypeDef;
  modeKicker: string;
  badge: string;
  sub: string;
  special: boolean;
  secondaryType: RankedType | null;
}
