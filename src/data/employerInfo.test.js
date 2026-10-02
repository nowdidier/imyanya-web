import employerInfoPages from './employerInfo';
import { ROUTES } from '../configs/constants';

const NAV_ROUTES = [
  ROUTES.EMPLOYER.INTRODUCE,
  ROUTES.EMPLOYER.SERVICE,
  ROUTES.EMPLOYER.PRICING,
  ROUTES.EMPLOYER.SUPPORT,
  ROUTES.EMPLOYER.BLOG,
];

// Every link in the employer header must resolve to real content,
// otherwise the navigation dead-ends on the 404 page.
test.each(NAV_ROUTES)('has content for employer route /%s', (route) => {
  const page = employerInfoPages[route];

  expect(page).toBeDefined();
  expect(page.tabTitle).toBeTruthy();
  expect(page.hero.title).toBeTruthy();
  expect(page.hero.subtitle).toBeTruthy();
});

test('pricing page lists plans', () => {
  const page = employerInfoPages[ROUTES.EMPLOYER.PRICING];

  expect(page.plans.length).toBeGreaterThan(0);
  expect(page.plans.every((plan) => plan.name && plan.features.length)).toBe(
    true
  );
});

test('support page lists FAQs', () => {
  const page = employerInfoPages[ROUTES.EMPLOYER.SUPPORT];

  expect(page.faqs.length).toBeGreaterThan(0);
  expect(page.faqs.every((faq) => faq.q && faq.a)).toBe(true);
});

test('recruitment blog links to published articles', () => {
  const page = employerInfoPages[ROUTES.EMPLOYER.BLOG];

  expect(page.posts.length).toBeGreaterThan(0);
  expect(
    page.posts.every(
      (post) => post.title && post.excerpt && post.href.startsWith('http')
    )
  ).toBe(true);
});
