import { css } from 'styled-components';

const colors = {
  main: '#46CDCF',
  second: '#16C79A',
  menu: "#525B75",
  search: "#CBD0DD",
  ph: "#16C79A",
  white: '#F8F1F1',
  ff: '#FFFFFF',
  btn: '#00D465',
  textBox:'#f1f1f1',
};

const fonts = {
    BalooChettan_head_regular_25: css`
    font-family: 'Baloo Chettan';
    font-style: normal;
    font-weight: 400;
    font-size: 25px;
    line-height: 31px;
`,
    BalooChettan_placeholder_regular_20: css`
    font-family: 'Baloo Chettan';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 19px;
`,
    BalooChettan_menu_regular_13: css`
    font-family: 'Baloo Chettan';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 19px;
`,
};

const theme = {
  colors,
  fonts,
};
export default theme;