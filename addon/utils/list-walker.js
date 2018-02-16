import { get, set, computed } from "@ember/object";
import ArrayProxy from '@ember/array/proxy';

const WalkList = ArrayProxy.extend({
  currentIndex: computed({
    get() {
      return 0;
    },
    set(key, value, original) {
      if (value >= get(this, 'length') || value < 0) {
        value = original;
      }
      return value;
    },
  }),

  isFirst: computed('currentIndex', {
    get() {
      return get(this, 'currentIndex') === 0;
    },
  }),

  isLast: computed('currentIndex', {
    get() {
      return get(this, 'currentIndex') === get(this, 'length') - 1;
    },
  }),

  next() {
    this.incrementProperty('currentIndex');
    return get(this, 'current');
  },

  previous() {
    this.decrementProperty('currentIndex');
    return get(this, 'current');
  },

  current: computed('currentIndex', {
    get() {
      return this.objectAt(get(this, 'currentIndex'));
    }
  }),

  setCurrent(callback) {
    return this.find((item, index, enumerable) => {
      let found = callback(item, index, enumerable);
      if (found) {
        set(this, 'currentIndex', index);
      }
      return found;
    });
  },
});

export function walkList(content) {
  return WalkList.create({ content });
}

export function walker(property) {
  return computed(property, {
    get() {
      return walkList(get(this, property));
    },
  });
}

export default WalkList;
