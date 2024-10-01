export interface IComparison {
  id: number;
  name: string;
}

export interface IComparisonState {
  data: IComparison[];
  loading: boolean;
  error: string;
}
