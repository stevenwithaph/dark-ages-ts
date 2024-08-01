export class ChatBubble extends Phaser.GameObjects.DOMElement {
  timer?: Phaser.Time.TimerEvent;

  constructor(
    scene: Phaser.Scene,
    private callback: Function
  ) {
    super(scene, 0, -64, 'p');

    this.setClassName('bg-black/50 text-lg rounded-lg p-2 max-w-60 break-words border border-white');
    this.setOrigin(0.5, 1);
    this.setScale(0.5);
  }

  setText(text: string): this {
    super.setText(text);

    if (this.timer) {
      this.scene.time.removeEvent(this.timer);
    }

    this.timer = this.scene.time.addEvent({
      delay: 4000,
      callback: this.callback,
    });

    return this;
  }
}
