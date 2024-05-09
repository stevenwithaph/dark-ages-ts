export class Silhouttes extends Phaser.GameObjects.RenderTexture {
  constructor(
    scene: Phaser.Scene,
    private group: Phaser.GameObjects.Group
  ) {
    super(scene, 0, 0, scene.cameras.main.width, scene.cameras.main.height);

    this.setOrigin(0);
    this.setScrollFactor(0);
    this.setAlpha(0.15);
    this.setDepth(Phaser.Math.MAX_SAFE_INTEGER);

    this.addToUpdateList();
  }

  update(): void {
    const worldView = this.scene.cameras.main.worldView;

    this.clear();
    this.draw(
      this.group,
      worldView.width - worldView.centerX,
      worldView.height - worldView.centerY
    );
  }
}
