import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
} from 'docx';

const ACCENT = '1A73E8';

const trimLines = (text) =>
  String(text || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

const sectionHeading = (text) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 120 },
    children: [new TextRun({ text, bold: true, color: ACCENT, size: 28 })],
  });

const bodyPara = (text, { bold = false, italic = false } = {}) =>
  new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text, bold, italic, size: 22 })],
  });

const bullet = (text) =>
  new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 60 },
    children: [new TextRun({ text, size: 22 })],
  });

// Builds a clean, ATS-friendly one-column CV. Pure data in, Document out.
export const buildCvDocument = (data = {}) => {
  const fullName = String(data.fullName || 'My CV').trim();
  const contactBits = [data.email, data.phone, data.address]
    .map((part) => String(part || '').trim())
    .filter(Boolean);

  const children = [
    new Paragraph({
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: fullName, bold: true, size: 56 })],
    }),
  ];

  if (String(data.title || '').trim()) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 120 },
        children: [
          new TextRun({
            text: String(data.title).trim(),
            bold: true,
            color: ACCENT,
            size: 26,
          }),
        ],
      })
    );
  }

  if (contactBits.length > 0) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 120 },
        children: [new TextRun({ text: contactBits.join('  |  '), size: 20, color: '595959' })],
      })
    );
  }

  const extraBits = [
    data.nationality ? `Nationality: ${data.nationality}` : '',
    data.dateOfBirth ? `Date of Birth: ${data.dateOfBirth}` : '',
    data.portfolio,
  ]
    .map((part) => String(part || '').trim())
    .filter(Boolean);
  if (extraBits.length > 0) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 240 },
        children: [new TextRun({ text: extraBits.join('  |  '), size: 20, color: '595959' })],
      })
    );
  }

  if (String(data.summary || '').trim()) {
    children.push(sectionHeading('Professional Summary'));
    children.push(bodyPara(String(data.summary).trim()));
  }

  const experience = (Array.isArray(data.experience) ? data.experience : []).filter(
    (item) => item && (item.jobTitle || item.employer || item.details)
  );
  if (experience.length > 0) {
    children.push(sectionHeading('Work Experience'));
    for (const item of experience) {
      const headBits = [item.jobTitle, item.employer].map((part) => String(part || '').trim()).filter(Boolean);
      const dateBits = [item.start, item.current ? 'Present' : item.end]
        .map((part) => String(part || '').trim())
        .filter(Boolean);
      if (headBits.length > 0) children.push(bodyPara(headBits.join(' — '), { bold: true }));
      if (dateBits.length > 0) children.push(bodyPara(dateBits.join(' – '), { italic: true }));
      for (const line of trimLines(item.details)) children.push(bullet(line));
    }
  }

  const education = (Array.isArray(data.education) ? data.education : []).filter(
    (item) => item && (item.degree || item.school || item.year)
  );
  if (education.length > 0) {
    children.push(sectionHeading('Education'));
    for (const item of education) {
      const line = [item.degree, item.school, item.year]
        .map((part) => String(part || '').trim())
        .filter(Boolean)
        .join(', ');
      if (line) children.push(bullet(line));
    }
  }

  const skills = Array.isArray(data.skills)
    ? data.skills.map((skill) => String(skill || '').trim()).filter(Boolean)
    : String(data.skills || '')
        .split(/[,;\n]/)
        .map((skill) => skill.trim())
        .filter(Boolean);
  if (skills.length > 0) {
    children.push(sectionHeading('Skills'));
    children.push(bodyPara(skills.join('  •  ')));
  }

  const languages = (Array.isArray(data.languages) ? data.languages : []).filter(
    (item) => item && (item.name || item.level)
  );
  if (languages.length > 0) {
    children.push(sectionHeading('Languages'));
    for (const item of languages) {
      const line = [item.name, item.level].filter(Boolean).join(' — ');
      if (line) children.push(bullet(line));
    }
  }

  const certificates = (Array.isArray(data.certificates) ? data.certificates : []).filter(
    (item) => item && (item.name || item.issuer || item.year)
  );
  if (certificates.length > 0) {
    children.push(sectionHeading('Certificates & Training'));
    for (const item of certificates) {
      const line = [item.name, item.issuer, item.year].filter(Boolean).join(', ');
      if (line) children.push(bullet(line));
    }
  }

  const referees = (Array.isArray(data.referees) ? data.referees : []).filter(
    (item) => item && (item.name || item.phone || item.email)
  );
  if (referees.length > 0) {
    children.push(sectionHeading('Referees'));
    for (const item of referees) {
      const head = [item.name, item.position, item.organisation].filter(Boolean).join(', ');
      const contact = [item.phone, item.email].filter(Boolean).join('  |  ');
      if (head) children.push(bodyPara(head, { bold: true }));
      if (contact) children.push(bodyPara(contact));
    }
  }

  return new Document({
    creator: 'Imyanya',
    title: `CV - ${fullName}`,
    description: 'CV created with the Imyanya free CV builder.',
    sections: [{ children }],
  });
};

