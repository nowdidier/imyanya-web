import cvCoverLetters from './cv-cover-letters';
import interviewPreparation from './interview-preparation';
import salaryBenefits from './salary-benefits';
import careerAdvice from './career-advice';
import industryInsights from './industry-insights';
import governmentNgo from './government-ngo';
import scholarshipsStudy from './scholarships-study';
import internshipsEntry from './internships-entry';
import professionalDevelopment from './professional-development';
import jobSearchStrategies from './job-search-strategies';
import remoteWork from './remote-work';
import careerTransitions from './career-transitions';
import workplaceSkills from './workplace-skills';
import leadershipManagement from './leadership-management';
import entrepreneurship from './entrepreneurship';

const allArticles = [
  ...cvCoverLetters,
  ...interviewPreparation,
  ...salaryBenefits,
  ...careerAdvice,
  ...industryInsights,
  ...governmentNgo,
  ...scholarshipsStudy,
  ...internshipsEntry,
  ...professionalDevelopment,
  ...jobSearchStrategies,
  ...remoteWork,
  ...careerTransitions,
  ...workplaceSkills,
  ...leadershipManagement,
  ...entrepreneurship,
];

export const getAllArticles = () => allArticles;

export const getArticlesByCategory = (category) => 
  allArticles.filter(article => article.category === category);

export const getArticleBySlug = (slug) => 
  allArticles.find(article => article.slug === slug);

export const getCategories = () => 
  [...new Set(allArticles.map(article => article.category))];

export const getArticleCount = () => allArticles.length;

export const getRelatedArticles = (currentSlug, category, limit = 4) => 
  allArticles
    .filter(article => article.category === category && article.slug !== currentSlug)
    .slice(0, limit);

export default allArticles;