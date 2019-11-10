import assert from 'assert'
import sinon from 'sinon'
import initApplication from '../../src/services/index'
import { noTextHandler } from '../../src/handlers/text'

describe('Text handlers', function() {
  before(async () => {
    await initApplication()
  })

  it('it should reply correct answer if text ends with нет', function() {

    const replySpy = sinon.spy()
    const messageExample = {
      message: {
        text: 'Bitcoin нет'
      },
      reply: replySpy,
    }

    noTextHandler(messageExample)

    assert(typeof replySpy.args[0][0] === 'string', 'Answer is string');
    assert(replySpy.args[0][0].length > 0, 'Not empty string');
    assert(replySpy.calledOnce, 'calledOnce');
    assert(!replySpy.calledTwice, 'not calledTwice');
  });
});