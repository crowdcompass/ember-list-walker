import { walkList } from 'ember-list-walker';
import { module, test } from 'qunit';

module('Unit | Utility | list-walker', function(hooks) {
  hooks.beforeEach(function() {
    this.walker = walkList([1, 2, 3]);
  });

  test('current starts off getting the first item', function(assert) {
    assert.expect(1);

    assert.equal(this.walker.get('current'), 1);
  });

  test('next returns the next item', function(assert) {
    assert.expect(2);

    assert.equal(this.walker.get('current'), 1);
    assert.equal(this.walker.next(), 2);
  });

  test('previous returns the previous item', function(assert) {
    assert.expect(3);

    assert.equal(this.walker.get('current'), 1);
    assert.equal(this.walker.next(), 2);
    assert.equal(this.walker.previous(), 1);
  });

  test('previous cant go below the first item', function(assert) {
    assert.expect(2);

    assert.equal(this.walker.get('current'), 1);
    assert.equal(this.walker.previous(), 1);
  });

  test('next cant go past the last item', function(assert) {
    assert.expect(4);

    assert.equal(this.walker.get('current'), 1);
    assert.equal(this.walker.next(), 2);
    assert.equal(this.walker.next(), 3);
    assert.equal(this.walker.next(), 3);
  });

  test('can set the current item', function(assert) {
    assert.expect(3);

    assert.equal(this.walker.get('current'), 1);
    assert.equal(this.walker.setCurrent(item => item === 3), 3);
    assert.equal(this.walker.get('current'), 3);
  });

  test('cant set the current item that doesnt exist', function(assert) {
    assert.expect(3);

    assert.equal(this.walker.get('current'), 1);
    assert.equal(this.walker.setCurrent(item => item === 4), undefined);
    assert.equal(this.walker.get('current'), 1);
  });

  test('isFirst returns true if first in the list', function(assert) {
    assert.expect(3);

    assert.equal(this.walker.get('current'), 1);
    assert.ok(this.walker.get('isFirst'));
    this.walker.next()
    assert.notOk(this.walker.get('isFirst'));
    this.walker.previous()
  });

  test('isLast returns true if last in the list', function(assert) {
    assert.expect(5);

    assert.equal(this.walker.get('current'), 1);
    assert.notOk(this.walker.get('isLast'));
    this.walker.next()
    assert.notOk(this.walker.get('isLast'));
    this.walker.next()
    assert.ok(this.walker.get('isLast'));
    this.walker.previous()
    assert.notOk(this.walker.get('isLast'));
  });
});
