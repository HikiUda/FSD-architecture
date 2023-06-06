import { P_ADMIN_STATEMENT, P_ADMIN_CHAT } from 'shared/lib/pathes';
import { SidebarPathModel } from 'widgets/Sidebar';

export const adminPathes: SidebarPathModel[] = [
   { path: P_ADMIN_STATEMENT, nameLink: 'Заявления' },
   { path: P_ADMIN_CHAT, nameLink: 'Чаты' },
];
