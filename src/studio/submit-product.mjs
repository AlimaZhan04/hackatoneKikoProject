// Процедурная связность СС=5: действия интерфейса объединены порядком выполнения.
// Ошибка сохранения оставляет форму открытой, ошибка обновления не выдаётся за ошибку записи.
export async function submitProduct({ persist,refresh,close,notify,record }) {
  record('1. Отправка данных на сервер');
  await persist();
  record('2. Запись подтверждена PostgreSQL');
  try { await refresh(); record('3. Каталог обновлён'); }
  catch { close(); notify('Товар сохранён, но список не обновился. Нажмите «Обновить».'); return; }
  close(); record('4. Форма закрыта');
  notify('Товар сохранён');
}
