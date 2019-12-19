import { qAtom } from './q-atom';

describe('qAtom', () => {
  it('should create an instance', () => {
    let atom = new qAtom()
    expect(atom).toBeTruthy();
  });

  it('my type', () => {
    let atom = new qAtom()
    expect(atom.myType).toBeTruthy();
  });

  it('my type', () => {
    let atom = new qAtom();
    let type = atom.myType
    expect(type).toBeTruthy();
  });

  it('my type == qAtom', () => {
    let atom = new qAtom();
    let type = atom.myType
    expect(type).toEqual('qAtom');
  });

});
