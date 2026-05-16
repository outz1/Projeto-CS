import { ARCADE_UPGRADE_IDS, ARCADE_UPGRADES, type ArcadePlayerState, type ArcadeUpgradeId } from "@/features/arcade/domain";

const NON_STACKABLE_UPGRADES = new Set<ArcadeUpgradeId>([
  "piercing",
  "ricochet",
  "aoe-blast",
  "dash",
  "slow-motion",
]);

const MAX_BULLET_COUNT = 8;

export function getUpgradeChoices(existing: ArcadeUpgradeId[], amount = 3): ArcadeUpgradeId[] {
  const pool = ARCADE_UPGRADE_IDS.filter((id) => {
    if (id === "triple-shot") return existing.includes("double-shot");
    if (NON_STACKABLE_UPGRADES.has(id) && existing.includes(id)) return false;
    return true;
  });

  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, amount);
}

export function applyUpgrade(player: ArcadePlayerState, upgradeId: ArcadeUpgradeId): ArcadePlayerState {
  const next = { ...player };

  switch (upgradeId) {
    case "double-shot":
      next.bulletCount = Math.min(MAX_BULLET_COUNT, next.bulletCount + 1);
      break;
    case "triple-shot":
      next.bulletCount = Math.min(MAX_BULLET_COUNT, next.bulletCount + 2);
      break;
    case "piercing":
      next.hasPiercing = true;
      break;
    case "ricochet":
      next.hasRicochet = true;
      break;
    case "laser":
      next.hasLaser = true;
      next.bulletDamage += 6;
      next.bulletSpeed += 90;
      next.fireRateMs = Math.max(110, next.fireRateMs - 25);
      break;
    case "aoe-blast":
      next.hasAoeBlast = true;
      break;
    case "shield":
      next.shield += 20;
      break;
    case "regen":
      next.regenPerSecond += 0.6;
      break;
    case "damage-reduction":
      next.damageReduction = Math.min(0.55, next.damageReduction + 0.08);
      break;
    case "move-speed":
      next.speed += 28;
      break;
    case "dash":
      next.canDash = true;
      break;
    case "slow-motion":
      next.hasSlowMotion = true;
      break;
    case "score-multiplier":
      next.scoreMultiplier += 0.15;
      break;
    case "crit-chance":
      next.critChance = Math.min(0.55, next.critChance + 0.06);
      break;
    case "xp-bonus":
      next.xpBonus += 0.12;
      break;
    default:
      break;
  }

  return next;
}

export function getUpgradeLabel(upgradeId: ArcadeUpgradeId): string {
  return ARCADE_UPGRADES[upgradeId].title;
}
