/**
 * Structure standard d'une erreur renvoyée par le backend (Problem Details)
 */
export interface ProblemDetail {
  type?: string;
  title: string;      // Titre générique de l'erreur
  status: number;     // Code HTTP (400, 401, 409, etc.)
  detail: string;     // Message explicatif précis pour l'utilisateur
  instance?: string;
  code?: string;      // Code métier interne (ex: AUTH_001, VHC_004)
  timestamp?: string;
}

/**
 * Classe personnalisée pour manipuler les erreurs API dans le code
 */
export class ApiError extends Error {
  status: number;
  detail: string;
  title: string;
  businessCode?: string;

  constructor(problem: ProblemDetail) {
    super(problem.detail);
    this.status = problem.status;
    this.title = problem.title;
    this.detail = problem.detail;
    this.businessCode = problem.code;
  }
}