import React from 'react';
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

// Lightweight CV PDF for the "CV yo mu Rwanda" builder.
// Built-in Helvetica only (no remote fonts/images) so download always works.
const ACCENT = '#1a73e8';

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica', backgroundColor: '#ffffff' },
  name: { fontSize: 26, fontWeight: 'bold', textAlign: 'center' },
  headline: {
    fontSize: 13,
    fontWeight: 'bold',
    color: ACCENT,
    textAlign: 'center',
    marginTop: 4,
  },
  contact: {
    fontSize: 10,
    color: '#5f6368',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: ACCENT,
    marginTop: 12,
    marginBottom: 6,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: ACCENT,
  },
  para: { fontSize: 11, lineHeight: 1.5, marginBottom: 6 },
  jobHead: { fontSize: 11, fontWeight: 'bold', marginTop: 6 },
  jobMeta: { fontSize: 10, color: '#5f6368', fontStyle: 'italic', marginBottom: 3 },
  bullet: { fontSize: 11, lineHeight: 1.5, marginLeft: 12, marginBottom: 2 },
});

const lines = (text) =>
  String(text || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

const CvBuilderPdf = ({ data = {} }) => {
  const fullName = String(data.fullName || 'My CV').trim();
  const contact = [data.email, data.phone, data.address]
    .map((part) => String(part || '').trim())
    .filter(Boolean)
    .join('  |  ');

  const experience = (Array.isArray(data.experience) ? data.experience : []).filter(
    (item) => item && (item.jobTitle || item.employer || item.details)
  );
  const education = (Array.isArray(data.education) ? data.education : []).filter(
    (item) => item && (item.degree || item.school || item.year)
  );
  const contactExtra = [data.nationality, data.dateOfBirth, data.portfolio]
    .map((part) => String(part || '').trim())
    .filter(Boolean)
    .join('  |  ');

  const skills = Array.isArray(data.skills)
    ? data.skills.map((skill) => String(skill || '').trim()).filter(Boolean)
    : String(data.skills || '')
        .split(/[,;\n]/)
        .map((skill) => skill.trim())
        .filter(Boolean);

  const languages = (Array.isArray(data.languages) ? data.languages : []).filter(
    (item) => item && (item.name || item.level)
  );
  const certificates = (Array.isArray(data.certificates) ? data.certificates : []).filter(
    (item) => item && (item.name || item.issuer || item.year)
  );
  const referees = (Array.isArray(data.referees) ? data.referees : []).filter(
    (item) => item && (item.name || item.phone || item.email)
  );

  return (
    <Document title={`CV yo mu Rwanda - ${fullName}`} author="Imyanya">
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{fullName}</Text>
        {String(data.title || '').trim() ? (
          <Text style={styles.headline}>{String(data.title).trim()}</Text>
        ) : null}
        {contact ? <Text style={styles.contact}>{contact}</Text> : null}
        {contactExtra ? (
          <Text style={{ ...styles.contact, marginTop: 2, marginBottom: 12 }}>
            {contactExtra}
          </Text>
        ) : null}

        {String(data.summary || '').trim() ? (
          <View>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.para}>{String(data.summary).trim()}</Text>
          </View>
        ) : null}

        {experience.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {experience.map((item, index) => (
              <View key={index}>
                <Text style={styles.jobHead}>
                  {[item.jobTitle, item.employer].filter(Boolean).join(' — ') || 'Role'}
                </Text>
                {[item.start, item.current ? 'Present' : item.end]
                  .filter(Boolean)
                  .join(' – ') ? (
                  <Text style={styles.jobMeta}>
                    {[item.start, item.current ? 'Present' : item.end]
                      .filter(Boolean)
                      .join(' – ')}
                  </Text>
                ) : null}
                {lines(item.details).map((line, i) => (
                  <Text key={i} style={styles.bullet}>
                    • {line}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        ) : null}

        {education.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((item, index) => (
              <Text key={index} style={styles.bullet}>
                • {[item.degree, item.school, item.year].filter(Boolean).join(', ')}
              </Text>
            ))}
          </View>
        ) : null}

        {skills.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Text style={styles.para}>{skills.join('  •  ')}</Text>
          </View>
        ) : null}

        {languages.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Languages</Text>
            {languages.map((item, index) => (
              <Text key={index} style={styles.bullet}>
                • {[item.name, item.level].filter(Boolean).join(' — ')}
              </Text>
            ))}
          </View>
        ) : null}

        {certificates.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Certificates & Training</Text>
            {certificates.map((item, index) => (
              <Text key={index} style={styles.bullet}>
                • {[item.name, item.issuer, item.year].filter(Boolean).join(', ')}
              </Text>
            ))}
          </View>
        ) : null}

        {referees.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Referees</Text>
            {referees.map((item, index) => (
              <View key={index} style={{ marginBottom: 4 }}>
                <Text style={styles.jobHead}>
                  {[item.name, item.position, item.organisation]
                    .filter(Boolean)
                    .join(', ')}
                </Text>
                {[item.phone, item.email].filter(Boolean).join('  |  ') ? (
                  <Text style={styles.jobMeta}>
                    {[item.phone, item.email].filter(Boolean).join('  |  ')}
                  </Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}
      </Page>
    </Document>
  );
};

export default CvBuilderPdf;
