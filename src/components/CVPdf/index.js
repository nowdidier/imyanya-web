import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  Image,
  PDFViewer,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

Font.register({
  family: 'Times-Roman',
  fontStyle: 'Times-Italic',
  fontWeight: 'Times-Bold',
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 40,
    fontSize: 13,
  },
});

const CVPdf = () => {
  return (
    <PDFViewer style={{ width: '100%', height: 800 }} >
      <Document >
        <Page size="A4" style={styles.body} >
          <View style={{ alignItems: 'center' }}>
            <View>
              <Image
                style={{ width: 90, height: 90, borderRadius: '50%' }}
                src="https://cdn1.vieclam24h.vn/images/default/2022/08/10/images/huy_bui_khanh_vieclam24h_vn_166010996879.png"
              />
            </View>
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 24,
                  marginTop: 10,
                  textTransform: 'uppercase',
                }}
              >
                Bui Khanh Huy
              </Text>
            </View>
            <View>
              <Text style={{ marginTop: 5, fontSize: 20 }}>
                Product Manager
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <View style={{ flex: 1 }}>
              <Text>Date of Birth: 27-02-2001</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>Email: Khuy220@gmail.com</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>Phone Number: 0888425094</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <View style={{ marginTop: 20 }}>
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 18 }}>GENERAL INFORMATION</Text>
              </View>
              <View style={{ flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 5 }}>
                    <Text>Career: </Text>
                  </View>
                  <View style={{ flex: 8 }}>
                    <Text>IT</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                  <View style={{ flex: 5 }}>
                    <Text>Work Location: </Text>
                  </View>
                  <View style={{ flex: 8 }}>
                    <Text>TP. HCM</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                  <View style={{ flex: 5 }}>
                    <Text>Desired Level: </Text>
                  </View>
                  <View style={{ flex: 8 }}>
                    <Text>Staff</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                  <View style={{ flex: 5 }}>
                    <Text>Desired Salary: </Text>
                  </View>
                  <View style={{ flex: 8 }}>
                    <Text>10.000.000 ₫ - 15.000.000 ₫</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                  <View style={{ flex: 5 }}>
                    <Text>Education Level: </Text>
                  </View>
                  <View style={{ flex: 8 }}>
                    <Text>Dai hoc</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                  <View style={{ flex: 5 }}>
                    <Text>Work Experience: </Text>
                  </View>
                  <View style={{ flex: 8 }}>
                    <Text>Less than 1 year of experience</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                  <View style={{ flex: 5 }}>
                    <Text>Desired Workplace: </Text>
                  </View>
                  <View style={{ flex: 8 }}>
                    <Text>Office</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                  <View style={{ flex: 5 }}>
                    <Text>Desired Employment Type: </Text>
                  </View>
                  <View style={{ flex: 8 }}>
                    <Text>Full-time employee</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ marginTop: 20 }}>
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 18 }}>CAREER OBJECTIVE</Text>
              </View>
              <View>
                <Text>
                  I am looking for an opportunity where I can apply my skills, keep learning, and contribute to meaningful products with a strong team.
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 20 }}>
              <View>
                <Text style={{ fontSize: 18 }}>WORK EXPERIENCE</Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <View>
                  <Text style={{ fontStyle: 'Times-Italic' }}>
                    09/2022 - 03/2023
                  </Text>
                </View>
                <View>
                  <Text>Python Developer</Text>
                </View>
                <View>
                  <Text>Phuong Nam Telecommunications Services Co., Ltd.</Text>
                </View>
                <View style={{ marginTop: 5 }}>
                  <Text>
                    Built and maintained software features, collaborated with teammates, and improved product quality through testing and documentation.
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: 10 }}>
                <View>
                  <Text style={{ fontStyle: 'Times-Italic' }}>
                    09/2022 - 03/2023
                  </Text>
                </View>
                <View>
                  <Text>Python Developer</Text>
                </View>
                <View>
                  <Text>Phuong Nam Telecommunications Services Co., Ltd.</Text>
                </View>
                <View style={{ marginTop: 5 }}>
                  <Text>
                    Built and maintained software features, collaborated with teammates, and improved product quality through testing and documentation.
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ marginTop: 20 }}>
              <View>
                <Text style={{ fontSize: 18 }}>EDUCATION</Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <View>
                  <Text>09/2022 - 03/2023</Text>
                </View>
                <View>
                  <Text>Information Technology</Text>
                </View>
                <View>
                  <Text>Bachelor - Ho Chi Minh City Open University</Text>
                </View>
                <View style={{ marginTop: 5 }}>
                  <Text>
                    Built and maintained software features, collaborated with teammates, and improved product quality through testing and documentation.
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ marginTop: 20 }}>
              <View>
                <Text style={{ fontSize: 18 }}>CERTIFICATES</Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <View>
                  <Text style={{ fontStyle: 'italic' }}>09/2022 - 03/2023</Text>
                </View>
                <View>
                  <Text>Information Technology</Text>
                </View>
                <View>
                  <Text>Bachelor - Ho Chi Minh City Open University</Text>
                </View>
              </View>
            </View>

            <View style={{ marginTop: 20 }}>
              <View style={{ marginBottom: 5 }}>
                <Text style={{ fontSize: 18 }}>LANGUAGE SKILLS</Text>
              </View>
              <View style={{ marginTop: 5 }}>
                <Text>English (5/5)</Text>
              </View>
              <View style={{ marginTop: 5 }}>
                <Text>English (5/5)</Text>
              </View>
              <View style={{ marginTop: 5 }}>
                <Text>English (5/5)</Text>
              </View>
              <View style={{ marginTop: 5 }}>
                <Text>English (5/5)</Text>
              </View>
            </View>

            <View style={{ marginTop: 20 }}>
              <View style={{ marginBottom: 5 }}>
                <Text style={{ fontSize: 18 }}>PROFESSIONAL SKILLS</Text>
              </View>
              <View style={{ marginTop: 5 }}>
                <Text>JAVASCRIPT (5/5)</Text>
              </View>
              <View style={{ marginTop: 5 }}>
                <Text>Python (5/5)</Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default CVPdf;
