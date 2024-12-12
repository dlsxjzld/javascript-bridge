const getRow = (answer) => {
  if (answer === 'U') {
    return 0;
  }
  return 1;
};

/**
 * 다리 건너기 게임을 관리하는 클래스
 */
class BridgeGame {
  constructor(bridge, bridgeSize) {
    this.answerBridge = bridge;
    this.myBridge = Array.from({ length: 2 }, () =>
      Array.from({ length: bridgeSize }, () => ' '),
    );
  }

  /**
   * 사용자가 칸을 이동할 때 사용하는 메서드
   * <p>
   * 이동을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  move(userMove, step) {
    // userMove에 맞게 step(col) 일 때 정답 브릿지의 1,0 확인
    if (this.answerBridge[getRow(userMove)][step]) {
      this.myBridge[getRow(userMove)][step] = 'O';
      return true;
    }
    this.myBridge[getRow(userMove)][step] = 'X';
    return false;
  }

  /**
   * 사용자가 게임을 다시 시도할 때 사용하는 메서드
   * <p>
   * 재시작을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  async retry(askUserTry) {
    const input = await askUserTry();
    if (input === 'R') {
      return true;
    }
    return false;
  }

  getCurrentBridgeMap(step) {
    return this.myBridge.map((oneBridge) => oneBridge.slice(0, step + 1));
  }
}

export default BridgeGame;
