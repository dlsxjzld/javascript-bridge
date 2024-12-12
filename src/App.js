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
  async play() {
    OutputView.printGameInstruction();
    const bridgeSize = await this.getBridgeSize();
    const answer = this.getAnswerBridge(bridgeSize);
    const realBridge = this.makeRealBridge(answer, bridgeSize);
    const bridgeGame = new BridgeGame(realBridge, bridgeSize);
    await this.newMethod(bridgeGame, bridgeSize);
  }

  async newMethod(bridgeGame, bridgeSize) {
    const retry = await this.startBridgeGame(bridgeGame, bridgeSize);
    if (retry === 'R') {
      bridgeGame.retry();
      await this.newMethod(bridgeGame, bridgeSize);
      return;
    }
    this.finishGame(bridgeGame);
  }

  getAnswerBridge(bridgeSize) {
    return BridgeMaker.makeBridge(
      bridgeSize,
      BridgeRandomNumberGenerator.generate,
    );
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

  async startBridgeGame(bridgeGame, bridgeSize) {
    for (let step = 0; step < bridgeSize; step += 1) {
      const userMove = await this.askUserMove();
      const canMove = bridgeGame.move(userMove, step);
      OutputView.printMap(bridgeGame.getCurrentBridgeMap());
      if (canMove === false) {
        return await this.askUserTry();
      }
    }
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

  finishGame(bridgeGame) {
    const result = bridgeGame.getIsFinish();
    OutputView.printGameResultInstruction();
    OutputView.printMap(bridgeGame.getCurrentBridgeMap());
    OutputView.printResult(MESSAGE.GAME_SUCCESS_RESULT(result));
    OutputView.printResult(MESSAGE.GAME_TRY_COUNT(bridgeGame.getGameCount()));
  }
}

export default App;
