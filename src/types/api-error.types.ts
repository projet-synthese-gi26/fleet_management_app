export interface ProblemDetail {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  // Champs additionnels potentiels pour la validation de formulaire
  errors?: Record<string, string>; 
}

export class ApiError extends Error {
  status: number;
  detail: string;
  title: string;

  constructor(problem: ProblemDetail) {
    super(problem.detail);
    this.status = problem.status;
    this.title = problem.title;
    this.detail = problem.detail;
  }
}