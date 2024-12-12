import BridgeMaker from './BridgeMaker.js';
import { InputView } from './view/InputView.js';
import { OutputView } from './view/OutputView.js';
import { validateBridgeSize } from './validation/validateFunctions.js';

import { MESSAGE } from './constants/message.js';
import BridgeRandomNumberGenerator from './model/BridgeRandomNumberGenerator.js';
import BridgeGame from './model/BridgeGame.js';

class App {
  gameCount = 0; // 총 시도 횟수

  async play() {
    OutputView.printGameInstruction();
    const bridgeSize = await this.getBridgeSize();

    const totalBridge = Array.from({ length: 2 }, () =>
      BridgeMaker.makeBridge(bridgeSize, BridgeRandomNumberGenerator.generate),
    );
    // TODO: 게임 시작하고 브릿지 게임 실패하면 R 혹은 Q 입력
    this.startBridgeGame(totalBridge);
  }

  // console.log(
  //   bridge
  //     .map((val) => val.join('|'))
  //     .map((val) => `[${val}]`)
  //     .join('\n'),
  // );
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

  async startBridgeGame(bridge) {
    this.gameCount += 1;
    const bridgeGame = new BridgeGame(bridge);
    // TODO: 매 라운드가 성공했는지 실패했는지 반환 받고 이걸 토대로 startBridgeGame을 다시 할지 정함
  }
}

export default App;
