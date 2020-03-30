import uuidGenerator from '../../src/util/uuid.util';

describe('Generate Unique ID', () => {
  it('should generate an unique ID', () => {
    const id = uuidGenerator();
    expect(id).toHaveLength(36);
  })
})