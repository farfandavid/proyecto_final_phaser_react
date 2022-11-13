import Phaser from "phaser"

export class Button extends Phaser.GameObjects.Sprite {
  //onInputOver = () => { }
  //onInputOut = () => { }
  //onInputUp = () => { }

  constructor(scene, x, y, texture, actionOnClick = () => { }) {
    super(scene, x, y, texture)
    scene.add.existing(this)

    this.setInteractive()
      .on('pointerdown', () => {
        actionOnClick()
      })
  }
}