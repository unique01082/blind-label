import { shuffle } from 'lodash';

export class Game {
  isStarted: boolean = false;
  items: string[];
  guess!: string[];
  turns: number = 0;

  constructor(config: { items: string[] }) {
    if (config.items.length < 2) {
      throw new Error('Nothing to guess!');
    }

    this.items = shuffle(config.items);
    this.shuffleGuess();
    while (this.getNumberOfWrongPosition() === 0) {
      this.shuffleGuess();
    }
  }

  check() {
    this.turns++;
    return this.items.map((item, index) => item === this.guess[index]);
  }

  getNumberOfWrongPosition() {
    return this.check().filter((item) => !item).length;
  }

  shuffleGuess() {
    this.guess = shuffle(this.items);
  }

  swapGuess(fromIndex: number, toIndex: number) {
    const from = this.guess[fromIndex];
    const to = this.guess[toIndex];
    this.guess[fromIndex] = to;
    this.guess[toIndex] = from;
  }
}
