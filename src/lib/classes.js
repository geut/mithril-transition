exports.loadClasses = function (classList, lastElm, elem, direction) {
    elem.parentNode.classList.add(classList.parent);
    lastElm.classList.add(classList.lastElm);
    elem.classList.add(classList.nextElm);
    elem.classList.add(classList.direction.replace('<direction>', direction));
};

exports.unloadClasses = function (classList, barrier, parentNode, elem, direction) {
    const newBarrier = barrier - 1;

    if (newBarrier > 0) {
        return newBarrier;
    }

    elem.classList.remove(classList.nextElm);
    elem.classList.remove(classList.direction.replace('<direction>', direction));

    if (elem.parentNode) {
        elem.parentNode.classList.remove(classList.parent);
    }

    return newBarrier;
};
