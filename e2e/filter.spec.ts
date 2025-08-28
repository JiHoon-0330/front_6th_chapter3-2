import { test } from '@playwright/test';

test.describe('월간 캘린더 테스트', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForSelector('text=일정 로딩 완료!');
  });

  test('검색어 테스트', async ({ page }) => {
    const eventList = await page.getByTestId('event-list');

    await eventList.getByLabel('일정 검색').fill('아무런 키워드로 검색하기');
    await eventList.getByText('검색 결과가 없습니다.').isVisible();

    await eventList.getByLabel('일정 검색').fill('동료와 점심 식사');
    await eventList.getByText('점심 약속').isVisible();
    await eventList.getByText('2025-08-21').isVisible();
    await eventList.getByText('12:30 - 13:30').isVisible();
    await eventList.getByText('동료와 점심 식사').isVisible();
    await eventList.getByText('회사 근처 식당').isVisible();
    await eventList.getByText('개인').isVisible();
  });
});
