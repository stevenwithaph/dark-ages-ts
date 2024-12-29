//green #006000
//red #C80010 // 23
//yellow #F08C18 // 51

const HealthBarStages = [
  {
    colour: '#c80010',
    amount: 0,
  },
  {
    colour: '#f08c18',
    amount: 24,
  },
  {
    colour: '#006000',
    amount: 52,
  },
];

function getHealthBarStageColour(percent: number) {
  for (let i = HealthBarStages.length - 1; i >= 0; i--) {
    if (percent > HealthBarStages[i].amount) {
      return HealthBarStages[i].colour;
    }
  }

  // If none of the conditions are met, return the lowest stage (0).
  return HealthBarStages[0].colour;
}

export class HealthBar extends Phaser.GameObjects.DOMElement {
  timer?: Phaser.Time.TimerEvent;
  tween?: Phaser.Tweens.Tween;

  private _currentPercent: number = 0;

  public get percent() {
    return this._currentPercent;
  }

  public set percent(value: number) {
    this._currentPercent = value;

    (this.node as HTMLElement).style.setProperty('--health-bar-width', `${this._currentPercent}%`);
    this.updateHealthBarColour();
  }

  constructor(
    scene: Phaser.Scene,
    private callback: Function
  ) {
    super(scene, 0, -64, 'div');

    this.setClassName(
      'relative w-[50px] h-[10px] health-bar before:content-[""] before:absolute before:inset-0 before:origin-left after:content-[""] after:absolute after:inset-0 after:border-2 after:border-black'
    );

    (this.node as HTMLElement).style.setProperty('--health-bar-width', '100%');
    this.setOrigin(0.5, 1);
    this.setScale(0.5);
  }

  private updateHealthBarColour() {
    (this.node as HTMLElement).style.setProperty('--health-bar-colour', getHealthBarStageColour(this._currentPercent));
  }

  setHealth(percent: number): this {
    if (this.tween) {
      this.tween.destroy();
    } else {
      this.percent = percent;
    }

    this.tween = this.scene.tweens.add({
      targets: this,
      percent: percent,
      duration: 100,
    });

    if (this.timer) {
      this.scene.time.removeEvent(this.timer);
    }

    this.timer = this.scene.time.addEvent({
      delay: 2000,
      callback: this.callback,
    });

    return this;
  }

  destroy(fromScene?: boolean): void {
    super.destroy();

    this.timer?.destroy();
    this.tween?.destroy();
  }
}
