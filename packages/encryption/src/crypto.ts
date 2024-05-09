import { generateKeySalts } from './utils';

export abstract class Crypto {
  public get key(): string {
    return this._key;
  }

  public set key(value: string) {
    this._key = value;
    this.keyBuffer = Buffer.from(value);
  }

  public get keySalts(): string {
    return this._keySalts;
  }

  public set keySalts(value: string) {
    this._keySalts = value;
    this.keySaltsBuffer = generateKeySalts(value);
  }

  //  is it initialized in the setter
  protected keyBuffer!: Uint8Array;
  private _key!: string;

  //  same
  protected keySaltsBuffer!: Uint8Array;
  private _keySalts!: string;

  private currentOrdinal: number = 0;

  constructor(
    public seed: number,
    key: string = 'UrkcnItnI',
    keySalts: string = 'login'
  ) {
    this.key = key;
    this.keySalts = keySalts;
  }

  public abstract encrypt(buffer: Uint8Array, opCode: number): Uint8Array;
  public abstract decrypt(buffer: Uint8Array, opCode: number): Uint8Array;

  protected nextOrdinal() {
    return this.currentOrdinal++ % 255;
  }
}
