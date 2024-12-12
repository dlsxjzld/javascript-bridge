import { Console } from '@woowacourse/mission-utils';
import { MESSAGE } from '../constants/message.js';

/**
 * 사용자로부터 입력을 받는 역할을 한다.
 */
export const InputView = {
  /**
   * 다리의 길이를 입력받는다.
   */
  async readBridgeSize() {
    const input = await Console.readLineAsync(MESSAGE.ASK_BRIDGE_SIZE);
    Console.print('');
    return input;
  },

  /**
   * 사용자가 이동할 칸을 입력받는다.
   */
  async readMoving() {
    const input = await Console.readLineAsync(MESSAGE.ASK_MOVE);
    return input;
  },

  /**
   * 사용자가 게임을 다시 시도할지 종료할지 여부를 입력받는다.
   */
  async readGameCommand() {
    const input = await Console.readLineAsync(MESSAGE.ASK_GAME_TRY);
    return input;
  },

  async readUserInput(message) {
    const input = await Console.readLineAsync(message);
    return input;
  },
};
