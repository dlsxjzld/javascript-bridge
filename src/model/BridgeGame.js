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
    this.bridgeSize = Number(bridgeSize);
    this.answerBridge = bridge;
    this.myBridge = this.makeMyBridge();
    this.step = 0;
    this.gameCount = 1;
  }

  /**
   * 사용자가 칸을 이동할 때 사용하는 메서드
   * <p>
   * 이동을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  move(userMove, step) {
    this.step += 1;
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
  retry() {
    this.gameCount += 1;
    this.step = 0;
    this.myBridge = this.makeMyBridge();
  }

  getCurrentBridgeMap() {
    return this.myBridge.map((oneBridge) => oneBridge.slice(0, this.step));
  }

  makeMyBridge() {
    return Array.from({ length: 2 }, () =>
      Array.from({ length: this.bridgeSize }, () => ' '),
    );
  }

  getStep() {
    return this.step;
  }

  getIsFinish() {
    if (this.step === this.bridgeSize) {
      return '성공';
    }
    return '실패';
  }

  getGameCount() {
    return this.gameCount;
  }
}

export default BridgeGame;
