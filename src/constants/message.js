export const MESSAGE = {
  GAME_INSTRUCTION: '다리 건너기 게임을 시작합니다.\n',
  ASK_BRIDGE_SIZE: '다리의 길이를 입력해주세요.\n',
  ASK_MOVE: '이동할 칸을 선택해주세요. (위: U, 아래: D)\n',
  ASK_GAME_TRY:
    '게임을 다시 시도할지 여부를 입력해주세요. (재시도: R, 종료: Q)\n',
  GAME_RESULT_INSTRUCTION: '최종 게임 결과\n',
  GAME_SUCCESS_RESULT: (result) => `게임 성공 여부: ${result}`,
  GAME_TRY_COUNT: (result) => `총 시도한 횟수: ${result}`,
};

export const ERROR_MESSAGE = {
  INVALID: '다리 길이는 3부터 20 사이의 숫자여야 합니다.',
};
