import {
  getTimeDiff,
  getTimeString,
  validateDateFormat,
} from '../src/formatters';
import { expect } from 'chai';

describe('validateDateFormat', () => {
  it('accepts a valid date-fns format', () => {
    expect(validateDateFormat('yyyy-MM-dd HH:mm:ss')).to.eql({
      isValid: true,
    });
  });
  it('rejects an invalid format with a message', () => {
    // date-fns throws on unescaped latin letters that are not tokens.
    const result = validateDateFormat('yyyy-MM-dd j');
    expect(result.isValid).to.equal(false);
    expect(result.message).to.be.a('string');
    expect(result.message.length).to.be.greaterThan(0);
  });
});

describe('getTimeString', () => {
  it('uses a custom format', () => {
    expect(getTimeString(new Date(2024, 0, 5, 7, 8, 9), 'HH:mm')).to.eql(
      '07:08',
    );
  });
});

describe('getTimeDiff edge cases', () => {
  const start = new Date(1700000000000);
  const after = (ms: number) => new Date(start.getTime() + ms);

  it('shows 0ms for no elapsed time', () => {
    expect(getTimeDiff(start, start)).to.eql('0ms');
  });
  it('switches from ms to seconds at one second', () => {
    expect(getTimeDiff(after(999), start)).to.eql('999ms');
    expect(getTimeDiff(after(1000), start)).to.eql('1.00s');
  });
  it('shows whole seconds once hours are shown', () => {
    expect(getTimeDiff(after(60 * 60 * 1000 + 1500), start)).to.eql('1h 0m 2s');
  });
});
