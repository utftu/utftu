// tests/getAbsolutePath.spec.ts
import {describe, it, expect} from 'vitest';
import {getAbsolutePath} from './path.ts';

// Хелпер для создания "ImportMeta"
const makeMeta = (url: string) => ({url}) as unknown as ImportMeta;

describe('getAbsolutePath', () => {
  const meta = makeMeta('file:///root/app/src/entry.ts');

  it('резолвит относительный путь внутри текущей директории', () => {
    const abs = getAbsolutePath('templates/page.html', meta);
    expect(abs).toBe('/root/app/src/templates/page.html');
  });

  it('резолвит путь с выходом в родительскую директорию', () => {
    const abs = getAbsolutePath('../public/index.html', meta);
    expect(abs).toBe('/root/app/public/index.html');
  });

  it('обрабатывает текущую директорию (./)', () => {
    const abs = getAbsolutePath('./foo.js', meta);
    expect(abs).toBe('/root/app/src/foo.js');
  });

  it('нормализует точечные сегменты пути', () => {
    const abs = getAbsolutePath('a/./b/../c.txt', meta);
    expect(abs).toBe('/root/app/src/a/c.txt');
  });

  it('поддерживает абсолютный путь (начинается со слеша)', () => {
    const abs = getAbsolutePath('/etc/config.json', meta);
    expect(abs).toBe('/etc/config.json');
  });

  it('корректно работает с пустым относительным путем (указывает на директорию файла-источника)', () => {
    const abs = getAbsolutePath('', meta);
    // Пустой относительный путь указывает на сам файл base-URL -> вернётся путь к entry.ts
    expect(abs).toBe('/root/app/src/entry.ts');
  });
});
