import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "facebook": "Facebook messenger",
      "conect": "Conect",
      "edit": "Edit",
      "conect_facebook": "CONNECTED FACEBOOK PAGE",
      "add_fb_pages": " + Add Facebook pages",
      "all_permision": "All permission",
      "new_permison": "new permission",
      "connected_accounts": "Connected accounts",
      "disconnect": "Disconnect",
      "remove": "Remove",
      "add_permission": "Add Permission",
      "add_account": "Add account",
      "connect_fb_account": "Connect to your Facebook account",
    }
  },
  
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
