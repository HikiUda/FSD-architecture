import { SidebarPathModel } from 'widgets/Sidebar';
import {
   P_USER_CART,
   P_USER_CHAT,
   P_USER_LIKED,
   P_USER_MYPRODUCT,
   P_USER_PURCHES,
   P_USER_STATEMENT,
   P_USER_SUPPORT,
} from 'shared/lib/pathes';

export const userPathes: SidebarPathModel[] = [
   { path: P_USER_CART, nameLink: 'Корзина' },
   { path: P_USER_CHAT, nameLink: 'Чаты' },
   { path: P_USER_LIKED, nameLink: 'Избранные' },
   { path: P_USER_MYPRODUCT, nameLink: 'Мои товары' },
   { path: P_USER_PURCHES, nameLink: 'Купленные' },
   { path: P_USER_STATEMENT, nameLink: 'Заявления' },
   { path: P_USER_SUPPORT, nameLink: 'ТехПоддержка' },
];
