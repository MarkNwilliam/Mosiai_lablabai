import { atom } from 'recoil';

const adFormDataAtom = atom({
  key: 'adFormDataAtom',
  default: {
    companyName: '',
    companyDescription: '',
    productName: '',
    productDescription: ''
  }
});

export default adFormDataAtom;