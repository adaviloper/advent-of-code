import { data } from './data.js'

class Policy {
  constructor(data) {
    if (this.assign === undefined) {
      throw new TypeError('Classes extending the Policy abstract class');
    }
    if (this.validate === undefined) {
      throw new TypeError('Classes extending the Policy abstract class');
    }
    this.data = data;
    this.parse();
    this.assign();
  }

  parse() {
    const [policy, password] = this.data.split(': ');
    this.policy = policy;
    this.password = password;
  }
}

class SledPolicy extends Policy {
  constructor(data) {
    super(data);
  }

  assign() {
    const [min, max, character] = this.policy.split(/[ -]/);
    this.min = parseInt(min);
    this.max = parseInt(max);
    this.character = character;
  }

  validate() {
    const regexp = RegExp(`${this.character}`, 'g');
    this.count = (this.password.match(regexp) || []).length;
    return this.isWithinValidRange();
  }

  isWithinValidRange() {
    return this.count >= this.min && this.count <= this.max;
  }
}

class TobogganPolicy extends Policy {
  constructor(policy) {
    super(policy);
  }

  assign() {
    const [indices, character] = this.policy.split(/[ ]/);
    this.indices = indices.split('-').map(n => parseInt(n));
    this.character = character;
  }

  validate() {
    return this.existsAtPosition(0) ^ this.existsAtPosition(1);
  }

  existsAtPosition(position) {
    const passwordArray = this.password.split('');
    return passwordArray[this.indices[position] - 1] === this.character;
  }
}

const validSledPasswords = data.filter(data => {
  return new SledPolicy(data).validate();
})

const validTobogganPasswords = data.filter(data => {
  return new TobogganPolicy(data).validate();
})

console.log(validSledPasswords.length, validTobogganPasswords.length)
