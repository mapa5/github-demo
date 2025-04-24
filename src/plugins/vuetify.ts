// Styles
import '@mdi/font/css/materialdesignicons.css';
 // @ts-expect-error: vuetify/styles come from documentation.
import 'vuetify/styles';

// Vuetify
import { createVuetify } from 'vuetify';

export default createVuetify({
	theme: {
    defaultTheme: 'dark'
  },
});
