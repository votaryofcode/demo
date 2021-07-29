import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let storage;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, { provide: 'STORAGE', useValue: {} }],
    }).compile();

    appController = app.get<AppController>(AppController);
    storage = app.get('STORAGE');
  });
  
  afterEach(() => {
    storage = {};
  });

  describe('store', () => {
    it('should return ok', () => {
      const data = { key: 'test', value: 'works' };
      expect(appController.store(data)).toBe('ok');
    });
    it('should throw error', () => {
      const data = { key: 'test', value: 'works' };
      appController.store(data);
      expect(() => appController.store(data)).toThrowError('Overriding not allowed');
    });
  });
  
  describe('get', () => {
    it('should return value', () => {
      const data = { key: 'test', value: 'works' };
      appController.store(data);
      expect(appController.get(data.key)).toBe('works');
    })
    it('should throw error', () => {
      const data = { key: 'test', value: 'works' };
      const wrongKey = 'wrong';
      appController.store(data);
      expect(() => appController.get(wrongKey)).toThrowError('Key does not exist');
    })
  })
  
  describe('delete', () => {
    it('happy case', () => {
      const data = { key: 'test', value: 'works' };
      appController.store(data);
      expect(appController.delete(data.key)).toBe('');
      expect(!Object.keys(storage).includes(data.key)).toBe(true);
    })
  })
});
