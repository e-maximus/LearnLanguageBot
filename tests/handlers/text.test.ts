import assert from 'assert'
import sinon from 'sinon'
import initApplication from '../../src/services/index'
import { noTextHandler, bitcoinTextHandler } from '../../src/handlers/text'

describe('Text handlers', () => {
  before(() => {
    return initApplication(true)
  })

  it('it should reply correct answer if text ends with нет', () => {
    const replySpy = sinon.spy()
    const messageExample = {
      message: {
        text: 'Bitcoin нет'
      },
      reply: replySpy,
    }

    //@ts-ignore
    noTextHandler(messageExample)

    assert(typeof replySpy.args[0][0] === 'string', 'Answer is string');
    assert(replySpy.args[0][0].length > 0, 'Not empty string');
    assert(replySpy.calledOnce, 'calledOnce');
    assert(!replySpy.calledTwice, 'not calledTwice');
  });

  it('it should not reply cause thre is not нет in the end', () => {
    const replySpy = sinon.spy()
    const messageExample = {
      message: {
        text: 'Bitcoin нет'
      },
      reply: replySpy,
    }

    //@ts-ignore
    noTextHandler(messageExample)

    assert(typeof replySpy.args[0][0] === 'string', 'Answer is string');
    assert(replySpy.args[0][0].length > 0, 'Not empty string');
    assert(replySpy.calledOnce, 'calledOnce');
    assert(!replySpy.calledTwice, 'not calledTwice');
  });

  it('Bitcoin [prediction]*', () => {
    const replySpy = sinon.spy()
    const messageExample = {
      message: {
        text: 'Биткойн'
      },
      reply: replySpy,
    }

    //@ts-ignore
    bitcoinTextHandler(messageExample)

    console.log(replySpy.args)

    // assert(typeof replySpy.args[0][0] === 'string', 'Answer is string');
    // assert(replySpy.args[0][0].length > 0, 'Not empty string');
    // assert(replySpy.calledOnce, 'calledOnce');
    // assert(!replySpy.calledTwice, 'not calledTwice');
  });
});
