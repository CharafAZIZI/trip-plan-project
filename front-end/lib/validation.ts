const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const PASSWORD_MIN_LENGTH = 8;

/** Renvoie un message d'erreur, ou `undefined` si la valeur est valide. */
export function validateEmail(value: string): string | undefined {
  if (!value.trim()) return 'Saisissez votre adresse e-mail.';
  if (!EMAIL_REGEX.test(value.trim())) return 'Adresse e-mail invalide.';
  return undefined;
}

export function validatePassword(value: string): string | undefined {
  if (!value) return 'Saisissez votre mot de passe.';
  if (value.length < PASSWORD_MIN_LENGTH) return `Au moins ${PASSWORD_MIN_LENGTH} caractères.`;
  return undefined;
}

export function validateName(value: string): string | undefined {
  if (value.trim().length < 2) return 'Saisissez votre nom complet.';
  return undefined;
}