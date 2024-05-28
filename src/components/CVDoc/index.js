import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  Image,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

Font.register({
  family: 'Roboto Slab',
  fonts: [
    { src: require('../../assets/fonts/RobotoSlab-Regular.ttf') },
    {
      src: require('../../assets/fonts/RobotoSlab-Regular.ttf'),
      fontStyle: 'italic',
    },
    {
      src: require('../../assets/fonts/RobotoSlab-Bold.ttf'),
      fontStyle: 'italic',
      fontWeight: 700,
    },
  ],
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 40,
    fontSize: 13,
  },
});

const CVDoc = () => {
  return (
    <Document>
      <Page size="A4" style={styles.body}>
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
                color: '#140861',
              }}
            >
              Bùi Khánh Huy
            </Text>
          </View>
          <View>
            <Text style={{ marginTop: 5, fontSize: 20 }}>Umuyobozi w'ibicuruzwa</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <View style={{ flex: 1 }}>
            <Text>Itariki y'amavuko: 27-02-2001</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>Email: Khuy220@gmail.com</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>Telefone: 0888425094</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'column' }}>
          <View style={{ marginTop: 20 }}>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 18, color: '#140861' }}>
                AMAKURU RUSANGE
              </Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 5 }}>
                  <Text>Umwuga: </Text>
                </View>
                <View style={{ flex: 8 }}>
                  <Text>IT</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <View style={{ flex: 5 }}>
                  <Text>Aho ukorera: </Text>
                </View>
                <View style={{ flex: 8 }}>
                  <Text>TP. HCM</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <View style={{ flex: 5 }}>
                  <Text>Urwego rushakwa: </Text>
                </View>
                <View style={{ flex: 8 }}>
                  <Text>Umukozi</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <View style={{ flex: 5 }}>
                  <Text>Umushahara ushakwa: </Text>
                </View>
                <View style={{ flex: 8 }}>
                  <Text>10.000.000 ₫ - 15.000.000 ₫</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <View style={{ flex: 5 }}>
                  <Text>Impamyabumenyi: </Text>
                </View>
                <View style={{ flex: 8 }}>
                  <Text>Yunivesite</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <View style={{ flex: 5 }}>
                  <Text>Ubumenyi bw'akazi: </Text>
                </View>
                <View style={{ flex: 8 }}>
                  <Text>Munsi y'umwaka w'uburambe</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <View style={{ flex: 5 }}>
                  <Text>Aho ukorera ushaka: </Text>
                </View>
                <View style={{ flex: 8 }}>
                  <Text>Ibiro</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <View style={{ flex: 5 }}>
                  <Text>Ubwoko bw'akazi ushaka: </Text>
                </View>
                <View style={{ flex: 8 }}>
                  <Text>Umukozi wa nyirizina</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 18, color: '#140861' }}>Intego z'umwuga</Text>
            </View>
            <View>
              <Text>
                Casi todo aquel día caminó sin acontecerle cosa que de contar
                fuese, de lo cual se desesperaba, porque quisiera topar luego
                luego con quien hacer experiencia del valor de su fuerte brazo.
                Autores hay que dicen que la primera aventura que le avino fue
                la del Puerto Lápice, otros dicen que la de los molinos de
                viento; pero lo que yo he podido averiguar en este caso, y lo
                que he hallado escrito en los anales de la Mancha, es que él
                anduvo todo aquel día
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <View>
              <Text style={{ fontSize: 18, color: '#140861' }}>UBURAMBE BW'AKAZI</Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <View>
                <Text style={{ fontStyle: 'Times-Italic' }}>
                  09/2022 - 03/2023
                </Text>
              </View>
              <View>
                <Text>Umukozi wa Python</Text>
              </View>
              <View>
                <Text>Kampani TNHH MTV DV Vien Thong Phuong Nam</Text>
              </View>
              <View style={{ marginTop: 5 }}>
                <Text>
                  Casi todo aquel día caminó sin acontecerle cosa que de contar
                  fuese, de lo cual se desesperaba, porque quisiera topar luego
                  luego con quien hacer experiencia del valor de su fuerte
                  brazo. Autores hay que dicen que la primera aventura que le
                  avino fue la del Puerto Lápice, otros dicen que la de los
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
                <Text>Umukozi wa Python</Text>
              </View>
              <View>
                <Text>Kampani TNHH MTV DV Vien Thong Phuong Nam</Text>
              </View>
              <View style={{ marginTop: 5 }}>
                <Text>
                  Casi todo aquel día caminó sin acontecerle cosa que de contar
                  fuese, de lo cual se desesperaba, porque quisiera topar luego
                  luego con quien hacer experiencia del valor de su fuerte
                  brazo. Autores hay que dicen que la primera aventura que le
                  avino fue la del Puerto Lápice, otros dicen que la de los
                </Text>
              </View>
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <View>
              <Text style={{ fontSize: 18, color: '#140861' }}>AMASHURI</Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <View>
                <Text>09/2022 - 03/2023</Text>
              </View>
              <View>
                <Text>Ikoranabuhanga</Text>
              </View>
              <View>
                <Text>Impamyabumenyi - Yuniversite yigenga ya Ho Chi Minh</Text>
              </View>
              <View style={{ marginTop: 5 }}>
                <Text>
                  Casi todo aquel día caminó sin acontecerle cosa que de contar
                  fuese, de lo cual se desesperaba, porque quisiera topar luego
                  luego con quien hacer experiencia del valor de su fuerte
                  brazo. Autores hay que dicen que la primera aventura que le
                  avino fue la del Puerto Lápice, otros dicen que la de los
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default CVDoc;
