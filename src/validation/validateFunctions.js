import { CONSTANT } from '../constants/constant.js';
import { ERROR_MESSAGE } from '../constants/message.js';

export const toThrowNewError = (condition, errorMessage) => {
  if (condition) {
    throw new Error(`[ERROR] ${errorMessage}\n`);
  }
};

const hasEmptySpace = (input) => [
  toThrowNewError(
    input.includes(' '),
    `${ERROR_MESSAGE.INVALID} 공백은 안됩니다.`,
  ),
];

const isEmptyString = (input) => {
  toThrowNewError(
    input === '',
    `${ERROR_MESSAGE.INVALID} 빈 문자열은 안됩니다.`,
  );
};
