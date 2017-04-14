import Ember from 'ember';

function normalizesite(val) {
  const regExp = new RegExp('^\d*(px|r?em|%)$');
  if(regExp.exec(val)) {
    return val;
  }

  let number = Number(val);
  if(!Number.isNaN(number)) {
    return `${number}px`;
  }
}

const normalizers = {
  height: normalizesite,
  width: normalizesite,
  left: normalizesite,
  right: normalizesite,
  top: normalizesite,
  bottom: normalizesite,
};

function normalizeCssAttribute(attribute, value) {
  if(normalizers[attribute]) {
    return normalizers[attribute](value);
  } else {
    return value;
  }
}

export function buildCss(params, hash) {
  let str = Object.keys(hash)
    .map(key => `${key}:${normalizeCssAttribute(key, hash[key])};`)
    .join('');

  return Ember.String.htmlSafe(str);
}

export default Ember.Helper.helper(buildCss);
