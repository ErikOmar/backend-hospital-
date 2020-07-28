const getMenuFrontEnd = (role = 'USER_ROLE') => {
    const menu = [
        {
            titulo: 'Dashboard',
            icono: 'mdi mdi-gauge',
            submenu: [
                { path: '/dashboard', titulo: 'Main' },
                { path: '/dashboard/progress', titulo: 'Progres Bar' },
                { path: '/dashboard/graphic', titulo: 'Graficas' },
                { path: '/dashboard/promises', titulo: 'Promesas' },
                { path: '/dashboard/rxjs', titulo: 'RxJs' },
            ]
        },
        {
            titulo: 'Mantenimiento',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                // {path: '/dashboard/usuarios', titulo: 'Usuarios'},
                { path: '/dashboard/hospitales', titulo: 'Hospitales' },
                { path: '/dashboard/medicos', titulo: 'Medicos' },
            ]
        }
    ];

    if (role === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({ path: '/dashboard/usuarios', titulo: 'Usuarios' })
    }

    return menu;
}

module.exports = {
    getMenuFrontEnd
}