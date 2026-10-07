import dayjs from 'dayjs';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export const num = (value, fallback = 0) => {
  if (value === '' || value === null || value === undefined) return fallback;
  const parsed = Number(String(value).replace(/,/g, ''));
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const fmtInt = (value) => `${Math.round(Number(value) || 0).toLocaleString('en-US')}`;

export const fmtRwf = (value) => `${fmtInt(value)} RWF`;

export const fmtPct = (value, digits = 1) => {
  const parsed = Number(value) || 0;
  return `${parsed.toFixed(digits).replace(/\.0$/, '')}%`;
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const median = (values) => {
  const sorted = [...values].filter((v) => Number.isFinite(v)).sort((a, b) => a - b);
  if (sorted.length === 0) return 0;
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
};

// Progressive tax from bracket defs: { min, max, rate, baseTax? }.
export const progressiveTax = (brackets, amount) => {
  let tax = 0;
  const rows = [];
  const total = Math.max(0, Number(amount) || 0);
  for (const bracket of brackets || []) {
    if (!bracket) continue;
    const min = Number(bracket.min) || 0;
    const max =
      bracket.max === Infinity || bracket.max === null || bracket.max === undefined
        ? Infinity
        : Number(bracket.max);
    const rate = Number(bracket.rate) || 0;
    const base = Number(bracket.baseTax) || 0;
    if (total < (min === 0 ? 0 : min)) continue;
    const width = Math.min(total, max) - min + (min === 0 ? 0 : 1);
    if (width <= 0) continue;
    const bracketTax = base + (rate / 100) * width;
    tax += bracketTax;
    rows.push({
      label: bracket.description || `${fmtInt(min)} - ${max === Infinity ? '+' : fmtInt(max)}`,
      base: width,
      tax: bracketTax,
    });
  }
  return { tax, rows };
};

const fmtDay = (value) => {
  const parsed = dayjs(value);
  return parsed.isValid() ? parsed.format('DD MMM YYYY') : '—';
};

// ---------------------------------------------------------------------------
// Salary / tax calculators
// ---------------------------------------------------------------------------

const salaryCore = (tool, values) => {
  const salary = num(values['gross-salary']);
  const allowances = num(values.allowances);
  const freqMult =
    { monthly: 1, biweekly: 26 / 12, weekly: 52 / 12 }[values['pay-frequency']] || 1;
  const gross = (salary + allowances) * freqMult;
  const rssbRate = values['rssb-employee'] === '' || values['rssb-employee'] == null
    ? 3
    : num(values['rssb-employee'], 3);
  const rssb = (gross * rssbRate) / 100;
  const taxable = Math.max(0, gross - rssb);
  const { tax: paye, rows } = progressiveTax(tool.rraTaxBrackets, taxable);
  const other = num(values['other-deductions']);
  const total = paye + rssb + other;
  return { gross, rssb, taxable, paye, other, total, net: gross - total, rows };
};

const taxCore = (tool, values) => {
  const gross = num(values['monthly-gross']) + num(values['monthly-allowances']);
  const rate = values['rssb-rate'] === '' || values['rssb-rate'] == null
    ? 3
    : num(values['rssb-rate'], 3);
  const rssb = (gross * rate) / 100;
  const taxable = Math.max(0, gross - rssb);
  const { tax: paye, rows } = progressiveTax(tool.taxBrackets, taxable);
  return { gross, rssb, taxable, paye, net: gross - paye - rssb, rows };
};

// ---------------------------------------------------------------------------
// Engines: (tool, values, ctx) => { [outputId]: result }
// ctx: { checked: string[], entries: object[], answers: object }
// Result shapes: number | string | string[] |
//   {kind:'table',columns,rows} | {kind:'bars',items:[{label,value,display?}]} |
//   {kind:'progress',value} | {kind:'kanban',columns:[{name,color,items}]}
// ---------------------------------------------------------------------------

const engines = {
  'salary-calculator': (tool, values) => {
    const r = salaryCore(tool, values);
    return {
      'gross-pay': r.gross,
      'taxable-income': r.taxable,
      'paye-tax': r.paye,
      'rssb-deduction': r.rssb,
      'total-deductions': r.total,
      'net-pay': r.net,
      'effective-tax-rate': r.gross > 0 ? (r.paye / r.gross) * 100 : 0,
      'annual-net': r.net * 12,
      'deduction-breakdown': {
        kind: 'table',
        columns: ['Deduction', 'Taxable Base (RWF)', 'Amount (RWF)'],
        rows: [
          ...r.rows.map((row) => [row.label, fmtInt(row.base), fmtInt(row.tax)]),
          ['RSSB employee contribution', fmtInt(r.gross), fmtInt(r.rssb)],
          ...(r.other > 0 ? [['Other deductions', '—', fmtInt(r.other)]] : []),
        ],
      },
    };
  },

  'tax-calculator': (tool, values) => {
    const r = taxCore(tool, values);
    return {
      'gross-monthly': r.gross,
      'rssb-deduction': r.rssb,
      'taxable-income-monthly': r.taxable,
      'paye-monthly': r.paye,
      'net-monthly': r.net,
      'annual-gross': r.gross * 12,
      'annual-paye': r.paye * 12,
      'annual-rssb': r.rssb * 12,
      'effective-tax-rate': r.gross > 0 ? (r.paye / r.gross) * 100 : 0,
      'tax-breakdown': {
        kind: 'table',
        columns: ['Bracket', 'Taxable Base (RWF)', 'Tax (RWF)'],
        rows: r.rows.map((row) => [row.label, fmtInt(row.base), fmtInt(row.tax)]),
      },
      'take-home-percentage': r.gross > 0 ? (r.net / r.gross) * 100 : 0,
    };
  },

  'leave-entitlement-calculator': (tool, values) => {
    const months = num(values['employment-duration-months']);
    const annual = Number(tool.legalReferences?.annualLeave?.days) || 21;
    const accrued = Math.min(annual, Math.round(months * 1.75 * 10) / 10);
    const accumulated = num(values['accumulated-leave']);
    const female = values['is-female'] === 'female';
    const salary = num(values['monthly-salary']);
    return {
      'annual-leave-days': annual,
      'accrued-leave': accrued,
      'sick-leave-days': Number(tool.legalReferences?.sickLeave?.days) || 30,
      'maternity-leave': female ? Number(tool.legalReferences?.maternityLeave?.weeks) || 12 : 0,
      'paternity-leave': female ? 0 : Number(tool.legalReferences?.paternityLeave?.days) || 4,
      'public-holidays': Number(tool.legalReferences?.publicHolidays?.days) || 11,
      'total-leave-entitlement': annual + accumulated,
      'leave-payout-value': salary > 0 ? (accumulated * salary) / 30 : 0,
    };
  },

  'notice-period-calculator': (tool, values) => {
    const periods = tool.legalReferences?.noticePeriods || {};
    const duration = values['employment-duration'];
    const giver = values['notice-giver'];
    const entry = periods[duration];
    let days = 0;
    if (duration === 'probation') {
      days = giver === 'employer' ? 14 : 0;
    } else if (entry && typeof entry === 'object') {
      days = Number(entry[giver] ?? entry.days ?? 0) || 0;
    }
    const start = dayjs(values['notice-date']);
    const validStart = start.isValid() ? start : null;
    const end = validStart ? validStart.add(days, 'day') : null;
    const salary = num(values['monthly-salary']);
    return {
      'notice-days': days,
      'notice-start': validStart ? validStart.toISOString() : '',
      'notice-end': end ? end.toISOString() : '',
      'last-working-day': end ? end.toISOString() : '',
      'pay-in-lieu-amount':
        values['pay-in-lieu'] === 'yes' && salary > 0 ? (salary / 30) * days : 0,
      'legal-reference': `${entry?.article || 'Article 30'} — ${tool.legalReferences?.lawName || 'Rwanda Labour Law'}${
        entry?.description ? ` (${entry.description})` : ''
      }`,
      'employee-obligations': [
        'Give notice in writing and keep a signed copy',
        'Complete a proper handover of tasks and files',
        'Continue normal duties and working hours during notice',
        'Return company property (ID, laptop, keys) by the last day',
        'Salary and benefits continue until the last working day',
      ],
    };
  },

  'salary-comparison': (tool, values) => {
    const raw = num(values['current-salary']);
    const monthly = values['salary-per'] === 'annually' ? raw / 12 : raw;
    const industry = (tool.industryData || []).find((row) => row.industry === values.industry);
    const level = values['experience-level'];
    const levelMed = Number(industry?.[level]) || 0;
    const industryLevels = industry
      ? ['entry', 'junior', 'mid', 'senior', 'lead', 'executive'].map((key) => Number(industry[key]) || 0)
      : [];
    const industryMedian = median(industryLevels);
    const allMeds = [];
    for (const row of tool.industryData || []) {
      for (const key of ['entry', 'junior', 'mid', 'senior', 'lead', 'executive']) {
        if (Number.isFinite(Number(row[key]))) allMeds.push(Number(row[key]));
      }
    }
    const factor = Number(tool.locationFactors?.[values.location] ?? 1);
    const locationMedian = median(allMeds) * factor;
    const benefits = num(values['benefits-value']);
    const pct = levelMed > 0
      ? monthly >= levelMed
        ? 50 + 50 * (1 - levelMed / monthly)
        : (50 * monthly) / levelMed
      : 0;
    const position =
      pct >= 75 ? 'Above market — strong negotiating position' :
      pct >= 55 ? 'Slightly above market' :
      pct >= 45 ? 'At market rate' :
      pct >= 30 ? 'Below market — room to negotiate' :
      'Well below market — strong case for a raise';
    const recommendation =
      pct >= 75
        ? `At ${fmtRwf(monthly)} you earn above the ${fmtRwf(levelMed)} median for your level. Protect this position at review time and negotiate on benefits, bonus and growth.`
        : pct >= 45
          ? `At ${fmtRwf(monthly)} you are around the ${fmtRwf(levelMed)} median. A 10–20% move (${fmtRwf(monthly * 1.1)} – ${fmtRwf(monthly * 1.2)}) is a reasonable next target.`
          : `At ${fmtRwf(monthly)} you earn below the ${fmtRwf(levelMed)} median for your level. Gather competing evidence and target ${fmtRwf(levelMed)} – ${fmtRwf(levelMed * 1.15)} in your next negotiation.`;
    return {
      'market-position': position,
      'median-industry': industryMedian,
      'median-experience': levelMed,
      'median-location': locationMedian,
      'total-compensation': monthly + benefits,
      'percentile-rank': Math.round(clamp(pct, 1, 99)),
      'comparison-chart': {
        kind: 'bars',
        items: [
          { label: 'Your salary', value: monthly, display: fmtRwf(monthly) },
          { label: 'Level median', value: levelMed, display: fmtRwf(levelMed) },
          { label: 'Location median', value: locationMedian, display: fmtRwf(locationMedian) },
        ],
      },
      recommendation,
    };
  },

  'cost-of-living-calculator': (tool, values) => {
    const loc = tool.locationCostData?.[values.location] || { baseTotal: 800000 };
    const hh = { 1: 1, 2: 1.4, 3: 1.8, 5: 2.3 }[Number(values['household-size'])] || 1;
    const acc = { studio: 0.85, '2-bed': 1, '3-bed': 1.3, '4-plus-bed': 1.6 }[values['accommodation-type']] || 1;
    const tr = { motorbike: 1, car: 1.6, bus: 0.7, walk: 0.4, mixed: 0.85 }[values['transport-mode']] || 1;
    const dine = { rarely: 0.85, occasional: 1, frequent: 1.2, often: 1.45 }[values['dining-habits']] || 1;
    const total = Math.round((loc.baseTotal * hh * acc * tr * dine) / 1000) * 1000;
    return {
      'total-monthly': total,
      'breakdown-chart': {
        kind: 'bars',
        items: (tool.expenseCategories || []).map((cat) => ({
          label: cat.name,
          value: (total * Number(cat.percentage)) / 100,
          display: fmtRwf((total * Number(cat.percentage)) / 100),
        })),
      },
      'breakdown-table': {
        kind: 'table',
        columns: ['Category', 'Share', 'Amount (RWF)', 'Notes'],
        rows: (tool.expenseCategories || []).map((cat) => [
          cat.name,
          `${cat.percentage}%`,
          fmtInt((total * Number(cat.percentage)) / 100),
          cat.details || '',
        ]),
      },
      'salary-required': total,
      'budget-tips': (tool.tips || []).slice(0, 4),
      'comparison-chart': {
        kind: 'bars',
        items: Object.entries(tool.locationCostData || {}).map(([key, item]) => ({
          label: key.replace(/-/g, ' '),
          value: item.baseTotal * hh,
          display: fmtRwf(item.baseTotal * hh),
        })),
      },
    };
  },

  'certification-roi-calculator': (tool, values) => {
    const cert = (tool.certificationData || []).find((item) => item.id === values.certification);
    const current = num(values['current-salary']);
    const years = Math.max(1, num(values['years-working'], 10));
    const increase = Number(cert?.expectedIncrease) || 0;
    const supportFactor = { yes: 0, partial: 0.5, no: 1 }[values['employer-support']] ?? 1;
    const enteredCost = num(values['study-cost']);
    const cost = (enteredCost > 0 ? enteredCost : Number(cert?.typicalCost) || 0) * supportFactor;
    const hours = num(values['study-hours']) || Number(cert?.studyHours) || 0;
    const newSalary = current * (1 + increase / 100);
    const gain = newSalary - current;
    const lifetime = gain * years;
    const periodMatch = String(cert?.renewalPeriod || '').match(/(\d+)/);
    const periodYears = cert?.renewalRequired ? Number(periodMatch?.[1]) || 1 : Infinity;
    const renewals = Number.isFinite(periodYears) && Number(cert?.renewalCost) > 0
      ? Number(cert.renewalCost) * Math.floor(years / periodYears)
      : 0;
    const net = lifetime - cost - renewals;
    const cumulative = [];
    const span = Math.min(years, 10);
    for (let year = 1; year <= span; year += 1) {
      cumulative.push({ label: `Yr ${year}`, value: gain * year - cost, display: fmtRwf(gain * year - cost) });
    }
    return {
      'expected-increase': increase,
      'new-salary': newSalary,
      'annual-gain': gain,
      'total-lifetime-gain': lifetime,
      'net-roi': net,
      'roi-percentage': cost > 0 ? (net / cost) * 100 : 0,
      'payback-period': gain > 0 ? Math.max(0, Math.round((cost / (gain / 12)) * 10) / 10) : 0,
      'hourly-roi': hours > 0 ? net / hours : 0,
      'break-even-chart': { kind: 'bars', items: cumulative },
    };
  },

  'leave-calculator': (tool, values) => {
    const year = num(values.year, new Date().getFullYear());
    const total = num(values['annual-leave-days']) + num(values['carryover-days']);
    const holidays = (tool.rwandaPublicHolidays || []).filter((h) => String(h.date).startsWith(String(year)));
    const pref = values['preferred-months'];
    const quarterOf = (dateStr) => Math.floor(new Date(dateStr).getMonth() / 3);
    const wanted = { 'jan-mar': 0, 'apr-jun': 1, 'jul-sep': 2, 'oct-dec': 3 }[pref];
    const pool = wanted === undefined ? holidays : holidays.filter((h) => quarterOf(h.date) === wanted);
    const isWeekend = (date) => [0, 6].includes(date.getDay());
    const iso = (date) => date.toISOString().slice(0, 10);
    const taken = new Set();
    const rows = [];
    let used = 0;
    for (const holiday of pool) {
      const base = new Date(`${holiday.date}T00:00:00`);
      if (Number.isNaN(base.getTime())) continue;
      const dow = base.getDay();
      let take = [];
      if (dow === 2) take = [-1];
      else if (dow === 3) take = [-2, -1];
      else if (dow === 4) take = [1];
      else if (dow === 1) take = [1, 2, 3, 4];
      else continue;
      const dates = take.map((offset) => {
        const d = new Date(base);
        d.setDate(d.getDate() + offset);
        return d;
      });
      if (used + dates.length > total) continue;
      dates.forEach((d) => taken.add(iso(d)));
      used += dates.length;
      const span = [...dates, base].sort((a, b) => a - b);
      const first = new Date(span[0]);
      while (isWeekend(new Date(first.getTime() - 86400000))) first.setDate(first.getDate() - 1);
      const last = new Date(span[span.length - 1]);
      while (isWeekend(new Date(last.getTime() + 86400000))) last.setDate(last.getDate() + 1);
      const offDays = Math.round((last - first) / 86400000) + 1;
      rows.push([
        `${holiday.name} (${fmtDay(holiday.date)})`,
        dates.map((d) => fmtDay(d)).join(', '),
        `${offDays} days off`,
        `${dates.length} leave day${dates.length === 1 ? '' : 's'}`,
      ]);
    }
    const monthly = Array.from({ length: 12 }, (_, m) => {
      const count = [...taken].filter((d) => new Date(`${d}T00:00:00`).getMonth() === m).length;
      return {
        label: dayjs(new Date(year, m, 1)).format('MMM'),
        value: count,
        display: `${count} day${count === 1 ? '' : 's'}`,
      };
    });
    return {
      'total-leave-available': total,
      'optimal-plan': {
        kind: 'table',
        columns: ['Occasion', 'Take leave on', 'Result', 'Cost'],
        rows: rows.length > 0 ? rows : [['—', 'No bridge opportunities in this period', '', '']],
      },
      'total-off-days': used + holidays.filter((h) => ![0, 6].includes(new Date(`${h.date}T00:00:00`).getDay())).length,
      'max-stretch': rows.reduce((max, row) => Math.max(max, parseInt(row[2], 10) || 0), 0),
      'monthly-breakdown': { kind: 'bars', items: monthly },
      'remaining-days': Math.max(0, total - used),
    };
  },

  'interview-countdown': (tool, values) => {
    const target = dayjs(values['interview-date']);
    const days = target.isValid() ? target.startOf('day').diff(dayjs().startOf('day'), 'day') : null;
    return { 'days-remaining': days === null ? '—' : days < 0 ? 'Passed' : days };
  },

  'negotiation-script-generator': (tool, values) => {
    const scenario = values.scenario;
    const employer = values['employer-type'];
    const bucket = tool.scripts?.[scenario] || {};
    const script = bucket[employer] || bucket.corporate || Object.values(bucket)[0] || {};
    const offer = num(values['current-offer']);
    const target = num(values['target-salary']);
    const low = Math.round((Math.min(offer || target, target) * 0.95) / 1000) * 1000;
    const high = Math.round((target * 1.15) / 1000) * 1000;
    const competing = values['have-competing-offer'] === 'yes';
    return {
      'script-email': script.emailScript || 'No email template for this combination yet — use the talking points below to draft yours.',
      'script-verbal': script.verbalScript || 'Thank the employer for the offer, reference your experience and market research, then name your target figure and ask about flexibility.',
      'script-follow-up': `Subject: Following up on our conversation\n\nDear [Name],\n\nThank you for discussing the ${offer ? fmtRwf(offer) : 'offer'} package with me${target ? ` and considering ${fmtRwf(target)}` : ''}. I remain very enthusiastic about the role${competing ? ' — I do have another process moving quickly, so timing matters on my side' : ''}. Please let me know if there is any further information I can share to help reach a decision.\n\nBest regards,\n[Your Name]`,
      'key-talking-points': [...(script.talkingPoints || [])],
      'what-to-avoid': tool.whatToAvoid || [],
      'salary-range-recommendation': target > 0
        ? `Ask between ${fmtRwf(low)} and ${fmtRwf(high)} (around ${fmtRwf(target)} target).`
        : 'Enter your target salary to get a recommended range.',
      'total-package-checklist': {
        kind: 'table',
        columns: ['Package Element', 'Negotiable', 'Importance'],
        rows: (tool.totalPackageElements || []).map((row) => [
          row.element,
          row.negotiable ? 'Yes' : 'Rarely',
          String(row.importance || '').replace(/^\w/, (c) => c.toUpperCase()),
        ]),
      },
    };
  },

  'interview-question-bank': (tool, values) => {
    const cat = values['question-category'] || 'all';
    const lvl = values['role-level'] || 'all';
    const matches = (tool.categories || [])
      .filter((c) => cat === 'all' || c.name.toLowerCase().includes(cat.split('-')[0]))
      .flatMap((c) =>
        (c.questions || [])
          .filter((q) => lvl === 'all' || q.level === 'all' || (lvl !== 'entry' && q.level === 'mid-up') || q.level === lvl)
          .map((q) => [q.question, q.tip || ''])
      );
    return {
      questions: {
        kind: 'table',
        columns: ['Question', 'How to answer'],
        rows: matches.length > 0 ? matches : [['—', 'No questions match this filter — try All Categories.']],
      },
      'total-questions': matches.length,
      'practice-guide': [
        'Pick 5 questions and answer each out loud in under 2 minutes',
        'Record yourself and listen for filler words and structure',
        'Use the STAR format for every behavioral question',
        'Prepare one question to ask the employer for each question you practice',
        'Repeat daily in the final week before the interview',
      ],
      'common-mistakes': [
        'Giving rambling answers with no clear structure',
        'Speaking badly about previous employers',
        'Having no questions to ask at the end',
        'Arriving late or unprepared on logistics',
        'Quoting a salary figure too early in the process',
        'Memorizing answers word-for-word instead of talking naturally',
      ],
    };
  },

  'resume-templates': (tool, values) => {
    const level = values['experience-level'];
    const industry = values.industry;
    const format = values['format-preference'];
    const pool = (tool.templates || []).filter((t) => !format || t.format === format);
    const matched =
      pool.find((t) => (t.bestFor || []).includes(level) && (t.bestFor || []).includes(industry)) ||
      pool.find((t) => (t.bestFor || []).includes(level)) ||
      pool.find((t) => (t.bestFor || []).includes(industry)) ||
      pool[0];
    if (!matched) return {};
    return {
      'recommended-template': matched.name,
      'format-description': matched.description,
      'key-sections': {
        kind: 'table',
        columns: ['#', 'Section', 'Include'],
        rows: (matched.structure?.sections || []).map((s) => [s.order, s.name, (s.items || []).join('; ')]),
      },
      'layout-tips': matched.layoutTips || [],
      'color-scheme': matched.colorScheme,
      'sample-structure': (matched.structure?.sections || []).map((s) => `${s.order}. ${s.name}`).join('\n'),
      'rwanda-specific-notes': matched.rwandaSpecific || [],
    };
  },

  'cover-letter-generator': (tool, values) => {
    const sector = values.sector;
    const level = values['experience-level'];
    const pool = tool.templates || [];
    const matched =
      pool.find((t) => t.sector === sector && t.level === level) ||
      pool.find((t) => t.sector === sector) ||
      pool[0];
    if (!matched) return {};
    return {
      'template-structure': {
        kind: 'table',
        columns: ['Section', 'What to write'],
        rows: (matched.structure?.sections || []).map((s) => [s.name, s.content]),
      },
      'full-example': matched.example || '',
      'dos-and-donts': [
        ...((matched.dos || []).map((d) => `Do: ${d}`)),
        ...((matched.donts || []).map((d) => `Don't: ${d}`)),
      ],
      'key-phrases': matched.keyPhrases || [],
      'rwanda-specific-tips': matched.rwandaTips || [],
      'email-guide': [
        'Subject line: Application for [Role Title] - [Your Full Name]',
        'Keep the email body to 3-4 short paragraphs pointing to the attachments',
        'Attach CV and cover letter as PDF: FirstName_LastName_CV.pdf',
        'Send from a professional email address, ideally firstname.lastname',
        'Apply early in the morning on a weekday for best visibility',
      ],
    };
  },

  'interview-scorecard': () => ({}),

  'cv-checklist': () => ({}),

  'company-research-checklist': (tool, values) => ({
    'key-findings': `Researching ${values['company-name'] || 'this company'} (${values.sector || 'sector not set'}) at ${values['research-depth'] || 'standard'} depth. Work through every category below and note names, dates and numbers — they become your interview talking points.`,
    'interview-angles': tool.interviewAngles || [],
  }),

  'job-search-tracker': (tool, values, ctx) => {
    const entries = ctx.entries || [];
    const target = Math.max(1, num(values['weekly-target'], 5));
    const weekAgo = dayjs().subtract(7, 'day');
    const thisWeek = entries.filter((e) => e['date-applied'] && dayjs(e['date-applied']).isAfter(weekAgo)).length;
    const stageOf = (e) => String(e.stage || 'Applied').toLowerCase();
    const responded = entries.filter((e) => !['applied', 'saved / bookmarked', 'saved', 'withdrawn'].includes(stageOf(e))).length;
    const interviewed = entries.filter((e) => stageOf(e).includes('interview') || ['offer', 'accepted'].includes(stageOf(e))).length;
    const offers = entries.filter((e) => ['offer', 'accepted'].includes(stageOf(e))).length;
    const byChannel = {};
    for (const e of entries) {
      const key = e.channel || 'Other';
      byChannel[key] = (byChannel[key] || 0) + 1;
    }
    const stages = tool.applicationStages || [];
    const action =
      entries.length === 0
        ? ['Add your first 5 applications below to activate tracking', `Aim for ${target} quality applications per week`, 'Start with referrals and Imyanya.rw — highest conversion channels']
        : interviewed === 0
          ? ['Tailor every CV to the job description keywords', 'Follow up on applications older than 10 days', `Push this week: ${Math.max(0, target - thisWeek)} more applications to hit target`]
          : offers === 0
            ? ['Prepare STAR stories for every past role', 'Research each company with the Company Research Checklist', 'Send thank-you emails within 24 hours of interviews']
            : ['Compare offers on total package, not just salary', 'Negotiate once with market data ready', 'Respond to offers within the agreed timeline'];
    return {
      'total-applications': entries.length,
      'applications-this-week': thisWeek,
      'response-rate': entries.length > 0 ? (responded / entries.length) * 100 : 0,
      'interview-rate': entries.length > 0 ? (interviewed / entries.length) * 100 : 0,
      'offer-rate': entries.length > 0 ? (offers / entries.length) * 100 : 0,
      'applications-by-channel': {
        kind: 'bars',
        items: Object.entries(byChannel).map(([label, value]) => ({ label, value, display: `${value}` })),
      },
      'weekly-progress': { kind: 'progress', value: clamp((thisWeek / target) * 100, 0, 100) },
      'pipeline-stages': {
        kind: 'kanban',
        columns: stages.map((s) => ({
          name: s.name,
          color: s.color,
          items: entries.filter((e) => stageOf(e) === s.name.toLowerCase() || stageOf(e) === s.id).map((e) => `${e.role || 'Role'} @ ${e.company || 'Company'}`),
        })).filter((c) => c.items.length > 0),
      },
      'top-actions': action,
    };
  },

  'networking-planner': (tool, values, ctx) => {
    const checked = ctx.checked || [];
    const tips = tool.preEventTips || [];
    const done = tips.filter((t, i) => checked.includes(`pre-${i}`)).length;
    const base = { conference: 80, meetup: 75, workshop: 70, 'career-fair': 85, webinar: 60, 'networking-mixer': 72, informational: 90 }[values['event-type']] || 70;
    const goalBoost = { 'job-search': 5, 'industry-insights': 3, mentorship: 4, collaboration: 4, 'personal-brand': 3 }[values.goal] || 0;
    return {
      'pre-event-checklist': {
        kind: 'table',
        columns: ['Task', 'Priority'],
        rows: tips.map((t) => [t.tip || t, String(t.importance || '').replace(/^\w/, (c) => c.toUpperCase())]),
      },
      'target-contacts': {
        kind: 'table',
        columns: ['Rwandan Event', 'Frequency', 'Where'],
        rows: (tool.rwandaNetworkingEvents || []).map((e) => [e.name, e.frequency, e.location]),
      },
      'conversation-starters': (tool.conversationStarters || []).map((s) =>
        String(s).replace('[industry/sector]', values.industry || 'your industry').replace('[industry]', values.industry || 'your industry')
      ),
      'follow-up-plan': {
        kind: 'table',
        columns: ['When', 'Action'],
        rows: Object.entries(tool.followUpPlan || {}).map(([when, item]) => [when.replace(/-/g, ' '), item.action]),
      },
      'roi-score': tips.length > 0 ? Math.round(base * 0.5 + (done / tips.length) * 50 + goalBoost * 0.2) : base,
      'connections-tracker': {
        kind: 'table',
        columns: ['Metric', 'Value'],
        rows: [
          ['Checklist completed', `${done}/${tips.length}`],
          ['Event type', values['event-type'] || '—'],
          ['Primary goal', values.goal || '—'],
        ],
      },
    };
  },

  'professional-development-planner': (tool, values) => {
    const sector = tool.sectorResources?.[values.sector];
    const certs = sector?.certifications || [];
    const totalCost = certs.reduce((sum, c) => sum + (Number(c.cost) || 0), 0);
    const budget = num(values.budget);
    const quarters = ['Q1: Foundations', 'Q2: Core skills', 'Q3: Certification', 'Q4: Showcase'];
    const focus = [
      `Assess current level in ${(sector?.skills || []).slice(0, 2).map((s) => s.name).join(' & ') || 'core skills'}`,
      `Complete 1 course towards ${values['target-role'] || 'target role'}`,
      `Attempt first certification exam (${certs[0]?.name || 'chosen cert'})`,
      `Ship a portfolio project + update CV for ${values['target-role'] || 'target role'}`,
    ];
    return {
      'skill-gap-analysis': {
        kind: 'table',
        columns: ['Skill', 'Target Level', 'Where to learn'],
        rows: (sector?.skills || []).map((s) => [s.name, s.targetLevel, (s.resources || []).join(', ')]),
      },
      'development-plan': {
        kind: 'table',
        columns: ['Quarter', 'Focus'],
        rows: quarters.map((q, i) => [q, focus[i]]),
      },
      'certification-roadmap': {
        kind: 'table',
        columns: ['Certification', 'Cost (RWF)', 'Hours', 'Priority'],
        rows: certs.map((c) => [c.name, fmtInt(c.cost), c.hours, c.priority]),
      },
      'training-recommendations': {
        kind: 'table',
        columns: ['Provider', 'Type', 'Location'],
        rows: (sector?.localResources || []).map((r) => [r.name, r.type, r.location]),
      },
      'quarterly-milestones': {
        kind: 'table',
        columns: ['Quarter', 'Milestone'],
        rows: quarters.map((q, i) => [q, focus[i]]),
      },
      'estimated-cost': budget > 0 ? Math.min(totalCost, budget) : totalCost,
    };
  },

  'career-transition-planner': (tool, values) => {
    const target = String(values['target-field'] || '').toLowerCase();
    const current = values['current-field'] || 'your field';
    const pick =
      /tech|software|data|it|digital/.test(target) ? 'to-tech' :
      /market|sales|media|content|communic/.test(target) ? 'to-marketing' :
      /hr|human|recruit|people/.test(target) ? 'to-hr' :
      /financ|account|bank|audit/.test(target) ? 'to-finance' : null;
    const bridgePool = pick ? tool.bridgeRoles?.[pick] || [] : Object.values(tool.bridgeRoles || {}).flat();
    const months = Number(values.timeframe) || 12;
    const budget = num(values['monthly-budget']);
    return {
      'transferable-skills': [
        `Communication & reporting honed in ${current}`,
        'Organization, planning and meeting deadlines',
        'Stakeholder and client management',
        'Data handling and basic analysis (Excel, reports)',
        'Teamwork and problem-solving under pressure',
      ],
      'skill-gaps': [
        `Core technical skills of ${values['target-field'] || 'the target field'} — map them from 5+ live job posts`,
        'A portfolio project proving the new skills',
        'Industry vocabulary and interview fluency',
        'One recognized certification in the new field',
      ],
      'transition-timeline': {
        kind: 'table',
        columns: ['Phase', 'Key deliverables'],
        rows: Object.values(tool.transitionPhases || {}).map((phase) => [
          phase.name,
          (phase.deliverables || []).join('; '),
        ]),
      },
      'bridge-roles': {
        kind: 'table',
        columns: ['Bridge Role', 'Timeline', 'Why it fits'],
        rows: bridgePool.slice(0, 6).map((role) => [role.title, role.timeline, role.description]),
      },
      'networking-targets': {
        kind: 'table',
        columns: ['Resource', 'Type', 'Focus'],
        rows: (tool.rwandaTransitionResources || []).map((r) => [r.name, r.type, r.focus]),
      },
      'risk-assessment': `Moving from ${current} to ${values['target-field'] || 'a new field'} in ${months} months is ${
        months <= 6 ? 'ambitious — protect income by learning part-time while employed' : 'realistic with steady weekly effort'
      }. Main risks: income dip at entry (${values.reasons === 'income' ? 'you flagged income as the motive, so validate entry salaries first' : 'validate entry-level pay before resigning'}), credential gaps, and a thin new network — all covered by the bridge roles and timeline above.`,
      'financial-plan': budget > 0
        ? `Set aside ${fmtRwf(budget)} monthly: ${fmtRwf(budget * Math.min(months, 6))} over 6 months covers courses plus a 3-month emergency buffer. Keep earning while learning; avoid resigning before month ${Math.max(3, Math.round(months / 2))}.`
        : `Keep your current income while retraining — even ${fmtRwf(50000)} monthly builds a course fund. Avoid resigning before you hold an offer or 3 months of expenses.`,
    };
  },

  'career-assessment': () => ({}),
};

export const computeToolResults = (tool, values = {}, ctx = {}) => {
  if (!tool) return {};
  const engine = engines[tool.slug] || engines[tool.id];
  if (!engine) return {};
  try {
    return engine(tool, values, ctx) || {};
  } catch (error) {
    return {};
  }
};

export const hasRequiredInputs = (tool, values = {}) => {
  if (!tool || !Array.isArray(tool.inputs)) return true;
  return tool.inputs
    .filter((input) => input.required)
    .every((input) => String(values[input.id] ?? '').trim() !== '');
};
