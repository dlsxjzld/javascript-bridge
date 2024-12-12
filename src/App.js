import BridgeMaker from './BridgeMaker.js';
import { InputView } from './view/InputView.js';
import { OutputView } from './view/OutputView.js';
import {
  validateBridgeSize,
  validateRetry,
  validateUserMove,
} from './validation/validateFunctions.js';

import { MESSAGE } from './constants/message.js';
import BridgeRandomNumberGenerator from './model/BridgeRandomNumberGenerator.js';
import BridgeGame from './model/BridgeGame.js';

class App {
  gameCount = 0;

  async play() {
    OutputView.printGameInstruction();
    const bridgeSize = await this.getBridgeSize();
    const answer = BridgeMaker.makeBridge(
      bridgeSize,
      BridgeRandomNumberGenerator.generate,
    );
    const realBridge = this.makeRealBridge(answer, bridgeSize);
    this.startBridgeGame(realBridge, bridgeSize);
  }

  getRow(answer) {
    if (answer === 'U') {
      return 0;
    }
    return 1;
  }

  makeRealBridge(answers, bridgeSize) {
    const realBridge = Array.from({ length: 2 }, () =>
      Array.from({ length: bridgeSize }, () => false),
    );
    answers.forEach((answer, col) => {
      realBridge[this.getRow(answer)][col] = true;
    });
    return realBridge;
  }

  async getBridgeSize() {
    try {
      const input = await InputView.readBridgeSize();
      validateBridgeSize(input);
      return input;
    } catch (error) {
      OutputView.printResult(error.message);
      return this.getBridgeSize();
    }
  }

  async startBridgeGame(bridge, bridgeSize) {
    this.gameCount += 1;
    const bridgeGame = new BridgeGame(bridge, bridgeSize);
    for (let step = 0; step < bridgeSize; step += 1) {
      const userMove = await this.askUserMove();
      const roundResult = bridgeGame.move(userMove, step);
      OutputView.printMap(bridgeGame.getCurrentBridgeMap(step));
      if (roundResult === false) {
        const re = await bridgeGame.retry(() => this.askUserTry());
        if (re) {
          this.startBridgeGame(bridge, bridgeSize);
          return;
        }
        this.finishGame(bridgeGame, step, '실패');
        return;
      }
    }
    this.finishGame(bridgeGame, bridgeSize, '성공');
  }

  async askUserMove() {
    try {
      const move = await InputView.readMoving();
      validateUserMove(move);
      return move;
    } catch (error) {
      OutputView.printResult(error.message);
      return this.askUserMove();
    }
  }

  async askUserTry() {
    try {
      const retry = await InputView.readGameCommand();
      validateRetry(retry);
      return retry;
    } catch (error) {
      OutputView.printResult(error.message);
      return this.askUserTry();
    }
  }

  finishGame(bridgeGame, step, result) {
    OutputView.printGameResultInstruction();
    OutputView.printMap(bridgeGame.getCurrentBridgeMap(step));
    OutputView.printResult(MESSAGE.GAME_SUCCESS_RESULT(result));
    OutputView.printResult(MESSAGE.GAME_TRY_COUNT(this.gameCount));
  }
}

export default App;
