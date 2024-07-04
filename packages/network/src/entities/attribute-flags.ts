export enum AttributeFlags {
  UnreadMail = 1,
  Secondary = 4,
  Currency = 8,
  Current = 16,
  Primary = 32,
  GameMasterA = 64,
  GameMasterB = 128,
  Swimming = GameMasterA | GameMasterB,
  Full = Primary | Current | Currency | Secondary,
}