// Builds a formal one-page cover letter. Pure data in, Document out.
export const buildCoverLetterDocument = (data = {}) => {
  const fullName = String(data.fullName || 'My Cover Letter').trim();
  const children = [
    new Paragraph({
      heading: HeadingLevel.TITLE,
      children: [new TextRun({ text: fullName, bold: true, size: 44 })],
    }),
  ];

  for (const line of [data.address, [data.email, data.phone].filter(Boolean).join('  |  ')]) {
    if (String(line || '').trim()) children.push(bodyPara(String(line).trim()));
  }

  if (String(data.date || '').trim()) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        spacing: { before: 240, after: 240 },
        children: [new TextRun({ text: String(data.date).trim(), size: 22 })],
      })
    );
  }

  for (const line of [data.recipientName, data.companyName, data.companyAddress]) {
    if (String(line || '').trim()) children.push(bodyPara(String(line).trim()));
  }

  if (String(data.position || '').trim()) {
    children.push(
      new Paragraph({
        spacing: { before: 240, after: 240 },
        children: [
          new TextRun({
            text: `Re: Application for the Position of ${String(data.position).trim()}`,
            bold: true,
            size: 22,
          }),
        ],
      })
    );
  }

  children.push(bodyPara(String(data.salutation || 'Dear Hiring Manager,').trim()));

  const paragraphs = String(data.body || '')
    .split(/\n\s*\n/)
    .map((para) => para.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
  for (const para of paragraphs.length > 0 ? paragraphs : ['']) {
    if (para) children.push(bodyPara(para));
  }

  children.push(bodyPara(String(data.closing || 'Yours sincerely,').trim()));
  children.push(bodyPara(fullName, { bold: true }));

  if (String(data.enclosures || '').trim()) {
    children.push(
      new Paragraph({
        spacing: { before: 240 },
        children: [
          new TextRun({
            text: `Enclosures: ${String(data.enclosures).trim()}`,
            italic: true,
            size: 20,
            color: '595959',
          }),
        ],
      })
    );
  }

  return new Document({
    creator: 'Imyanya',
    title: `Cover Letter - ${fullName}`,
    description: 'Cover letter created with the Imyanya free cover letter builder.',
    sections: [{ children }],
  });
};

export const sanitizeFilename = (name, fallback = 'document') => {
  const clean = String(name || '')
    .trim()
    .replace(/[\\/:*?"<>|]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 60);
  return clean || fallback;
};

// Triggers a .docx download in the browser. No extra dependency needed.
export const downloadDocx = async (doc, filename) => {
  const blob = await Packer.toBlob(doc);
  downloadBlob(
    blob,
    filename.endsWith('.docx') ? filename : `${filename}.docx`
  );
};

// Triggers a download for any Blob (used for PDF export too).
export const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
};
