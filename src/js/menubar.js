import MenuTemplate from '../stores/Menu.js';

/**
 * Add New Menu Item To MenuBar
 */
export function AddMenuItem(menuItem) {
	if (!menuItem) return;
	MenuTemplate.update(template => {
		return [...template, menuItem];
	})
}