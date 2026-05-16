type CooldownScope = "snake" | "arcade";

function cooldownKey(scope: CooldownScope, id: string) {
  return `${scope}:cooldown:${id}`;
}

export function setScoreCooldown(scope: CooldownScope, id: string, seconds: number) {
  try {
    localStorage.setItem(cooldownKey(scope, id), String(Date.now() + seconds * 1000));
  } catch {
    // LocalStorage pode estar indisponível em navegação privada; nesse caso, apenas não persistimos cooldown local.
  }
}

export function getScoreCooldownSeconds(scope: CooldownScope, id: string): number {
  try {
    const value = localStorage.getItem(cooldownKey(scope, id));
    if (!value) return 0;

    const endsAt = parseInt(value, 10);
    const remaining = Math.ceil((endsAt - Date.now()) / 1000);

    if (remaining <= 0) {
      localStorage.removeItem(cooldownKey(scope, id));
      return 0;
    }

    return remaining;
  } catch {
    return 0;
  }
}
