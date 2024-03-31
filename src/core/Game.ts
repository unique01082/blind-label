export interface GameConfig {
  items: string[];
}

export class Game {
  private items: string[] = [];

  constructor(configs: GameConfig) {
    Object.assign(this, configs);
  }

  get numberOfItems() {
    return this.items.length;
  }
}
