import BridgeMaker from './BridgeMaker.js';
import { InputView } from './view/InputView.js';
import { OutputView } from './view/OutputView.js';
import { validateBridgeSize } from './validation/validateFunctions.js';

import { MESSAGE } from './constants/message.js';

class App {
  async play() {
    OutputView.printGameInstruction();
    const bridgeSize = this.getBridgeSize();
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
}

export default App;
