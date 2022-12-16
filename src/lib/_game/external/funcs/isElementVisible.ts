function isElementVisible(element: HTMLElement) {
    return (element.offsetParent !== null);
}

export default isElementVisible;