import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
    colors: {
        main;
        second;
        menu;
        search;
        ph;
        white;
        ff;
        btn;
        textBox;
    };
    fonts: {
        BalooChettan_head_regular_25;
        BalooChettan_placeholder_regular_20;
        BalooChettan_menu_regular_13;
    };
  }
}