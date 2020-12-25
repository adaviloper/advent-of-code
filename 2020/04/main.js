import { data } from './data.js'

const validPassportsForPart1 = data.filter(passport => Object.keys(passport).length > 6)
  .filter(passport => {
    return Object.keys(passport).length === 8 || passport.cid === undefined
  })

const validEyeColors = {
  amb: 'amb',
  blu: 'blu',
  brn: 'brn',
  gry: 'gry',
  grn: 'grn',
  hzl: 'hzl',
  oth: 'oth',
}

const validPassportsForPart2 = validPassportsForPart1
  .filter(passport => passport.byr >= 1920 && passport.byr <= 2002)
  .filter(passport => passport.iyr >= 2010 && passport.iyr <= 2020)
  .filter(passport => passport.eyr >= 2020 && passport.eyr <= 2030)
  .filter(passport => {
    const unit = passport.hgt.substr(-2);
    const value = parseInt(passport.hgt.replace(unit, ''));
    if (unit === 'cm') {
      return value >= 150 && value <= 193;
    }
    return value >= 59 && value <= 76;
  })
  .filter(passport => (new RegExp('^(#[0-9a-f]{6})$')).test(passport.hcl))
  .filter(passport => validEyeColors[passport.ecl])
  .filter(passport => (new RegExp('^([0-9]{9})$')).test(passport.pid))

console.log(validPassportsForPart1.length, validPassportsForPart2.length);
