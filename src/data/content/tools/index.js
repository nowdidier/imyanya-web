import salaryCalculator from './salary-calculator';
import cvChecklist from './cv-checklist';
import noticePeriodCalculator from './notice-period-calculator';
import leaveEntitlementCalculator from './leave-entitlement-calculator';
import interviewScorecard from './interview-scorecard';
import careerAssessment from './career-assessment';
import resumeTemplates from './resume-templates';
import salaryComparison from './salary-comparison';
import interviewCountdown from './interview-countdown';
import coverLetterGenerator from './cover-letter-generator';
import networkingPlanner from './networking-planner';
import certificationRoiCalculator from './certification-roi-calculator';
import costOfLivingCalculator from './cost-of-living-calculator';
import leaveCalculator from './leave-calculator';
import interviewQuestionBank from './interview-question-bank';
import professionalDevelopmentPlanner from './professional-development-planner';
import negotiationScriptGenerator from './negotiation-script-generator';
import taxCalculator from './tax-calculator';
import careerTransitionPlanner from './career-transition-planner';
import jobSearchTracker from './job-search-tracker';
import companyResearchChecklist from './company-research-checklist';

export const tools = [
  salaryCalculator,
  cvChecklist,
  noticePeriodCalculator,
  leaveEntitlementCalculator,
  interviewScorecard,
  careerAssessment,
  resumeTemplates,
  salaryComparison,
  interviewCountdown,
  coverLetterGenerator,
  networkingPlanner,
  certificationRoiCalculator,
  costOfLivingCalculator,
  leaveCalculator,
  interviewQuestionBank,
  professionalDevelopmentPlanner,
  negotiationScriptGenerator,
  taxCalculator,
  careerTransitionPlanner,
  jobSearchTracker,
  companyResearchChecklist,
];

export const getAllTools = () => tools;

export const getToolBySlug = (slug) =>
  tools.find(tool => tool.slug === slug);

export const getToolsByCategory = (category) =>
  tools.filter(tool => tool.category === category);

export const getCategories = () =>
  [...new Set(tools.map(tool => tool.category))];

export const getRelatedTools = (currentSlug, limit = 4) =>
  tools
    .filter(tool => tool.slug !== currentSlug)
    .slice(0, limit);

export const getToolCount = () => tools.length;

export default tools;
