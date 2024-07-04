import { BlindFlag } from './blind-flag';
import { MailFlag } from './mail-flag';

export interface SecondaryAttributes {
  blind: BlindFlag;
  mail: MailFlag;
  offenseElement: number;
  defenseElement: number;
  ac: number;
  dmg: number;
  hit: number;
}
