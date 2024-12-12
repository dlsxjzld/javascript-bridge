import BridgeMaker from './BridgeMaker.js';
import { InputView } from './view/InputView.js';
import { OutputView } from './view/OutputView.js';
import { validateBridgeSize } from './validation/validateFunctions.js';

import { MESSAGE } from './constants/message.js';
import BridgeRandomNumberGenerator from './model/BridgeRandomNumberGenerator.js';

class App {
  async play() {
    OutputView.printGameInstruction();
    const bridgeSize = await this.getBridgeSize();

    const bridge = BridgeMaker.makeBridge(
      bridgeSize,
      BridgeRandomNumberGenerator.generate,
    );
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
}

export default App;
